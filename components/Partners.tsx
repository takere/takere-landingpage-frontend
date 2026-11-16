import { LinkRoot as Link } from "@heroui/react/link";
import { TooltipContent, TooltipRoot } from "@heroui/react/tooltip";
import Image from "next/image";
import type { CSSProperties } from "react";
import { partners } from "@/data/partners";
import { getDictionary, type Lang } from "@/i18n";

export default function Partners({ lang }: { lang: Lang }) {
  return (
    <section className="container-site pt-8 pb-12 text-center mobile:pt-10 mobile:pb-12">
      <h2 className="mb-6 text-3xl leading-snug text-ink mobile:mb-5 mobile:text-u-20">
        {getDictionary(lang).common.partners}
      </h2>
      <div
        className="flex flex-wrap items-center justify-around gap-x-8 gap-y-6 mobile:flex-col mobile:gap-12"
        data-reveal="up"
      >
        {partners.map((p) => (
          <TooltipRoot key={p.name}>
            <Link
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl p-2 transition-transform duration-200 hover:scale-105 hover:no-underline"
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={p.width}
                height={p.height}
                className="h-auto mobile:w-[calc(var(--w)*var(--u))]"
                style={{ "--w": p.maxWidth } as CSSProperties}
              />
            </Link>
            <TooltipContent showArrow>{p.name}</TooltipContent>
          </TooltipRoot>
        ))}
      </div>
    </section>
  );
}
