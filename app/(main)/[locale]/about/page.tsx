import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Zap, Globe, Lock } from "lucide-react";
import { BreadcrumbSchema } from "@/components/breadcrumb-schema";
import { siteConfig } from "@/config/site";

export const runtime = 'nodejs';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    const isZh = locale === 'zh';
    const title = isZh ? `关于我们 - ${siteConfig.name}` : `About Us - ${siteConfig.name}`;
    const description = isZh
        ? 'GLM-Image 是基于智谱 CogView-4 的 AI 图像生成平台，提供高效、便捷的文生图服务。'
        : 'GLM-Image is an AI image generation platform powered by Zhipu CogView-4, providing efficient text-to-image services.';

    return {
        title,
        description,
        alternates: {
            canonical: `/${locale}/about`,
            languages: {
                'en': '/en/about',
                'zh': '/zh/about',
                'x-default': '/en/about',
            },
        },
    };
}

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    const isZh = locale === 'zh';
    const localePrefix = `/${locale}`;

    const breadcrumbs = [
        { name: isZh ? '首页' : 'Home', url: `${siteConfig.url}/${locale}` },
        { name: isZh ? '关于我们' : 'About Us', url: `${siteConfig.url}/${locale}/about` },
    ];

    return (
        <div className="min-h-screen bg-slate-950">
            <BreadcrumbSchema items={breadcrumbs} />

            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur">
                <div className="container px-4 md:px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Button asChild variant="ghost" size="sm" className="gap-2 text-slate-300 hover:text-white hover:bg-slate-800">
                            <Link href={localePrefix}>
                                <ArrowLeft className="h-4 w-4" />
                                {isZh ? '返回首页' : 'Back to Home'}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container px-4 md:px-6 py-16">
                <div className="max-w-4xl mx-auto space-y-16">
                    {/* Hero Section */}
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-300 text-sm">
                            <Sparkles className="w-4 h-4" />
                            {isZh ? 'AI 图像生成' : 'AI Image Generation'}
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            {isZh ? '关于 GLM-Image' : 'About GLM-Image'}
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                            {isZh
                                ? '基于智谱 CogView-4 的新一代 AI 图像生成平台，让创意触手可及。'
                                : 'Next-generation AI image generation platform powered by Zhipu CogView-4, making creativity accessible to everyone.'}
                        </p>
                    </div>

                    {/* Our Mission */}
                    <div className="bg-slate-800/50 rounded-2xl p-8 md:p-12 border border-slate-700">
                        <h2 className="text-2xl font-bold mb-6 text-white">
                            {isZh ? '我们的愿景' : 'Our Mission'}
                        </h2>
                        <div className="space-y-4 text-slate-400">
                            <p>
                                {isZh
                                    ? 'GLM-Image 致力于让每个人都能轻松创作高质量的 AI 图像。我们相信，强大的 AI 技术应该简单易用，让创意不再受技术门槛的限制。'
                                    : 'GLM-Image is committed to making high-quality AI image creation accessible to everyone. We believe powerful AI technology should be simple to use, removing technical barriers from creative expression.'}
                            </p>
                            <p>
                                {isZh
                                    ? '我们采用智谱 AI 的 CogView-4 模型，这是目前最先进的中文文生图模型之一，支持中英双语输入，能够精准理解您的创意描述。'
                                    : 'We leverage Zhipu AI\'s CogView-4 model, one of the most advanced text-to-image models with native Chinese understanding, supporting both Chinese and English inputs to accurately interpret your creative descriptions.'}
                            </p>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-indigo-500/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4">
                                <Sparkles className="h-6 w-6 text-indigo-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">
                                {isZh ? 'CogView-4 驱动' : 'Powered by CogView-4'}
                            </h3>
                            <p className="text-slate-400 text-sm">
                                {isZh
                                    ? '采用智谱最新的图像生成模型，支持中英文输入，生成效果出色。'
                                    : 'Using Zhipu\'s latest image generation model with excellent Chinese and English understanding.'}
                            </p>
                        </div>

                        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-indigo-500/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                                <Zap className="h-6 w-6 text-purple-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">
                                {isZh ? '快速生成' : 'Fast Generation'}
                            </h3>
                            <p className="text-slate-400 text-sm">
                                {isZh
                                    ? '优化的生成流程，几秒钟内即可获得高质量图像。'
                                    : 'Optimized generation pipeline delivers high-quality images in seconds.'}
                            </p>
                        </div>

                        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-indigo-500/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                                <Globe className="h-6 w-6 text-cyan-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">
                                {isZh ? '中英双语' : 'Bilingual Support'}
                            </h3>
                            <p className="text-slate-400 text-sm">
                                {isZh
                                    ? '完美支持中文和英文提示词，无需翻译即可创作。'
                                    : 'Perfect support for both Chinese and English prompts without translation.'}
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 md:p-12 border border-slate-700">
                        <h3 className="text-2xl font-bold mb-4 text-white">
                            {isZh ? '开始创作' : 'Start Creating'}
                        </h3>
                        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
                            {isZh
                                ? '新用户注册即送 30 积分，立即体验 AI 图像生成的魅力。'
                                : 'New users get 30 credits upon registration. Experience the magic of AI image generation.'}
                        </p>
                        <Button asChild size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0">
                            <Link href={localePrefix}>
                                {isZh ? '免费试用' : 'Try Free'}
                            </Link>
                        </Button>
                    </div>

                    {/* Contact */}
                    <div className="text-center text-sm text-slate-500">
                        <p>
                            {isZh ? '有问题或建议？' : 'Questions or suggestions?'}
                        </p>
                        <p className="mt-2">
                            Contact: <a href={`mailto:${siteConfig.supportEmail}`} className="text-indigo-400 hover:underline">{siteConfig.supportEmail}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
