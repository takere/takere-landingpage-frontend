import { CardContent, CardRoot, CardTitle } from "@heroui/react/card";
import { buttonVariants } from "@heroui/styles";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import ResearchLayout from "@/components/ResearchLayout";
import SectionTitle from "@/components/SectionTitle";
import Stats from "@/components/Stats";
import { researchAreas } from "@/data/research";
import { getDictionary, href, type Lang } from "@/i18n";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";

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
              src="/img/research/hero-bg.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="scale-105 object-cover blur-md mobile:hidden"
            />
            <CardRoot
              className={cn(
                "relative mx-auto grid min-h-98 max-w-261.5 grid-cols-[440px_1fr] gap-0 overflow-hidden p-0 shadow-2xl",
                "min-[761px]:max-[860px]:grid-cols-1",
                "mobile:max-w-80 mobile:min-h-0 mobile:grid-cols-[minmax(0,1fr)] mobile:rounded-none mobile:shadow-none",
              )}
              data-reveal="up"
            >
              <div className="relative min-h-65 min-[761px]:max-[860px]:min-h-[56vw] mobile:order-2 mobile:h-51.5 mobile:min-h-0">
                <Image
                  src="/img/research/group.jpeg"
                  alt={t.groupAlt}
                  fill
                  sizes="(max-width: 760px) 100vw, 440px"
                  className="object-cover"
                />
              </div>
              <CardContent className="flex flex-col px-8 pt-7 pb-8 mobile:px-3.25 mobile:pt-7.5 mobile:pb-4">
                <SectionTitle
                  edge="none"
                  as="h1"
                  className="mb-4.5 self-start text-[40px] mobile:mb-5.5 mobile:text-u-22 mobile:after:right-0 mobile:after:left-auto mobile:after:w-screen"
                >
                  {t.groupTitle}
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

          <section className="container-site py-10 mobile:max-w-80 mobile:px-5 mobile:pt-0 mobile:pb-5">
            <SectionTitle edge="left">{t.linesTitle}</SectionTitle>
            <div
              className="mt-4 max-w-190 space-y-8 text-justify font-display leading-loose text-ink min-[1001px]:-ml-15 mobile:mt-6 mobile:space-y-6.75 mobile:text-u-15 mobile:leading-[1.8]"
              data-reveal="up"
            >
              <p>{t.linesIntro}</p>
              <p>{t.linesCurrent}</p>
            </div>
            <ul className="mt-12 grid grid-cols-4 gap-x-6 gap-y-8 min-[761px]:max-[860px]:grid-cols-3 mobile:mt-10 mobile:grid-cols-[minmax(0,1fr)] mobile:gap-6">
              {researchAreas.map((area) => (
                <li key={area.key} data-reveal="up">
                  <CardRoot className="group h-full items-center gap-4 p-4 text-center shadow-none transition duration-300 hover:-translate-y-1 mobile:gap-3.5">
                    <div className="overflow-hidden rounded-full">
                      <Image
                        src={`/img/research/${area.key}.jpg`}
                        alt=""
                        width={165}
                        height={165}
                        className="size-41 object-cover transition-transform duration-300 group-hover:scale-105 mobile:size-40"
                      />
                    </div>
                    <CardTitle className="max-w-50 font-display text-sm leading-snug font-medium text-ink mobile:max-w-66 mobile:text-u-14">
                      {area.label[lang]}
                    </CardTitle>
                  </CardRoot>
                </li>
              ))}
            </ul>
          </section>

          <section className="container-site py-10 mobile:max-w-80 mobile:px-0 mobile:pt-7.5 mobile:pb-8.5">
            <Stats lang={lang} />
          </section>
        </main>
      </ResearchLayout>
      <Footer lang={lang} />
    </>
  );
}
