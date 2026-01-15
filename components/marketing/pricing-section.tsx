"use client";

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Check, Loader2, Sparkles, Zap, Crown, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import {
    ALL_PLANS,
    CREDITS_PER_GENERATION,
    calculateCostPerGeneration,
    calculateDiscount,
    getLocalizedPlan,
    PricingPlan
} from "@/config/pricing";

interface PricingSectionProps {
    locale: string;
}

// 限时倒计时组件 - 永远显示紧迫感
function DiscountTimer({ locale }: { locale: string }) {
    const [time, setTime] = useState({ hours: 4, minutes: 59, seconds: 59 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else {
                    // 重置倒计时
                    return { hours: 4, minutes: 59, seconds: 59 };
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const pad = (n: number) => n.toString().padStart(2, '0');

    return (
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-amber-300 bg-amber-500/20 px-3 py-1.5 rounded-full mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>{locale === 'zh' ? '限时优惠' : 'Offer ends in'}</span>
            <span className="font-mono font-bold text-amber-200">
                {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
            </span>
        </div>
    );
}

export function PricingSection({ locale }: PricingSectionProps) {
    const t = useTranslations('Pricing');
    const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

    const handlePurchase = async (plan: PricingPlan) => {
        try {
            setLoadingPlanId(plan.id);

            const formData = new FormData();
            formData.append('priceId', plan.productId);
            formData.append('productType', plan.type === 'subscription' ? 'subscription' : 'credits');

            if (plan.credits) {
                formData.append('credits', plan.credits.toString());
            }

            const successUrl = new URL(window.location.href);
            successUrl.pathname = `/${locale}/create`;
            successUrl.searchParams.set('checkout', 'success');
            formData.append('redirectUrl', successUrl.toString());

            const response = await fetch('/api/creem/checkout', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Checkout failed');
            }

            if (data.checkout_url) {
                window.location.href = data.checkout_url;
            } else {
                toast({
                    title: locale === 'zh' ? '错误' : 'Error',
                    description: "Failed to initialize checkout.",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast({
                title: locale === 'zh' ? '错误' : 'Error',
                description: "Failed to start payment process.",
                variant: "destructive"
            });
        } finally {
            setLoadingPlanId(null);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(price);
    };

    const renderCard = (plan: PricingPlan, index: number) => {
        const localizedPlan = getLocalizedPlan(plan, locale);
        const costPerGen = calculateCostPerGeneration(plan);
        const discount = calculateDiscount(plan);
        const generations = Math.floor(plan.credits / CREDITS_PER_GENERATION);

        const icons = [
            <Zap key="zap" className="w-8 h-8 text-yellow-400" />,
            <Sparkles key="sparkles" className="w-8 h-8 text-indigo-400" />,
            <Crown key="crown" className="w-8 h-8 text-amber-400" />
        ];

        let cardClass = "bg-slate-800/50 border-slate-700 hover:border-slate-600";
        let buttonClass = "bg-slate-700 hover:bg-slate-600 text-white";

        if (plan.isPopular) {
            cardClass = "bg-gradient-to-b from-indigo-900/60 to-slate-800/60 border-indigo-500 shadow-2xl shadow-indigo-500/30 scale-105";
            buttonClass = "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg";
        }

        return (
            <div
                key={plan.id}
                className={cn(
                    "relative flex flex-col p-6 rounded-2xl border transition-all duration-300",
                    cardClass,
                    plan.isPopular && "z-10"
                )}
            >
                {/* Discount Badge */}
                {discount > 0 && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg bg-gradient-to-r from-red-500 to-orange-500 text-white whitespace-nowrap">
                        SAVE {discount}% TODAY
                    </div>
                )}

                {/* Plan Label */}
                {localizedPlan.displayLabel && !discount && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg bg-slate-700 text-white whitespace-nowrap">
                        {localizedPlan.displayLabel}
                    </div>
                )}

                <div className="text-center pt-4">
                    {/* Timer for subscription plans */}
                    {plan.type === 'subscription' && <DiscountTimer locale={locale} />}

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-slate-700/50 flex items-center justify-center mx-auto mb-4">
                        {icons[index]}
                    </div>

                    <h3 className="text-xl font-bold text-white">{localizedPlan.displayName}</h3>
                    <p className="text-sm text-slate-400 mt-1">{localizedPlan.displayDescription}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline justify-center gap-2 my-6">
                    {discount > 0 && (
                        <span className="text-lg text-slate-500 line-through decoration-red-500/70 decoration-2">
                            {formatPrice(plan.originalPrice)}
                        </span>
                    )}
                    <span className="text-4xl font-extrabold text-white">{formatPrice(plan.price)}</span>
                    {plan.interval && (
                        <span className="text-slate-400 text-sm">
                            /{plan.interval === 'month' ? (locale === 'zh' ? '月' : 'mo') : (locale === 'zh' ? '年' : 'yr')}
                        </span>
                    )}
                </div>

                {/* Credits Highlight */}
                <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-4 rounded-xl text-center mb-6 border border-indigo-500/30">
                    <span className="block text-3xl font-bold text-white">{plan.credits.toLocaleString()}</span>
                    <span className="text-sm text-slate-400">
                        {locale === 'zh' ? '积分' : 'Credits'} ({generations} {locale === 'zh' ? '张图' : 'Images'})
                    </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6 flex-1">
                    {localizedPlan.displayFeatures.map((feature: string) => (
                        <li key={feature} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-300">{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* Cost per image */}
                <div className="text-center mb-4 py-2 bg-slate-700/30 rounded-lg">
                    <span className="text-xs text-slate-400">
                        {locale === 'zh' ? '单张成本：' : 'Per image: '}
                    </span>
                    <span className={cn(
                        "font-bold text-sm",
                        plan.isPopular ? "text-emerald-400" : "text-slate-300"
                    )}>
                        ${costPerGen.toFixed(3)}
                    </span>
                </div>

                {/* CTA */}
                <Button
                    className={cn(
                        "w-full font-bold h-12 text-md transition-transform active:scale-95",
                        buttonClass
                    )}
                    onClick={() => handlePurchase(plan)}
                    disabled={!!loadingPlanId}
                >
                    {loadingPlanId === plan.id ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : plan.type === 'subscription' ? (
                        locale === 'zh' ? '立即订阅' : 'Subscribe Now'
                    ) : (
                        locale === 'zh' ? '立即购买' : 'Buy Credits'
                    )}
                </Button>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
                    <Check className="w-3 h-3" />
                    <span>Secure Payment via Creem</span>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-16">
            {/* Header */}
            <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 text-orange-300 text-sm border border-orange-500/30">
                    <Sparkles className="w-4 h-4" />
                    {locale === 'zh' ? '🎉 首发特惠' : '🎉 Launch Special'}
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    {locale === 'zh' ? '简单透明的定价' : 'Simple, Transparent Pricing'}
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    {locale === 'zh'
                        ? '选择适合你的套餐，立即开始 AI 图像创作'
                        : 'Choose the plan that fits your needs. No hidden fees.'}
                </p>
            </div>

            {/* Pricing Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {ALL_PLANS.map((plan, index) => renderCard(plan, index))}
            </div>

            {/* Bottom note */}
            <div className="text-center mt-12 space-y-2">
                <p className="text-slate-400 text-sm">
                    {locale === 'zh' ? '💰 所有套餐积分永久有效，无过期限制' : '💰 All credits never expire'}
                </p>
                <p className="text-slate-500 text-xs">
                    {locale === 'zh' ? '支持 Visa、Mastercard、PayPal' : 'Visa, Mastercard, PayPal accepted'}
                </p>
            </div>
        </div>
    );
}

export default PricingSection;
