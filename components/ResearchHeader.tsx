"use client";

import { Tabs } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { basePath, href, type Lang } from "@/i18n/config";
import type { Dictionary } from "@/i18n";

const items = [
  { key: "home", path: "/research" },
  { key: "team", path: "/team" },
  { key: "publications", path: "/publications" },
  { key: "gallery", path: "/gallery" },
  { key: "contact", path: "/contact" },
] as const;

export default function ResearchHeader({ lang, t }: { lang: Lang; t: Dictionary["common"]["researchNav"] }) {
  const pathname = usePathname();
  const selected = items.find(({ path }) => basePath(pathname) === path)?.key ?? "home";

  return (
    <div className="flex flex-col items-center gap-3 border-b border-(--border) bg-background pt-5 pb-0 mobile:gap-0 mobile:border-b-0 mobile:pt-1 mobile:pb-3">
      <Link href={href(lang, "/research")} className="rounded-lg">
        <Image
          src="/img/brand/takere-research-lab.png"
          alt="Takere Research Lab"
          width={2274}
          height={267}
          sizes="(max-width: 760px) 392px, 538px"
          className="h-auto w-[min(538px,calc(100vw-32px))] mobile:w-70"
          priority
        />
      </Link>
      <Tabs selectedKey={selected} variant="secondary" className="mobile:hidden">
        <Tabs.ListContainer className="border-b-0!">
          <Tabs.List aria-label="Research Lab">
            {items.map(({ key, path }) => (
              <Tabs.Tab
                key={key}
                id={key}
                href={href(lang, path)}
                className="px-5 font-display text-sm font-medium tracking-wider uppercase"
              >
                {t[key]}
                <Tabs.Indicator className="bg-green" />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>
    </div>
  );
}
