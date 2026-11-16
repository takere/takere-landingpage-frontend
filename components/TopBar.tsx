"use client";

import { Accordion, Button, buttonVariants, Drawer, Link, Separator } from "@heroui/react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { basePath, href, switchLang, type Lang } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { cn } from "@/lib/cn";
import { BrazilFlag, UKFlag } from "./Flags";

const researchPaths = ["/research", "/team", "/publications", "/gallery", "/contact"];
const researchItems = [
  { key: "home", path: "/research" },
  { key: "team", path: "/team" },
  { key: "publications", path: "/publications" },
  { key: "gallery", path: "/gallery" },
  { key: "contact", path: "/contact" },
] as const;

const Logo = ({ className }: { className?: string }) => (
  <Image
    src="/img/brand/menu-logo.jpg"
    alt="Takere"
    width={1093}
    height={275}
    sizes="140px"
    // The wordmark is a JPEG on white; multiply drops the white onto the glass bar.
    className={cn("block h-8.5 w-auto mix-blend-multiply mobile:h-6.5", className)}
  />
);

const Arrow = () => (
  <svg viewBox="0 0 16 12" className="w-4 shrink-0 opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true">
    <path d="M1 6h13M9 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function TopBar({ lang, t }: { lang: Lang; t: Dictionary["common"] }) {
  const pathname = usePathname();
  const base = basePath(pathname);
  const inResearch = researchPaths.includes(base);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  // Switching language is a full navigation so the middleware can pick the locale.
  const langSwitch = (size: "sm" | "md") => (
    <div className="inline-flex gap-1 rounded-full bg-default p-1" role="group" aria-label="Idioma / Language">
      {(
        [
          ["pt", "pt-BR", <BrazilFlag key="f" />, "PT"],
          ["en", "en", <UKFlag key="f" />, "EN"],
        ] as const
      ).map(([code, hreflang, flag, label]) => (
        <a
          key={code}
          href={switchLang(pathname, code)}
          lang={hreflang}
          aria-current={lang === code ? "true" : undefined}
          className={cn(
            buttonVariants({ size, variant: lang === code ? "secondary" : "ghost" }),
            "rounded-full font-display tracking-wide",
            lang === code ? "bg-background text-navy shadow-sm" : "text-muted",
          )}
        >
          {flag}
          {label}
        </a>
      ))}
    </div>
  );

  const navLink =
    "relative h-full rounded-none px-4 font-display text-[13px] font-medium tracking-[0.12em] text-ink uppercase no-underline " +
    "after:absolute after:inset-x-4 after:bottom-4 after:h-0.5 after:scale-x-0 after:rounded-full after:bg-green after:transition-transform after:content-[''] " +
    "hover:text-navy hover:after:scale-x-100 aria-[current=page]:text-navy aria-[current=page]:after:scale-x-100";

  const menuLink = (active: boolean) =>
    cn(
      "group flex h-15 w-full items-center justify-between rounded-none font-display text-u-20 font-semibold text-navy no-underline",
      active && "text-green",
    );

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "sticky top-0 z-50 h-[var(--topbar-h)] border-b border-transparent bg-background/80 backdrop-blur-xl backdrop-saturate-150 transition-[box-shadow,border-color,background-color] duration-300",
        "before:absolute before:inset-x-0 before:top-0 before:h-0.75 before:bg-linear-to-r before:from-green before:to-navy before:content-['']",
        scrolled && "border-separator bg-background/90 shadow-[0_6px_24px_-12px_rgba(0,29,75,0.25)]",
      )}
    >
      <div className="container-site grid h-full grid-cols-[1fr_auto_1fr] items-center mobile:flex mobile:justify-end mobile:pr-2">
        {/* Keeps the nav centred in the 3-column grid. */}
        <div aria-hidden="true" className="mobile:hidden" />

        <nav aria-label="Site" className="flex h-full gap-2 mobile:hidden">
          <Link href={href(lang, "/")} aria-current={base === "/" ? "page" : undefined} className={navLink}>
            {t.nav.home}
          </Link>
          <Link href={href(lang, "/research")} aria-current={inResearch ? "page" : undefined} className={navLink}>
            {t.nav.research}
          </Link>
        </nav>

        <div className="justify-self-end mobile:hidden">{langSwitch("sm")}</div>

        <Button
          isIconOnly
          variant="ghost"
          aria-label={t.openMenu}
          aria-expanded={open}
          onPress={() => setOpen(true)}
          className="size-12 text-navy desktop:hidden"
        >
          <svg viewBox="0 0 20 14" className="w-5" aria-hidden="true">
            <path d="M1 1h18M7 7h12M1 13h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </Button>
      </div>

      <Drawer isOpen={open} onOpenChange={setOpen}>
        <Drawer.Backdrop variant="blur">
          <Drawer.Content placement="right">
            <Drawer.Dialog
              aria-label="Menu"
              className={cn(
                "flex h-full w-[min(88vw,360px)] max-w-none flex-col overflow-y-auto shadow-none",
                "bg-[radial-gradient(circle_at_115%_-5%,rgba(12,177,123,0.18),transparent_45%),radial-gradient(circle_at_-25%_105%,rgba(0,29,75,0.12),transparent_50%)] bg-surface",
              )}
            >
              <Drawer.Header className="flex flex-row items-center justify-between">
                <NextLink href={href(lang, "/")} className="rounded-md">
                  <Logo className="h-7" />
                </NextLink>
                <Drawer.CloseTrigger aria-label={t.closeMenu} />
              </Drawer.Header>

              <Drawer.Body>
                <nav aria-label="Menu" className="flex flex-col">
                  <Link href={href(lang, "/")} aria-current={base === "/" ? "page" : undefined} className={menuLink(base === "/")}>
                    {t.nav.home}
                    <Arrow />
                  </Link>
                  <Separator />
                  <Accordion hideSeparator defaultExpandedKeys={inResearch ? ["research"] : []} className="px-0">
                    <Accordion.Item id="research">
                      <Accordion.Heading>
                        <Accordion.Trigger className={cn(menuLink(inResearch), "px-0 hover:bg-transparent")}>
                          {t.nav.research}
                          <Accordion.Indicator />
                        </Accordion.Trigger>
                      </Accordion.Heading>
                      <Accordion.Panel>
                        <Accordion.Body className="flex flex-col px-0 pt-0 pb-3">
                          {researchItems.map(({ key, path }) => (
                            <Link
                              key={key}
                              href={href(lang, path)}
                              aria-current={base === path ? "page" : undefined}
                              className={cn(
                                "w-full rounded-none border-l-2 border-separator py-2.5 pl-4 font-display text-u-15 font-medium text-muted no-underline",
                                "hover:border-green hover:text-navy",
                                base === path && "border-green font-semibold text-green",
                              )}
                            >
                              {t.researchNav[key]}
                            </Link>
                          ))}
                        </Accordion.Body>
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                  <Separator />
                  <Link
                    href={href(lang, "/policy")}
                    aria-current={base === "/policy" ? "page" : undefined}
                    className={menuLink(base === "/policy")}
                  >
                    {t.footer.policy}
                    <Arrow />
                  </Link>
                  <Separator />
                </nav>
              </Drawer.Body>

              <Drawer.Footer className="mt-auto justify-center pb-8">{langSwitch("md")}</Drawer.Footer>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </header>
  );
}
