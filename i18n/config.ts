export const locales = ["pt", "en"] as const;
export const defaultLocale = "pt";

export type Lang = (typeof locales)[number];

/** A value that varies per language, e.g. `{ pt: "Equipe", en: "Team" }`. */
export type Localized<T = string> = Record<Lang, T>;

export function isLang(value: string): value is Lang {
  return (locales as readonly string[]).includes(value);
}

/**
 * Builds a public path for a locale. The default locale (pt) has no prefix:
 * href("pt", "/team") -> "/team", href("en", "/team") -> "/en/team".
 */
export function href(lang: Lang, path: string): string {
  if (lang === defaultLocale) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

/**
 * Strips the locale prefix from a path: "/en/team" -> "/team". Also handles the internal
 * "/pt/team": the static export renders Portuguese pages under /pt, so that's what
 * usePathname() reports while prerendering.
 */
export function basePath(pathname: string): string {
  const [, first] = pathname.split("/");
  if (!isLang(first)) return pathname || "/";
  return pathname.slice(first.length + 1) || "/";
}

/** Returns the equivalent public path in another language. */
export function switchLang(pathname: string, target: Lang): string {
  return href(target, basePath(pathname));
}
