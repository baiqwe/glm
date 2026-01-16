import { PricingSection } from "@/components/marketing/pricing-section";
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

// 静态页面 - 启用 CDN 缓存
export const dynamic = 'force-static';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    const isZh = locale === 'zh';

    return {
        title: isZh ? `定价 - ${siteConfig.name}` : `Pricing - ${siteConfig.name}`,
        description: isZh
            ? "灵活的定价方案，使用 CogView-4 进行 AI 图像生成。新用户免费获得积分。"
            : "Flexible pricing plans for GLM-Image AI image generation. Get credits for text-to-image generation powered by CogView-4.",
        alternates: {
            canonical: `${siteConfig.url}/${locale}/pricing`,
            languages: {
                'en': `${siteConfig.url}/en/pricing`,
                'zh': `${siteConfig.url}/zh/pricing`,
                'x-default': `${siteConfig.url}/en/pricing`,
            },
        },
    };
}

type Props = {
    params: Promise<{ locale: string }>;
}

export default async function PricingPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return (
        <div className="bg-slate-950 min-h-screen">
            <PricingSection locale={locale} />
        </div>
    );
}
