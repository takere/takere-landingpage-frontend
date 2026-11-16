"use client";

import { Button, Modal } from "@heroui/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

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

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 10 16" className="h-5 w-3" aria-hidden="true">
    <path
      d={dir === "left" ? "M8 2 2 8l6 6" : "M2 2l6 6-6 6"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Justified rows of photos (two per row) with a keyboard-navigable lightbox. */
export default function Gallery({ rows, labels }: { rows: Photo[][]; labels: Labels }) {
  const photos = rows.flat();
  const [isOpen, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const step = useCallback(
    (delta: number) => setCurrent((i) => (i + delta + photos.length) % photos.length),
    [photos.length],
  );

  // Escape, focus trap, scroll lock and focus return come from the HeroUI Modal; arrows are ours.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, step]);

  let index = 0;
  const photo = photos[current];
  const navClass =
    "absolute top-1/2 size-12 -translate-y-1/2 rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/25 mobile:size-10";

  return (
    <>
      <div className="mt-8 flex flex-col gap-3.5 mobile:mt-10 mobile:gap-4">
        {rows.map((row, r) => (
          <div key={r} className="flex gap-3.5 mobile:flex-col mobile:gap-4" data-reveal="up">
            {row.map((p) => {
              const i = index++;
              return (
                <button
                  key={p.src}
                  type="button"
                  className="group min-w-0 basis-0 cursor-zoom-in overflow-hidden rounded-2xl shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 mobile:!flex-none"
                  style={{ flexGrow: p.width / p.height }}
                  onClick={() => {
                    setCurrent(i);
                    setOpen(true);
                  }}
                  aria-label={p.alt || `${labels.photo} ${i + 1}`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(max-width: 760px) 100vw, 680px"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] mobile:h-auto"
                  />
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} onOpenChange={setOpen}>
        <Modal.Backdrop className="bg-navy-dark/90 backdrop-blur-sm">
          <Modal.Container size="full">
            <Modal.Dialog
              aria-label={photo?.alt || `${labels.photo} ${current + 1}`}
              className="relative flex items-center justify-center bg-transparent px-18 py-12 shadow-none mobile:px-4"
            >
              <Modal.CloseTrigger
                aria-label={labels.close}
                className="absolute top-4 right-4 z-10 bg-white/10 text-white hover:bg-white/25"
              />
              {photo && (
                <figure className="flex max-h-full max-w-full flex-col items-center">
                  <Image
                    key={photo.src}
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="90vw"
                    className="max-h-[calc(100dvh-140px)] w-auto rounded-xl object-contain"
                  />
                  {photo.alt && (
                    <figcaption className="mt-3 text-center font-display text-white">{photo.alt}</figcaption>
                  )}
                </figure>
              )}
              <Button isIconOnly aria-label={labels.prev} onPress={() => step(-1)} className={`${navClass} left-3`}>
                <Chevron dir="left" />
              </Button>
              <Button isIconOnly aria-label={labels.next} onPress={() => step(1)} className={`${navClass} right-3`}>
                <Chevron dir="right" />
              </Button>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
