import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLang, LANG_HEADER } from "@/i18n/config";

/**
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

  // Tells app/global-not-found.tsx which language to render (it receives no route params).
  const headers = new Headers(request.headers);
  headers.set(LANG_HEADER, isLang(first) ? first : defaultLocale);

  if (isLang(first)) return NextResponse.next({ request: { headers } });

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Skip Next internals, the OG image route and any file with an extension (images, robots.txt, sitemap.xml…).
  matcher: ["/((?!_next|og|.*\\..*).*)"],
};
