"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export function Logo() {
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'en';
  const localePrefix = `/${currentLocale}`;

  return (
    <Link
      href={localePrefix}
      className="flex items-center gap-2 hover:opacity-90 transition-opacity"
    >
      <Image
        src="/favicon.svg"
        alt={siteConfig.name}
        width={32}
        height={32}
        className="w-8 h-8"
      />
      <span className="font-bold text-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
        {siteConfig.name}
      </span>
    </Link>
  );
}

