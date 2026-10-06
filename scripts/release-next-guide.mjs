import { readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { featuredPokemonIds } from '../src/config/seo-pages.ts';
const archive = process.argv[2];
assert.ok(archive, 'Pass the archive checkout directory');
const archivedConfig = readFileSync(`${archive}/src/config/seo-pages.ts`, 'utf8');
const queue = [...archivedConfig.split(' as const;')[0].matchAll(/'([^']+)'/g)].map(match => match[1]);
const next = queue.find(id => !featuredPokemonIds.includes(id));
if (!next) { console.log('All guides are published.'); process.exit(0); }
const published = [...featuredPokemonIds, next];
for (const file of ['guides', 'guide-visuals']) {
  const source = readFileSync(`${archive}/src/data/${file}.ts`, 'utf8');
  const split = source.indexOf(' = {');
  const data = JSON.parse(source.slice(split + 3).trim().replace(/;$/, '').replace(/,\s*}/g, '}'));
  assert.ok(data[next], `Missing archived ${file} for ${next}`);
  const current = readFileSync(`src/data/${file}.ts`, 'utf8');
  const currentSplit = current.indexOf(' = {');
  const existing = JSON.parse(current.slice(currentSplit + 3).trim().replace(/;$/, '').replace(/,\s*}/g, '}'));
  for (const id of featuredPokemonIds) assert.ok(existing[id], `Missing published ${file} for ${id}`);
  const merged = Object.fromEntries(published.map(id => [id, id === next ? data[id] : existing[id]]));
  writeFileSync(`src/data/${file}.ts`, current.slice(0, currentSplit) + ' = ' + JSON.stringify(merged, null, 2) + ';\n');
}
const config = readFileSync('src/config/seo-pages.ts', 'utf8');
writeFileSync('src/config/seo-pages.ts', `export const featuredPokemonIds = ${JSON.stringify(published)} as const;\n` + config.slice(config.indexOf('\n') + 1));
console.log(`Prepared ${next}; ${published.length} published species.`);
