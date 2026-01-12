#!/usr/bin/env node
// scripts/translate.ts
// 自动翻译脚本 - 从基准语言生成其他语言的翻译文件

import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

// 动态导入 siteConfig（避免 TypeScript 路径问题）
const siteConfigPath = path.join(__dirname, '../config/site.ts');

interface SiteConfig {
    i18n: {
        locales: readonly string[];
        defaultLocale: string;
        baseLocale: string;
    };
}

async function loadSiteConfig(): Promise<SiteConfig> {
    // 读取并解析 site.ts（简化版，生产环境可用 ts-node 或 esbuild）
    const content = fs.readFileSync(siteConfigPath, 'utf-8');

    // 提取 locales 数组
    const localesMatch = content.match(/locales:\s*\[([^\]]+)\]/);
    const baseLocaleMatch = content.match(/baseLocale:\s*['"]([^'"]+)['"]/);

    if (!localesMatch || !baseLocaleMatch) {
        throw new Error('无法解析 site.ts 中的 i18n 配置');
    }

    const locales = localesMatch[1]
        .split(',')
        .map(s => s.trim().replace(/['"]/g, ''))
        .filter(s => s.length > 0);

    return {
        i18n: {
            locales,
            defaultLocale: locales[0],
            baseLocale: baseLocaleMatch[1],
        }
    };
}

const LANGUAGE_NAMES: Record<string, string> = {
    en: 'English',
    zh: 'Chinese (Simplified)',
    ja: 'Japanese',
    ko: 'Korean',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    pt: 'Portuguese',
    ru: 'Russian',
    ar: 'Arabic',
};

async function translateMessages() {
    console.log('🌍 开始翻译流程...\n');

    // 加载配置
    const siteConfig = await loadSiteConfig();
    const { locales, baseLocale } = siteConfig.i18n;

    console.log(`📋 支持的语言: ${locales.join(', ')}`);
    console.log(`📝 基准语言: ${baseLocale}\n`);

    // 读取基准语言文件
    const messagesDir = path.join(__dirname, '../messages');
    const baseFilePath = path.join(messagesDir, `${baseLocale}.json`);

    if (!fs.existsSync(baseFilePath)) {
        console.error(`❌ 基准语言文件不存在: ${baseFilePath}`);
        process.exit(1);
    }

    const baseMessages = JSON.parse(fs.readFileSync(baseFilePath, 'utf-8'));
    console.log(`✅ 已加载基准文件: ${baseLocale}.json\n`);

    const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.warn('⚠️ 未配置 API Key，跳过自动翻译 (OPENROUTER_API_KEY 或 OPENAI_API_KEY 未设置)');
        process.exit(0);
    }

    // 初始化 OpenAI 客户端
    const openai = new OpenAI({
        baseURL: process.env.OPENAI_BASE_URL || 'https://openrouter.ai/api/v1',
        apiKey: apiKey,
    });

    // 翻译其他语言
    for (const locale of locales) {
        if (locale === baseLocale) continue;

        const targetFilePath = path.join(messagesDir, `${locale}.json`);
        const targetLang = LANGUAGE_NAMES[locale] || locale;

        console.log(`🔄 正在翻译到 ${targetLang} (${locale})...`);

        try {
            const response = await openai.chat.completions.create({
                model: 'google/gemini-2.0-flash-001',
                messages: [
                    {
                        role: 'system',
                        content: `You are a professional translator specializing in software localization.

TASK: Translate the following JSON content from ${LANGUAGE_NAMES[baseLocale] || baseLocale} to ${targetLang}.

RULES:
1. Keep the JSON structure exactly the same
2. Only translate string VALUES, not keys
3. DO NOT translate:
   - Brand names (like "MakeBW")
   - URLs
   - Technical terms (like "JPG", "PNG", "HEIC")
   - Placeholder variables like {format}
4. Maintain the same tone and style
5. Output valid JSON only, no markdown code blocks`
                    },
                    {
                        role: 'user',
                        content: JSON.stringify(baseMessages, null, 2)
                    }
                ],
                temperature: 0.3,
            });

            const content = response.choices[0]?.message?.content;
            if (!content) {
                console.error(`  ⚠️ ${locale}: 空响应，跳过`);
                continue;
            }

            // 清理可能的 markdown 代码块
            const cleanContent = content
                .replace(/^```json\n?/g, '')
                .replace(/\n?```$/g, '')
                .trim();

            const translated = JSON.parse(cleanContent);

            // 写入文件
            fs.writeFileSync(targetFilePath, JSON.stringify(translated, null, 4));
            console.log(`  ✅ ${locale}.json 已更新`);

        } catch (error: any) {
            console.error(`  ❌ ${locale}: 翻译失败 - ${error.message}`);
        }
    }

    console.log('\n🎉 翻译完成！');
}

// 执行
translateMessages().catch(console.error);
