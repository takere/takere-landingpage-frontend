import Image from "next/image";
import type { CSSProperties } from "react";
import { partners } from "@/data/partners";
import { getDictionary, type Lang } from "@/i18n";
import styles from "./Partners.module.css";

export default function Partners({ lang }: { lang: Lang }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{getDictionary(lang).common.partners}</h2>
      <div className={styles.logos} data-reveal="up">
        {partners.map((p) => (
          <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer">
            <Image src={p.logo} alt={p.name} width={p.width} height={p.height} style={{ "--w": p.maxWidth } as CSSProperties} />
          </a>
        ))}
      </div>
    </section>
  );
}
