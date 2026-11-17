import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Gallery from "@/components/Gallery";
import ResearchLayout from "@/components/ResearchLayout";
import SectionTitle from "@/components/SectionTitle";
import { galleryRows } from "@/data/gallery";
import { getDictionary, type Lang } from "@/i18n";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery">) {
  return pageMetadata((await params).lang as Lang, "gallery");
}

export default async function Page({ params }: PageProps<"/[lang]/gallery">) {
  const lang = (await params).lang as Lang;
  const t = getDictionary(lang).gallery;
  const dateFormat = new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", {
    dateStyle: lang === "pt" ? "short" : "medium",
    timeZone: "UTC",
  });
  const rows = galleryRows.map((row) =>
    row.map((photo) => ({
      ...photo,
      alt: photo.alt[lang],
      dateLabel: dateFormat.format(new Date(`${photo.date}T00:00:00Z`)),
    })),
  );

  return (
    <>
      <ResearchLayout lang={lang}>
        <main id="main" className="container-site pt-10 pb-20 mobile:pt-5 mobile:pb-10">
          <SectionTitle edge="left" as="h1" className="text-[40px] uppercase">
            {t.title}
          </SectionTitle>
          <p className="mt-6 max-w-170 text-base leading-relaxed text-muted mobile:mt-4 mobile:text-u-15">{t.intro}</p>
          <Gallery rows={rows} labels={{ photo: t.photo, ...t.labels }} />
        </main>
      </ResearchLayout>
      <Footer lang={lang} />
      <JsonLd data={breadcrumbJsonLd(lang, "gallery")} />
    </>
  );
}
