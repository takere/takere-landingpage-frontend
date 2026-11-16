import { Montserrat, Oswald } from "next/font/google";
import type { ReactNode } from "react";
import { getDictionary, type Lang } from "@/i18n";
import { organizationJsonLd } from "@/lib/metadata";
import BackToTop from "./BackToTop";
import JsonLd from "./JsonLd";
import RevealObserver from "./RevealObserver";
import Providers from "./Providers";
import TopBar from "./TopBar";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-montserrat" });
const oswald = Oswald({ subsets: ["latin"], weight: ["200", "700"], variable: "--font-oswald" });

const hideChromeScript = `(function(){try{var q=new URLSearchParams(location.search),d=document.documentElement,off=/^(false|0|no|off)$/i;
if(off.test(q.get('menu')||''))d.setAttribute('data-hide-menu','');
if(off.test(q.get('footer')||''))d.setAttribute('data-hide-footer','');}catch(e){}})()`;

/** Shared <html>/<body> for the Portuguese and English root layouts. */
export default function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = getDictionary(lang).common;
  return (
    <html
      lang={lang === "pt" ? "pt-BR" : "en"}
      className={`light ${montserrat.variable} ${oswald.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <body className="bg-background font-sans text-foreground antialiased">
        {/* Hide reveal targets only when JS is available to animate them in. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* ?menu=false / ?footer=false hide the site chrome (e.g. when embedded). Runs before paint so
            nothing flashes; the page is a static export, so this can't be decided on the server. */}
        <script dangerouslySetInnerHTML={{ __html: hideChromeScript }} />
        <JsonLd data={organizationJsonLd(lang)} />
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          {t.skip}
        </a>
        <Providers>
          <TopBar lang={lang} t={t} />
          {children}
          <BackToTop label={t.backToTop} />
        </Providers>
        <RevealObserver />
      </body>
    </html>
  );
}
