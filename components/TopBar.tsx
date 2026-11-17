"use client";

import { Accordion, Button, buttonVariants, Drawer, Link } from "@heroui/react";
import {
  BookOpenTextIcon,
  EnvelopeSimpleIcon,
  FlaskIcon,
  HouseIcon,
  HouseSimpleIcon,
  ImagesIcon,
  ShieldCheckIcon,
  UsersThreeIcon,
  XIcon,
  type Icon,
} from "@phosphor-icons/react";
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
  { key: "home", path: "/research", icon: HouseSimpleIcon },
  { key: "team", path: "/team", icon: UsersThreeIcon },
  { key: "publications", path: "/publications", icon: BookOpenTextIcon },
  { key: "gallery", path: "/gallery", icon: ImagesIcon },
  { key: "contact", path: "/contact", icon: EnvelopeSimpleIcon },
] as const;

// Same look as the takere-hcp SideMenu: white text on navy, active item gets a green inset bar + filled icon.
const menuItem = (active: boolean) =>
  cn(
    "group mr-3 flex min-h-11 w-[calc(100%-0.75rem)] items-center gap-3 rounded-none rounded-r-xl px-3 py-2.5 font-display text-u-15 font-semibold text-white/85 no-underline transition-colors",
    active ? "bg-white/10 text-white shadow-[inset_3px_0_0_var(--color-green)]" : "hover:bg-white/10 hover:text-white",
  );

const MenuIcon = ({ icon: Icon, active }: { icon: Icon; active: boolean }) => (
  <span className={cn("flex shrink-0", active && "text-green")}>
    <Icon size={22} weight={active ? "fill" : "regular"} />
  </span>
);

export default function TopBar({ lang, t }: { lang: Lang; t: Dictionary["common"] }) {
  const pathname = usePathname();
  const base = basePath(pathname);
  const inResearch = researchPaths.includes(base);
  const isStatic = base === "/policy";
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
  const langSwitch = (size: "sm" | "md", dark = false) => (
    <div className={cn("inline-flex gap-1 rounded-full p-1", dark ? "bg-white/10" : "bg-default")} role="group" aria-label="Idioma / Language">
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
            lang === code ? "bg-background text-navy shadow-sm" : dark ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-muted",
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

  return (
    <header
      data-site-header
      data-scrolled={scrolled}
      // The privacy policy is long-form reading, so the bar scrolls away there instead of sticking.
      data-static={isStatic || undefined}
      className={cn(
        isStatic ? "relative" : "sticky top-0",
        "z-50 h-[var(--topbar-h)] border-b border-transparent bg-background/80 backdrop-blur-xl backdrop-saturate-150 transition-[box-shadow,border-color,background-color] duration-300",
        "before:absolute before:inset-x-0 before:top-0 before:h-0.75 before:bg-linear-to-r before:from-green before:to-navy before:content-['']",
        scrolled && !isStatic && "border-separator bg-background/90 shadow-[0_6px_24px_-12px_rgba(0,29,75,0.25)]",
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
        <Drawer.Backdrop className="bg-black/40">
          <Drawer.Content placement="right">
            <Drawer.Dialog
              aria-label="Menu"
              className={cn(
                "flex h-full w-[min(88vw,300px)] max-w-none flex-col overflow-y-auto p-0 text-white shadow-none!",
                "bg-[linear-gradient(180deg,var(--color-navy)_0%,var(--color-navy-dark)_100%)]",
                "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
              )}
            >
              <div className="flex items-center justify-between px-4 py-4">
                <NextLink href={href(lang, "/")} className="w-full max-w-40 rounded-md">
                  <Image src="/assets/images/brand/logo-white.png" alt="Takere" width={1444} height={404} sizes="160px" className="w-full" />
                </NextLink>
                <Button
                  isIconOnly
                  slot="close"
                  variant="ghost"
                  aria-label={t.closeMenu}
                  // Keep the ghost button transparent in every state; feedback is opacity only.
                  className={cn(
                    "size-11 shrink-0 rounded-[15px] text-white transition-opacity",
                    "bg-transparent! [--button-bg:transparent] [--button-bg-hover:transparent] [--button-bg-pressed:transparent] [--button-fg:currentColor]",
                    "hover:opacity-70 data-[pressed=true]:scale-100 data-[pressed=true]:opacity-50",
                  )}
                >
                  <XIcon size={22} weight="bold" />
                </Button>
              </div>

              <nav aria-label="Menu" className="mt-2 flex flex-col gap-2">
                <Link href={href(lang, "/")} aria-current={base === "/" ? "page" : undefined} className={menuItem(base === "/")}>
                  <MenuIcon icon={HouseIcon} active={base === "/"} />
                  {t.nav.home}
                </Link>
                <Accordion hideSeparator defaultExpandedKeys={inResearch ? ["research"] : []} className="px-0">
                  <Accordion.Item id="research">
                    <Accordion.Heading>
                      <Accordion.Trigger className={menuItem(inResearch)}>
                        <MenuIcon icon={FlaskIcon} active={inResearch} />
                        <span className="flex-1">{t.nav.research}</span>
                        <Accordion.Indicator className="text-white/70" />
                      </Accordion.Trigger>
                    </Accordion.Heading>
                    <Accordion.Panel>
                      <Accordion.Body className="ml-5.5 flex flex-col px-0 pt-1 pb-1">
                        {researchItems.map(({ key, path, icon: ItemIcon }) => (
                          <Link
                            key={key}
                            href={href(lang, path)}
                            aria-current={base === path ? "page" : undefined}
                            className={cn(
                              "flex w-full items-center gap-2.5 rounded-none border-l-2 border-white/15 py-2.5 pl-4 font-display text-u-14 font-medium text-white/65 no-underline",
                              "hover:border-green hover:text-white",
                              base === path && "border-green font-semibold text-green",
                            )}
                          >
                            <ItemIcon size={18} weight={base === path ? "fill" : "regular"} className="shrink-0" />
                            {t.researchNav[key]}
                          </Link>
                        ))}
                      </Accordion.Body>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
                <Link
                  href={href(lang, "/policy")}
                  aria-current={base === "/policy" ? "page" : undefined}
                  className={menuItem(base === "/policy")}
                >
                  <MenuIcon icon={ShieldCheckIcon} active={base === "/policy"} />
                  {t.footer.policy}
                </Link>
              </nav>

              <div className="mt-auto flex justify-center px-4 pt-6 pb-8">{langSwitch("md", true)}</div>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </header>
  );
}
