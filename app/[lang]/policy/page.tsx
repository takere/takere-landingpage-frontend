import { SeparatorRoot } from "@heroui/react/separator";
import Footer from "@/components/Footer";
import { getDictionary, type Lang } from "@/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/policy">) {
  return pageMetadata((await params).lang as Lang, "policy");
}

const h2 = "mt-10 font-display text-xl font-bold text-navy mobile:mt-7 mobile:text-u-18";
const h3 = "mt-8 font-display text-base font-semibold text-navy mobile:mt-5.5 mobile:text-u-16";
const p = "mt-4 mobile:mt-3";
const ul = "mt-4 list-disc space-y-1 pl-6 marker:text-green mobile:mt-3 mobile:pl-5";

const List = ({ items }: { items: readonly string[] }) => (
  <ul className={ul}>
    {items.map((x) => (
      <li key={x}>{x}</li>
    ))}
  </ul>
);

export default async function Page({ params }: PageProps<"/[lang]/policy">) {
  const lang = (await params).lang as Lang;
  const t = getDictionary(lang).policy;

  return (
    <>
      <main
        id="main"
        className="mx-auto max-w-[1000px] px-5 pt-10 pb-20 text-[15px] leading-7 text-ink mobile:pt-5 mobile:pb-10 mobile:text-u-16 mobile:leading-[1.4]"
      >
        <h1 className="mb-8 text-center font-display text-3xl font-bold tracking-wide text-navy uppercase mobile:mb-5 mobile:text-u-23">
          {t.title}
        </h1>
        <p>
          {t.operated} <u>Takere</u>.
        </p>
        <p className={p}>{t.intro}</p>
        <p className={p}>{t.care}</p>
        <List items={t.topics} />

        <SeparatorRoot className="mt-10 mobile:mt-7" />
        <h2 className={h2}>{t.s1}</h2>
        <p className={p}>{t.s1Text}</p>

        <SeparatorRoot className="mt-10 mobile:mt-7" />
        <h2 className={h2}>{t.s2}</h2>
        <p className={p}>{t.s2Text}</p>

        <h3 className={h3}>{t.s21}</h3>
        <p className={p}>{t.s21Text}</p>
        <List items={t.data} />
        <p className={p}>{t.when}</p>
        <List items={t.moments} />
        <p className={p}>{t.why}</p>
        <List items={t.purposes} />

        <h3 className={h3}>{t.s23}</h3>
        <p className={p}>{t.s23Text}</p>

        <h3 className={h3}>{t.s24}</h3>
        {t.s24Text.map((x) => (
          <p key={x} className={p}>
            {x}
          </p>
        ))}
      </main>
      <Footer lang={lang} />
    </>
  );
}
