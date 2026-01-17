import HomeClientWrapper from "@/components/home/HomeClientWrapper";

// ✅ 使用 ISR 模式，用户状态在客户端组件中获取
// 这样页面可以被 CDN 缓存，提升 TTFB 和爬取效率
export const revalidate = 60;

export default async function CreatePage() {
    // 用户状态在客户端 HomeHeroGenerator 中实时获取
    // 服务端传递 null，让客户端自己获取最新状态
    const user = null;

    return (
        <div className="bg-slate-950 min-h-screen">
            <HomeClientWrapper
                user={user}
                staticContent={null}
            />
        </div>
    );
}
