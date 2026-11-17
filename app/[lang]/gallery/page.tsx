import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Gallery, { type Photo, type PhotoRow } from "@/components/Gallery";
import ResearchLayout from "@/components/ResearchLayout";
import SectionTitle from "@/components/SectionTitle";
import { galleryPhotos } from "@/data/gallery";
import { getDictionary, type Lang } from "@/i18n";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

/** Sum of width/height a full desktop row aims for (the timeline column is ~790px wide). */
const ROW_RATIO = 2.7;

/**
 * Splits photos (in order) into justified rows whose aspect-ratio sums stay as close to ROW_RATIO as
 * possible (dynamic programming, at most 4 per row). A short last row gets a `fill` spacer so it keeps
 * the height of a full row instead of being blown up to the full width.
 */
function justify(photos: Photo[]): PhotoRow[] {
  const ratios = photos.map((p) => p.width / p.height);
  const n = ratios.length;
  const best = Array<number>(n + 1).fill(Infinity);
  const cut = Array<number>(n + 1).fill(0);
  best[0] = 0;
  for (let end = 1; end <= n; end++) {
    let sum = 0;
    for (let start = end - 1; start >= Math.max(0, end - 4); start--) {
      sum += ratios[start];
      const cost = best[start] + (sum - ROW_RATIO) ** 2;
      if (cost < best[end]) {
        best[end] = cost;
        cut[end] = start;
      }
    }
  }
  const rows: PhotoRow[] = [];
  for (let end = n; end > 0; end = cut[end]) rows.unshift({ photos: photos.slice(cut[end], end), fill: 0 });
  const last = rows.at(-1);
  if (last) {
    const sum = last.photos.reduce((t, p) => t + p.width / p.height, 0);
    last.fill = Math.max(0, ROW_RATIO - sum);
  }
  return rows;
}

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
  const dayFormat = new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  const photos: Photo[] = galleryPhotos.map((photo) => ({
    ...photo,
    alt: photo.alt[lang],
    dateLabel: dateFormat.format(new Date(`${photo.date}T00:00:00Z`)),
  }));
  const years = [...new Set(photos.map((p) => p.date.slice(0, 4)))];
  const sections = years.map((year) => {
    const inYear = photos.filter((p) => p.date.startsWith(year));
    const dates = [...new Set(inYear.map((p) => p.date))];
    const events = dates.map((date) => ({
      date,
      label: dayFormat.format(new Date(`${date}T00:00:00Z`)),
      rows: justify(inYear.filter((p) => p.date === date)),
    }));
    return { year, count: inYear.length, events };
  });

  return (
    <>
      <ResearchLayout lang={lang}>
        <main id="main" className="container-site pt-10 pb-20 mobile:pt-5 mobile:pb-10">
          <SectionTitle edge="left" as="h1" className="text-[40px] uppercase">
            {t.title}
          </SectionTitle>
          <p className="mt-6 max-w-170 text-base leading-relaxed text-muted mobile:mt-4 mobile:text-u-15">{t.intro}</p>
          <Gallery sections={sections} count={t.count} labels={{ photo: t.photo, ...t.labels }} />
        </main>
      </ResearchLayout>
      <Footer lang={lang} />
      <JsonLd data={breadcrumbJsonLd(lang, "gallery")} />
    </>
  );
}
