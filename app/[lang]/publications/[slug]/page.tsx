import { CardRoot } from "@heroui/react/card";
import { ChipRoot } from "@heroui/react/chip";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ResearchLayout from "@/components/ResearchLayout";
import { allPublications, findPublication, publicationSlug } from "@/data/publications";
import { getDictionary, href, locales, type Lang } from "@/i18n";
import { breadcrumbJsonLd, publicationJsonLd, publicationMetadata, publicationPath, ROUTES } from "@/lib/metadata";

/**
 * One page per publication: gives each paper its own URL, which Google Scholar needs to index it
 * (see the citation_* tags in lib/metadata.ts).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => allPublications(lang).map((p) => ({ lang, slug: publicationSlug(p) })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/publications/[slug]">) {
  const { lang, slug } = await params;
  const found = findPublication(lang as Lang, slug);
  if (!found) notFound();
  return publicationMetadata(lang as Lang, found.item, found.original);
}

const linkClass =
  "inline-flex max-w-full items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:outline-none mobile:text-u-13";
const label = "text-xs font-semibold tracking-wide text-muted uppercase mobile:text-u-12";

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
    <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default async function Page({ params }: PageProps<"/[lang]/publications/[slug]">) {
  const { lang: langParam, slug } = await params;
  const lang = langParam as Lang;
  const found = findPublication(lang, slug);
  if (!found) notFound();
  const { item } = found;
  const t = getDictionary(lang).publications;

  return (
    <>
      <ResearchLayout lang={lang}>
        <main id="main" className="container-site max-w-[900px] pt-10 pb-20 mobile:pt-5 mobile:pb-10">
          <Link
            href={href(lang, ROUTES.publications)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-green hover:text-navy mobile:text-u-14"
          >
            <span aria-hidden="true">←</span> {t.detail.back}
          </Link>

          <article className="mt-6 mobile:mt-4">
            <CardRoot className="gap-6 border border-black/5 p-8 shadow-none mobile:gap-4 mobile:p-5">
              <ChipRoot size="sm" variant="soft" color="success" className="self-start font-display font-semibold tracking-wide uppercase">
                {t.kinds[item.venueType]}
              </ChipRoot>
              <h1 className="font-display text-3xl leading-snug font-bold text-ink mobile:text-u-22">{item.name}</h1>

              <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-6 gap-y-3 mobile:grid-cols-[minmax(0,1fr)] mobile:gap-y-1">
                <dt className={label}>{t.detail.authors}</dt>
                <dd className="text-sm font-semibold text-navy/80 mobile:mb-2 mobile:text-u-13">{item.authors.join(" ; ")}</dd>
                <dt className={label}>{t.detail.year}</dt>
                <dd className="text-sm text-ink mobile:mb-2 mobile:text-u-13">{item.year}</dd>
                <dt className={label}>{t.detail.venue}</dt>
                <dd className="text-sm leading-relaxed text-muted mobile:text-u-13">{item.publisher}</dd>
              </dl>

              {item.abstract && (
                <section>
                  <h2 className="font-display text-lg font-bold text-navy mobile:text-u-16">{t.detail.abstract}</h2>
                  <p className="mt-2 text-[15px] leading-7 text-ink mobile:text-u-14">{item.abstract}</p>
                </section>
              )}

              {(item.links.pdf || item.links.doi || item.links.supplementary) && (
                <div className="flex flex-wrap gap-2">
                  {item.links.pdf && (
                    <a href={item.links.pdf} target="_blank" rel="noopener noreferrer" className={`${linkClass} bg-navy text-white hover:bg-green`}>
                      {t.links.pdf}
                      <ArrowIcon />
                    </a>
                  )}
                  {item.links.doi && (
                    <a
                      href={item.links.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkClass} border border-navy/20 text-navy hover:border-green hover:bg-green hover:text-white`}
                    >
                      <span className="opacity-70">DOI</span>
                      <span className="break-all">{item.links.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, "")}</span>
                      <ArrowIcon />
                    </a>
                  )}
                  {item.links.supplementary && (
                    <a
                      href={item.links.supplementary}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkClass} border border-navy/20 text-navy hover:border-green hover:bg-green hover:text-white`}
                    >
                      {t.links.supplementary}
                      <ArrowIcon />
                    </a>
                  )}
                </div>
              )}
            </CardRoot>
          </article>
        </main>
      </ResearchLayout>
      <Footer lang={lang} />
      <JsonLd data={breadcrumbJsonLd(lang, "publications", { name: item.name, path: href(lang, publicationPath(item)) })} />
      <JsonLd data={publicationJsonLd(lang, item)} />
    </>
  );
}
