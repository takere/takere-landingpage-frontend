import Footer from "@/components/Footer";
import ResearchLayout from "@/components/ResearchLayout";
import SectionTitle from "@/components/SectionTitle";
import { addressLines, CONTACT_EMAIL, contacts, MAP_EMBED_URL } from "@/data/contact";
import { getDictionary, type Lang } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  return pageMetadata((await params).lang as Lang, "contact");
}

export default async function Page({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Lang;
  const t = getDictionary(lang).contact;

  return (
    <>
      <ResearchLayout lang={lang}>
        <main id="main" className={styles.page}>
          <SectionTitle edge="left" as="h1">
            {t.title}
          </SectionTitle>
          <div className={styles.columns}>
            <section data-reveal="up">
              <h2>{t.info}</h2>
              <div className={styles.block}>
                <p>{t.general}</p>
                <p>
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </p>
              </div>
              {contacts.map((c) => (
                <div key={c.email} className={styles.block}>
                  <p>{c.topic[lang]}</p>
                  <p className={styles.who}>{c.who[lang]}</p>
                  <p>
                    <a href={`mailto:${c.email}`}>{c.email}</a>
                  </p>
                </div>
              ))}
            </section>
            <section data-reveal="up">
              <h2>{t.address}</h2>
              <address className={styles.address}>
                {addressLines[lang].map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <iframe
                className={styles.map}
                src={MAP_EMBED_URL}
                title={t.map}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </section>
          </div>
        </main>
      </ResearchLayout>
      <Footer lang={lang} />
    </>
  );
}
