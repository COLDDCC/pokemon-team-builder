import { readFileSync, existsSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';
import { site as config } from '../src/config/site.ts';
import { featuredPokemonIds, indexablePaths } from '../src/config/seo-pages.ts';
const site = config.url;
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
assert.equal(paths.length, indexablePaths.length + 1, 'Sitemap should include all curated pages and About');
assert.equal(new Set(paths).size, paths.length);
for (const location of paths) {
  const url = new URL(location); assert.equal(url.origin, site); assert.equal(url.search, '');
  const file = url.pathname === '/' ? 'dist/index.html' : `dist${url.pathname}/index.html`;
  assert.ok(existsSync(file), `Missing page: ${file}`);
  const html = readFileSync(file, 'utf8');
  assert.equal((html.match(/<h1(?:>| )/g) ?? []).length, 1, `Each page needs exactly one H1: ${file}`);
  assert.ok(html.includes(`rel="canonical" href="${location}"`), `Invalid canonical: ${file}`);
  assert.ok(html.includes('application/ld+json'), `Missing structured data: ${file}`);
  assert.ok(html.includes('og:image'), `Missing OG image: ${file}`);
}
assert.ok(readFileSync('dist/404.html', 'utf8').includes('noindex, follow'));
assert.ok(readFileSync('dist/robots.txt', 'utf8').includes(`${site}/sitemap.xml`));
assert.ok(existsSync('dist/og.png'));
console.log(`Verified ${paths.length} static SEO pages, 404, robots and OG image`);

const generatedSpecies = readdirSync('dist/pokemon', {withFileTypes:true}).filter(entry => entry.isDirectory()).map(entry => entry.name).sort();
assert.deepEqual(generatedSpecies, [...featuredPokemonIds].sort(), 'Only published species may generate pages');
