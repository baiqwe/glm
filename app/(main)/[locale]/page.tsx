import HomeClientWrapper from '@/components/home/HomeClientWrapper';
import HomeStaticContent from '@/components/home/HomeStaticContent';

// ✅ This is now a Server Component (no 'use client')
// Hero/Interactive content is client-side, static content is server-rendered for SEO

import { createClient } from "@/utils/supabase/server";

export const dynamic = 'force-dynamic';

export default async function HomePage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    // Fetch user on server for initial state
    let user = null;
    try {
        const supabase = await createClient();
        const { data } = await supabase.auth.getUser();
        user = data?.user || null;
    } catch (error) {
        console.error("Error fetching user:", error);
        // Fail silently for user fetch, page should still load
    }

    // Server-rendered static content for better LCP and SEO
    const staticContent = await HomeStaticContent({ locale });

    return (
        <HomeClientWrapper staticContent={staticContent} user={user} />
    );
}
