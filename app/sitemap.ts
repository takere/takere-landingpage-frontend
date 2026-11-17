import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";
import { allPublications } from "@/data/publications";
import { defaultLocale, href, locales } from "@/i18n";
import { type PageKey, ROUTES, SITE_URL, languageAlternates, publicationPath } from "@/lib/metadata";

export const dynamic = "force-static";

const absolute = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

/**
 * Source files holding each page's content, for <lastmod>. Shared files (dictionaries, layout) are left
 * out on purpose: nearly every commit touches them, which would give every page the same date.
 */
const SOURCES: Record<PageKey, string[]> = {
  home: ["app/[lang]/page.tsx", "data/home.ts", "data/team.ts", "data/stats.ts", "data/partners.ts"],
  research: ["app/[lang]/research/page.tsx", "data/research.ts", "data/stats.ts", "data/partners.ts"],
  team: ["app/[lang]/team/page.tsx", "data/team.ts"],
  publications: ["app/[lang]/publications/page.tsx", "data/publications.pt.json", "data/publications.en.json"],
  gallery: ["app/[lang]/gallery/page.tsx", "data/gallery.ts", "components/Gallery.tsx"],
  contact: ["app/[lang]/contact/page.tsx", "data/contact.ts"],
  policy: ["app/[lang]/policy/page.tsx"],
};
const PUBLICATION_SOURCES = ["app/[lang]/publications/[slug]/page.tsx", "data/publications.pt.json", "data/publications.en.json"];

/** Date of the last commit touching any of the paths (needs the full git history; undefined without git). */
function lastModified(paths: string[]): string | undefined {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], { encoding: "utf8" }).trim();
    return out || undefined;
  } catch {
    return undefined;
  }
}

/** One entry per language for a base (unprefixed) path, each listing all its language versions. */
function entries(base: string, priority: number, lastModified?: string): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates(base)).map(([lang, path]) => [lang, absolute(path)]),
  );
  return locales.map((lang) => ({
    url: absolute(href(lang, base)),
    ...(lastModified && { lastModified }),
    changeFrequency: "monthly" as const,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = (Object.entries(ROUTES) as [PageKey, string][]).flatMap(([key, base]) =>
    entries(base, base === "/" ? 1 : key === "policy" ? 0.3 : 0.7, lastModified(SOURCES[key])),
  );
  const publicationsModified = lastModified(PUBLICATION_SOURCES);
  const publications = allPublications(defaultLocale).flatMap((p) => entries(publicationPath(p), 0.5, publicationsModified));
  return [...pages, ...publications];
}
