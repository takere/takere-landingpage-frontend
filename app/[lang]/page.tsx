import Image from "next/image";
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import SectionTitle from "@/components/SectionTitle";
import Stats from "@/components/Stats";
import { offers } from "@/data/home";
import { coordinators } from "@/data/team";
import { getDictionary, type Lang } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  return pageMetadata((await params).lang as Lang, "home");
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Lang;
  const t = getDictionary(lang).home;

  return (
    <>
      <main id="main">
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle} data-reveal="left">
              {t.heroTitle}
            </h1>
            <p className={styles.heroLead} data-reveal="up">
              {t.heroText}
            </p>
            <a href="#contato" className={`btn ${styles.heroCta}`} data-reveal="up">
              {t.cta}
            </a>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/img/home/hero.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </section>

        <Partners lang={lang} />

        {/* Mission */}
        <section className={styles.mission}>
          <p data-reveal="up">{t.mission}</p>
        </section>

        {/* What we offer */}
        <section className={styles.offer}>
          <div className={styles.offerImage} data-reveal="left">
            <Image src="/img/home/computer.jpg" alt={t.offerImgAlt} width={420} height={377} />
          </div>
          <div className={styles.offerContent}>
            <SectionTitle edge="right">{t.offerTitle}</SectionTitle>
            <ul className={styles.offerList}>
              {offers.map((offer) => (
                <li key={offer.icon} data-reveal="right">
                  <span className={styles.offerIcon}>
                    <Image src={`/img/icons/${offer.icon}.png`} alt="" width={27} height={27} />
                  </span>
                  {offer.label[lang]}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section className={styles.how}>
          <div className={styles.howInner}>
            <SectionTitle edge="left" light>
              {t.howTitle}
            </SectionTitle>
            <ol className={styles.timeline}>
              <li className={styles.step}>
                <p className={styles.stepText} data-reveal="left">
                  {t.steps[0]}
                </p>
                <span className={styles.dot} aria-hidden="true" />
                <Monitor screen="/img/home/screen-care-plan.png" alt={t.screenAlts[0]} />
              </li>
              <li className={`${styles.step} ${styles.stepReverse}`}>
                <p className={styles.stepText} data-reveal="right">
                  {t.steps[1]}
                </p>
                <span className={styles.dot} aria-hidden="true" />
                <div className={styles.phone} data-reveal="left">
                  <Image src="/img/home/phone.png" alt="" width={204} height={428} />
                  <Image
                    src={`/img/home/app-patient-${lang}.png`}
                    alt={t.screenAlts[1]}
                    width={189}
                    height={390}
                    className={styles.phoneScreen}
                  />
                </div>
              </li>
              <li className={styles.step}>
                <p className={styles.stepText} data-reveal="left">
                  {t.steps[2]}
                </p>
                <span className={styles.dot} aria-hidden="true" />
                <Monitor screen="/img/home/screen-monitoring.png" alt={t.screenAlts[2]} />
              </li>
            </ol>
          </div>
        </section>

        {/* Research */}
        <section className={styles.research}>
          <div className={styles.researchHeading}>
            <SectionTitle edge="right">{t.researchTitle}</SectionTitle>
          </div>
          <div className={styles.researchBody}>
            <Image
              src="/img/brand/icon.png"
              alt="Takere"
              width={193}
              height={194}
              className={styles.researchLogo}
              data-reveal="left"
            />
            <p className={styles.researchText}>{t.researchText}</p>
          </div>
          <Stats lang={lang} />
          <p className={styles.researchMore}>{t.researchMore}</p>
        </section>

        {/* Team */}
        <section className={styles.team}>
          <SectionTitle edge="left">{t.teamTitle}</SectionTitle>
          <p className={styles.teamText} data-reveal="up">
            {t.teamText}
          </p>
          <div className={styles.coordinators}>
            {coordinators.map((c) => (
              <article key={c.linkedin} className={styles.coordinator} data-reveal="up">
                <div className={styles.photoWrap}>
                  <Image src={c.photo} alt={c.name[lang]} width={178} height={208} className={styles.photo} />
                  <a
                    href={c.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkedin}
                    aria-label={`LinkedIn — ${c.name[lang]}`}
                  >
                    in
                  </a>
                </div>
                <h3>{c.name[lang]}</h3>
                <p>
                  {c.degree[lang]}
                  <br />({c.institution})
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

function Monitor({ screen, alt }: { screen: string; alt: string }) {
  return (
    <div className={styles.monitor} data-reveal="right">
      <Image src="/img/home/monitor.png" alt="" width={464} height={407} />
      <Image src={screen} alt={alt} width={436} height={229} className={styles.monitorScreen} />
    </div>
  );
}
