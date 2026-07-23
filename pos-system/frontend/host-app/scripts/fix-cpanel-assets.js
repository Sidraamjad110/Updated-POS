/**
 * cPanel / Apache often hide or skip folders that start with "_".
 * Next.js static export always writes assets to `/_next/`.
 * This script renames that folder and rewrites references in exported files.
 */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'out');
const FROM = '_next';
const TO = 'next-assets';

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function main() {
  const fromDir = path.join(OUT, FROM);
  const toDir = path.join(OUT, TO);

  if (!fs.existsSync(OUT)) {
    console.error('out/ folder not found. Run next build first.');
    process.exit(1);
  }
  if (!fs.existsSync(fromDir)) {
    if (fs.existsSync(toDir)) {
      console.log(`Already using ${TO}/ — nothing to do.`);
      return;
    }
    console.error(`Missing ${FROM}/ in out/`);
    process.exit(1);
  }

  if (fs.existsSync(toDir)) {
    fs.rmSync(toDir, { recursive: true, force: true });
  }
  fs.renameSync(fromDir, toDir);
  console.log(`Renamed out/${FROM} -> out/${TO}`);

  const textExt = new Set(['.html', '.js', '.css', '.json', '.txt', '.xml', '.svg']);
  const replacements = [
    [`/${FROM}/`, `/${TO}/`],
    [`"${FROM}/`, `"${TO}/`],
    [`'${FROM}/`, `'${TO}/`],
  ];

  let changed = 0;
  for (const file of walk(OUT)) {
    const ext = path.extname(file).toLowerCase();
    if (!textExt.has(ext)) continue;
    let content = fs.readFileSync(file, 'utf8');
    let next = content;
    for (const [a, b] of replacements) {
      next = next.split(a).join(b);
    }
    if (next !== content) {
      fs.writeFileSync(file, next);
      changed += 1;
    }
  }
  console.log(`Rewrote /_next/ -> /${TO}/ in ${changed} files`);
}

main();
