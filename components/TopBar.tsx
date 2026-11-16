"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { basePath, href, switchLang, type Lang } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { BrazilFlag, UKFlag } from "./Flags";
import styles from "./TopBar.module.css";

const researchPaths = ["/research", "/team", "/publications", "/gallery", "/contact"];
const subItems = [
  { key: "team", path: "/team" },
  { key: "publications", path: "/publications" },
  { key: "gallery", path: "/gallery" },
  { key: "contact", path: "/contact" },
] as const;

export default function TopBar({ lang, t }: { lang: Lang; t: Dictionary["common"] }) {
  const pathname = usePathname();
  const base = basePath(pathname);
  const inResearch = researchPaths.includes(base);
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);

  // Close the menu after navigating.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const langSwitch = (
    <div className={styles.lang} role="group" aria-label="Idioma / Language">
      <a
        href={switchLang(pathname, "pt")}
        className={lang === "pt" ? styles.active : undefined}
        aria-current={lang === "pt" ? "true" : undefined}
        lang="pt-BR"
      >
        <BrazilFlag /> PT
      </a>
      <a
        href={switchLang(pathname, "en")}
        className={lang === "en" ? styles.active : undefined}
        aria-current={lang === "en" ? "true" : undefined}
        lang="en"
      >
        <UKFlag /> EN
      </a>
    </div>
  );

  const itemClass = (active: boolean) => (active ? `${styles.item} ${styles.itemActive}` : styles.item);

  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <nav aria-label="Site" className={styles.nav}>
          <Link href={href(lang, "/")}>{t.nav.home}</Link>
          <Link href={href(lang, "/research")}>{t.nav.research}</Link>
        </nav>
        <div className={styles.desktopLang}>{langSwitch}</div>
        <button
          type="button"
          className={styles.burger}
          aria-label={t.openMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className={styles.menu} role="dialog" aria-modal="true" aria-label="Menu">
          <div className={styles.menuTop}>
            {langSwitch}
            <button
              type="button"
              className={styles.close}
              aria-label={t.closeMenu}
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>
          <Image src="/img/brand/menu-logo.jpg" alt="Takere" width={203} height={51} className={styles.menuLogo} />
          <nav aria-label="Menu" className={styles.menuNav}>
            <Link href={href(lang, "/")} className={itemClass(base === "/")}>
              {t.nav.home}
            </Link>
            <div className={styles.group}>
              <button
                type="button"
                className={styles.chevron}
                aria-label={t.nav.research}
                aria-expanded={subOpen}
                onClick={() => setSubOpen((v) => !v)}
              >
                <svg viewBox="0 0 12 8" width="12" height="8" aria-hidden="true" data-open={subOpen}>
                  <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </button>
              <Link href={href(lang, "/research")} className={itemClass(inResearch)}>
                {t.nav.research}
              </Link>
            </div>
            {subOpen &&
              subItems.map(({ key, path }) => (
                <Link key={key} href={href(lang, path)} className={itemClass(base === path)}>
                  {t.researchNav[key]}
                </Link>
              ))}
            <Link href={href(lang, "/policy")} className={itemClass(base === "/policy")}>
              {t.footer.policy}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
