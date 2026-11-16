"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { href, type Lang } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import styles from "./ResearchHeader.module.css";

const items = [
  { key: "home", path: "/research" },
  { key: "team", path: "/team" },
  { key: "publications", path: "/publications" },
  { key: "gallery", path: "/gallery" },
  { key: "contact", path: "/contact" },
] as const;

export default function ResearchHeader({ lang, t }: { lang: Lang; t: Dictionary["common"]["researchNav"] }) {
  const pathname = usePathname();

  return (
    <div className={styles.header}>
      <Link href={href(lang, "/research")} className={styles.logo}>
        <Image
          src="/img/brand/research-lab-logo.webp"
          alt="takere research lab"
          width={538}
          height={63}
          priority
        />
      </Link>
      <nav aria-label="Research Lab" className={styles.nav}>
        {items.map(({ key, path }) => {
          const target = href(lang, path);
          const active = pathname === target;
          return (
            <Link
              key={key}
              href={target}
              className={active ? styles.active : undefined}
              aria-current={active ? "page" : undefined}
            >
              {t[key]}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
