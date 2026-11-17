import type { Lang } from "@/i18n/config";
import en from "./publications.en.json";
import pt from "./publications.pt.json";

export type PublicationKind = "journal" | "conference" | "thesis";

export interface PublicationLinks {
  /** Full DOI URL, e.g. "https://doi.org/10.5753/eramiars.2026.35112". */
  doi?: string;
  /** PDF URL (absolute or a path under /public). */
  pdf?: string;
  /** Supplementary material URL. */
  supplementary?: string;
}

/** Shape of each entry in data/publications.<lang>.json. */
export interface Publication {
  name: string;
  year: string;
  /** Venue/citation details shown after the title. */
  publisher: string;
  authors: string[];
  venueType: PublicationKind;
  links: PublicationLinks;
  /** Optional abstract, shown on the publication's page and used as its meta description. */
  abstract?: string;
  /** Optional full publication date (YYYY-MM-DD or YYYY-MM); `year` is used when absent. */
  date?: string;
}

export interface PublicationYear {
  year: string;
  items: Publication[];
}

const data: Record<Lang, Publication[]> = { pt: pt as Publication[], en: en as Publication[] };

/**
 * URL slug of a publication's page (/publications/<slug>): its PDF file name, or the title when
 * there's no PDF. Dots become dashes so static hosts don't read the last part as a file extension.
 */
export function publicationSlug(p: Publication): string {
  const base = p.links.pdf?.split("/").pop()?.replace(/\.pdf$/i, "") ?? p.name;
  return base
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** All publications of a language, in JSON order. Both JSON files list the same items in the same order. */
export function allPublications(lang: Lang): Publication[] {
  return data[lang];
}

/** A publication by slug, plus its Portuguese entry (which keeps each title in its original language). */
export function findPublication(lang: Lang, slug: string): { item: Publication; original: Publication } | undefined {
  const i = data[lang].findIndex((p) => publicationSlug(p) === slug);
  return i < 0 ? undefined : { item: data[lang][i], original: data.pt[i] };
}

/** Publications grouped by year, newest first (order within a year follows the JSON). */
export function publications(lang: Lang): PublicationYear[] {
  const groups = new Map<string, Publication[]>();
  for (const p of data[lang]) groups.set(p.year, [...(groups.get(p.year) ?? []), p]);
  return [...groups]
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, items]) => ({ year, items }));
}
