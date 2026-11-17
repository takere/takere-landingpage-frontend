import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/data/contact";
import { publicationSlug, type Publication } from "@/data/publications";
import { defaultLocale, getDictionary, href, type Dictionary, type Lang } from "@/i18n";

export const SITE_URL = "https://www.takere.com.br";
export const SITE_NAME = "Takere";
const ORG_ID = `${SITE_URL}/#organization`;

const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/** Open Graph / Twitter card image (public/assets/images/brand/social-media.jpg), shared by both languages. */
const OG_IMAGE = { url: "/assets/images/brand/social-media.jpg", width: 836, height: 414, type: "image/jpeg" };

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

/** Absolute URL of a publication's PDF, when it has one. */
const pdfUrl = (p: Publication) => p.links.pdf && (p.links.pdf.startsWith("/") ? absoluteUrl(p.links.pdf) : p.links.pdf);

/** Base (unprefixed) path of a publication's page. */
export const publicationPath = (p: Publication) => `${ROUTES.publications}/${publicationSlug(p)}`;

/**
 * Google Scholar (Highwire Press) tags for a publication page. Scholar indexes papers from pages that
 * carry these tags, so they go on one URL per paper: the Portuguese page, whose entry keeps each title
 * in its original language (`original`). Venue details are read from the citation text in `publisher`.
 */
function scholarTags(p: Publication): Record<string, string | string[]> {
  const tags: Record<string, string | string[]> = {
    citation_title: p.name,
    citation_author: p.authors,
    citation_publication_date: (p.date ?? p.year).replace(/-/g, "/"),
  };
  const pdf = pdfUrl(p);
  if (pdf) tags.citation_pdf_url = pdf;
  if (p.links.doi) tags.citation_doi = p.links.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, "");
  if (p.abstract) tags.citation_abstract = p.abstract;
  if (p.venueType === "journal") {
    const [journal] = p.publisher.split(/,\s*v\.\s*/);
    tags.citation_journal_title = journal.trim();
    const volume = /\bv\.\s*(\w+)/.exec(p.publisher)?.[1];
    const page = /\bp\.\s*(\w+)(?:-(\w+))?/.exec(p.publisher);
    if (volume) tags.citation_volume = volume;
    if (page) {
      tags.citation_firstpage = page[1];
      if (page[2]) tags.citation_lastpage = page[2];
    }
  } else if (p.venueType === "conference") {
    const conference = /^In:\s*(.+?),\s*\d{4}\b/.exec(p.publisher)?.[1];
    if (conference) tags.citation_conference_title = conference;
    const page = /\bp\.\s*(\w+)-(\w+)/.exec(p.publisher);
    if (page) {
      tags.citation_firstpage = page[1];
      tags.citation_lastpage = page[2];
    }
  } else {
    const institution = /-\s*(Universidade[^.]+)\./.exec(p.publisher)?.[1];
    if (institution) tags.citation_dissertation_institution = institution.trim();
  }
  return tags;
}

/** Metadata of a publication's own page (/publications/<slug>). */
export function publicationMetadata(lang: Lang, item: Publication, original: Publication): Metadata {
  const { publications } = getDictionary(lang);
  const base = publicationPath(item);
  const path = href(lang, base);
  const title = `${item.name} | Takere`;
  const description =
    item.abstract ??
    publications.detail.description
      .replace("{kind}", publications.kinds[item.venueType])
      .replace("{year}", item.year)
      .replace("{authors}", item.authors.join("; "));
  const image = { ...OG_IMAGE, alt: getDictionary(lang).seo.ogAlt };
  return {
    title,
    description,
    alternates: { canonical: path, languages: languageAlternates(base) },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title,
      description,
      url: path,
      locale: lang === "pt" ? "pt_BR" : "en_US",
      alternateLocale: lang === "pt" ? "en_US" : "pt_BR",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    ...(lang === defaultLocale && { other: scholarTags(original) }),
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
        logo: `${SITE_URL}/assets/images/brand/icon.png`,
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

/** Pages that sit under the "Research" section in the breadcrumb trail. */
const RESEARCH_CHILDREN: PageKey[] = ["team", "publications", "gallery", "contact"];

/** Schema.org BreadcrumbList for an inner page (Home › [Research ›] Page [› extra]). */
export function breadcrumbJsonLd(lang: Lang, page: Exclude<PageKey, "home">, extra?: { name: string; path: string }) {
  const { common, seo } = getDictionary(lang);
  const trail: { name: string; path: string }[] = [{ name: common.nav.home, path: href(lang, "/") }];
  if (page === "research" || RESEARCH_CHILDREN.includes(page)) {
    trail.push({ name: common.nav.research, path: href(lang, ROUTES.research) });
  }
  if (page !== "research") {
    const name = page === "policy" ? common.footer.policy : common.researchNav[page as keyof typeof common.researchNav];
    trail.push({ name: name ?? seo.pages[page].title, path: href(lang, ROUTES[page]) });
  }
  if (extra) trail.push(extra);
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

/** Schema.org ScholarlyArticle / Thesis for one publication; `url` is its page on this site. */
function scholarlyWorkJsonLd(lang: Lang, p: Publication) {
  const pdf = pdfUrl(p);
  return {
    "@type": p.venueType === "thesis" ? "Thesis" : "ScholarlyArticle",
    headline: p.name,
    name: p.name,
    url: absoluteUrl(href(lang, publicationPath(p))),
    author: p.authors.map((name) => ({ "@type": "Person", name })),
    datePublished: p.date ?? p.year,
    inLanguage: lang === "pt" ? "pt-BR" : "en",
    ...(p.abstract ? { abstract: p.abstract, description: p.abstract } : { description: p.publisher }),
    ...(p.links.doi && { sameAs: p.links.doi }),
    ...(pdf && { encoding: { "@type": "MediaObject", encodingFormat: "application/pdf", contentUrl: pdf } }),
    sourceOrganization: { "@id": ORG_ID },
  };
}

/** Schema.org ItemList of the group's publications. */
export function publicationsJsonLd(lang: Lang, items: Publication[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((p, i) => ({ "@type": "ListItem", position: i + 1, item: scholarlyWorkJsonLd(lang, p) })),
  };
}

/** Schema.org entry for a publication's own page. */
export function publicationJsonLd(lang: Lang, p: Publication) {
  return { "@context": "https://schema.org", ...scholarlyWorkJsonLd(lang, p) };
}
