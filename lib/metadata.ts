import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/data/contact";
import { defaultLocale, getDictionary, href, type Dictionary, type Lang } from "@/i18n";
import { ogSize } from "./ogImage";

export const SITE_URL = "https://www.takere.com.br";
export const SITE_NAME = "Takere";

export type PageKey = keyof Dictionary["seo"]["pages"];

/** Every page of the site: dictionary key -> base (unprefixed) path. */
export const ROUTES: Record<PageKey, string> = {
  home: "/",
  research: "/research",
  team: "/team",
  publications: "/publications",
  gallery: "/gallery",
  contact: "/contact",
  policy: "/policy",
};

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  icons: { icon: "/img/brand/icon.png", apple: "/img/brand/icon.png" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  formatDetection: { email: false, address: false, telephone: false },
};

/** hreflang alternates for a base (unprefixed) path. */
export function languageAlternates(base: string) {
  return { "pt-BR": href("pt", base), en: href("en", base), "x-default": href(defaultLocale, base) };
}

export function pageMetadata(lang: Lang, page: PageKey): Metadata {
  const { seo } = getDictionary(lang);
  const { title, description } = seo.pages[page];
  const base = ROUTES[page];
  const path = href(lang, base);
  const image = { url: `/og/${lang}`, ...ogSize, alt: seo.ogAlt, type: "image/png" };
  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: { canonical: path, languages: languageAlternates(base) },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      locale: lang === "pt" ? "pt_BR" : "en_US",
      alternateLocale: lang === "pt" ? "en_US" : "pt_BR",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

/** Schema.org description of the research group, rendered as JSON-LD on every page. */
export function organizationJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ResearchOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: "Takere Research Lab",
        url: SITE_URL,
        logo: `${SITE_URL}/img/brand/icon.png`,
        email: CONTACT_EMAIL,
        description: getDictionary(lang).seo.organization,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Av. Bento Gonçalves, 9500",
          addressLocality: "Porto Alegre",
          addressRegion: "RS",
          postalCode: "91509-900",
          addressCountry: "BR",
        },
        parentOrganization: {
          "@type": "CollegeOrUniversity",
          name: "Universidade Federal do Rio Grande do Sul",
          url: "https://www.ufrgs.br",
        },
        knowsAbout: ["mHealth", "Digital health", "Care plans", "Treatment adherence", "HL7 FHIR", "LGPD"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: ["pt-BR", "en"],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
}
