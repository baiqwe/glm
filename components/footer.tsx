"use client";

import { Logo } from "./logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

export function Footer() {
  const pathname = usePathname();
  const t = useTranslations('footer');

  const pathParts = pathname?.split('/') || [];
  const currentLocale = (pathParts[1] === 'en' || pathParts[1] === 'zh') ? pathParts[1] : 'en';
  const localePrefix = `/${currentLocale}`;

  const productLinks = [
    { label: "AI Image Generator", labelZh: "AI 图像生成", href: localePrefix },
    { label: "Pricing", labelZh: "价格", href: `${localePrefix}/pricing` },
  ];

  const legalLinks = [
    { label: t('link_privacy'), href: `${localePrefix}/privacy` },
    { label: t('link_terms'), href: `${localePrefix}/terms` },
    { label: t('link_about'), href: `${localePrefix}/about` },
  ];

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-slate-400 max-w-sm">
              {t('tagline')}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Powered by CogView-4 • GLM-Image
            </p>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-slate-200">
              {currentLocale === 'zh' ? '产品' : 'Product'}
            </h3>
            <nav className="flex flex-col gap-2">
              {productLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-400 transition-colors hover:text-indigo-400"
                >
                  {currentLocale === 'zh' ? link.labelZh : link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-slate-200">{t('legal')}</h3>
            <nav className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-400 transition-colors hover:text-indigo-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
          <p className="text-center text-sm text-slate-500 md:text-left">
            © {new Date().getFullYear()} {siteConfig.domain}. {t('rights')}
          </p>
          <p className="text-center text-sm text-slate-500 md:text-right">
            Built by <span className="text-slate-400">{siteConfig.author}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
