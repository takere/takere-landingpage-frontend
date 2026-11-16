import { CardRoot } from "@heroui/react/card";
import NextLink from "next/link";
import { stats } from "@/data/stats";
import { getDictionary, href, type Lang } from "@/i18n";

export default function Stats({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).common.stats;
  const items = [
    { value: stats.students, label: t.students, path: "/team" },
    { value: stats.supervisions, label: t.supervisions, path: "/team" },
    { value: stats.publications, label: t.publications, path: "/publications" },
  ];

  return (
    <div className="grid grid-cols-3 gap-6 mobile:mx-auto mobile:max-w-68 mobile:grid-cols-2 mobile:gap-x-3 mobile:gap-y-4">
      {items.map((item) => (
        <NextLink
          key={item.label}
          href={href(lang, item.path)}
          className="group rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 mobile:last:col-span-2"
          data-reveal="up"
        >
          <CardRoot className="h-full items-center justify-center gap-2 bg-green py-7 text-center text-white transition duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_10px_24px_-6px_rgba(12,177,123,0.55)] mobile:gap-0 mobile:py-4">
            <span className="font-display text-4xl leading-none font-bold text-white mobile:text-u-27">
              {item.value}
            </span>
            <span className="text-sm font-semibold tracking-wider text-white/90 uppercase mobile:text-u-13">
              {item.label}
            </span>
          </CardRoot>
        </NextLink>
      ))}
    </div>
  );
}
