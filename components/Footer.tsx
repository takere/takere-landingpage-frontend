import { LinkRoot as Link } from "@heroui/react/link";
import { SeparatorRoot as Separator } from "@heroui/react/separator";
import Image from "next/image";
import { CONTACT_EMAIL } from "@/data/contact";
import { getDictionary, href, type Lang } from "@/i18n";

export default function Footer({ lang }: { lang: Lang }) {
  const t = getDictionary(lang).common.footer;

  return (
    <footer id="contato" className="bg-navy text-white">
      <div className="container-site grid grid-cols-2 items-center gap-10 pt-16 pb-10 mobile:grid-cols-1 mobile:justify-items-center mobile:gap-4 mobile:py-8 mobile:text-center">
        <Image
          src="/img/brand/footer-logo.png"
          alt={t.logoAlt}
          width={264}
          height={89}
          className="h-auto w-66 justify-self-center mobile:w-52"
        />
        <div>
          <h3 className="mb-3 font-display text-3xl font-bold mobile:text-u-21">{t.contact}</h3>
          <p className="font-display leading-relaxed text-white/80 mobile:text-u-16">{t.email}</p>
          <Link
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-1 font-display font-bold text-white hover:decoration-white/60 mobile:text-u-16"
          >
            {CONTACT_EMAIL}
          </Link>
        </div>
      </div>
      <Separator className="bg-white/10" />
      <div className="container-site flex flex-wrap items-center justify-center gap-x-2 py-4 text-sm text-white/70 mobile:text-u-13">
        <span>{t.rights}</span>
        <span aria-hidden="true">·</span>
        <Link href={href(lang, "/policy")} className="text-sm font-normal text-white/90 hover:decoration-white/60 mobile:text-u-13">
          {t.policy}
        </Link>
      </div>
    </footer>
  );
}
