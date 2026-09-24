#!/usr/bin/env node
/**
 * One-off asset preparation for Porfi. Not part of the build.
 *
 *   node scripts/prepare-assets.mjs
 *
 * It does three things:
 *   1. Downloads the tech-stack logos that were previously hot-linked from unpkg / vectorlogo /
 *      raw.githubusercontent into public/logos, so the page has no third-party origins and no
 *      unpinned `@latest` redirect.
 *   2. Re-encodes public/assets/foto_orang.jpg (3376x6000, 12.6 MB) down to the largest size this
 *      layout can ever display.
 *   3. Regenerates the icon set from the existing brand mark: app/icon.png, app/apple-icon.png and
 *      public/favicon.ico, which had all been the same 1280x698, 197 KB PNG.
 */
import { mkdir, writeFile, rename } from "node:fs/promises";
import { statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const fromRoot = (...parts) => path.join(root, ...parts);
const kb = (file) => `${Math.round(statSync(file).size / 1024)} KB`;

const LOGOS = {
  "flutter.svg": "https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg",
  "nodejs.svg": "https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg",
  "nestjs.svg": "https://www.vectorlogo.zone/logos/nestjs/nestjs-icon.svg",
  "firebase.svg": "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
  "supabase.svg": "https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg",
  "revenuecat.svg": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/revenuecat.svg",
  "docker.svg": "https://www.vectorlogo.zone/logos/docker/docker-tile.svg",
  "git.svg": "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
  "postman.svg": "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
  "gemini.svg": "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
  "codex.svg": "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/codex-color.svg",
  "claudecode.svg": "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/claudecode-color.svg",
  "n8n.svg": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/n8n.svg",
  "figma.svg": "https://www.vectorlogo.zone/logos/figma/figma-icon.svg",
  "notion.svg": "https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/notion.svg",
  "github.svg": "https://www.vectorlogo.zone/logos/github/github-icon.svg",
  "hermesagent.svg": "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/hermesagent.svg",
};

async function downloadLogos() {
  const dir = fromRoot("public", "logos");
  await mkdir(dir, { recursive: true });

  for (const [name, url] of Object.entries(LOGOS)) {
    const response = await fetch(url, { redirect: "follow" });
    if (!response.ok) throw new Error(`${response.status} ${url}`);

    const body = await response.text();
    if (!body.includes("<svg")) throw new Error(`not an SVG: ${url}`);

    const file = path.join(dir, name);
    await writeFile(file, body.trim() + "\n");
    console.log(`  logo   ${name.padEnd(18)} ${kb(file)}`);
  }
}

async function optimizePortrait() {
  const source = fromRoot("public", "assets", "foto_orang.jpg");
  const { width, height, orientation } = await sharp(source).metadata();

  // 390 CSS px is the widest this portrait is ever drawn; 1600 px covers 4x DPR and stays above
  // every variant the layout asks for, so the optimizer never has to upscale.
  const target = fromRoot("public", "assets", "foto_orang.optimized.jpg");
  await sharp(source)
    .rotate() // bake in any EXIF orientation before the metadata is dropped
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(target);

  await rename(target, source);
  console.log(
    `  portrait ${width}x${height} orientation=${orientation ?? 1} -> ${await sharp(source).metadata().then((m) => `${m.width}x${m.height}`)} ${kb(source)}`
  );
}

/** Builds a real 48x48 ICO wrapping a PNG, which is what modern browsers expect. */
function toIco(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);

  return Buffer.concat([header, entry, pngBuffer]);
}

/** Pads the wide brand mark into a square canvas, which is exactly how browsers letterbox it today. */
async function squareIcon(source, size) {
  return sharp(source)
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function writeIcons() {
  const source = fromRoot("public", "assets", "logo-nonbg.png");

  const icon = fromRoot("app", "icon.png");
  await writeFile(icon, await squareIcon(source, 192));
  console.log(`  icon   app/icon.png      192x192  ${kb(icon)}`);

  const appleIcon = fromRoot("app", "apple-icon.png");
  await writeFile(appleIcon, await squareIcon(source, 180));
  console.log(`  icon   app/apple-icon.png 180x180  ${kb(appleIcon)}`);

  const favicon = fromRoot("public", "favicon.ico");
  await writeFile(favicon, toIco(await squareIcon(source, 48), 48));
  console.log(`  icon   public/favicon.ico 48x48    ${kb(favicon)}`);
}

console.log("tech logos");
await downloadLogos();
console.log("images");
await optimizePortrait();
console.log("icons");
await writeIcons();
