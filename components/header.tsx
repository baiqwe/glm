"use client";

import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { MobileNav } from "./mobile-nav";
import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";

interface HeaderProps {
  user: any;
}

interface NavItem {
  label: string;
  href: string;
}

import { useUser } from "@/hooks/use-user";

export default function Header({ user: initialUser }: HeaderProps) {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const { user: clientUser, loading } = useUser();

  // Use server-side user initially (for hydration/SSR), then switch to client-side user
  const user = loading ? initialUser : clientUser;

  const pathParts = pathname?.split('/') || [];
  const currentLocale = (pathParts[1] === 'en' || pathParts[1] === 'zh') ? pathParts[1] : 'en';
  const localePrefix = `/${currentLocale}`;

  const getPathWithoutLocale = () => {
    if (!pathname) return '/';
    const withoutLocale = pathname.replace(/^\/(en|zh)/, '');
    return withoutLocale || '/';
  };

  const pathWithoutLocale = getPathWithoutLocale();

  const mainNavItems: NavItem[] = [
    { label: t('home'), href: localePrefix },
    { label: t('pricing'), href: `${localePrefix}/pricing` },
    { label: currentLocale === 'zh' ? '博客' : 'Blog', href: `${localePrefix}/blog` },
    { label: t('about'), href: `${localePrefix}/about` },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Logo />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="hidden md:flex items-center gap-1 bg-slate-800/50 rounded-lg p-1">
            <Link
              href={`/en${pathWithoutLocale}`}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${currentLocale === 'en'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              EN
            </Link>
            <Link
              href={`/zh${pathWithoutLocale}`}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${currentLocale === 'zh'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              中文
            </Link>
          </div>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Button asChild size="sm" variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                <Link href={`${localePrefix}/dashboard`}>
                  {currentLocale === 'zh' ? '控制台' : 'Dashboard'}
                </Link>
              </Button>
              <form action={signOutAction}>
                <Button type="submit" variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                  {t('sign_out')}
                </Button>
              </form>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button asChild size="sm" variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                <Link href={`${localePrefix}/sign-in`}>{t('sign_in')}</Link>
              </Button>
              <Button asChild size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0">
                <Link href={`${localePrefix}/sign-up`} className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t('sign_up')}
                </Link>
              </Button>
            </div>
          )}

          <MobileNav items={mainNavItems} user={user} isDashboard={false} currentLocale={currentLocale} />
        </div>
      </div>
    </header>
  );
}
