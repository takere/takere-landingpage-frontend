import Footer from "@/components/Footer";
import { getDictionary, type Lang } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/policy">) {
  return pageMetadata((await params).lang as Lang, "policy");
}

export default async function Page({ params }: PageProps<"/[lang]/policy">) {
  const lang = (await params).lang as Lang;
  const t = getDictionary(lang).policy;

  return (
    <>
      <main id="main" className={styles.page}>
        <h1>{t.title}</h1>
        <p>
          {t.operated} <u>Takere</u>.
        </p>
        <p>{t.intro}</p>
        <p>{t.care}</p>
        <ul>
          {t.topics.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>

        <h2>{t.s1}</h2>
        <p>{t.s1Text}</p>

        <h2>{t.s2}</h2>
        <p>{t.s2Text}</p>

        <h3>{t.s21}</h3>
        <p>{t.s21Text}</p>
        <ul>
          {t.data.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <p>{t.when}</p>
        <ul>
          {t.moments.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <p>{t.why}</p>
        <ul>
          {t.purposes.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>

        <h3>{t.s23}</h3>
        <p>{t.s23Text}</p>

        <h3>{t.s24}</h3>
        {t.s24Text.map((x) => (
          <p key={x}>{x}</p>
        ))}
      </main>
      <Footer lang={lang} />
    </>
  );
}
