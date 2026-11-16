import { CardContent, CardDescription, CardHeader, CardRoot, CardTitle } from "@heroui/react/card";
import { LinkRoot } from "@heroui/react/link";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import ResearchLayout from "@/components/ResearchLayout";
import SectionTitle from "@/components/SectionTitle";
import { addressLines, CONTACT_EMAIL, contacts, MAP_EMBED_URL } from "@/data/contact";
import { getDictionary, type Lang } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  return pageMetadata((await params).lang as Lang, "contact");
}

const heading = "mb-6 font-display text-xl font-bold text-ink mobile:mb-3 mobile:text-u-19";
const mail = "font-medium break-all text-green hover:text-navy mobile:text-u-15";

const icons = {
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
};

function IconBadge({ icon, className = "bg-green-light/70 text-navy" }: { icon: keyof typeof icons; className?: string }) {
  return (
    <span className={`grid size-11 shrink-0 place-items-center rounded-2xl mobile:size-10 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="size-5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
        <path d={icons[icon]} />
      </svg>
    </span>
  );
}

function Row({ children }: { children: ReactNode }) {
  return <div className="flex items-start gap-4 mobile:gap-3">{children}</div>;
}

export default async function Page({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Lang;
  const t = getDictionary(lang).contact;

  return (
    <>
      <ResearchLayout lang={lang}>
        <main id="main" className="container-site pt-10 pb-20 mobile:pt-5 mobile:pb-10">
          <SectionTitle edge="left" as="h1">
            {t.title}
          </SectionTitle>
          <div className="mt-14 grid grid-cols-2 gap-12 mobile:mt-7 mobile:grid-cols-1 mobile:gap-8">
            <section data-reveal="up">
              <h2 className={heading}>{t.info}</h2>
              <div className="flex flex-col gap-4">
                <CardRoot className="relative isolate overflow-hidden bg-navy p-6 text-white shadow-[0_8px_20px_-12px_rgba(0,29,75,0.45)] mobile:p-4">
                  <div
                    aria-hidden="true"
                    className="absolute -top-16 -right-12 -z-10 size-48 rounded-full bg-green/40 blur-3xl"
                  />
                  <Row>
                    <IconBadge icon="mail" className="bg-white/10 text-green ring-1 ring-white/15" />
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <p className="text-sm text-white/75 mobile:text-u-14">{t.general}</p>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="font-display text-lg font-semibold break-all text-white decoration-green decoration-2 underline-offset-4 hover:underline mobile:text-u-16"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </Row>
                </CardRoot>
                {contacts.map((c) => (
                  <CardRoot
                    key={c.email}
                    className="border border-black/5 shadow-none transition duration-300 hover:-translate-y-0.5 hover:border-green/40 hover:shadow-[0_12px_28px_-14px_rgba(0,29,75,0.3)]"
                  >
                    <Row>
                      <IconBadge icon="mail" />
                      <div className="flex min-w-0 flex-col gap-2">
                        <CardHeader>
                          <CardTitle className="font-display text-base font-semibold text-navy mobile:text-u-16">
                            {c.topic[lang]}
                          </CardTitle>
                          <CardDescription className="mobile:text-u-15">{c.who[lang]}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <LinkRoot href={`mailto:${c.email}`} className={mail}>
                            {c.email}
                          </LinkRoot>
                        </CardContent>
                      </div>
                    </Row>
                  </CardRoot>
                ))}
              </div>
            </section>
            <section data-reveal="up">
              <h2 className={heading}>{t.address}</h2>
              <CardRoot className="gap-5 border border-black/5 shadow-none">
                <Row>
                  <IconBadge icon="pin" />
                  <address className="flex flex-col leading-normal not-italic text-ink mobile:text-u-16">
                    {addressLines[lang].map((line, i) => (
                      <span key={line} className={i === 0 ? "font-display font-semibold text-navy" : undefined}>
                        {line}
                      </span>
                    ))}
                  </address>
                </Row>
                <iframe
                  className="block h-82.5 w-full rounded-2xl border-0 ring-1 ring-black/5 mobile:hidden"
                  src={MAP_EMBED_URL}
                  title={t.map}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </CardRoot>
            </section>
          </div>
        </main>
      </ResearchLayout>
      <Footer lang={lang} />
    </>
  );
}
