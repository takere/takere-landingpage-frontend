import { CardRoot } from "@heroui/react/card";
import { ChipRoot } from "@heroui/react/chip";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ResearchLayout from "@/components/ResearchLayout";
import { publications } from "@/data/publications";
import { getDictionary, type Lang } from "@/i18n";
import { breadcrumbJsonLd, pageMetadata, publicationsJsonLd } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/publications">) {
  return pageMetadata((await params).lang as Lang, "publications");
}

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden="true">
    <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default async function Page({ params }: PageProps<"/[lang]/publications">) {
  const lang = (await params).lang as Lang;
  const t = getDictionary(lang).publications;
  const years = publications(lang);

  return (
    <>
      <ResearchLayout lang={lang}>
        <main id="main" className="container-site flex flex-col gap-16 pt-12 pb-20 mobile:gap-10 mobile:pt-6 mobile:pb-10">
          <h1 className="sr-only">{t.title}</h1>
          {years.map((group) => (
            <section
              key={group.year}
              aria-labelledby={`year-${group.year}`}
              className="grid grid-cols-[160px_minmax(0,1fr)] gap-10 mobile:grid-cols-[minmax(0,1fr)] mobile:gap-5"
            >
              <header
                className="self-start desktop:sticky desktop:top-[calc(var(--topbar-h)+24px)]"
                data-reveal="left"
              >
                <h2
                  id={`year-${group.year}`}
                  className="font-display text-6xl leading-none font-bold text-navy mobile:text-u-40"
                >
                  {group.year}
                </h2>
                <div className="mt-3 h-1 w-12 rounded-full bg-green mobile:mt-2" />
                <p className="mt-3 text-sm font-medium tracking-wide text-muted uppercase mobile:mt-2 mobile:text-u-12">
                  {group.items.length} {group.items.length === 1 ? t.count.one : t.count.other}
                </p>
              </header>

              <ol className="relative flex flex-col gap-5 border-l-2 border-green-light pl-8 mobile:gap-4 mobile:pl-5">
                {group.items.map((item) => (
                  <li key={item.title} className="relative" data-reveal="up">
                    <span
                      aria-hidden="true"
                      className="absolute top-7 -left-[41px] size-4 rounded-full border-[3px] border-background bg-green ring-2 ring-green-light mobile:top-5 mobile:-left-[calc(var(--u)*27)] mobile:size-3"
                    />
                    <CardRoot className="gap-3 border border-black/5 p-6 shadow-none transition duration-300 hover:-translate-y-0.5 hover:border-green/40 hover:shadow-[0_12px_32px_-12px_rgba(0,29,75,0.25)] mobile:gap-2.5 mobile:p-4">
                      <ChipRoot
                        size="sm"
                        variant="soft"
                        color="success"
                        className="self-start font-display font-semibold tracking-wide uppercase"
                      >
                        {t.kinds[item.kind]}
                      </ChipRoot>
                      <h3 className="font-display text-lg leading-snug font-bold text-ink mobile:text-u-16">
                        {item.title}
                      </h3>
                      <p className="text-[13px] font-semibold tracking-wide text-navy/80 mobile:text-u-12">
                        {item.authors}
                      </p>
                      <p className="text-sm leading-relaxed text-muted mobile:text-u-13">{item.venue}</p>
                      {item.doi && (
                        <a
                          href={`https://doi.org/${item.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex max-w-full items-center gap-1.5 self-start rounded-full bg-navy px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-green focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:outline-none mobile:text-u-12"
                        >
                          <span className="opacity-70">DOI</span>
                          <span className="break-all">{item.doi}</span>
                          <ArrowIcon />
                        </a>
                      )}
                    </CardRoot>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </main>
      </ResearchLayout>
      <Footer lang={lang} />
      <JsonLd data={breadcrumbJsonLd(lang, "publications")} />
      <JsonLd data={publicationsJsonLd(lang, years.flatMap((g) => g.items.map((p) => ({ ...p, year: g.year }))))} />
    </>
  );
}
