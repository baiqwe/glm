"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function PromotionBanner() {
    const [isVisible, setIsVisible] = useState(true);
    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
    const pathname = usePathname();

    const locale = pathname?.split('/')[1] === 'zh' ? 'zh' : 'en';
    const localePrefix = `/${locale}`;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else {
                    return { hours: 23, minutes: 59, seconds: 59 };
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!isVisible) return null;

    const pad = (n: number) => n.toString().padStart(2, '0');

    return (
        <div className="relative bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white text-center py-2.5 px-4 text-sm font-medium">
            <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="text-xl">🎉</span>
                <span>
                    {locale === 'zh' ? '首发特惠：Pro 套餐最高' : 'Launch Special: Get up to'}
                </span>
                <span className="font-bold underline decoration-2">
                    {locale === 'zh' ? '7折' : '70% OFF'}
                </span>
                <span>
                    {locale === 'zh' ? '！优惠倒计时：' : '! Ends in:'}
                </span>
                <span className="font-mono font-bold bg-white/20 px-2 py-0.5 rounded">
                    {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
                </span>
                <Link
                    href={`${localePrefix}/pricing`}
                    className="underline hover:no-underline ml-1 font-bold"
                >
                    {locale === 'zh' ? '立即查看 →' : 'Claim Now →'}
                </Link>
            </div>

            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Close"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

export default PromotionBanner;
