import Image from "next/image";
import Footer from "@/components/Footer";
import ResearchLayout from "@/components/ResearchLayout";
import SectionTitle from "@/components/SectionTitle";
import { coordinators, formerMembers, members, type Member } from "@/data/team";
import { getDictionary, type Lang } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/team">) {
  return pageMetadata((await params).lang as Lang, "team");
}

export default async function Page({ params }: PageProps<"/[lang]/team">) {
  const lang = (await params).lang as Lang;
  const t = getDictionary(lang).team;

  return (
    <>
      <ResearchLayout lang={lang}>
        <main id="main">
          <section className={styles.section}>
            <SectionTitle edge="left" as="h1">
              {t.coordinators}
            </SectionTitle>
            <div className={styles.coordinators}>
              {coordinators.map((c) => (
                <article key={c.linkedin} className={styles.coordinator} data-reveal="up">
                  <Image src={c.photo} alt={c.name[lang]} width={178} height={208} className={styles.blob} />
                  <h2>{c.name[lang]}</h2>
                  <p>
                    {c.degree[lang]}
                    <br />
                    {c.institution}
                  </p>
                  <div className={styles.links}>
                    <ProfileLink url={c.lattes} icon="lattes" label="Lattes" />
                    <ProfileLink url={c.orcid} icon="orcid" label="ORCID" />
                    <ProfileLink url={c.linkedin} icon="linkedin" label="LinkedIn" />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.rightTitle}>
              <SectionTitle edge="right">{t.members}</SectionTitle>
            </div>
            <MemberGrid people={members(lang)} />
          </section>

          <section className={styles.section}>
            <SectionTitle edge="left" className={styles.formerTitle}>
              {t.former}
            </SectionTitle>
            <MemberGrid people={formerMembers(lang)} />
          </section>
        </main>
      </ResearchLayout>
      <Footer lang={lang} />
    </>
  );
}

function ProfileLink({ url, icon, label }: { url: string; icon: string; label: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <Image src={`/img/icons/${icon}.png`} alt="" width={36} height={36} />
    </a>
  );
}

function MemberGrid({ people }: { people: Member[] }) {
  return (
    <ul className={styles.members}>
      {people.map((m) => (
        <li key={m.name} data-reveal="up">
          <Image src={m.photo} alt={m.name} width={122} height={142} className={styles.blob} />
          <h3>{m.name}</h3>
          {m.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </li>
      ))}
    </ul>
  );
}
