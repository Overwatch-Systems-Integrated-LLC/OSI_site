// One-time migration: extract the 9 static blog posts in public/blog/<slug>/index.html
// into an Astro content collection at src/content/blog/<slug>.md.
// Metadata comes from each post's BlogPosting JSON-LD; body from .article-body.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { parse } from 'node-html-parser';
import TurndownService from 'turndown';

const SRC = 'public/blog';
const OUT = 'src/content/blog';
mkdirSync(OUT, { recursive: true });

const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-', emDelimiter: '*' });

function readingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const dirs = readdirSync(SRC, { withFileTypes: true }).filter((d) => d.isDirectory());
let n = 0;
for (const d of dirs) {
  const slug = d.name;
  const file = `${SRC}/${slug}/index.html`;
  if (!existsSync(file)) continue;
  const root = parse(readFileSync(file, 'utf8'));

  // pull BlogPosting / Article JSON-LD
  let meta = {};
  for (const s of root.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const j = JSON.parse(s.text);
      const nodes = Array.isArray(j) ? j : j['@graph'] ? j['@graph'] : [j];
      for (const node of nodes) {
        if (node['@type'] === 'BlogPosting' || node['@type'] === 'Article') meta = node;
      }
    } catch { /* ignore malformed */ }
  }

  const body = root.querySelector('.article-body');
  if (!body) { console.log('SKIP (no .article-body):', slug); continue; }
  const md = td.turndown(body.innerHTML).trim();

  const esc = (s) => String(s || '').replace(/"/g, '\\"');
  const fm = [
    '---',
    `title: "${esc(meta.headline)}"`,
    `description: "${esc(meta.description)}"`,
    `pubDate: ${(meta.datePublished || '').slice(0, 10)}`,
    `category: "${esc(meta.articleSection) || 'Industrial Security'}"`,
    `author: "${esc((meta.author && meta.author.name) || 'Barry Fuller')}"`,
    `image: "${esc(meta.image)}"`,
    `readingTime: ${readingTime(body.text)}`,
    '---',
    '',
  ].join('\n');

  writeFileSync(`${OUT}/${slug}.md`, fm + md + '\n', 'utf8');
  console.log('OK', slug, `(${md.length} chars, ${readingTime(body.text)} min)`);
  n++;
}
console.log(`\nMigrated ${n} posts to ${OUT}`);
