"use client";

import { useEffect, useState } from "react";
import styles from "./BackToTop.module.css";

/** Floating "back to top" button shown on mobile after scrolling down. */
export default function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={styles.button}
      data-visible={visible}
      aria-label={label}
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0 })}
    >
      <svg viewBox="0 0 20 12" aria-hidden="true">
        <path d="M2 10 10 2l8 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  );
}
