"use client";

import { Skeleton } from "@heroui/react";
import { useState } from "react";
import { cn } from "@/lib/cn";

/** Map iframe with a HeroUI Skeleton shown until the embed finishes loading. */
export default function MapEmbed({ src, title, className }: { src: string; title: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden rounded-2xl ring-1 ring-black/5", className)}>
      {/* Sits behind the (transparent until painted) iframe, so it is covered even if onLoad fired before hydration. */}
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      <iframe
        className="relative block size-full border-0"
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
