import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLang } from "@/i18n/config";

/**
 * Dev server only: the production build is a static export (no middleware), where
 * scripts/flatten-default-locale.mjs moves the Portuguese pages to the site root instead.
 *
 * Routes live under app/[lang]. Portuguese (default) URLs have no prefix, so
 * "/team" is rewritten internally to "/pt/team"; "/en/..." passes through.
 * An explicit "/pt/..." is redirected to the unprefixed URL to avoid duplicates.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first] = pathname.split("/");

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (isLang(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, the OG image route and any file with an extension (images, robots.txt, sitemap.xml…).
  matcher: ["/((?!_next|og|.*\\..*).*)"],
};
