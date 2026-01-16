import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Geist } from "next/font/google";
import { SoftwareApplicationSchema } from "@/components/json-ld-schema";
import { GoogleAnalytics } from "@/components/google-analytics";
import { createClient } from "@/utils/supabase/server";
import { PromotionBanner } from "@/components/feature/promotion-banner";
import { BackgroundCollage } from "@/components/feature/background-collage";
import { siteConfig } from "@/config/site";
import "../../globals.css";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const geistSans = Geist({
    display: "swap",
    subsets: ["latin"],
});

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    const messages = await getMessages({ locale }) as any;

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || siteConfig.url),

        title: {
            default: messages.metadata.title,
            template: `%s | ${siteConfig.name}`
        },
        description: messages.metadata.description,
        keywords: messages.metadata.keywords,

        authors: [{ name: siteConfig.author }],
        creator: siteConfig.author,
        publisher: siteConfig.name,

        openGraph: {
            title: messages.metadata.title,
            description: messages.metadata.description,
            type: "website",
            locale: locale === 'zh' ? 'zh_CN' : 'en_US',
            url: `${siteConfig.url}/${locale}`,
            siteName: siteConfig.name,
            images: [
                {
                    url: `${siteConfig.url}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: `${siteConfig.name} - AI Image Generator`,
                },
            ],
        },

        twitter: {
            card: "summary_large_image",
            title: messages.metadata.title,
            description: messages.metadata.description,
            images: [`${siteConfig.url}/og-image.png`],
        },

        alternates: {
            canonical: `/${locale}`,
            languages: {
                'en': '/en',
                'zh': '/zh',
                'x-default': '/en',
            },
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },

        icons: {
            icon: [
                { url: '/favicon.ico', sizes: 'any' },
                { url: '/favicon.svg', type: 'image/svg+xml' },
                { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
            ],
            apple: [
                { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
            ],
        },

        manifest: '/site.webmanifest',
        category: 'technology',
        classification: 'AI Image Generation Tool',
    };
}

export default async function LocaleLayout(props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const params = await props.params;
    const { locale } = params;
    const { children } = props;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages({ locale });

    let user = null;
    try {
        const supabase = await createClient();
        const { data } = await supabase.auth.getUser();
        user = data?.user || null;
    } catch (error) {
        console.error('Failed to get user:', error);
    }

    return (
        <html lang={locale} className={`${geistSans.className} dark`} suppressHydrationWarning>
            <body className="bg-slate-950 text-slate-50 antialiased" suppressHydrationWarning>
                <GoogleAnalytics />
                <SoftwareApplicationSchema locale={locale} />
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        forcedTheme="dark"
                        disableTransitionOnChange
                    >
                        {/* 模糊艺术拼贴墙背景 */}
                        <BackgroundCollage />

                        <div className="relative min-h-screen flex flex-col">
                            <PromotionBanner />
                            <Header user={user} />
                            <main className="flex-1">{children}</main>
                            <Footer />
                        </div>
                        <Toaster />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
