import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import ResearchLayout from "@/components/ResearchLayout";
import SectionTitle from "@/components/SectionTitle";
import Stats from "@/components/Stats";
import { researchAreas } from "@/data/research";
import { getDictionary, href, type Lang } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/research">) {
  return pageMetadata((await params).lang as Lang, "research");
}

export default async function Page({ params }: PageProps<"/[lang]/research">) {
  const lang = (await params).lang as Lang;
  const t = getDictionary(lang).research;

  return (
    <>
      <ResearchLayout lang={lang}>
        <main id="main">
          <section className={styles.hero}>
            <Image
              src="/img/research/hero-bg.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className={styles.heroBg}
            />
            <div className={styles.card} data-reveal="up">
              <div className={styles.cardImage}>
                <Image
                  src="/img/research/group.jpeg"
                  alt={t.groupAlt}
                  fill
                  sizes="(max-width: 760px) 100vw, 440px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.cardBody}>
                <SectionTitle edge="none" as="h1" className={styles.cardTitle}>
                  {t.groupTitle}
                </SectionTitle>
                <p>{t.groupText}</p>
                <Link href={href(lang, "/team")} className={`btn ${styles.cardCta}`}>
                  {t.groupCta}
                </Link>
              </div>
            </div>
          </section>

          <Partners lang={lang} />

          <section className={styles.lines}>
            <SectionTitle edge="left">{t.linesTitle}</SectionTitle>
            <div className={styles.intro} data-reveal="up">
              <p>{t.linesIntro}</p>
              <p>{t.linesCurrent}</p>
            </div>
            <ul className={styles.grid}>
              {researchAreas.map((area) => (
                <li key={area.key} data-reveal="up">
                  <Image src={`/img/research/${area.key}.jpg`} alt="" width={165} height={165} />
                  <span>{area.label[lang]}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.stats}>
            <Stats lang={lang} />
          </section>
        </main>
      </ResearchLayout>
      <Footer lang={lang} />
    </>
  );
}
