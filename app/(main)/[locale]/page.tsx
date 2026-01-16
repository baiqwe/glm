import HomeClientWrapper from '@/components/home/HomeClientWrapper';
import HomeStaticContent from '@/components/home/HomeStaticContent';

// ✅ This is now a Server Component (no 'use client')
// Hero/Interactive content is client-side, static content is server-rendered for SEO

// 页面使用 ISR，每 60 秒重新验证一次静态内容
// 用户状态在客户端组件中获取，不影响页面缓存
export const revalidate = 60;

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    // 用户状态在客户端 HomeHeroGenerator 中实时获取
    // 服务端传递 null，让客户端自己获取最新状态
    const user = null;

    // Server-rendered static content for better LCP and SEO
    const staticContent = await HomeStaticContent({ locale });

    return (
        <HomeClientWrapper staticContent={staticContent} user={user} />
    );
}
