import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
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

const expectedSprites = new Set(JSON.parse(readFileSync('src/data/pokemon/pokemon.json', 'utf8')).map(entry => `${entry.number}.webp`));
let spriteBytes = 0;
for (const width of [160, 320]) {
  const directory = `dist/sprites/official/${width}`;
  assert.ok(existsSync(directory), `${directory} is missing. Build runs sprites:generate; a bare astro build has no artwork.`);
  const files = readdirSync(directory, { withFileTypes: true }).map(entry => entry.name);
  assert.deepEqual(new Set(files), expectedSprites, `${directory} must hold exactly one WebP per species`);
  const empty = files.filter(name => statSync(`${directory}/${name}`).size === 0);
  assert.deepEqual(empty, [], `${directory} contains empty sprites`);
  spriteBytes += files.reduce((total, name) => total + statSync(`${directory}/${name}`).size, 0);
}
assert.ok(spriteBytes < 40 * 1048576, `Bundled sprites should stay resized and local (${(spriteBytes / 1048576).toFixed(1)} MB)`);
console.log(`Verified 1025 local sprites in both sizes (${(spriteBytes / 1048576).toFixed(1)} MB, ${(spriteBytes / expectedSprites.size / 1024).toFixed(1)} KB per species)`);

const scoreFont = 'dist/fonts/archivo-black-digits.woff2';
assert.ok(statSync(scoreFont).size > 0, `${scoreFont} is missing or empty: the team score would fall back to the body font.`);
const bundledCss = readdirSync('dist/_astro').filter(name => name.endsWith('.css')).map(name => readFileSync(`dist/_astro/${name}`, 'utf8')).join('');
assert.ok(bundledCss.includes('/fonts/archivo-black-digits.woff2'), 'The bundled CSS must reference the score font by its origin-absolute path.');
console.log(`Verified the score font ships (${statSync(scoreFont).size} B) and is referenced by the bundled CSS`);
