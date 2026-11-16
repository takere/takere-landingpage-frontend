import Footer from "@/components/Footer";
import ResearchLayout from "@/components/ResearchLayout";
import SectionTitle from "@/components/SectionTitle";
import { publications } from "@/data/publications";
import { getDictionary, type Lang } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/publications">) {
  return pageMetadata((await params).lang as Lang, "publications");
}

export default async function Page({ params }: PageProps<"/[lang]/publications">) {
  const lang = (await params).lang as Lang;
  return (
    <>
      <ResearchLayout lang={lang}>
        <main id="main" className={styles.page}>
          <h1 className={styles.srOnly}>{getDictionary(lang).publications.title}</h1>
          {publications(lang).map((group, i) => (
            <section key={group.year} className={styles.year}>
              <div className={i % 2 ? styles.right : undefined} data-reveal={i % 2 ? "right" : "left"}>
                <SectionTitle edge={i % 2 ? "right" : "left"} className={styles.yearTitle}>
                  {group.year}
                </SectionTitle>
              </div>
              <ul data-reveal="up">
                {group.items.map((item) => (
                  <li key={item.text}>
                    <p>{item.text}</p>
                    {item.doi && (
                      <a href={`https://doi.org/${item.doi}`} target="_blank" rel="noopener noreferrer">
                        doi: {item.doi}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </main>
      </ResearchLayout>
      <Footer lang={lang} />
    </>
  );
}
