import type { Lang } from "./config";
import en from "./dictionaries/en";
import pt, { type Dictionary } from "./dictionaries/pt";

export * from "./config";
export type { Dictionary };

const dictionaries: Record<Lang, Dictionary> = { pt, en };

/** All UI strings for a language. Page content lists (team, publications, gallery…) live in `data/`. */
export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
