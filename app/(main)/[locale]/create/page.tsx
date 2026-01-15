import { createClient } from "@/utils/supabase/server";
import HomeHeroGenerator from "@/components/home/HomeHeroGenerator";

// Use Node.js runtime for Vercel
// Use Node.js runtime for Vercel
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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
