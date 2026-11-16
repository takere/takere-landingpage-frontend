import { isLang, locales } from "@/i18n";
import { renderOgImage } from "@/lib/ogImage";

export const dynamic = "force-static";
export const dynamicParams = false;

// Served as /og/pt.png and /og/en.png: the static export writes a file named after the segment,
// and GitHub Pages picks the Content-Type from its extension.
export function generateStaticParams() {
  return locales.map((lang) => ({ image: `${lang}.png` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const lang = (await params).image.replace(/\.png$/, "");
  if (!isLang(lang)) return new Response("Not found", { status: 404 });
  return renderOgImage(lang);
}
