// Runs after `next build` (static export). Pages are generated under app/[lang], so the export
// contains pt.html, pt/team.html… but the public Portuguese URLs have no prefix ("/", "/team").
// In dev the middleware rewrites them; on a static host the files must live at the root instead:
//   pt.html -> index.html, pt.txt -> index.txt, pt/<page>.{html,txt} -> <page>.{html,txt}
// (.txt files are the RSC payloads the client router fetches on navigation: "/" -> /index.txt.)
import { copyFileSync, existsSync, readdirSync, renameSync, rmdirSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.NEXT_DIST_DIR || "out";
const locale = "pt"; // keep in sync with defaultLocale in i18n/config.ts

const move = (from, to) => {
  if (existsSync(to)) throw new Error(`flatten-default-locale: ${to} already exists`);
  renameSync(from, to);
};

for (const ext of ["html", "txt"]) {
  const from = join(outDir, `${locale}.${ext}`);
  if (existsSync(from)) move(from, join(outDir, `index.${ext}`));
}

const localeDir = join(outDir, locale);
if (existsSync(localeDir)) {
  for (const entry of readdirSync(localeDir)) move(join(localeDir, entry), join(outDir, entry));
  rmdirSync(localeDir);
}

// "/en" exists both as en.html and as the en/ folder. A static host may resolve the folder first
// (redirecting to "/en/"), so give each such folder an index too.
for (const entry of readdirSync(outDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  for (const ext of ["html", "txt"]) {
    const page = join(outDir, `${entry.name}.${ext}`);
    if (existsSync(page)) copyFileSync(page, join(outDir, entry.name, `index.${ext}`));
  }
}

if (!existsSync(join(outDir, "index.html"))) throw new Error(`flatten-default-locale: no index.html in ${outDir}`);
console.log(`flatten-default-locale: moved /${locale} pages to the root of ${outDir}/`);
