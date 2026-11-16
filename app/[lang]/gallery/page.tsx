import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import ResearchLayout from "@/components/ResearchLayout";
import SectionTitle from "@/components/SectionTitle";
import { galleryRows } from "@/data/gallery";
import { getDictionary, type Lang } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery">) {
  return pageMetadata((await params).lang as Lang, "gallery");
}

export default async function Page({ params }: PageProps<"/[lang]/gallery">) {
  const lang = (await params).lang as Lang;
  const t = getDictionary(lang).gallery;
  const rows = galleryRows.map((row) => row.map((photo) => ({ ...photo, alt: photo.alt[lang] })));

  return (
    <>
      <ResearchLayout lang={lang}>
        <main id="main" className={styles.page}>
          <SectionTitle edge="left" as="h1" className={styles.title}>
            {t.title}
          </SectionTitle>
          <Gallery rows={rows} labels={{ photo: t.photo, ...t.labels }} />
        </main>
      </ResearchLayout>
      <Footer lang={lang} />
    </>
  );
}
