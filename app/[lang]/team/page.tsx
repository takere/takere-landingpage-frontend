import { AvatarFallback, AvatarImage, AvatarRoot } from "@heroui/react/avatar";
import { CardDescription, CardFooter, CardHeader, CardRoot, CardTitle } from "@heroui/react/card";
import { LinkRoot } from "@heroui/react/link";
import { TooltipContent, TooltipRoot } from "@heroui/react/tooltip";
import Image, { getImageProps } from "next/image";
import Footer from "@/components/Footer";
import ResearchLayout from "@/components/ResearchLayout";
import SectionTitle from "@/components/SectionTitle";
import { coordinators, formerMembers, members, type Member } from "@/data/team";
import { getDictionary, type Lang } from "@/i18n";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/team">) {
  return pageMetadata((await params).lang as Lang, "team");
}

/** "Érika F. Cota" → "ÉC": first and last name, skipping abbreviated middle names. */
function initials(name: string) {
  const words = name.split(/\s+/).filter((w) => w && !w.endsWith("."));
  return ((words[0]?.[0] ?? "") + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase();
}

/** HeroUI Avatar fed by Next's image optimizer (team photos are up to ~400KB originals). */
function PersonAvatar({ src, name, size, className }: { src: string; name: string; size: number; className?: string }) {
  const { props } = getImageProps({ src, alt: name, width: size, height: size });
  return (
    <AvatarRoot className={cn("shrink-0 ring-4 ring-green-light ring-offset-2 ring-offset-surface", className)}>
      <AvatarImage {...props} className="object-cover" />
      <AvatarFallback className="font-display font-bold">{initials(name)}</AvatarFallback>
    </AvatarRoot>
  );
}

const sectionClass = "container-site py-10 mobile:max-w-80 mobile:px-5 mobile:pt-5 mobile:pb-7.5";

export default async function Page({ params }: PageProps<"/[lang]/team">) {
  const lang = (await params).lang as Lang;
  const t = getDictionary(lang).team;

  return (
    <>
      <ResearchLayout lang={lang}>
        <main id="main">
          <section className={sectionClass}>
            <SectionTitle edge="left" as="h1">
              {t.coordinators}
            </SectionTitle>
            <div className="mt-14 grid grid-cols-3 gap-8 mobile:mt-10 mobile:grid-cols-[minmax(0,1fr)] mobile:gap-6">
              {coordinators.map((c) => (
                <article key={c.linkedin} data-reveal="up">
                  <CardRoot className="h-full items-center gap-0 shadow-none px-5 pt-8 pb-6 text-center font-display mobile:pt-6 mobile:pb-5">
                    <PersonAvatar
                      src={c.photo}
                      name={c.name[lang]}
                      size={256}
                      className="mb-6 size-44 mobile:mb-3 mobile:size-30"
                    />
                    <CardHeader className="items-center gap-1">
                      <h2 className="font-display text-2xl font-bold text-ink mobile:text-u-25">{c.name[lang]}</h2>
                      <CardDescription className="text-base leading-snug font-semibold text-muted mobile:text-u-18">
                        {c.degree[lang]}
                        <br />
                        {c.institution}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="mt-6 justify-center gap-3 mobile:mt-3.5 mobile:gap-2.25">
                      <ProfileLink url={c.lattes} icon="lattes" label="Lattes" />
                      <ProfileLink url={c.orcid} icon="orcid" label="ORCID" />
                      <ProfileLink url={c.linkedin} icon="linkedin" label="LinkedIn" />
                    </CardFooter>
                  </CardRoot>
                </article>
              ))}
            </div>
          </section>

          <section className={sectionClass}>
            <div className="flex justify-end">
              <SectionTitle edge="right" className="mobile:text-u-26">
                {t.members}
              </SectionTitle>
            </div>
            <MemberGrid people={members(lang)} />
          </section>

          <section className={sectionClass}>
            <SectionTitle edge="left" className="mobile:max-w-47.5">
              {t.former}
            </SectionTitle>
            <MemberGrid people={formerMembers(lang)} />
          </section>
        </main>
      </ResearchLayout>
      <Footer lang={lang} />
    </>
  );
}

function ProfileLink({ url, icon, label }: { url: string; icon: string; label: string }) {
  return (
    <TooltipRoot>
      <LinkRoot
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="rounded-full p-1 transition-transform duration-200 hover:scale-110 hover:bg-default mobile:p-0.5"
      >
        <Image
          src={`/img/icons/${icon}.png`}
          alt=""
          width={36}
          height={36}
          className="size-9 rounded-full mobile:size-11.75"
        />
      </LinkRoot>
      <TooltipContent showArrow>{label}</TooltipContent>
    </TooltipRoot>
  );
}

function MemberGrid({ people }: { people: Member[] }) {
  return (
    <ul className="mt-18 grid grid-cols-4 gap-x-6 gap-y-6 min-[761px]:max-[900px]:grid-cols-3 mobile:mt-10 mobile:grid-cols-[minmax(0,1fr)] mobile:gap-4">
      {people.map((m) => (
        <li key={m.name} data-reveal="up">
          <CardRoot className="h-full items-center gap-3 shadow-none px-4 py-6 text-center font-display mobile:flex-row mobile:gap-4 mobile:px-4 mobile:py-4 mobile:text-left">
            <PersonAvatar src={m.photo} name={m.name} size={128} className="size-28 mobile:size-20" />
            <CardHeader className="items-center gap-1 mobile:items-start">
              <CardTitle className="font-display text-lg font-bold text-ink mobile:text-u-19">{m.name}</CardTitle>
              {m.lines.map((line) => (
                <CardDescription
                  key={line}
                  className="text-[13px] leading-relaxed font-semibold text-muted mobile:text-u-14"
                >
                  {line}
                </CardDescription>
              ))}
            </CardHeader>
          </CardRoot>
        </li>
      ))}
    </ul>
  );
}
