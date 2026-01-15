import { PricingSection } from "@/components/marketing/pricing-section";
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
    title: `Pricing - ${siteConfig.name}`,
    description: "Flexible pricing plans for GLM-Image AI image generation. Get credits for text-to-image generation powered by CogView-4."
};

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
