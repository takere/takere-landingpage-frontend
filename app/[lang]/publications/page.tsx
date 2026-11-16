import { LinkIcon, LinkRoot } from "@heroui/react/link";
import { SeparatorRoot } from "@heroui/react/separator";
import Footer from "@/components/Footer";
import ResearchLayout from "@/components/ResearchLayout";
import SectionTitle from "@/components/SectionTitle";
import { publications } from "@/data/publications";
import { getDictionary, type Lang } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/publications">) {
  return pageMetadata((await params).lang as Lang, "publications");
}

export default async function Page({ params }: PageProps<"/[lang]/publications">) {
  const lang = (await params).lang as Lang;
  return (
    <>
      <ResearchLayout lang={lang}>
        <main id="main" className="container-site flex flex-col gap-16 pt-10 pb-20 mobile:gap-10 mobile:pt-5 mobile:pb-10">
          <h1 className="sr-only">{getDictionary(lang).publications.title}</h1>
          {publications(lang).map((group, i) => (
            <section key={group.year}>
              <div className={i % 2 ? "flex justify-end" : undefined} data-reveal={i % 2 ? "right" : "left"}>
                <SectionTitle edge={i % 2 ? "right" : "left"} className="text-[44px]">
                  {group.year}
                </SectionTitle>
              </div>
              <ul data-reveal="up" className="mt-10 flex flex-col gap-4.5 pl-13 mobile:mt-7.5 mobile:gap-6 mobile:pl-0">
                {group.items.map((item, j) => (
                  <li key={item.text} className="flex flex-col gap-1.5">
                    {j > 0 && <SeparatorRoot isDecorative className="mb-3 mobile:mb-4" />}
                    <p className="text-sm leading-relaxed text-ink mobile:text-u-16 mobile:leading-normal">{item.text}</p>
                    {item.doi && (
                      <LinkRoot
                        href={`https://doi.org/${item.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium break-all text-navy hover:text-green mobile:text-u-14"
                      >
                        doi: {item.doi}
                        <LinkIcon />
                      </LinkRoot>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </main>
      </ResearchLayout>
      <Footer lang={lang} />
    </>
  );
}
