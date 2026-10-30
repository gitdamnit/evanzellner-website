import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';

// Verifies every internal href and asset reference in the built output.
// External links are deliberately not fetched: this check runs offline.
// Usage: npm run build && npm run check:links

const DIST = new URL('../dist/', import.meta.url);
const distPath = DIST.pathname;

const walk = async (dir) => {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
};

const files = await walk(distPath);
const htmlFiles = files.filter((file) => extname(file) === '.html');

let anchors = 0;
let assets = 0;
const failures = [];

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const page = '/' + file.slice(distPath.length).replace(/index\.html$/, '');

  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|tel:|#|data:)/.test(href)) continue;
    anchors += 1;

    const [rawPath] = href.split('#');
    const target = rawPath || page;
    const resolved = target.endsWith('/')
      ? join(distPath, target, 'index.html')
      : join(distPath, target);

    if (!existsSync(resolved) && !existsSync(join(distPath, target, 'index.html'))) {
      failures.push(`${page} → ${href} (missing ${resolved})`);
    }
  }

  for (const match of html.matchAll(/(?:src|href)="(\/[^"]+\.(?:png|jpg|jpeg|svg|pdf|css|js|xml|txt))"/g)) {
    const href = match[1];
    assets += 1;
    if (!existsSync(join(distPath, href))) {
      failures.push(`${page} → asset ${href} missing`);
    }
  }
}

// Anchor targets must exist on the page they point at, including cross-page
// links such as /projects/#current-development.
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const page = '/' + file.slice(distPath.length).replace(/index\.html$/, '');
  const idsOn = async (target) => {
    const path = target.endsWith('/')
      ? join(distPath, target, 'index.html')
      : join(distPath, target);
    if (!existsSync(path)) return null;
    const targetHtml = await readFile(path, 'utf8');
    return new Set([...targetHtml.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
  };

  for (const match of html.matchAll(/href="([^"]*#[^"]+)"/g)) {
    const href = match[1];
    if (/^https?:/.test(href)) continue;
    const [rawPath, hash] = href.split('#');
    const ids = rawPath ? await idsOn(rawPath) : new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
    if (!ids) continue; // missing page already reported by the link pass
    if (!ids.has(hash)) failures.push(`${page} → anchor #${hash} not found in ${rawPath || page}`);
  }
}

console.log(`Checked ${htmlFiles.length} pages: ${anchors} internal links, ${assets} asset references.`);

if (failures.length) {
  console.error(`\n${failures.length} problem(s):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log('All internal links, assets, and anchors resolve.');
