'use client';

import { useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// SSR 加载占位符 - 保持页面布局稳定，避免闪烁
const HeroPlaceholder = () => (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
            <span className="text-sm">Loading...</span>
        </div>
    </div>
);

const HomeHeroGenerator = dynamic(
    () => import('./HomeHeroGenerator'),
    {
        ssr: false,
        loading: () => <HeroPlaceholder />  // 加载时显示占位符
    }
);

interface HomeClientWrapperProps {
    staticContent: ReactNode;
    user: any;
}

export default function HomeClientWrapper({ staticContent, user }: HomeClientWrapperProps) {
    const [showStaticContent, setShowStaticContent] = useState(true);

    return (
        <div className="min-h-screen">
            {/* Hero + AI Generator */}
            <HomeHeroGenerator onShowStaticContent={setShowStaticContent} user={user} />

            {/* SEO Static Content - always visible below the generator */}
            <div className="bg-background">
                {staticContent}
            </div>
        </div>
    );
}

