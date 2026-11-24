import { CardContent, CardDescription, CardRoot, CardTitle } from "@heroui/react/card";
import { ChipLabel, ChipRoot } from "@heroui/react/chip";
import { LinkRoot } from "@heroui/react/link";
import { TooltipContent, TooltipRoot } from "@heroui/react/tooltip";
import { buttonVariants } from "@heroui/styles";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import PersonAvatar from "@/components/PersonAvatar";
import Partners from "@/components/Partners";
import SectionTitle from "@/components/SectionTitle";
import Stats from "@/components/Stats";
import { offers } from "@/data/home";
import { coordinators } from "@/data/team";
import { getDictionary, href, rich, type Lang, type RichTags } from "@/i18n";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  return pageMetadata((await params).lang as Lang, "home");
}

/* Shared prose styles for the research/team paragraphs. */
const prose = "font-display leading-loose text-justify mobile:text-u-16 mobile:leading-[calc(28.8*var(--u))]";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Lang;
  const t = getDictionary(lang).home;
  const tags: RichTags = {
    b: (chunks) => <b>{chunks}</b>,
    strong: (chunks) => <strong>{chunks}</strong>,
    br: () => <br />,
    ufrgs: (chunks) => (
      <a href="https://www.ufrgs.br" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    hcpa: (chunks) => (
      <a href="https://www.hcpa.edu.br" target="_blank" rel="noopener noreferrer">
        {chunks}
      </a>
    ),
    research: (chunks) => <Link href={href(lang, "/research")}>{chunks}</Link>,
    contact: (chunks) => <Link href={href(lang, "/contact")}>{chunks}</Link>,
  };

  return (
    <>
      <main id="main">
        {/* Hero */}
        <section className="grid h-[1006px] grid-cols-2 mobile:mx-auto mobile:h-auto mobile:max-w-80 mobile:grid-cols-[minmax(0,1fr)]">
          <div className="flex flex-col pt-14 pr-10 pb-16 pl-21.25 max-[1000px]:pl-10 mobile:px-5 mobile:pt-5 mobile:pb-0">
            <h1
              className={cn(
                "max-w-128 font-hero text-[68px] leading-[85px] font-extralight text-ink",
                "max-[1000px]:text-[54px] max-[1000px]:leading-[68px] mobile:text-u-30 mobile:leading-[calc(37.5*var(--u))]",
                "[&_strong]:relative [&_strong]:table [&_strong]:font-bold",
                "[&_strong]:after:absolute [&_strong]:after:right-0 [&_strong]:after:bottom-0 [&_strong]:after:h-1 [&_strong]:after:w-screen [&_strong]:after:bg-green [&_strong]:after:content-['']",
              )}
              data-reveal="left"
            >
              {rich(t.heroTitle, tags)}
            </h1>
            <p
              className="mt-27.5 w-122.5 max-w-full px-11.25 text-center font-display text-lg leading-[1.88] desktop:max-[900px]:w-auto desktop:max-[900px]:px-0 mobile:mt-12 mobile:w-auto mobile:px-0 mobile:text-u-17 mobile:leading-[calc(32*var(--u))]"
              data-reveal="up"
            >
              {rich(t.heroText, tags)}
            </p>
            <a
              href="#contato"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-15.5 ml-10.5 h-18.5 w-94.5 max-w-full rounded-2xl font-display text-2xl font-bold shadow-lg hover:bg-green",
                "desktop:max-[900px]:ml-0 mobile:mt-7.5 mobile:ml-0 mobile:h-12.5 mobile:w-70 mobile:self-center mobile:text-u-22",
              )}
              data-reveal="up"
            >
              {t.cta}
            </a>
          </div>
          <div className="relative min-h-80 mobile:-order-1 mobile:h-65 mobile:min-h-0">
            <Image
              src="/assets/images/home/hero.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </section>

        <Partners lang={lang} />

        {/* Mission */}
        <section className="bg-green px-5 pt-4 pb-5 mobile:mx-auto mobile:max-w-80 mobile:px-3.5 mobile:pt-3.5 mobile:pb-4">
          <p
            className="mx-auto max-w-245 text-center font-display text-[32px] leading-[1.4] font-bold text-white mobile:text-u-19 mobile:leading-[calc(26.6*var(--u))]"
            data-reveal="up"
          >
            {rich(t.mission, tags)}
          </p>
        </section>

        {/* What we offer */}
        <section className="container-site grid grid-cols-[420px_1fr] items-end gap-18 pb-20 max-[1000px]:grid-cols-2 max-[1000px]:gap-10 mobile:block mobile:max-w-80 mobile:px-4 mobile:pt-6 mobile:pb-12">
          <div data-reveal="left" className="mobile:hidden">
            <Image
              src="/assets/images/home/computer.webp"
              alt={t.offerImgAlt}
              width={420}
              height={377}
              className="h-94.25 w-105 rounded-3xl object-cover shadow-xl max-[1000px]:aspect-[420/377] max-[1000px]:h-auto max-[1000px]:w-full"
            />
          </div>
          <div className="pt-10 mobile:pt-0">
            <SectionTitle edge="right" className="whitespace-nowrap mobile:text-u-26 mobile:after:right-0 mobile:after:left-auto">
              {t.offerTitle}
            </SectionTitle>
            <ul className="mt-7 flex flex-col gap-3 mobile:mt-10 mobile:gap-4">
              {offers.map((offer) => (
                <li key={offer.icon} data-reveal="right">
                  <CardRoot className="max-w-110 flex-row shadow-none items-center gap-4 p-3 mobile:max-w-none mobile:flex-col mobile:gap-2.5 mobile:p-4 mobile:text-center">
                    <span className="grid size-14 shrink-0 place-items-center rounded-full bg-green shadow-[0_4px_12px_-4px_rgba(12,177,123,0.6)]">
                      <Image
                        src={`/assets/images/icons/${offer.icon}.webp`}
                        alt=""
                        width={27}
                        height={27}
                        className="size-6.75 mobile:size-9"
                      />
                    </span>
                    <CardContent className="font-display text-xl leading-[1.45] text-ink mobile:text-u-18 mobile:leading-[calc(25.2*var(--u))]">
                      {offer.label[lang]}
                    </CardContent>
                  </CardRoot>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-green pt-10 pb-25 text-white mobile:mx-auto mobile:max-w-80 mobile:pt-8.5 mobile:pb-7.5">
          <div className="container-site mobile:px-5">
            <SectionTitle edge="left" light className="mobile:text-u-26">
              {t.howTitle}
            </SectionTitle>
            <ol className="-mt-12.5 mobile:mx-[calc(-20*var(--u))] mobile:mt-9">
              <Step n={1} text={rich(t.steps[0], tags)} textReveal="left">
                <Monitor screen="/assets/images/home/screen-care-plan.webp" alt={t.screenAlts[0]} />
              </Step>
              <Step n={2} text={rich(t.steps[1], tags)} textReveal="right" reverse>
                <div
                  className="relative w-51 justify-self-center [grid-area:media] mobile:mt-2.5 mobile:ml-20.5"
                  data-reveal="left"
                >
                  <Image src="/assets/images/home/phone.webp" alt="" width={204} height={428} className="h-auto" />
                  <Image
                    src={`/assets/images/home/app-patient-${lang}.webp`}
                    alt={t.screenAlts[1]}
                    width={189}
                    height={390}
                    className="absolute top-[4.4%] left-[3.7%] h-auto w-[92.6%] rounded-md"
                  />
                </div>
              </Step>
              <Step n={3} text={rich(t.steps[2], tags)} textReveal="left" last>
                <Monitor screen="/assets/images/home/screen-monitoring.webp" alt={t.screenAlts[2]} last />
              </Step>
            </ol>
          </div>
        </section>

        {/* Research */}
        <section className="container-site pt-6 pb-10 mobile:max-w-80 mobile:px-5 mobile:pb-5">
          <div className="flex justify-end">
            <SectionTitle edge="right" className="mobile:text-u-26">
              {t.researchTitle}
            </SectionTitle>
          </div>
          <div className="mt-2 mb-8 grid grid-cols-[240px_1fr] items-center gap-8 mobile:mt-7.5 mobile:mb-9 mobile:grid-cols-[minmax(0,1fr)] mobile:gap-7">
            <Image
              src="/assets/images/brand/icon.png"
              alt="Takere"
              width={193}
              height={194}
              className="h-48.5 w-48.25 justify-self-center mobile:h-35.25 mobile:w-35"
              data-reveal="left"
            />
            <p className={cn(prose, "[&_a]:bg-green [&_a]:px-px [&_a]:text-white [&_a]:no-underline")}>
              {rich(t.researchText, tags)}
            </p>
          </div>
          <Stats lang={lang} />
          <p className={cn(prose, "mt-10 mobile:mt-8 [&_a]:font-semibold [&_a]:text-green [&_a]:underline-offset-4")}>
            {rich(t.researchMore, tags)}
          </p>
        </section>

        {/* Team */}
        <section className="container-site pt-8 pb-22.5 mobile:max-w-80 mobile:px-5 mobile:pt-6 mobile:pb-10">
          <SectionTitle edge="left">{t.teamTitle}</SectionTitle>
          <p className={cn(prose, "mt-7 max-w-125 mobile:max-w-none")} data-reveal="up">
            {t.teamText}
          </p>
          <div className="mt-16 grid grid-cols-3 gap-8 max-[900px]:gap-4 mobile:mt-10 mobile:grid-cols-[minmax(0,1fr)] mobile:gap-6">
            {coordinators.map((c) => {
              const name = c.name[lang];
              return (
                <article key={c.linkedin} data-reveal="up">
                  <CardRoot className="h-full items-center gap-3 shadow-none px-5 pt-8 pb-6 text-center font-display">
                    <PersonAvatar
                      src={c.photo}
                      name={name}
                      size={256}
                      className="size-40 ring-4 ring-green-light ring-offset-4 ring-offset-surface mobile:size-30"
                    />
                    {/* CardTitle renders an <h3>. */}
                    <CardTitle className="mt-3 text-2xl font-bold text-ink mobile:text-u-24">{name}</CardTitle>
                    <CardDescription className="text-base leading-normal font-semibold mobile:text-u-17">
                      {c.degree[lang]}
                      <br />
                      <ChipRoot size="sm" variant="soft" color="success" className="mt-2">
                        <ChipLabel>{c.institution}</ChipLabel>
                      </ChipRoot>
                    </CardDescription>
                    <TooltipRoot>
                      <LinkRoot
                        href={c.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn — ${name}`}
                        className="mt-auto grid size-11 place-items-center rounded-full bg-navy text-white no-underline shadow-md transition-colors hover:bg-green"
                      >
                        <LinkedInIcon />
                      </LinkRoot>
                      <TooltipContent showArrow>LinkedIn</TooltipContent>
                    </TooltipRoot>
                  </CardRoot>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}

/**
 * One timeline row: text, a numbered marker on a dashed rail, and the device mockup.
 * Desktop is a three-column grid (mirrored when `reverse`); mobile stacks with the rail on the left.
 */
function Step({
  n,
  text,
  textReveal,
  reverse,
  last,
  children,
}: {
  n: number;
  text: React.ReactNode;
  textReveal: "left" | "right";
  reverse?: boolean;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li
      className={cn(
        "group grid min-h-107.5 grid-cols-[380px_80px_minmax(0,1fr)] items-center gap-x-9 desktop:max-[900px]:grid-cols-[280px_80px_minmax(0,1fr)]",
        reverse ? "[grid-template-areas:'media_dot_text']" : "[grid-template-areas:'text_dot_media']",
        "mobile:relative mobile:flex mobile:min-h-0 mobile:flex-col mobile:items-start",
        reverse ? "mobile:pb-10" : "mobile:pb-5.5",
      )}
    >
      <p
        className={cn(
          "font-display text-2xl leading-[1.4] [grid-area:text]",
          reverse ? "max-w-85 justify-self-start text-left" : "max-w-70 justify-self-end text-right",
          "mobile:ml-20.5 mobile:max-w-58 mobile:text-left mobile:text-u-17 mobile:leading-[calc(23.8*var(--u))]",
        )}
        data-reveal={textReveal}
      >
        {text}
      </p>
      <span
        aria-hidden="true"
        className={cn(
          "relative self-stretch [grid-area:dot]",
          // Dashed rail
          "before:absolute before:inset-y-0 before:left-1/2 before:w-1.5 before:-translate-x-1/2 before:content-['']",
          "before:bg-[repeating-linear-gradient(to_bottom,#fff_0_18px,transparent_18px_32px)]",
          n === 1 && "before:top-[calc(50%+50px)]",
          last && "before:bottom-[calc(50%+50px)]",
          "mobile:absolute mobile:top-3 mobile:-bottom-3 mobile:left-4 mobile:w-10",
          "mobile:before:top-10 mobile:before:bottom-0 mobile:before:bg-[repeating-linear-gradient(to_bottom,#fff_0_calc(18*var(--u)),transparent_0_calc(30*var(--u)))]",
          last && "mobile:before:hidden",
        )}
      >
        <ChipRoot
          className={cn(
            "absolute top-1/2 left-1/2 grid size-12 -translate-1/2 place-items-center rounded-full border-4 border-white bg-green p-0 font-display text-lg font-bold text-white",
            "shadow-[0_0_0_30px_var(--color-green)] mobile:top-0 mobile:size-10 mobile:-translate-y-0 mobile:text-u-16 mobile:shadow-none",
          )}
        >
          <ChipLabel>{n}</ChipLabel>
        </ChipRoot>
      </span>
      {children}
    </li>
  );
}

function Monitor({ screen, alt, last }: { screen: string; alt: string; last?: boolean }) {
  return (
    <div
      className={cn(
        "relative w-116 max-w-full [grid-area:media] mobile:mt-6",
        last ? "mobile:ml-8 mobile:w-64" : "mobile:ml-14.75 mobile:w-65.25",
      )}
      data-reveal="right"
    >
      <Image src="/assets/images/home/monitor.webp" alt="" width={464} height={407} className="h-auto" />
      <Image src={screen} alt={alt} width={436} height={229} className="absolute top-[6.2%] left-[3%] h-auto w-[94%]" />
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.95c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62V21h-4V9.75Z" />
    </svg>
  );
}
