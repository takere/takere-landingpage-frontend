import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/data/contact";
import { getDictionary, href, type Lang } from "@/i18n";
import styles from "./Footer.module.css";

export default function Footer({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).common.footer;

  return (
    <footer id="contato" className={styles.footer}>
      <div className={styles.main}>
        <Image
          src="/img/brand/footer-logo.png"
          alt={t.logoAlt}
          width={264}
          height={89}
          className={styles.logo}
        />
        <div className={styles.contact}>
          <h3>{t.contact}</h3>
          <p>{t.email}</p>
          <p>
            <a href={`mailto:${CONTACT_EMAIL}`} className={styles.email}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>
          {t.rights} | <Link href={href(lang, "/policy")}>{t.policy}</Link>
        </p>
      </div>
    </footer>
  );
}
