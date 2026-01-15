"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Sparkles } from "lucide-react";

export function Logo() {
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'en';
  const localePrefix = `/${currentLocale}`;

  return (
    <Link
      href={localePrefix}
      className="flex items-center gap-2 hover:opacity-90 transition-opacity"
    >
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <span className="font-bold text-lg bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        {siteConfig.name}
      </span>
    </Link>
  );
}
