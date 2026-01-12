import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { siteConfig } from '@/config/site';

// 从 siteConfig 读取语言配置
export const locales = siteConfig.i18n.locales;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale: siteConfig.i18n.defaultLocale,
  // Always use locale prefix for Cloudflare Pages compatibility
  localePrefix: 'always'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

