import { buttonVariants } from "@heroui/styles";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import Footer from "@/components/Footer";
import RootShell from "@/components/RootShell";
import { defaultLocale, getDictionary, href, isLang, LANG_HEADER, type Lang } from "@/i18n";
import { cn } from "@/lib/cn";
import { siteMetadata } from "@/lib/metadata";
import "./globals.css";

/** Locale of the requested URL, forwarded by middleware ("/en/..." → en, unprefixed → pt). */
async function requestLang(): Promise<Lang> {
  const value = (await headers()).get(LANG_HEADER) ?? "";
  return isLang(value) ? value : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = getDictionary(await requestLang()).notFound;
  // Next adds <meta name="robots" content="noindex"> to 404 responses itself.
  return { metadataBase: siteMetadata.metadataBase, title: `${t.title} | Takere` };
}

/** Site-wide 404: [lang] is the root layout, so unmatched URLs need their own full document. */
export default async function GlobalNotFound() {
  const lang = await requestLang();
  const t = getDictionary(lang).notFound;

  return (
    <RootShell lang={lang}>
      <main id="main" className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center mobile:py-12">
        <p className="font-display text-7xl font-bold text-green mobile:text-u-56">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-ink mobile:text-u-24">{t.title}</h1>
        <p className="mt-3 max-w-110 text-base text-muted mobile:text-u-15">{t.text}</p>
        <Link href={href(lang, "/")} className={cn(buttonVariants({ size: "lg" }), "mt-8 font-display font-bold")}>
          {t.home}
        </Link>
      </main>
      <Footer lang={lang} />
    </RootShell>
  );
}
