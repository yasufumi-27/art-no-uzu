// Generate delivery copies; never overwrite the supplied artwork or crop it.
import sharp from 'sharp';
import { readdir, mkdir, writeFile, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
const root = 'public/images';
const output = `${root}/responsive`;
await mkdir(output, { recursive: true });
const manifest = {};
const generated = new Set();
async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(name));
    else if (/\.webp$/.test(name)) files.push(name);
  }
  return files;
}
for (const file of [...await walk(`${root}/top`), ...await walk(`${root}/works`), ...await walk(`${root}/about`)]) {
  const { width, height } = await sharp(file).metadata();
  const source = '/' + file.slice('public/'.length);
  const stem = path.relative(root, file).replaceAll(path.sep, '-').replace(/\.webp$/, '');
  const sizes = /-thumb\.webp$/.test(file) ? [320, 480, width] : [640, 960, 1280, Math.min(1920, width)];
  const widths = [...new Set(sizes.filter(w => w <= width))].sort((a,b)=>a-b);
  const variants = [];
  for (const w of widths) {
    const name = `${stem}-${w}-q78.webp`;
    generated.add(name);
    const target = `${output}/${name}`;
    const fresh = await stat(target).then(s=>stat(file).then(f=>s.mtimeMs >= f.mtimeMs)).catch(()=>false);
    if (!fresh) await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78, effort: 4 }).toFile(target);
    variants.push([w, `/images/responsive/${name}`]);
  }
  if (width > 1920) variants.push([width, source]);
  manifest[source] = { width, height, variants };
}
for (const name of ['emblem', 'logotype', 'mark']) {
  generated.add(`${name}.webp`);
  await sharp(`${root}/logo/${name}.png`).resize({ width: name === "emblem" ? 420 : name === "logotype" ? 640 : 228, withoutEnlargement: true }).webp({ lossless: true, effort: 6 }).toFile(`${output}/${name}.webp`);
}
// This directory contains generated delivery copies only. Remove obsolete variants.
for (const name of await readdir(output)) {
  if (name.endsWith('.webp') && !generated.has(name)) await unlink(`${output}/${name}`);
}
await writeFile('lib/responsive-images.generated.json', JSON.stringify(manifest));
console.log(`responsive-images: ${Object.keys(manifest).length} source images (originals retained)`);
