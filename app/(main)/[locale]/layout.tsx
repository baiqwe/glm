import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { SoftwareApplicationSchema } from "@/components/json-ld-schema";
import { Geist } from "next/font/google";
import "../../globals.css";

// ✅ 必须添加这一行，让前端页面兼容 Cloudflare Edge
export const runtime = 'edge';

const geistSans = Geist({
    display: "swap",
    subsets: ["latin"],
});

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    const messages = await getMessages({ locale }) as any;

    return {
        title: messages.metadata.title,
        description: messages.metadata.description,
        keywords: messages.metadata.keywords,
        openGraph: {
            title: messages.metadata.title,
            description: messages.metadata.description,
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: messages.metadata.title,
            description: messages.metadata.description,
        },
        alternates: {
            canonical: `/${locale}`,
            languages: {
                'en': '/en',
                'zh': '/zh',
            },
        },
    };
}

export default async function LocaleLayout(props: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const params = await props.params;
    const { locale } = params;
    const { children } = props;

    // Validate locale
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages({ locale });

    // MVP: 暂时不使用 Supabase，用户设为 null
    const user = null;

    return (
        <html lang={locale} className={geistSans.className} suppressHydrationWarning>
            <body className="bg-background text-foreground antialiased">
                <SoftwareApplicationSchema />
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="relative min-h-screen">
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
