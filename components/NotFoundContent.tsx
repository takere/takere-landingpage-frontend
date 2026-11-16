"use client";

import { buttonVariants } from "@heroui/styles";
import { useEffect, useState } from "react";
import { defaultLocale, href, isLang, type Lang, type Localized } from "@/i18n/config";
import { cn } from "@/lib/cn";

type Texts = Localized<{ title: string; text: string; home: string }>;

/**
 * Body of the site-wide 404. The static host serves a single 404.html for every
 * missing URL, so the language is picked in the browser from the requested path.
 */
export default function NotFoundContent({ texts }: { texts: Texts }) {
  const [lang, setLang] = useState<Lang>(defaultLocale);

  useEffect(() => {
    const [, first] = window.location.pathname.split("/");
    if (isLang(first) && first !== defaultLocale) {
      setLang(first);
      document.documentElement.lang = first;
      document.title = `${texts[first].title} | Takere`;
    }
  }, [texts]);

  const t = texts[lang];
  return (
    <main id="main" className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center mobile:py-12">
      <p className="font-display text-7xl font-bold text-green mobile:text-u-56">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-ink mobile:text-u-24">{t.title}</h1>
      <p className="mt-3 max-w-110 text-base text-muted mobile:text-u-15">{t.text}</p>
      <a href={href(lang, "/")} className={cn(buttonVariants({ size: "lg" }), "mt-8 font-display font-bold")}>
        {t.home}
      </a>
    </main>
  );
}
