"use client";

import { Button, Chip, Modal, Skeleton } from "@heroui/react";
import { ArrowsOutSimpleIcon, CalendarBlankIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export interface Photo {
  src: string;
  alt: string;
  /** ISO date (YYYY-MM-DD), for the <time> element. */
  date: string;
  /** Date formatted for the page's language, shown in a chip. */
  dateLabel: string;
  width: number;
  height: number;
}

/** A justified strip of photos; `fill` is an empty share (in aspect-ratio units) that keeps a short last row small. */
export interface PhotoRow {
  photos: Photo[];
  fill: number;
}

/** Photos taken on the same day: one stop on the timeline. */
interface Event {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** Short date (day and month) shown in the timeline chip; the year is in the section header. */
  label: string;
  rows: PhotoRow[];
}

interface Section {
  year: string;
  count: number;
  events: Event[];
}

interface Labels {
  photo: string;
  close: string;
  prev: string;
  next: string;
  thumbnails: string;
}

/**
 * Date pill in the Takere app's status-chip style (navy text and icon on a 12% navy tint). The tint is
 * mixed with white rather than translucent so it reads the same over any photo.
 */
const DateChip = ({
  date,
  label,
  className = "",
}: {
  date: string;
  label: string;
  className?: string;
}) => (
  <Chip
    size="sm"
    className={`justify-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--color-navy)_12%,white)] px-2.5 py-1 text-[12px] leading-[normal] font-semibold whitespace-nowrap text-navy ${className}`}
  >
    <CalendarBlankIcon size={12} weight="bold" aria-hidden="true" />
    <time dateTime={date}>{label}</time>
  </Chip>
);

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

/**
 * Photos grouped by year on a timeline (same layout as the publications page) and, within a year, by day:
 * each day is a date chip on the line followed by justified rows, with a keyboard- and swipe-navigable
 * lightbox. Captions are always shown; on devices with a mouse a zoom hint appears on hover.
 */
export default function Gallery({
  sections,
  count,
  labels,
}: {
  sections: Section[];
  count: { one: string; other: string };
  labels: Labels;
}) {
  const photos = sections.flatMap((s) =>
    s.events.flatMap((e) => e.rows.flatMap((r) => r.photos)),
  );
  const [isOpen, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  // Photos that finished loading; their Skeleton placeholder is removed.
  const [loaded, setLoaded] = useState<ReadonlySet<string>>(() => new Set());
  const markLoaded = useCallback(
    (src: string) =>
      setLoaded((prev) => (prev.has(src) ? prev : new Set(prev).add(src))),
    [],
  );
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchX = useRef<number | null>(null);

  const step = useCallback(
    (delta: number) =>
      setCurrent((i) => (i + delta + photos.length) % photos.length),
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

  // Keep the active thumbnail in view (after the modal has mounted).
  useEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(() =>
      thumbs.current[current]?.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: "smooth",
      }),
    );
    return () => cancelAnimationFrame(id);
  }, [isOpen, current]);

  let index = 0;
  const photo = photos[current];
  const navClass =
    "absolute top-1/2 size-12 -translate-y-1/2 rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/25 mobile:hidden";
  // Zoom hint: hidden until hover/focus on mouse devices.
  const reveal =
    "transition duration-300 can-hover:opacity-0 can-hover:group-hover:opacity-100 can-hover:group-focus-visible:opacity-100";

  return (
    <>
      <div className="mt-12 flex flex-col gap-16 mobile:mt-10 mobile:gap-10">
        {sections.map(({ year, count: n, events }) => (
          <section
            key={year}
            aria-labelledby={`year-${year}`}
            className="grid grid-cols-[160px_minmax(0,1fr)] gap-10 mobile:grid-cols-[minmax(0,1fr)] mobile:gap-5"
          >
            {/* Year header styled like the publications page. The timeline starts beside it with a dot, and its
                first date chip only comes once the line is past the year, so the centred chips never overlap it. */}
            <header data-reveal="left">
              <h2
                id={`year-${year}`}
                className="font-display text-6xl leading-none font-bold text-navy mobile:text-u-40"
              >
                {year}
              </h2>
              <div className="mt-3 h-1 w-12 rounded-full bg-green mobile:mt-2" />
              <p className="mt-3 text-sm font-medium tracking-wide text-muted uppercase mobile:mt-2 mobile:text-u-12">
                {n} {n === 1 ? count.one : count.other}
              </p>
            </header>

            <ol className="relative flex flex-col gap-5 border-l-2 border-green-light pt-[66px] pl-8 desktop:mt-[22px] mobile:ml-[calc(var(--u)*38)] mobile:gap-4 mobile:pt-6 mobile:pl-4">
              {/* Start of the line: a dot level with the year, like the dots on the publications page. */}
              <span
                aria-hidden="true"
                className="absolute top-0 -left-[9px] size-4 rounded-full border-[3px] border-background bg-green ring-2 ring-green-light mobile:-left-[7px] mobile:size-3"
              />
              {events.map(({ date, label, rows }) => (
                <li
                  key={date}
                  className="relative flex flex-col gap-3.5 mobile:gap-4"
                  data-reveal="up"
                >
                  {/* Centred on the line (pulled back by the list padding + half the 2px border, then by half its width). */}
                  <time
                    dateTime={date}
                    className="inline-flex -ml-[33px] -translate-x-1/2 items-center gap-1.5 self-start rounded-full border-[3px] border-background bg-green px-3 py-1 font-display text-xs font-semibold tracking-wide whitespace-nowrap text-white uppercase ring-2 ring-green-light mobile:-ml-[calc(var(--u)*16+1px)] mobile:gap-1 mobile:px-2 mobile:text-u-10 mobile:tracking-normal"
                  >
                    <CalendarBlankIcon
                      size={13}
                      weight="bold"
                      aria-hidden="true"
                      className="mobile:size-[calc(var(--u)*10)]"
                    />
                    {label}
                  </time>
                  {rows.map((row, r) => (
                    <div
                      key={r}
                      className="flex gap-3.5 mobile:flex-col mobile:gap-4"
                    >
                      {row.photos.map((p) => {
                        const i = index++;
                        return (
                          <button
                            key={p.src}
                            type="button"
                            className="group relative min-w-0 basis-0 cursor-zoom-in overflow-hidden rounded-2xl border border-black/5 bg-navy/5 transition duration-300 outline-none hover:-translate-y-0.5 hover:border-green/40 hover:shadow-[0_12px_32px_-12px_rgba(0,29,75,0.25)] focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 mobile:!flex-none"
                            style={{ flexGrow: p.width / p.height }}
                            onClick={() => {
                              setCurrent(i);
                              setOpen(true);
                            }}
                            aria-label={`${p.alt || `${labels.photo} ${i + 1}`} (${p.dateLabel})`}
                          >
                            {!loaded.has(p.src) && (
                              <Skeleton className="absolute inset-0 rounded-none" />
                            )}
                            <Image
                              src={p.src}
                              alt={p.alt}
                              width={p.width}
                              height={p.height}
                              sizes="(max-width: 760px) 100vw, 680px"
                              onLoad={() => markLoaded(p.src)}
                              className="relative size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] mobile:h-auto"
                            />
                            <span
                              aria-hidden="true"
                              className={`pointer-events-none absolute inset-0 bg-linear-to-t from-navy-dark/90 via-navy-dark/30 via-30% to-transparent to-60% transition-opacity duration-300 group-hover:opacity-90`}
                            />
                            <span
                              aria-hidden="true"
                              className={`pointer-events-none absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white/90 text-navy shadow-sm can-hover:scale-75 can-hover:group-hover:scale-100 mobile:hidden ${reveal}`}
                            >
                              <ArrowsOutSimpleIcon size={16} weight="bold" />
                            </span>
                            {p.alt && (
                              <span
                                aria-hidden="true"
                                className={`pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-3.5 text-left font-display text-sm leading-snug font-semibold text-white mobile:px-3 mobile:pb-3 mobile:text-u-13`}
                              >
                                <span className="mb-2 block h-0.5 w-8 rounded-full bg-green" />
                                <span className="line-clamp-3">{p.alt}</span>
                              </span>
                            )}
                          </button>
                        );
                      })}
                      {row.fill > 0 && (
                        <span
                          aria-hidden="true"
                          className="mobile:hidden"
                          style={{ flexGrow: row.fill }}
                        />
                      )}
                    </div>
                  ))}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <Modal isOpen={isOpen} onOpenChange={setOpen}>
        <Modal.Backdrop className="bg-navy-dark/95 backdrop-blur-md">
          <Modal.Container size="full">
            <Modal.Dialog
              aria-label={photo?.alt || `${labels.photo} ${current + 1}`}
              className="relative flex flex-col items-center bg-transparent px-18 pt-14 pb-4 shadow-none mobile:px-3"
              // The full-size dialog covers the backdrop, so close on clicks that land on its empty
              // area (or beside the photo inside the figure) instead of on the photo, caption or buttons.
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target === e.currentTarget || target.tagName === "FIGURE")
                  setOpen(false);
              }}
              onTouchStart={(e) => {
                touchX.current = e.touches[0].clientX;
              }}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              }}
            >
              <span className="absolute top-5 left-5 rounded-full bg-white/10 px-3 py-1 font-display text-sm font-semibold text-white tabular-nums backdrop-blur mobile:top-4 mobile:left-3">
                {current + 1}{" "}
                <span className="text-white/50">/ {photos.length}</span>
              </span>
              <Modal.CloseTrigger
                aria-label={labels.close}
                className="absolute top-4 right-4 z-10 bg-white/10 text-white hover:bg-white/25 mobile:right-3"
              />
              {photo && (
                <figure className="flex min-h-0 w-full flex-1 flex-col items-center justify-center">
                  <div
                    key={photo.src}
                    className="relative overflow-hidden rounded-xl shadow-2xl motion-safe:animate-fade-zoom"
                  >
                    {!loaded.has(`lightbox:${photo.src}`) && (
                      <Skeleton className="absolute inset-0 rounded-none bg-white/10" />
                    )}
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      sizes="90vw"
                      onLoad={() => markLoaded(`lightbox:${photo.src}`)}
                      className="relative block max-h-[calc(100dvh-250px)] w-auto object-contain mobile:max-h-[calc(100dvh-230px)]"
                    />
                  </div>
                  <figcaption className="mt-4 flex max-w-200 flex-col items-center gap-2 text-center font-display text-white mobile:text-u-13">
                    <DateChip date={photo.date} label={photo.dateLabel} />
                    <span className="line-clamp-3">{photo.alt}</span>
                  </figcaption>
                </figure>
              )}
              <div
                role="group"
                aria-label={labels.thumbnails}
                className="mt-4 flex w-full max-w-full shrink-0 justify-safe-center gap-2 overflow-x-auto px-1 py-1.5 [scrollbar-width:none]"
              >
                {photos.map((p, i) => (
                  <button
                    key={p.src}
                    ref={(el) => {
                      thumbs.current[i] = el;
                    }}
                    type="button"
                    aria-label={`${labels.photo} ${i + 1}`}
                    aria-current={i === current || undefined}
                    onClick={() => setCurrent(i)}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition outline-none focus-visible:ring-2 focus-visible:ring-white mobile:h-11 mobile:w-15 ${
                      i === current
                        ? "opacity-100 ring-2 ring-green"
                        : "opacity-40 hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={p.src}
                      alt=""
                      width={p.width}
                      height={p.height}
                      sizes="80px"
                      className="size-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <Button
                isIconOnly
                aria-label={labels.prev}
                onPress={() => step(-1)}
                className={`${navClass} left-3`}
              >
                <Chevron dir="left" />
              </Button>
              <Button
                isIconOnly
                aria-label={labels.next}
                onPress={() => step(1)}
                className={`${navClass} right-3`}
              >
                <Chevron dir="right" />
              </Button>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
