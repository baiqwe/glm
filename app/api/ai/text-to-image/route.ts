import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { CREDITS_PER_GENERATION } from "@/config/pricing";

// Use Node.js runtime for Vercel
export const runtime = 'nodejs';
export const maxDuration = 60; // 1 minute timeout

// 智谱 AI API 端点
const ZHIPU_API_URL = "https://open.bigmodel.cn/api/paas/v4/images/generations";
const ZHIPU_CHAT_URL = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

// 支持的尺寸
const SUPPORTED_SIZES: Record<string, string> = {
    "1:1": "1024x1024",
    "16:9": "1920x1080",
    "9:16": "1080x1920",
    "4:3": "1280x960",
    "3:4": "960x1280",
};

// 模型选项
const MODELS = {
    "cogview-4": "cogview-4",           // 最新模型，支持汉字生成
    "glm-image": "glm-image",           // GLM 图像模型
    "cogview-3-flash": "cogview-3-flash" // 快速模型
};

// 风格提示词映射
const STYLE_HINTS: Record<string, string> = {
    photo: "photorealistic photography, natural lighting, high resolution, sharp focus, professional camera",
    art: "artistic masterpiece, painterly style, vibrant colors, expressive brushstrokes, gallery quality",
    anime: "anime style, manga illustration, cel shading, vibrant colors, Japanese animation aesthetic",
    cinematic: "cinematic film still, dramatic lighting, movie scene, epic composition, anamorphic lens",
    default: "highly detailed, professional quality, stunning visual"
};

/**
 * 提示词隐形增强
 * 使用 GLM-4-Flash 将用户的简单提示词扩写成大师级提示词
 * 
 * 优化点：
 * 1. 保留用户原始语言（中文进中文出，英文进英文出）
 * 2. 保护引号内的文字不被翻译（用于文字渲染）
 * 3. 智谱 CogView 原生支持中文，中文提示词效果更好
 */
async function enhancePrompt(
    userPrompt: string,
    style: string,
    apiKey: string
): Promise<{ enhanced: string; success: boolean }> {
    try {
        const styleHint = STYLE_HINTS[style] || STYLE_HINTS.default;

        const response = await fetch(ZHIPU_CHAT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "glm-4-flash",
                messages: [{
                    role: "system",
                    content: `You are an expert AI art prompt engineer for image generation. Your job is to transform simple user prompts into detailed, vivid descriptions that will produce stunning images.

Rules:
1. **Detect Language**: Check if the user's input is Chinese or English.
2. **Language Consistency**: 
   - If the user input is in **Chinese**, the output MUST be in **Chinese**.
   - If the user input is in **English**, the output MUST be in **English**.
   - **DO NOT TRANSLATE** the core meaning across languages.
3. **Text Preservation**: If the user provides specific text to be displayed (usually in quotes like "文字内容" or specific names), YOU MUST KEEP IT EXACTLY AS IS. Do not alter or translate text content meant for rendering.
4. Expand the prompt with artistic details: lighting, composition, atmosphere, textures, colors.
5. Add quality boosters appropriate to the language:
   - For Chinese: 高清, 精细, 大师级, 专业品质, 8K
   - For English: 8K, highly detailed, masterpiece, professional
6. Incorporate the style direction: "${styleHint}" (Translate this style concept into the target language naturally).
7. Output ONLY the improved prompt, no explanations or quotes.
8. Keep under 200 words.`
                }, {
                    role: "user",
                    content: userPrompt
                }],
                temperature: 0.7,
                max_tokens: 500  // 增加 token 限制，中文扩写需要更多空间
            })
        });

        if (!response.ok) {
            console.warn("Prompt enhancement failed, using original:", response.status);
            return { enhanced: userPrompt, success: false };
        }

        const data = await response.json();
        const enhanced = data.choices?.[0]?.message?.content?.trim();

        if (enhanced && enhanced.length > 5) {  // 降低阈值，中文提示词可能较短
            console.log("=== Prompt Enhanced ===");
            console.log("Original:", userPrompt);
            console.log("Enhanced:", enhanced);
            return { enhanced, success: true };
        }

        return { enhanced: userPrompt, success: false };
    } catch (error) {
        console.warn("Prompt enhancement error:", error);
        return { enhanced: userPrompt, success: false };
    }
}

export async function POST(request: NextRequest) {
    const supabase = await createClient();

    try {
        const {
            prompt,
            aspect_ratio = "1:1",
            style = "default",
            model = "cogview-4",
            enhance = true  // 默认开启提示词增强
        } = await request.json();

        // 1. Authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({
                error: "Please sign in first",
                code: "UNAUTHORIZED"
            }, { status: 401 });
        }

        // 2. Input Validation
        if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
            return NextResponse.json({
                error: "Please enter a prompt",
                code: "MISSING_PROMPT"
            }, { status: 400 });
        }

        if (prompt.length > 2000) {
            return NextResponse.json({
                error: "Prompt too long (max 2000 characters)",
                code: "PROMPT_TOO_LONG"
            }, { status: 400 });
        }

        const zhipuApiKey = process.env.ZHIPU_API_KEY;
        if (!zhipuApiKey) {
            console.error("ZHIPU_API_KEY is not set");
            return NextResponse.json({
                error: "Service configuration error",
                code: "CONFIG_ERROR"
            }, { status: 500 });
        }

        // 3. Deduct Credits
        const { data: deductSuccess, error: rpcError } = await supabase.rpc('decrease_credits', {
            p_user_id: user.id,
            p_amount: CREDITS_PER_GENERATION,
            p_description: `CogView Generation (${model})`
        });

        if (rpcError) {
            console.error("RPC Error:", rpcError);
            return NextResponse.json({
                error: "System busy, please retry",
                code: "SYSTEM_ERROR"
            }, { status: 500 });
        }

        if (!deductSuccess) {
            return NextResponse.json({
                error: "Insufficient credits, please top up",
                code: "INSUFFICIENT_CREDITS",
                required: CREDITS_PER_GENERATION
            }, { status: 402 });
        }

        // 4. Enhance Prompt (隐形增强)
        let finalPrompt = prompt.trim();
        let wasEnhanced = false;

        if (enhance) {
            const { enhanced, success } = await enhancePrompt(finalPrompt, style, zhipuApiKey);
            if (success) {
                finalPrompt = enhanced;
                wasEnhanced = true;
            }
        }

        // 5. Call Zhipu CogView API
        try {
            // 获取尺寸
            const size = SUPPORTED_SIZES[aspect_ratio] || "1024x1024";

            // 获取模型
            const selectedModel = MODELS[model as keyof typeof MODELS] || MODELS["cogview-4"];

            console.log("=== CogView Generation ===");
            console.log("Original Prompt:", prompt);
            console.log("Final Prompt:", finalPrompt);
            console.log("Enhanced:", wasEnhanced);
            console.log("Size:", size);
            console.log("Model:", selectedModel);

            const response = await fetch(ZHIPU_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${zhipuApiKey}`,
                },
                body: JSON.stringify({
                    model: selectedModel,
                    prompt: finalPrompt,
                    size: size,
                    quality: "standard",
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("Zhipu API Error:", response.status, errorData);
                throw new Error(errorData.error?.message || `API Error: ${response.status}`);
            }

            const data = await response.json();
            console.log("CogView Response:", JSON.stringify(data, null, 2));

            // 智谱返回格式: { data: [{ url: "..." }] }
            const resultUrl = data.data?.[0]?.url;

            if (!resultUrl || !resultUrl.startsWith('http')) {
                throw new Error("CogView returned invalid result");
            }

            // 6. Log Generation
            await supabase.from("generations").insert({
                user_id: user.id,
                prompt: prompt.trim(),  // 保存原始提示词
                model_id: selectedModel,
                image_url: resultUrl,
                input_image_url: null,
                status: "succeeded",
                credits_cost: CREDITS_PER_GENERATION,
                metadata: {
                    style,
                    aspect_ratio,
                    size,
                    model: selectedModel,
                    provider: "zhipu",
                    enhanced_prompt: wasEnhanced ? finalPrompt : null,  // 保存增强后的提示词
                    was_enhanced: wasEnhanced
                }
            });

            return NextResponse.json({
                url: resultUrl,
                success: true,
                enhancedPrompt: wasEnhanced ? finalPrompt : null,  // 返回给前端显示
                wasEnhanced
            });

        } catch (aiError: any) {
            console.error("CogView Service Error:", aiError);

            // Refund credits on failure
            await supabase.rpc('decrease_credits', {
                p_user_id: user.id,
                p_amount: -CREDITS_PER_GENERATION,
                p_description: 'Refund: CogView Generation Failed'
            });

            return NextResponse.json({
                error: "Generation failed, credits refunded",
                code: "AI_FAILED",
                refunded: true,
                details: aiError?.message || "Unknown error"
            }, { status: 500 });
        }

    } catch (error: any) {
        console.error("Route Error:", error);
        return NextResponse.json(
            { error: error.message || "Server error", code: "UNKNOWN_ERROR" },
            { status: 500 }
        );
    }
}
