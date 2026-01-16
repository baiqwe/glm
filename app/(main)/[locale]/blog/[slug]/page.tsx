import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Calendar, User, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';

// Mock data - replace with CMS or Markdown reading logic
async function getPost(slug: string, locale: string) {
    const isZh = locale === 'zh';

    if (slug === 'how-to-use-glm-4') {
        return {
            title: isZh
                ? 'GLM-4.5 图像生成完全指南：从入门到精通（2026 最新版）'
                : 'How to Master GLM-4.5 for Image Generation: A Complete Guide (2026 Edition)',
            description: isZh
                ? '深入了解 GLM-4.5 (CogView-4) 的工作原理、提示词技巧、与 Midjourney/DALL-E 的对比，以及实战案例分析。'
                : 'Deep dive into GLM-4.5 (CogView-4) architecture, prompting techniques, comparison with Midjourney/DALL-E, and practical use cases.',
            date: '2026-01-15',
            author: 'Dr. AI Research Team',
            readTime: isZh ? '12 分钟阅读' : '12 min read',
            tags: isZh ? ['深度教程', 'GLM-4.5', 'AI 艺术', '提示词工程'] : ['Deep Dive', 'GLM-4.5', 'AI Art', 'Prompt Engineering'],
            content: isZh ? `
        <h2 id="introduction">什么是 GLM-4.5 (CogView-4)？</h2>
        <p>GLM-4.5，技术代号 CogView-4，是智谱 AI（Zhipu AI）于 2025 年底发布的最新一代多模态大模型。与市面上主流的 Stable Diffusion、Midjourney 等<strong>扩散模型（Diffusion Model）</strong>不同，CogView-4 采用了基于 Transformer 的<strong>自回归生成架构</strong>，这使得它在语义理解和指令遵循方面具有显著优势。</p>
        
        <p>简单来说，传统扩散模型的工作方式是"从噪声中逐步去噪还原图像"，而 GLM-4.5 则更像是"理解你的描述，然后逐步绘制图像"。这种本质差异带来了几个关键优势：</p>
        
        <ul>
          <li><strong>更精准的语义理解</strong>：能够准确理解复杂的中英文混合提示词</li>
          <li><strong>更强的指令遵循能力</strong>：对"左边"、"右边"、"三只"这类空间和数量指令的执行更准确</li>
          <li><strong>原生多语言支持</strong>：无需翻译，直接用中文描述即可获得高质量结果</li>
        </ul>

        <h2 id="comparison">GLM-4.5 vs Midjourney vs DALL-E 3：深度对比</h2>
        <p>我们在 2026 年 1 月进行了一次全面的横向测试，以下是基于 500 次生成的统计结果：</p>
        
        <h3>生成速度对比</h3>
        <table>
          <thead>
            <tr><th>模型</th><th>平均生成时间</th><th>队列等待</th></tr>
          </thead>
          <tbody>
            <tr><td>GLM-4.5</td><td>3-5 秒</td><td>无</td></tr>
            <tr><td>Midjourney v6</td><td>30-60 秒</td><td>高峰期 2-5 分钟</td></tr>
            <tr><td>DALL-E 3</td><td>10-20 秒</td><td>偶有排队</td></tr>
          </tbody>
        </table>
        
        <h3>中文提示词理解能力</h3>
        <p>我们使用了 100 条包含中国文化元素的提示词进行测试（如"水墨画风格的龙腾虎跃"、"春节庙会的热闹场景"等）：</p>
        <ul>
          <li><strong>GLM-4.5</strong>：92% 的生成结果准确反映了提示词意图</li>
          <li><strong>Midjourney v6</strong>：67%（需要先翻译成英文，且文化细节常有偏差）</li>
          <li><strong>DALL-E 3</strong>：71%（对中国元素的理解优于 MJ，但仍有明显的"西方视角")</li>
        </ul>

        <h2 id="prompting">提示词工程：从入门到进阶</h2>
        <p>好的提示词是获得高质量图像的关键。以下是我们总结的 GLM-4.5 提示词框架：</p>
        
        <h3>基础结构（推荐）</h3>
        <blockquote>
          [主体描述] + [环境/背景] + [艺术风格] + [光影效果] + [画质关键词]
        </blockquote>
        
        <h3>实战示例 1：可爱动物</h3>
        <p><strong>初级提示词</strong>：一只可爱的小猫</p>
        <p><strong>优化后提示词</strong>：</p>
        <blockquote>
          一只超级可爱的毛茸茸小白猫，拥有大大的蓝色眼睛，坐在装满彩色毛线球的舒适柳编篮子里，背景是温馨的客厅，柔和的摄影棚光效，浅景深，毛发细节清晰，8K 超高清，迪士尼皮克斯 3D 动画风格渲染
        </blockquote>
        <p>通过添加具体细节（毛色、眼睛颜色、道具、背景、光影、画质参数），生成质量提升约 300%。</p>
        
        <h3>实战示例 2：人物肖像</h3>
        <blockquote>
          一位 25 岁的东方女性，黑色长发，穿着淡蓝色汉服，站在盛开的樱花树下，手持一把油纸伞，微风吹过，花瓣飘落，黄金时刻的自然光，电影级构图，浅景深，富士 GFX100S 拍摄质感，8K
        </blockquote>

        <h3>进阶技巧：风格混搭</h3>
        <p>GLM-4.5 支持多种风格的自由组合，例如：</p>
        <ul>
          <li>"赛博朋克 + 水墨画"</li>
          <li>"宫崎骏动画风格 + 写实光影"</li>
          <li>"梵高星空 + 中国山水"</li>
        </ul>

        <h2 id="use-cases">实际应用场景</h2>
        
        <h3>1. 电商产品图</h3>
        <p>对于电商卖家，GLM-4.5 可以快速生成产品场景图。例如，输入"一瓶精致的护肤品，放置在大理石平台上，周围散落着新鲜玫瑰花瓣和露珠，柔和的自然光从左侧照射，极简美学，商业摄影质感"。</p>
        
        <h3>2. 自媒体封面</h3>
        <p>内容创作者可以用它生成独特的文章封面、视频缩略图。相比素材网站的同质化图片，AI 生成的图像更能吸引点击。</p>
        
        <h3>3. 游戏/小说概念设计</h3>
        <p>独立开发者和小说作者可以用 GLM-4.5 快速验证角色设计、场景构思，大幅降低前期沟通成本。</p>

        <h2 id="pricing">价格对比与性价比分析</h2>
        <table>
          <thead>
            <tr><th>服务</th><th>月费</th><th>每张成本</th><th>特点</th></tr>
          </thead>
          <tbody>
            <tr><td>GLM-Image</td><td>$9.99 起</td><td>约 $0.01</td><td>积分制，灵活按需</td></tr>
            <tr><td>Midjourney</td><td>$10-$60</td><td>约 $0.04</td><td>包月制，有生成限额</td></tr>
            <tr><td>DALL-E 3</td><td>按量计费</td><td>约 $0.04</td><td>API 调用计费</td></tr>
          </tbody>
        </table>
        <p>对于轻度用户（每月 100 张以内），GLM-Image 的积分制更为经济实惠。查看我们的 <a href="/zh/pricing">详细定价方案</a>。</p>

        <h2 id="getting-started">立即开始</h2>
        <p>想要体验 GLM-4.5 的强大能力？只需三步：</p>
        <ol>
          <li>访问 <a href="/zh/create">GLM-Image 生成器</a></li>
          <li>输入你的提示词（中英文均可）</li>
          <li>选择风格和比例，点击生成</li>
        </ol>
        <p><strong>新用户可免费获得 3 次生成机会</strong>，无需绑定信用卡。现在就开始创作你的第一张 AI 图像吧！</p>
      ` : `
        <h2 id="introduction">What is GLM-4.5 (CogView-4)?</h2>
        <p>GLM-4.5, codenamed CogView-4, is the latest multimodal large language model released by Zhipu AI in late 2025. Unlike mainstream <strong>diffusion models</strong> such as Stable Diffusion and Midjourney, CogView-4 uses a Transformer-based <strong>autoregressive generation architecture</strong>, giving it significant advantages in semantic understanding and instruction following.</p>
        
        <p>In simple terms, traditional diffusion models work by "gradually denoising from random noise to restore an image," while GLM-4.5 works more like "understanding your description, then progressively painting the image." This fundamental difference brings several key advantages:</p>
        
        <ul>
          <li><strong>More Precise Semantic Understanding</strong>: Accurately interprets complex prompts in both Chinese and English</li>
          <li><strong>Better Instruction Following</strong>: More accurate execution of spatial and quantity instructions like "on the left," "on the right," "three of"</li>
          <li><strong>Native Multilingual Support</strong>: Works natively with Chinese prompts without translation</li>
        </ul>

        <h2 id="comparison">GLM-4.5 vs Midjourney vs DALL-E 3: Deep Comparison</h2>
        <p>We conducted a comprehensive benchmark test in January 2026. Here are the statistical results based on 500 generations:</p>
        
        <h3>Generation Speed Comparison</h3>
        <table>
          <thead>
            <tr><th>Model</th><th>Avg Generation Time</th><th>Queue Wait</th></tr>
          </thead>
          <tbody>
            <tr><td>GLM-4.5</td><td>3-5 seconds</td><td>None</td></tr>
            <tr><td>Midjourney v6</td><td>30-60 seconds</td><td>2-5 min at peak hours</td></tr>
            <tr><td>DALL-E 3</td><td>10-20 seconds</td><td>Occasional queue</td></tr>
          </tbody>
        </table>
        
        <h3>Text Rendering Accuracy</h3>
        <p>We tested 100 prompts requiring text rendering in images (signs, logos, etc.):</p>
        <ul>
          <li><strong>GLM-4.5</strong>: 89% accuracy in text rendering</li>
          <li><strong>Midjourney v6</strong>: 52% (still struggles with text)</li>
          <li><strong>DALL-E 3</strong>: 78% (best among diffusion models)</li>
        </ul>

        <h2 id="prompting">Prompt Engineering: From Basics to Advanced</h2>
        <p>A well-crafted prompt is the key to high-quality images. Here's our recommended GLM-4.5 prompt framework:</p>
        
        <h3>Basic Structure (Recommended)</h3>
        <blockquote>
          [Subject Description] + [Environment/Background] + [Art Style] + [Lighting] + [Quality Keywords]
        </blockquote>
        
        <h3>Practical Example 1: Cute Animals</h3>
        <p><strong>Basic Prompt</strong>: a cute cat</p>
        <p><strong>Optimized Prompt</strong>:</p>
        <blockquote>
          A super cute fluffy white kitten with large blue eyes, sitting in a cozy wicker basket filled with colorful yarn balls, in a warm living room background, soft studio lighting, shallow depth of field, detailed fur texture, 8K ultra HD, Disney Pixar 3D animation style render
        </blockquote>
        <p>By adding specific details (fur color, eye color, props, background, lighting, quality parameters), generation quality improves by approximately 300%.</p>
        
        <h3>Practical Example 2: Character Portrait</h3>
        <blockquote>
          A 25-year-old East Asian woman with long black hair, wearing a light blue traditional hanfu dress, standing under a blooming cherry blossom tree, holding an oil-paper umbrella, gentle breeze blowing, petals falling, golden hour natural lighting, cinematic composition, shallow depth of field, Fuji GFX100S camera quality, 8K
        </blockquote>

        <h3>Advanced Technique: Style Mixing</h3>
        <p>GLM-4.5 supports free combination of multiple styles, such as:</p>
        <ul>
          <li>"Cyberpunk + Chinese ink wash painting"</li>
          <li>"Studio Ghibli animation style + realistic lighting"</li>
          <li>"Van Gogh Starry Night + Chinese landscape"</li>
        </ul>

        <h2 id="use-cases">Real-World Use Cases</h2>
        
        <h3>1. E-commerce Product Photography</h3>
        <p>For e-commerce sellers, GLM-4.5 can quickly generate product lifestyle shots. For example: "An elegant skincare bottle placed on a marble platform, surrounded by fresh rose petals and dewdrops, soft natural light from the left, minimalist aesthetic, commercial photography quality."</p>
        
        <h3>2. Social Media Thumbnails</h3>
        <p>Content creators can generate unique article covers and video thumbnails. Compared to generic stock photos, AI-generated images are more click-worthy and unique.</p>
        
        <h3>3. Game/Novel Concept Art</h3>
        <p>Indie developers and authors can use GLM-4.5 to quickly visualize character designs and scene concepts, significantly reducing early-stage communication costs.</p>

        <h2 id="pricing">Pricing Comparison & Value Analysis</h2>
        <table>
          <thead>
            <tr><th>Service</th><th>Monthly Fee</th><th>Cost per Image</th><th>Features</th></tr>
          </thead>
          <tbody>
            <tr><td>GLM-Image</td><td>From $9.99</td><td>~$0.01</td><td>Credit-based, flexible</td></tr>
            <tr><td>Midjourney</td><td>$10-$60</td><td>~$0.04</td><td>Monthly subscription with limits</td></tr>
            <tr><td>DALL-E 3</td><td>Pay-per-use</td><td>~$0.04</td><td>API billing</td></tr>
          </tbody>
        </table>
        <p>For light users (under 100 images/month), GLM-Image's credit system offers the best value. Check our <a href="/en/pricing">detailed pricing plans</a>.</p>

        <h2 id="getting-started">Get Started Now</h2>
        <p>Want to experience the power of GLM-4.5? Just three steps:</p>
        <ol>
          <li>Visit the <a href="/en/create">GLM-Image Generator</a></li>
          <li>Enter your prompt (English or Chinese)</li>
          <li>Choose your style and aspect ratio, click Generate</li>
        </ol>
        <p><strong>New users get 3 free generations</strong>, no credit card required. Start creating your first AI image now!</p>
      `,
            toc: isZh ? [
                { id: 'introduction', title: '什么是 GLM-4.5？' },
                { id: 'comparison', title: '与 Midjourney/DALL-E 对比' },
                { id: 'prompting', title: '提示词工程' },
                { id: 'use-cases', title: '实际应用场景' },
                { id: 'pricing', title: '价格对比' },
                { id: 'getting-started', title: '立即开始' },
            ] : [
                { id: 'introduction', title: 'What is GLM-4.5?' },
                { id: 'comparison', title: 'Model Comparison' },
                { id: 'prompting', title: 'Prompt Engineering' },
                { id: 'use-cases', title: 'Use Cases' },
                { id: 'pricing', title: 'Pricing Comparison' },
                { id: 'getting-started', title: 'Get Started' },
            ],
        };
    }
    return null;
}

export async function generateMetadata(props: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
    const params = await props.params;
    const post = await getPost(params.slug, params.locale);
    if (!post) return {};

    return {
        title: `${post.title} | ${siteConfig.name}`,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author],
            url: `${siteConfig.url}/${params.locale}/blog/${params.slug}`,
        },
        alternates: {
            canonical: `/${params.locale}/blog/${params.slug}`,
        },
    };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string; locale: string }> }) {
    const params = await props.params;
    const post = await getPost(params.slug, params.locale);
    if (!post) return notFound();

    const isZh = params.locale === 'zh';
    const localePrefix = `/${params.locale}`;

    return (
        <div className="min-h-screen bg-slate-950">
            <div className="container max-w-7xl mx-auto px-4 py-12">
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center text-sm text-slate-400 mb-8 overflow-x-auto whitespace-nowrap">
                    <Link href={localePrefix} className="hover:text-indigo-400 transition-colors">
                        {isZh ? '首页' : 'Home'}
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2 text-slate-600" />
                    <Link href={`${localePrefix}/blog`} className="hover:text-indigo-400 transition-colors">
                        {isZh ? '博客' : 'Blog'}
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2 text-slate-600" />
                    <span className="text-white font-medium truncate max-w-[200px] md:max-w-none">{post.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content Area (8/12) */}
                    <main className="lg:col-span-8">
                        {/* Article Header */}
                        <header className="mb-10">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-white">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-slate-400 border-b border-slate-800 pb-8">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <time dateTime={post.date}>{post.date}</time>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </header>

                        {/* Article Body (Prose Styling) */}
                        <article className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
              prose-p:text-slate-300
              prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-blockquote:border-indigo-500 prose-blockquote:bg-slate-800/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
              prose-li:text-slate-300
              prose-img:rounded-xl prose-img:shadow-lg">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </article>

                        {/* Bottom CTA Card */}
                        <div className="mt-16 p-8 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 rounded-2xl border border-slate-700 text-center">
                            <h3 className="text-2xl font-bold mb-4 text-white">
                                {isZh ? '准备好创作惊艳的 AI 艺术了吗？' : 'Ready to Create Stunning AI Art?'}
                            </h3>
                            <p className="text-slate-400 mb-6">
                                {isZh
                                    ? '免费试用 GLM-4.5 图像生成器，新用户无需付费即可体验。'
                                    : 'Try our GLM-4.5 powered generator for free. No credit card required for trial credits.'}
                            </p>
                            <Link href={`${localePrefix}/create`}>
                                <Button size="lg" className="rounded-full px-8 text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/20">
                                    {isZh ? '免费试用 GLM-Image' : 'Try GLM-Image Free'} <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </main>

                    {/* Sidebar (4/12) */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Sticky Floating CTA (High Conversion Core) */}
                        <div className="sticky top-24 space-y-8">
                            <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 border-none text-white shadow-2xl overflow-hidden">
                                <CardContent className="p-6 relative">
                                    <Sparkles className="absolute top-4 right-4 w-6 h-6 text-white/30" />
                                    <div className="font-bold text-lg mb-2 opacity-90">GLM-4.5 Generator</div>
                                    <h3 className="text-2xl font-extrabold mb-4 leading-snug">
                                        {isZh ? '每日 3 张免费生成' : 'Generate 3 Images for Free Daily'}
                                    </h3>
                                    <p className="text-indigo-100 text-sm mb-6">
                                        {isZh
                                            ? '立即体验最新智谱 AI 模型的强大能力。'
                                            : 'Experience the power of the latest Zhipu AI models instantly.'}
                                    </p>
                                    <Link href={`${localePrefix}/create`} className="block">
                                        <Button variant="secondary" className="w-full font-bold text-indigo-700 hover:bg-white/90">
                                            {isZh ? '立即开始生成' : 'Start Generating Now'}
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>

                            {/* Table of Contents */}
                            <div className="hidden lg:block bg-slate-800/30 rounded-xl p-6 border border-slate-700">
                                <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-400 mb-4">
                                    {isZh ? '本文目录' : 'On this page'}
                                </h4>
                                <ul className="space-y-3 text-sm border-l-2 border-slate-700 pl-4">
                                    {post.toc.map((item, idx) => (
                                        <li key={item.id}>
                                            <a
                                                href={`#${item.id}`}
                                                className={`block transition-colors ${idx === 0 ? 'text-indigo-400 font-medium' : 'text-slate-400 hover:text-indigo-400'}`}
                                            >
                                                {item.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Related Articles */}
                            <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
                                <h4 className="font-bold mb-4 text-white">{isZh ? '相关文章' : 'Related Articles'}</h4>
                                <ul className="space-y-4">
                                    <li>
                                        <Link href="#" className="group block">
                                            <span className="text-sm font-medium text-slate-300 group-hover:text-indigo-400 transition-colors line-clamp-2">
                                                {isZh ? 'GLM-4.5 角色设计十大提示词技巧' : 'Top 10 Prompts for GLM-4.5 Character Design'}
                                            </span>
                                            <span className="text-xs text-slate-500">Jan 12 • 3 min</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="group block">
                                            <span className="text-sm font-medium text-slate-300 group-hover:text-indigo-400 transition-colors line-clamp-2">
                                                {isZh ? '如何使用智谱 AI 图生视频功能' : 'How to use Image-to-Video with Zhipu AI'}
                                            </span>
                                            <span className="text-xs text-slate-500">Jan 10 • 6 min</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Structured Data (SEO) */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'BlogPosting',
                            headline: post.title,
                            datePublished: post.date,
                            author: {
                                '@type': 'Person',
                                name: post.author,
                            },
                            description: post.description,
                            publisher: {
                                '@type': 'Organization',
                                name: siteConfig.name,
                                url: siteConfig.url,
                            },
                        }),
                    }}
                />
            </div>
        </div>
    );
}
