"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styles from "./Gallery.module.css";

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface Labels {
  photo: string;
  close: string;
  prev: string;
  next: string;
}

/** Justified rows of photos (two per row) with a keyboard-navigable lightbox. */
export default function Gallery({ rows, labels }: { rows: Photo[][]; labels: Labels }) {
  const photos = rows.flat();
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  let index = 0;
  const current = open === null ? null : photos[open];

  return (
    <>
      <div className={styles.rows}>
        {rows.map((row, r) => (
          <div key={r} className={styles.row} data-reveal="up">
            {row.map((photo) => {
              const i = index++;
              return (
                <button
                  key={photo.src}
                  type="button"
                  className={styles.item}
                  style={{ flexGrow: photo.width / photo.height }}
                  onClick={() => setOpen(i)}
                  aria-label={photo.alt || `${labels.photo} ${i + 1}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 760px) 100vw, 680px"
                  />
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {current && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={current.alt} onClick={close}>
          <button type="button" className={styles.close} onClick={close} aria-label={labels.close}>
            ×
          </button>
          <button
            type="button"
            className={`${styles.nav} ${styles.prev}`}
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label={labels.prev}
          >
            ‹
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <Image src={current.src} alt={current.alt} width={current.width} height={current.height} sizes="90vw" />
            {current.alt && <figcaption>{current.alt}</figcaption>}
          </figure>
          <button
            type="button"
            className={`${styles.nav} ${styles.next}`}
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label={labels.next}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
