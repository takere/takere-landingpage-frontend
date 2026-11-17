// Runs after `next build` (static export). Pages are generated under app/[lang], so the export
// contains pt.html, pt/team.html… but the public Portuguese URLs have no prefix ("/", "/team").
// In dev the middleware rewrites them; on a static host the files must live at the root instead:
//   pt.html -> index.html, pt.txt -> index.txt, pt/<page>.{html,txt} -> <page>.{html,txt}
// (.txt files are the RSC payloads the client router fetches on navigation: "/" -> /index.txt.)
import { copyFileSync, existsSync, readdirSync, renameSync, rmdirSync, writeFileSync } from "node:fs";
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

// "/en" exists both as en.html and as the en/ folder (same for "/publications"). GitHub Pages serves
// en.html for "/en", but "/en/" would hit the folder. A copy of the page there would be a duplicate URL,
// so the folder index only sends "/en/" on to "/en". The redirect runs only when the path ends in "/",
// so it can't loop even on a host that serves the folder index for "/en" too.
const redirectPage = (target) => `<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex">
<link rel="canonical" href="${target}"><title>Redirecting…</title>
<script>if(location.pathname.endsWith("/"))location.replace(location.pathname.replace(/\\/+$/,"")+location.search+location.hash)</script>
</head><body><a href="${target}">${target}</a></body></html>
`;

const addFolderIndexes = (dir, urlPrefix) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === "_next") continue;
    const folder = join(dir, entry.name);
    const url = `${urlPrefix}/${entry.name}`;
    if (existsSync(join(dir, `${entry.name}.html`))) writeFileSync(join(folder, "index.html"), redirectPage(url));
    if (existsSync(join(dir, `${entry.name}.txt`))) copyFileSync(join(dir, `${entry.name}.txt`), join(folder, "index.txt"));
    addFolderIndexes(folder, url);
  }
};
addFolderIndexes(outDir, "");

if (!existsSync(join(outDir, "index.html"))) throw new Error(`flatten-default-locale: no index.html in ${outDir}`);
console.log(`flatten-default-locale: moved /${locale} pages to the root of ${outDir}/`);
