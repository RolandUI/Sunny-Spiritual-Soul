import test from 'node:test';
import assert from 'node:assert/strict';
import { access, cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';

test('a repó és a webes források nem tartalmaznak géphez kötött adatokat', async () => {
  const root = new URL('../', import.meta.url);
  const directories = [''];
  const ignored = new Set(['.git','.preview','dist','node_modules']);
  const privateData = /\b[A-Z]:[\\/]|file:[\\/]{2,3}|\/(?:Users|home)\/[^\s/]+\/|[\\/]\.codex[\\/]|\b(?:codex-clipboard|exec)-[a-f\d-]{36}/i;
  for (const directory of directories) {
    for (const entry of await readdir(new URL(directory,root), { withFileTypes: true })) {
      const file = `${directory}${entry.name}`;
      if (entry.isDirectory()) {
        if (!ignored.has(entry.name)) directories.push(`${file}/`);
        continue;
      }
      if (!entry.isFile() || !/\.(md|html|css|js|mjs|json|ya?ml|txt|svg)$/.test(file)) continue;
      const content = await readFile(new URL(file,root),'utf8');
      assert.doesNotMatch(content,privateData,`${file}: géphez kötött adat`);
      if (file.startsWith('public/')) {
        assert.doesNotMatch(content,/\b(?:localhost|127\.0\.0\.1)\b|sourceMappingURL|\.preview[\\/]/i,`${file}: fejlesztői adat`);
      }
    }
  }
});

test('a build gyökércímen és GitHub Pages alútvonalon is működő hivatkozásokat készít', async t => {
  const workspace = await mkdtemp(path.join(tmpdir(), 'sunny-pages-'));
  t.after(async () => {
    assert.equal(path.dirname(workspace), path.resolve(tmpdir()));
    assert.ok(path.basename(workspace).startsWith('sunny-pages-'));
    await rm(workspace, { recursive: true, force: true });
  });
  await mkdir(path.join(workspace, 'scripts'));
  await cp(new URL('../scripts/build.mjs', import.meta.url), path.join(workspace, 'scripts/build.mjs'));
  await cp(new URL('../public/', import.meta.url), path.join(workspace, 'public'), { recursive: true });

  for (const basePath of ['', '/Sunny-Spiritual-Soul/']) {
    execFileSync(process.execPath, [path.join(workspace, 'scripts/build.mjs')], {
      env: { ...process.env, BASE_PATH: basePath },
    });
    const prefix = basePath || '/';
    const output = path.join(workspace, 'dist');
    for (const file of await readdir(output, { recursive: true })) {
      if (!/\.(html|css)$/.test(file)) continue;
      const content = await readFile(path.join(output, file), 'utf8');
      if (!basePath) assert.equal(content.replace(/\?v=[a-f\d]{12}/g, ''), await readFile(path.join(workspace, 'public', file), 'utf8'));
      const references = [
        ...[...content.matchAll(/(?:href|src)="([^"]+)"/g)].map(match => match[1]),
        ...[...content.matchAll(/srcset="([^"]+)"/g)].flatMap(match => match[1].split(',').map(source => source.trim().split(/\s+/)[0])),
        ...[...content.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)].map(match => match[1]),
      ];
      for (const reference of references) {
        const target = new URL(reference, `https://site.test${prefix}${file.replaceAll('\\', '/')}`);
        if (target.origin !== 'https://site.test') continue;
        assert.ok(target.pathname.startsWith(prefix), `${file}: ${reference}`);
        const local = target.pathname.slice(prefix.length);
        await access(path.join(output, local.endsWith('/') || !local ? `${local}index.html` : local));
      }
    }
    const html = await readFile(path.join(output, 'index.html'), 'utf8');
    assert.ok(html.includes('href="https://www.instagram.com/sunnyspiritualsoul/"'));
    assert.ok(html.includes('href="mailto:sunnyspiritualsoul@gmail.com"'));
    assert.ok(html.includes('href="#kapcsolat"'));
    await access(path.join(output, '404.html'));
    await access(path.join(output, '_headers'));
    for (const asset of ['fonts.css', 'styles.css', 'app.js', 'details.js']) {
      const hash = createHash('sha256').update(await readFile(path.join(output, asset))).digest('hex').slice(0, 12);
      assert.ok(html.includes(`"${prefix}${asset}?v=${hash}"`), `${asset}: tartalomfüggő verzió`);
    }

    // A new deployment must bypass cached styles and disclosure behavior.
    for (const asset of ['styles.css', 'details.js']) {
      const source = path.join(workspace, 'public', asset);
      await writeFile(source, `${await readFile(source, 'utf8')}\n/* build version test */\n`);
    }
    execFileSync(process.execPath, [path.join(workspace, 'scripts/build.mjs')], {
      env: { ...process.env, BASE_PATH: basePath },
    });
    const updatedHtml = await readFile(path.join(output, 'index.html'), 'utf8');
    for (const asset of ['styles.css', 'details.js']) {
      const hash = createHash('sha256').update(await readFile(path.join(output, asset))).digest('hex').slice(0, 12);
      const reference = `"${prefix}${asset}?v=${hash}"`;
      assert.ok(updatedHtml.includes(reference));
      assert.ok(!html.includes(reference), `${asset}: megváltozott tartalom új címet kap`);
      await cp(new URL(`../public/${asset}`, import.meta.url), path.join(workspace, 'public', asset));
    }
  }
});
