// Pre-optimizes raster images for the static export (next/image optimization
// is off under `output: "export"`). Drop source PNG/JPG files in
// public/img/src/ and run `pnpm images`: each is emitted to public/img/ as
// WebP at 1x and 2x of TARGET_WIDTH (AVIF too when it's >20% smaller).
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const SRC_DIR = "./public/img/src";
const OUT_DIR = "./public/img";
const TARGET_WIDTH = 800;

try {
  await stat(SRC_DIR);
} catch {
  console.log(`No ${SRC_DIR} directory — nothing to optimize.`);
  process.exit(0);
}

await mkdir(OUT_DIR, { recursive: true });
const files = (await readdir(SRC_DIR)).filter((f) =>
  /\.(png|jpe?g)$/i.test(f)
);

for (const file of files) {
  const name = path.parse(file).name;
  const input = sharp(path.join(SRC_DIR, file));
  const { width } = await input.metadata();

  for (const scale of [1, 2]) {
    const w = Math.min(TARGET_WIDTH * scale, width || TARGET_WIDTH * scale);
    const suffix = scale === 1 ? "" : "@2x";
    const base = path.join(OUT_DIR, `${name}${suffix}`);

    const webp = await input
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    await sharp(webp).toFile(`${base}.webp`);

    const avif = await input
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .avif({ quality: 55 })
      .toBuffer();
    if (avif.length < webp.length * 0.8) {
      await sharp(avif).toFile(`${base}.avif`);
    }
    console.log(`${name}${suffix}: webp ${(webp.length / 1024).toFixed(0)}kB`);
  }
}
console.log(`Optimized ${files.length} image(s).`);
