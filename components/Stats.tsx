import Link from "next/link";
import { stats } from "@/data/stats";
import { getDictionary, href, type Lang } from "@/i18n";
import styles from "./Stats.module.css";

export default function Stats({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).common.stats;
  const items = [
    { value: stats.students, label: t.students, path: "/team" },
    { value: stats.supervisions, label: t.supervisions, path: "/team" },
    { value: stats.publications, label: t.publications, path: "/publications" },
  ];

  return (
    <div className={styles.stats}>
      {items.map((item) => (
        <Link key={item.label} href={href(lang, item.path)} className={styles.card} data-reveal="up">
          <span className={styles.value}>{item.value}</span>
          <span className={styles.label}>{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
