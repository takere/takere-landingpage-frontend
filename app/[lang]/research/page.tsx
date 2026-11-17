import { CardContent, CardRoot } from "@heroui/react/card";
import { buttonVariants } from "@heroui/styles";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Partners from "@/components/Partners";
import ResearchLayout from "@/components/ResearchLayout";
import SectionTitle from "@/components/SectionTitle";
import Stats from "@/components/Stats";
import { researchAreas } from "@/data/research";
import { getDictionary, href, type Lang } from "@/i18n";
import { cn } from "@/lib/cn";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/research">) {
  return pageMetadata((await params).lang as Lang, "research");
}

export default async function Page({ params }: PageProps<"/[lang]/research">) {
  const lang = (await params).lang as Lang;
  const t = getDictionary(lang).research;

  return (
    <>
      <ResearchLayout lang={lang}>
        <main id="main">
          <section className="relative overflow-hidden bg-navy px-5 py-22 mobile:bg-background mobile:p-0">
            <Image
              src="/assets/images/research/hero-bg.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="scale-105 object-cover blur-md mobile:hidden"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(60%_80%_at_15%_10%,rgba(12,177,123,0.35),transparent_60%),linear-gradient(180deg,rgba(0,20,58,0.35),rgba(0,20,58,0.75))] mobile:hidden"
            />
            <CardRoot
              className={cn(
                "relative mx-auto grid min-h-98 max-w-261.5 grid-cols-[540px_1fr] gap-0 overflow-hidden rounded-[28px] p-0 shadow-2xl ring-1 ring-white/10",
                "min-[761px]:max-[860px]:grid-cols-1",
                "mobile:max-w-80 mobile:min-h-0 mobile:grid-cols-[minmax(0,1fr)] mobile:rounded-none mobile:shadow-none mobile:ring-0",
              )}
              data-reveal="up"
            >
              <div className="relative min-h-65 min-[761px]:max-[860px]:min-h-[56vw] mobile:order-2 mobile:h-51.5 mobile:min-h-0">
                <Image
                  src="/assets/images/research/group.webp"
                  alt={t.groupAlt}
                  fill
                  sizes="(max-width: 760px) 100vw, 540px"
                  className="object-cover"
                />
              </div>
              <CardContent className="@container flex flex-col px-8 pt-7 pb-8 mobile:px-3.25 mobile:pt-7.5 mobile:pb-4">
                <SectionTitle
                  edge="none"
                  as="h1"
                  className="mb-4.5 self-start text-[min(34px,7.8cqw)] whitespace-nowrap mobile:mb-5.5 mobile:text-u-22 mobile:after:right-0 mobile:after:left-auto mobile:after:w-screen"
                >
                  {t.groupTitle}
                  <span className="sr-only">{t.groupTitleContext}</span>
                </SectionTitle>
                <p className="text-sm leading-[1.85] text-ink mobile:text-u-16 mobile:leading-[1.8]">{t.groupText}</p>
                <Link
                  href={href(lang, "/team")}
                  className={cn(
                    buttonVariants({ size: "lg", fullWidth: true }),
                    "mt-6 h-16 max-w-110 self-center font-display text-xl font-bold",
                    "mobile:mt-3.5 mobile:h-11 mobile:max-w-70 mobile:text-u-18",
                  )}
                >
                  {t.groupCta}
                </Link>
              </CardContent>
            </CardRoot>
          </section>

          <Partners lang={lang} />

          <section className="container-site py-12 mobile:max-w-80 mobile:px-5 mobile:pt-0 mobile:pb-5">
            <SectionTitle edge="left">{t.linesTitle}</SectionTitle>
            <p
              className="mt-8 max-w-170 font-display text-xl leading-relaxed text-ink mobile:mt-6 mobile:text-u-16"
              data-reveal="up"
            >
              {t.linesIntro}
            </p>
            <ul className="mt-10 grid grid-flow-dense auto-rows-[200px] grid-cols-4 gap-4 min-[761px]:max-[860px]:grid-cols-3 mobile:mt-6 mobile:auto-rows-[calc(var(--u)*130)] mobile:grid-cols-2 mobile:gap-2.5">
              {researchAreas.map((area, i) => (
                <li key={area.key} data-reveal="up" className="first:col-span-2 first:row-span-2">
                  <div className="group relative isolate size-full overflow-hidden rounded-3xl bg-navy shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-14px_rgba(0,29,75,0.55)] mobile:rounded-2xl">
                    <Image
                      src={`/assets/images/research/${area.key}.webp`}
                      alt=""
                      fill
                      sizes={i === 0 ? "(max-width: 760px) 100vw, 520px" : "(max-width: 760px) 50vw, 260px"}
                      className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 bg-linear-to-t from-navy-dark via-navy-dark/55 to-navy-dark/0 transition-opacity duration-300 group-hover:opacity-90"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-white/15 px-2.5 py-0.5 font-display text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-md mobile:top-2 mobile:left-2 mobile:px-2 mobile:text-u-10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className={cn(
                        "absolute inset-x-0 bottom-0 p-4 font-display leading-snug font-semibold text-white mobile:p-2.5",
                        i === 0 ? "text-2xl mobile:text-u-17" : "text-sm mobile:text-u-12",
                      )}
                    >
                      {area.label[lang].replace(/\.$/, "")}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-green transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="container-site pt-6 pb-16 mobile:max-w-80 mobile:px-0 mobile:pt-7.5 mobile:pb-8.5">
            <Stats lang={lang} />
          </section>
        </main>
      </ResearchLayout>
      <Footer lang={lang} />
      <JsonLd data={breadcrumbJsonLd(lang, "research")} />
    </>
  );
}
