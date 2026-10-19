import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.resolve(root, 'dist');
const basePath = (process.env.BASE_PATH || '').replace(/\/$/, '');
if (!/^(\/[\w-]+)*$/.test(basePath)) {
  throw new Error('A BASE_PATH csak / jellel kezdődő útvonal lehet, például /Sunny-Spiritual-Soul.');
}
if (path.dirname(output) !== path.resolve(root) || path.basename(output) !== 'dist') {
  throw new Error('Érvénytelen kimeneti könyvtár.');
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of await readdir(path.join(root, 'public'))) {
  await cp(path.join(root, 'public', entry), path.join(output, entry), { recursive: true });
}
if (basePath) {
  for (const entry of await readdir(output, { recursive: true })) {
    if (!/\.(html|css)$/.test(entry)) continue;
    const file = path.join(output, entry);
    const source = await readFile(file, 'utf8');
    const content = source
      .replace(/\b(href|src)="\/(?!\/)/g, `$1="${basePath}/`)
      .replace(/\bsrcset="([^"]+)"/g, (_, sources) => `srcset="${sources.replace(/(^|,\s*)\/(?!\/)/g, `$1${basePath}/`)}"`)
      .replace(/url\((['"]?)\/(?!\/)/g, `url($1${basePath}/`);
    await writeFile(file, content, 'utf8');
  }
}
const assetVersions = new Map();
for (const entry of await readdir(output, { recursive: true })) {
  if (!/\.(css|js)$/.test(entry)) continue;
  const content = await readFile(path.join(output, entry));
  assetVersions.set(`${basePath}/${entry.replaceAll('\\', '/')}`, createHash('sha256').update(content).digest('hex').slice(0, 12));
}
for (const entry of await readdir(output, { recursive: true })) {
  if (!entry.endsWith('.html')) continue;
  const file = path.join(output, entry);
  const source = await readFile(file, 'utf8');
  const content = source.replace(/\b(href|src)="([^"]+)"/g, (match, attribute, url) => {
    const version = assetVersions.get(url);
    return version ? `${attribute}="${url}?v=${version}"` : match;
  });
  await writeFile(file, content, 'utf8');
}
console.log('Elkészült a statikus oldal: dist/');
