import { CardContent, CardDescription, CardHeader, CardRoot, CardTitle } from "@heroui/react/card";
import { LinkRoot } from "@heroui/react/link";
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

export default async function Page({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Lang;
  const t = getDictionary(lang).contact;

  return (
    <>
      <ResearchLayout lang={lang}>
        <main id="main" className="container-site pt-10 pb-16 mobile:pt-5 mobile:pb-10">
          <SectionTitle edge="left" as="h1">
            {t.title}
          </SectionTitle>
          <div className="mt-16 grid grid-cols-2 gap-12 mobile:mt-7 mobile:grid-cols-1 mobile:gap-8">
            <section data-reveal="up">
              <h2 className={heading}>{t.info}</h2>
              <div className="flex flex-col gap-4">
                <CardRoot variant="secondary">
                  <CardHeader>
                    <CardDescription className="text-ink mobile:text-u-15">{t.general}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LinkRoot href={`mailto:${CONTACT_EMAIL}`} className={mail}>
                      {CONTACT_EMAIL}
                    </LinkRoot>
                  </CardContent>
                </CardRoot>
                {contacts.map((c) => (
                  <CardRoot key={c.email} className="shadow-none">
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
                  </CardRoot>
                ))}
              </div>
            </section>
            <section data-reveal="up">
              <h2 className={heading}>{t.address}</h2>
              <CardRoot className="gap-4 shadow-none">
                <address className="flex flex-col leading-normal not-italic text-ink mobile:text-u-16">
                  {addressLines[lang].map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
                <iframe
                  className="block h-82.5 w-full rounded-2xl border-0 mobile:hidden"
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
