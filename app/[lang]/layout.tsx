import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RootShell from "@/components/RootShell";
import { isLang, locales } from "@/i18n";
import { siteMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata: Metadata = siteMetadata;
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Layout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <RootShell lang={lang}>{children}</RootShell>;
}
