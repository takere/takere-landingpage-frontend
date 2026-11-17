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
}

export interface PublicationYear {
  year: string;
  items: Publication[];
}

const data: Record<Lang, Publication[]> = { pt: pt as Publication[], en: en as Publication[] };

/** Publications grouped by year, newest first (order within a year follows the JSON). */
export function publications(lang: Lang): PublicationYear[] {
  const groups = new Map<string, Publication[]>();
  for (const p of data[lang]) groups.set(p.year, [...(groups.get(p.year) ?? []), p]);
  return [...groups]
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, items]) => ({ year, items }));
}
