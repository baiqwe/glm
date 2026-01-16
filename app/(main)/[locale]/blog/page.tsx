import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    const isZh = locale === 'zh';

    return {
        title: isZh ? `博客 - ${siteConfig.name}` : `Blog - ${siteConfig.name}`,
        description: isZh
            ? `${siteConfig.name} 博客 - AI 图像生成教程、技巧和最新动态`
            : `${siteConfig.name} Blog - AI image generation tutorials, tips, and latest updates`,
        alternates: {
            canonical: `/${locale}/blog`,
        },
    };
}

// Mock blog posts - replace with CMS data
function getPosts(locale: string) {
    const isZh = locale === 'zh';
    return [
        {
            slug: 'how-to-use-glm-4',
            title: isZh
                ? 'GLM-4.5 图像生成完全指南：从入门到精通'
                : 'How to Master GLM-4.5 for Image Generation: A Complete Guide',
            excerpt: isZh
                ? '学习如何使用 GLM-4.5 创建惊艳的视觉效果，包含详细的提示词技巧和与 Midjourney 的对比分析。'
                : 'Learn the secrets of prompting with GLM-4.5 to create stunning visuals. Includes detailed tips and comparison with Midjourney.',
            date: '2026-01-15',
            readTime: isZh ? '5 分钟' : '5 min',
            tags: isZh ? ['教程', 'GLM-4.5'] : ['Tutorial', 'GLM-4.5'],
        },
        {
            slug: 'top-10-prompts',
            title: isZh
                ? 'GLM-4.5 角色设计十大提示词技巧'
                : 'Top 10 Prompts for GLM-4.5 Character Design',
            excerpt: isZh
                ? '掌握这些提示词技巧，轻松创建独特的角色设计。从卡通风格到写实风格，应有尽有。'
                : 'Master these prompting techniques to easily create unique character designs. From cartoon to realistic styles.',
            date: '2026-01-12',
            readTime: isZh ? '3 分钟' : '3 min',
            tags: isZh ? ['技巧', '角色设计'] : ['Tips', 'Character Design'],
        },
    ];
}

export default async function BlogPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    const isZh = locale === 'zh';
    const localePrefix = `/${locale}`;
    const posts = getPosts(locale);

    return (
        <div className="min-h-screen bg-slate-950">
            <div className="container max-w-6xl mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-300 text-sm mb-6">
                        <Sparkles className="w-4 h-4" />
                        {isZh ? 'AI 图像生成博客' : 'AI Image Generation Blog'}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {isZh ? '博客' : 'Blog'}
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        {isZh
                            ? '探索 AI 图像生成的技巧、教程和最新动态'
                            : 'Explore tips, tutorials, and the latest in AI image generation'}
                    </p>
                </div>

                {/* Posts Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {posts.map(post => (
                        <Link key={post.slug} href={`${localePrefix}/blog/${post.slug}`} className="group">
                            <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10">
                                <CardContent className="p-6">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="bg-indigo-500/20 text-indigo-300">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-slate-400 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {post.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {post.readTime}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="text-center p-12 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 rounded-2xl border border-slate-700">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        {isZh ? '准备好开始创作了吗？' : 'Ready to Start Creating?'}
                    </h2>
                    <p className="text-slate-400 mb-6 max-w-xl mx-auto">
                        {isZh
                            ? '无需等待，立即使用 GLM-4.5 生成您的第一张 AI 图像。'
                            : 'No waiting needed. Generate your first AI image with GLM-4.5 right now.'}
                    </p>
                    <Link href={`${localePrefix}/create`}>
                        <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                            {isZh ? '免费开始生成' : 'Start Generating Free'} <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
