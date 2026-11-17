import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/data/contact";
import type { Publication } from "@/data/publications";
import { defaultLocale, getDictionary, href, type Dictionary, type Lang } from "@/i18n";

export const SITE_URL = "https://www.takere.com.br";
export const SITE_NAME = "Takere";
const ORG_ID = `${SITE_URL}/#organization`;

/** Open Graph / Twitter card image (public/img/brand/social-media.jpg), shared by both languages. */
const OG_IMAGE = { url: "/img/brand/social-media.jpg", width: 836, height: 414, type: "image/jpeg" };

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
  const image = { ...OG_IMAGE, alt: seo.ogAlt };
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
        "@id": ORG_ID,
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
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/** Pages that sit under the "Research" section in the breadcrumb trail. */
const RESEARCH_CHILDREN: PageKey[] = ["team", "publications", "gallery", "contact"];

/** Schema.org BreadcrumbList for an inner page (Home › [Research ›] Page). */
export function breadcrumbJsonLd(lang: Lang, page: Exclude<PageKey, "home">) {
  const { common, seo } = getDictionary(lang);
  const trail: { name: string; path: string }[] = [{ name: common.nav.home, path: href(lang, "/") }];
  if (page === "research" || RESEARCH_CHILDREN.includes(page)) {
    trail.push({ name: common.nav.research, path: href(lang, ROUTES.research) });
  }
  if (page !== "research") {
    const name = page === "policy" ? common.footer.policy : common.researchNav[page as keyof typeof common.researchNav];
    trail.push({ name: name ?? seo.pages[page].title, path: href(lang, ROUTES[page]) });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

interface PersonInput {
  name: string;
  photo: string;
  jobTitle?: string;
  sameAs?: string[];
}

/** Schema.org Person entries for the team, all linked to the research organization. */
export function peopleJsonLd(people: PersonInput[]) {
  return {
    "@context": "https://schema.org",
    "@graph": people.map((p) => ({
      "@type": "Person",
      name: p.name,
      image: absoluteUrl(p.photo),
      ...(p.jobTitle && { jobTitle: p.jobTitle }),
      ...(p.sameAs?.length && { sameAs: p.sameAs }),
      memberOf: { "@id": ORG_ID },
    })),
  };
}

/** Schema.org ItemList of the group's publications (ScholarlyArticle / Thesis). */
export function publicationsJsonLd(lang: Lang, items: Publication[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": p.venueType === "thesis" ? "Thesis" : "ScholarlyArticle",
        headline: p.name,
        name: p.name,
        author: p.authors.map((name) => ({ "@type": "Person", name })),
        datePublished: p.year,
        inLanguage: lang === "pt" ? "pt-BR" : "en",
        description: p.publisher,
        ...(p.links.doi && { url: p.links.doi, sameAs: p.links.doi }),
        ...(p.links.pdf && { encoding: { "@type": "MediaObject", encodingFormat: "application/pdf", contentUrl: p.links.pdf.startsWith("/") ? absoluteUrl(p.links.pdf) : p.links.pdf } }),
        sourceOrganization: { "@id": ORG_ID },
      },
    })),
  };
}
