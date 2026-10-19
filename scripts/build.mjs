import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.resolve(root, 'dist');
if (path.dirname(output) !== path.resolve(root) || path.basename(output) !== 'dist') {
  throw new Error('Érvénytelen kimeneti könyvtár.');
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const entry of await readdir(path.join(root, 'public'))) {
  await cp(path.join(root, 'public', entry), path.join(output, entry), { recursive: true });
}
console.log('Elkészült a statikus oldal: dist/');
