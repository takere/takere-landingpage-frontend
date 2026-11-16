"use client";

import { Button } from "@heroui/react";
import { useEffect, useState } from "react";

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
    <Button
      isIconOnly
      variant="secondary"
      aria-label={label}
      aria-hidden={!visible || undefined}
      excludeFromTabOrder={!visible}
      onPress={() => window.scrollTo({ top: 0 })}
      className={[
        "fixed right-4 bottom-6 z-40 size-11 rounded-full shadow-lg transition-opacity duration-300 desktop:hidden",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      ].join(" ")}
    >
      <svg viewBox="0 0 20 12" className="w-4.5" aria-hidden="true">
        <path d="M2 10 10 2l8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </Button>
  );
}
