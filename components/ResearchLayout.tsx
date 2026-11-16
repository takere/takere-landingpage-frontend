import type { ReactNode } from "react";
import { getDictionary, type Lang } from "@/i18n";
import ResearchHeader from "./ResearchHeader";

/** Wraps pages under "Pesquisa" with the Research Lab logo and sub-navigation. */
export default function ResearchLayout({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <>
      <ResearchHeader lang={lang} t={getDictionary(lang).common.researchNav} />
      {children}
    </>
  );
}
