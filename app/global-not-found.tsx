import type { Metadata } from "next";
import Footer from "@/components/Footer";
import NotFoundContent from "@/components/NotFoundContent";
import RootShell from "@/components/RootShell";
import { defaultLocale, getDictionary } from "@/i18n";
import { siteMetadata } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteMetadata.metadataBase,
  title: `${getDictionary(defaultLocale).notFound.title} | Takere`,
  // No `robots` here: Next.js already adds <meta name="robots" content="noindex"> to not-found pages.
};

/**
 * Site-wide 404 ([lang] is the root layout, so unmatched URLs need their own full document).
 * Exported as a single static 404.html: the shell is in the default language and
 * NotFoundContent switches the message to English on /en/... URLs.
 */
export default function GlobalNotFound() {
  return (
    <RootShell lang={defaultLocale}>
      <NotFoundContent texts={{ pt: getDictionary("pt").notFound, en: getDictionary("en").notFound }} />
      <Footer lang={defaultLocale} />
    </RootShell>
  );
}
