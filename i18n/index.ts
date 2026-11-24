import type { Lang } from "./config";
import enCommon from "./en/common.json";
import enContact from "./en/contact.json";
import enGallery from "./en/gallery.json";
import enHome from "./en/home.json";
import enNotFound from "./en/notFound.json";
import enPolicy from "./en/policy.json";
import enPublications from "./en/publications.json";
import enResearch from "./en/research.json";
import enSeo from "./en/seo.json";
import enTeam from "./en/team.json";
import ptCommon from "./pt/common.json";
import ptContact from "./pt/contact.json";
import ptGallery from "./pt/gallery.json";
import ptHome from "./pt/home.json";
import ptNotFound from "./pt/notFound.json";
import ptPolicy from "./pt/policy.json";
import ptPublications from "./pt/publications.json";
import ptResearch from "./pt/research.json";
import ptSeo from "./pt/seo.json";
import ptTeam from "./pt/team.json";

export * from "./config";
export * from "./rich";

/**
 * Interface texts live in i18n/<lang>/<namespace>.json, one file per namespace (same layout
 * as takere-backend). Page content lists (team, publications, gallery…) live in `data/`.
 */
const pt = {
  common: ptCommon,
  seo: ptSeo,
  home: ptHome,
  research: ptResearch,
  team: ptTeam,
  publications: ptPublications,
  gallery: ptGallery,
  notFound: ptNotFound,
  contact: ptContact,
  policy: ptPolicy,
};

/** Shape every language must match (Portuguese is the reference). */
export type Dictionary = typeof pt;

const en: Dictionary = {
  common: enCommon,
  seo: enSeo,
  home: enHome,
  research: enResearch,
  team: enTeam,
  publications: enPublications,
  gallery: enGallery,
  notFound: enNotFound,
  contact: enContact,
  policy: enPolicy,
};

const dictionaries: Record<Lang, Dictionary> = { pt, en };

/** All UI strings for a language. */
export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}
