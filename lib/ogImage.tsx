import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDictionary, type Lang } from "@/i18n";

export const ogSize = { width: 1200, height: 630 };

/** Shared Open Graph / Twitter card image for both languages. */
export async function renderOgImage(lang: Lang) {
  const { seo } = getDictionary(lang);
  const logo = await readFile(join(process.cwd(), "public/img/brand/footer-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderBottom: "24px solid #0cb17b",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={720} height={240} alt="" />
        <div style={{ fontSize: 48, fontWeight: 700, color: "#001d4b", marginTop: 24 }}>{seo.ogTagline}</div>
        <div style={{ fontSize: 30, color: "#555555", marginTop: 16 }}>{seo.ogSubtitle}</div>
      </div>
    ),
    ogSize,
  );
}
