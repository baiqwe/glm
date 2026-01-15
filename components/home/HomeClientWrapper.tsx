'use client';

import { useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';

const HomeHeroGenerator = dynamic(
    () => import('./HomeHeroGenerator'),
    { ssr: false }
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
