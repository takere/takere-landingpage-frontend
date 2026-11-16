import type { MetadataRoute } from "next";
import { href, locales } from "@/i18n";
import { ROUTES, SITE_URL, languageAlternates } from "@/lib/metadata";

export const dynamic = "force-static";

const absolute = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(ROUTES).flatMap((base) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(base)).map(([lang, path]) => [lang, absolute(path)]),
    );
    const priority = base === "/" ? 1 : base === "/policy" ? 0.3 : 0.7;
    return locales.map((lang) => ({
      url: absolute(href(lang, base)),
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
