import { createClient } from "@/utils/supabase/server";
import HomeHeroGenerator from "@/components/home/HomeHeroGenerator";

// Use Node.js runtime for Vercel
export const runtime = 'nodejs';

export default async function CreatePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="bg-slate-950 min-h-screen">
            <HomeHeroGenerator
                onShowStaticContent={() => { }}
                user={user}
            />
        </div>
    );
}
