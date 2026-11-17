// Converts the site's images to WebP and caps their size (GitHub Pages has no image optimizer, so
// next/image serves files exactly as they are in public/). Run it after adding images:
//   yarn optimize-images
// then reference the new .webp file (e.g. photo("DD-MM-YYYY-description.webp", ...) in data/gallery.ts).
// Safe to re-run: .webp files already within the size cap are left alone.
// `sharp` ships with Next.js, so no extra dependency is needed.
import { readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { extname, join } from "node:path";
import sharp from "sharp";

const root = "public/assets/images";

/** Longest side, in px, per folder: about 2x the largest size the image is rendered at. */
const MAX_SIDE = {
  brand: 1100,
  gallery: 1600, // lightbox shows photos at up to 90vw
  home: 1600,
  icons: 128,
  partners: 480,
  research: 1200,
  team: 512, // avatars render at up to 256px
};

/** Kept in their original format: the social card (JPEG is safest for link previews) and the
 *  logo referenced by the JSON-LD (only resized). */
const KEEP_FORMAT = new Set(["brand/social-media.jpg", "brand/icon.png"]);
const KEEP_FORMAT_MAX_SIDE = { "brand/icon.png": 512 };

const kb = (bytes) => `${Math.round(bytes / 1024)}K`;
let before = 0;
let after = 0;

for (const folder of readdirSync(root)) {
  const max = MAX_SIDE[folder];
  if (!max) continue;
  for (const file of readdirSync(join(root, folder))) {
    const ext = extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) continue;
    const rel = `${folder}/${file}`;
    const src = join(root, rel);
    const size = statSync(src).size;
    const meta = await sharp(src).metadata();

    if (KEEP_FORMAT.has(rel)) {
      const cap = KEEP_FORMAT_MAX_SIDE[rel];
      if (!cap || Math.max(meta.width, meta.height) <= cap) continue;
      const tmp = `${src}.tmp`;
      const img = sharp(src).resize(cap, cap, { fit: "inside" });
      await (ext === ".png" ? img.png({ palette: true, quality: 90, effort: 10 }) : img.jpeg({ quality: 85, mozjpeg: true })).toFile(tmp);
      renameSync(tmp, src);
      before += size;
      after += statSync(src).size;
      console.log(`${rel}: ${kb(size)} -> ${kb(statSync(src).size)} (resized)`);
      continue;
    }

    if (ext === ".webp" && Math.max(meta.width, meta.height) <= max) continue;

    const out = join(root, folder, file.replace(/\.(png|jpe?g|webp)$/i, ".webp"));
    const tmp = `${out}.tmp`;
    await sharp(src)
      .rotate() // apply EXIF orientation before it's stripped
      .resize(max, max, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80, alphaQuality: 90, effort: 6 })
      .toFile(tmp);
    if (src !== out) rmSync(src);
    renameSync(tmp, out);
    before += size;
    after += statSync(out).size;
    console.log(`${rel} -> ${out.slice(root.length + 1)}: ${kb(size)} -> ${kb(statSync(out).size)}`);
  }
}

console.log(before ? `optimize-images: ${kb(before)} -> ${kb(after)}` : "optimize-images: nothing to do");
