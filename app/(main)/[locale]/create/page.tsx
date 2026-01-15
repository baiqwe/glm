import { createClient } from "@/utils/supabase/server";
import dynamic from 'next/dynamic';

const HomeHeroGenerator = dynamic(
    () => import('@/components/home/HomeHeroGenerator'),
    { ssr: false }
);

// Use Node.js runtime for Vercel
export const runtime = 'nodejs';
const dynamicConfig = 'force-dynamic';
export { dynamicConfig as dynamic };

export default async function CreatePage() {
    let user = null;
    try {
        const supabase = await createClient();
        const { data } = await supabase.auth.getUser();
        user = data?.user || null;
    } catch (error) {
        console.error("Error fetching user:", error);
    }

    return (
        <div className="bg-slate-950 min-h-screen">
            <HomeHeroGenerator
                onShowStaticContent={() => { }}
                user={user}
            />
        </div>
    );
}
