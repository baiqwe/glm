import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Sparkles, Lock, Zap, Palette, Smartphone, Printer, Users, GraduationCap, Camera, Heart, ArrowRight } from 'lucide-react';

interface HomeStaticContentProps {
    locale: string;
}

export default async function HomeStaticContent({ locale }: HomeStaticContentProps) {
    const tHome = await getTranslations({ locale, namespace: 'home' });
    const tFeatures = await getTranslations({ locale, namespace: 'features' });

    return (
        <>
            {/* What Section */}
            <WhatSection t={tHome} />

            {/* How Section */}
            <HowSection t={tHome} />

            {/* Why Section */}
            <WhySection t={tHome} />

            {/* Features Section */}
            <FeaturesSection t={tFeatures} />

            {/* Use Cases Section */}
            <UseCasesSection t={tHome} locale={locale} />

            {/* Supported Formats Section */}
            <SupportedFormatsSection t={tHome} locale={locale} />

            {/* FAQ Section */}
            <FAQSection t={tHome} />

            {/* CTA Section */}
            <CTASection t={tHome} locale={locale} />
        </>
    );
}

function WhatSection({ t }: { t: any }) {
    return (
        <section className="py-20 bg-muted/20">
            <div className="container px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            {t('what.title')}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            {t('what.desc')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-background rounded-lg p-6 border border-border">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Palette className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                {t('what.feature_1_title')}
                            </h3>
                            <p className="text-muted-foreground">
                                {t('what.feature_1_desc')}
                            </p>
                        </div>

                        <div className="bg-background rounded-lg p-6 border border-border">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Heart className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                {t('what.feature_2_title')}
                            </h3>
                            <p className="text-muted-foreground">
                                {t('what.feature_2_desc')}
                            </p>
                        </div>

                        <div className="bg-background rounded-lg p-6 border border-border">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Sparkles className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">
                                {t('what.feature_3_title')}
                            </h3>
                            <p className="text-muted-foreground">
                                {t('what.feature_3_desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function HowSection({ t }: { t: any }) {
    const steps = [
        { number: 1, title: t('how.step_1_title'), desc: t('how.step_1_desc') },
        { number: 2, title: t('how.step_2_title'), desc: t('how.step_2_desc') },
        { number: 3, title: t('how.step_3_title'), desc: t('how.step_3_desc') },
        { number: 4, title: t('how.step_4_title'), desc: t('how.step_4_desc') },
    ];

    return (
        <section className="py-20 bg-background">
            <div className="container px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            {t('how.title')}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {t('how.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step) => (
                            <div key={step.number} className="relative">
                                <div className="text-center space-y-4">
                                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                                        {step.number}
                                    </div>
                                    <h3 className="text-lg font-bold">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                                </div>
                                {step.number < steps.length && (
                                    <div className="hidden md:flex absolute top-8 left-full w-8 -translate-y-1/2 items-center justify-center z-10">
                                        <ArrowRight className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function WhySection({ t }: { t: any }) {
    const reasons = [
        { icon: Lock, title: t('why.reason_1_title'), desc: t('why.reason_1_desc') },
        { icon: Zap, title: t('why.reason_2_title'), desc: t('why.reason_2_desc') },
        { icon: Heart, title: t('why.reason_3_title'), desc: t('why.reason_3_desc') },
        { icon: Smartphone, title: t('why.reason_4_title'), desc: t('why.reason_4_desc') },
    ];

    return (
        <section className="py-20 bg-muted/20">
            <div className="container px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            {t('why.title')}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {t('why.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {reasons.map((reason, idx) => {
                            const Icon = reason.icon;
                            return (
                                <div key={idx} className="bg-background rounded-lg p-6 border border-border hover:shadow-md transition-shadow">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                                            <p className="text-muted-foreground">{reason.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeaturesSection({ t }: { t: any }) {
    const features = [
        { icon: Lock, title: t('feature_1_title'), desc: t('feature_1_desc') },
        { icon: Zap, title: t('feature_2_title'), desc: t('feature_2_desc') },
        { icon: Palette, title: t('feature_3_title'), desc: t('feature_3_desc') },
        { icon: Sparkles, title: t('feature_4_title'), desc: t('feature_4_desc') },
        { icon: Smartphone, title: t('feature_5_title'), desc: t('feature_5_desc') },
        { icon: Printer, title: t('feature_6_title'), desc: t('feature_6_desc') },
    ];

    return (
        <section className="py-20 bg-background">
            <div className="container px-4 md:px-6">
                <div className="mx-auto max-w-6xl space-y-12 text-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            {t('title')}
                        </h2>
                        <p className="mx-auto max-w-3xl text-muted-foreground text-lg">
                            {t('subtitle')}
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={idx}
                                    className="rounded-2xl bg-muted/30 p-8 shadow-sm border border-border hover:shadow-md transition-shadow"
                                >
                                    <div className="space-y-4">
                                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                            <Icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

function UseCasesSection({ t, locale }: { t: any; locale: string }) {
    const localePrefix = `/${locale}`;

    const useCases = [
        {
            icon: Users,
            title: t('use_cases.case_1_title'),
            desc: t('use_cases.case_1_desc'),
            example: t('use_cases.case_1_example'),
            link: { text: t('use_cases.case_1_cta'), href: `${localePrefix}/photo-to-coloring-page` },
        },
        {
            icon: GraduationCap,
            title: t('use_cases.case_2_title'),
            desc: t('use_cases.case_2_desc'),
            example: t('use_cases.case_2_example'),
            link: { text: t('use_cases.case_2_cta'), href: `${localePrefix}/photo-to-coloring-page` },
        },
        {
            icon: Printer,
            title: t('use_cases.case_3_title'),
            desc: t('use_cases.case_3_desc'),
            example: t('use_cases.case_3_example'),
            link: { text: t('use_cases.case_3_cta'), href: `${localePrefix}/color-to-black-and-white` },
        },
        {
            icon: Camera,
            title: t('use_cases.case_4_title'),
            desc: t('use_cases.case_4_desc'),
            example: t('use_cases.case_4_example'),
            link: { text: t('use_cases.case_4_cta'), href: `${localePrefix}/color-to-black-and-white` },
        },
    ];

    return (
        <section className="py-20 bg-muted/20">
            <div className="container px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            {t('use_cases.title')}
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {t('use_cases.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {useCases.map((useCase, idx) => {
                            const Icon = useCase.icon;
                            return (
                                <div key={idx} className="bg-background rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
                                    <div className="flex gap-4 mb-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">{useCase.title}</h3>
                                            <p className="text-sm text-muted-foreground">{useCase.desc}</p>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground mb-4">{useCase.example}</p>
                                    <Link
                                        href={useCase.link.href}
                                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                                    >
                                        {useCase.link.text}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

function SupportedFormatsSection({ t, locale }: { t: any; locale: string }) {
    const localePrefix = `/${locale}`;

    const formats = [
        { name: 'JPG', href: `${localePrefix}/jpg-to-black-and-white`, desc: t('formats.format_1_desc') },
        { name: 'PNG', href: `${localePrefix}/png-to-black-and-white`, desc: t('formats.format_2_desc') },
        { name: 'WebP', href: `${localePrefix}/webp-to-black-and-white`, desc: t('formats.format_3_desc') },
        { name: 'HEIC', href: `${localePrefix}/heic-to-black-and-white`, desc: t('formats.format_4_desc') },
    ];

    return (
        <section className="py-20 bg-background">
            <div className="container px-4 md:px-6">
                <div className="mx-auto max-w-6xl space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            {t('formats.title')}
                        </h2>
                        <p className="mx-auto max-w-3xl text-muted-foreground text-lg">
                            {t('formats.subtitle')}
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {formats.map((format) => (
                            <Link
                                key={format.name}
                                href={format.href}
                                className="group rounded-2xl bg-muted/30 p-6 hover:bg-muted/50 transition-all hover:shadow-lg border border-border hover:border-primary/50"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                            {format.name}
                                        </h3>
                                        <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {format.desc}
                                    </p>
                                    <div className="pt-2">
                                        <span className="text-sm font-medium text-primary group-hover:underline">
                                            {t('formats.cta')}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Related Tools */}
                    <div className="pt-8 border-t">
                        <div className="text-center space-y-6">
                            <h3 className="text-2xl font-bold">
                                {t('formats.more_tools_title')}
                            </h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href={`${localePrefix}/photo-to-coloring-page`}
                                    className="px-6 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                                >
                                    {t('formats.tool_coloring')}
                                </Link>
                                <Link
                                    href={`${localePrefix}/color-to-black-and-white`}
                                    className="px-6 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                                >
                                    {t('formats.tool_grayscale')}
                                </Link>
                                <Link
                                    href={`${localePrefix}/invert-colors`}
                                    className="px-6 py-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-medium"
                                >
                                    {t('formats.tool_invert')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FAQSection({ t }: { t: any }) {
    const faqs = [
        { q: t('faq.q1'), a: t('faq.a1') },
        { q: t('faq.q2'), a: t('faq.a2') },
        { q: t('faq.q3'), a: t('faq.a3') },
        { q: t('faq.q4'), a: t('faq.a4') },
    ];

    return (
        <section className="py-20 bg-background border-t">
            <div className="container px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            {t('faq.title')}
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            {t('faq.subtitle')}
                        </p>
                    </div>

                    <div className="grid gap-6">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-muted/30 rounded-lg p-6 space-y-3">
                                <h3 className="text-xl font-bold">{faq.q}</h3>
                                <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                                    {faq.a}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function CTASection({ t, locale }: { t: any; locale: string }) {
    const localePrefix = `/${locale}`;

    return (
        <section className="py-20 bg-gradient-to-b from-muted/10 to-background">
            <div className="container px-4 md:px-6">
                <div className="mx-auto max-w-4xl text-center space-y-8">
                    <div className="space-y-6">
                        <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                            {t('cta.title')}
                        </h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
                            {t('cta.subtitle')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <Link
                                href={`${localePrefix}/color-to-black-and-white`}
                                className="px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-lg"
                            >
                                {t('cta.button_start')}
                            </Link>
                            <Link
                                href={`${localePrefix}/photo-to-coloring-page`}
                                className="px-8 py-4 rounded-full bg-muted hover:bg-muted/80 transition-colors font-medium text-lg"
                            >
                                {t('cta.button_coloring')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
