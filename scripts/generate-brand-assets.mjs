// One-off brand asset generation: og-image.png, favicons, apple-touch-icon.
// Run from the closingbrackets repo root so its sharp devDependency resolves.
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const PUB = "./public";

// --- OG image (1200x630) -------------------------------------------------
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g1" cx="20%" cy="25%" r="55%">
      <stop offset="0%" stop-color="#5B4DFF" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#5B4DFF" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="82%" cy="80%" r="60%">
      <stop offset="0%" stop-color="#8B7CFF" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#8B7CFF" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="aurora" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8B7CFF"/>
      <stop offset="100%" stop-color="#C9D4FF"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#060714"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <!-- curly-brace devices -->
  <path d="M160 165 c-38 0 -44 19 -44 50 v50 c0 31 -12 44 -37 50 c25 6 37 19 37 50 v50 c0 31 6 50 44 50" stroke="#767D9E" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M1040 165 c38 0 44 19 44 50 v50 c0 31 12 44 37 50 c-25 6 -37 19 -37 50 v50 c0 31 -6 50 -44 50" stroke="#8B7CFF" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="600" y="290" text-anchor="middle" font-family="DejaVu Sans, sans-serif" font-weight="bold" font-size="76" fill="#EEF0FF">Closing Brackets</text>
  <text x="600" y="360" text-anchor="middle" font-family="DejaVu Sans, sans-serif" font-weight="bold" font-size="34" fill="url(#aurora)">Websites, software &amp; AI that pay for themselves</text>
  <text x="600" y="425" text-anchor="middle" font-family="DejaVu Sans, sans-serif" font-size="24" fill="#A8AECF">Consulting  ·  Software  ·  Marketing  ·  AI</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png({ quality: 90 }).toFile(`${PUB}/img/og-image.png`);
console.log("og-image.png written");

// --- Favicons -------------------------------------------------------------
// Solid-background mark so it reads at tiny sizes in any browser theme.
const iconSvg = () => `
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <rect width="256" height="256" rx="52" fill="#060714"/>
  <path d="M100 40 c-24 0 -28 12 -28 32 v28 c0 20 -8 26 -24 28 c16 2 24 8 24 28 v28 c0 20 4 32 28 32" stroke="#767D9E" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M156 40 c24 0 28 12 28 32 v28 c0 20 8 26 24 28 c-16 2 -24 8 -24 28 v28 c0 20 -4 32 -28 32" stroke="#8B7CFF" stroke-width="26" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const icon = Buffer.from(iconSvg());
await sharp(icon).resize(16, 16).png().toFile(`${PUB}/favicon-16x16.png`);
await sharp(icon).resize(32, 32).png().toFile(`${PUB}/favicon-32x32.png`);
await sharp(icon).resize(180, 180).png().toFile(`${PUB}/apple-touch-icon.png`);
console.log("favicons written");

// --- favicon.ico (single 32px PNG inside an ICO container; valid since Vista)
const png32 = await sharp(icon).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // count
const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0); // width
entry.writeUInt8(32, 1); // height
entry.writeUInt8(0, 2); // palette
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // planes
entry.writeUInt16LE(32, 6); // bpp
entry.writeUInt32LE(png32.length, 8); // size
entry.writeUInt32LE(22, 12); // offset
const ico = Buffer.concat([header, entry, png32]);
await writeFile(`${PUB}/favicon.ico`, ico);
await writeFile(`./src/app/favicon.ico`, ico);
console.log("favicon.ico written");
