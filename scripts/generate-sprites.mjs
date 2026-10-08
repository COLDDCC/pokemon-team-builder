import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const COMMIT = 'a3a1432e688ea028f12c51371d5253037cb9f17b';
const UPSTREAM = `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@${COMMIT}/sprites/pokemon/other/official-artwork`;
const WIDTHS = [160, 320];
const QUALITY = 78;
const CONCURRENCY = Number(process.env.SPRITE_CONCURRENCY ?? 8);
const force = process.argv.includes('--force');

const root = new URL('../', import.meta.url);
const file = relative => new URL(relative, root);
const output = (number, width) => file(`public/sprites/official/${width}/${number}.webp`);
const complete = number => WIDTHS.every(width => existsSync(output(number, width)));

const numbers = JSON.parse(await readFile(file('src/data/pokemon/pokemon.json'), 'utf8'))
  .map(p => p.number).sort((a, b) => a - b);
if (numbers.length !== 1025 || new Set(numbers).size !== 1025) {
  throw new Error(`Expected 1025 distinct National Dex numbers, found ${numbers.length}`);
}

async function download(number) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(`${UPSTREAM}/${number}.png`, { signal: AbortSignal.timeout(30_000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      if (attempt === 3) throw error;
      await new Promise(resolve => setTimeout(resolve, attempt * 500));
    }
  }
  throw new Error('unreachable');
}

async function readArtwork(number) {
  const cached = file(`.sprite-cache/${number}.png`);
  if (!force && existsSync(cached)) {
    const bytes = await readFile(cached);
    if (bytes.length) return bytes;
  }
  const png = await download(number);
  if (!png.length) throw new Error('empty response');
  await mkdir(file('.sprite-cache'), { recursive: true });
  await writeFile(cached, png);
  return png;
}

async function emit(number) {
  const png = await readArtwork(number);
  for (const width of WIDTHS) {
    const target = output(number, width);
    if (!force && existsSync(target) && (await readFile(target)).length) continue;
    await writeFile(target, await sharp(png).resize(width, width, { fit: 'inside' })
      .webp({ quality: QUALITY, effort: 6 }).toBuffer());
  }
}

await Promise.all(WIDTHS.map(width => mkdir(file(`public/sprites/official/${width}`), { recursive: true })));
const pending = numbers.filter(number => force || !complete(number));
const failures = await pool(pending, CONCURRENCY, emit);
if (failures.length) {
  console.error(`${failures.length} sprite(s) failed. First ten:`, failures.slice(0, 10));
  throw new Error('Sprite generation incomplete');
}

const missing = numbers.filter(number => !complete(number));
if (missing.length) throw new Error(`Missing generated sprites for ${missing.length} species, e.g. ${missing.slice(0, 10)}`);

let total = 0;
for (const number of numbers) for (const width of WIDTHS) total += (await readFile(output(number, width))).length;
console.log(`Sprites ready: ${numbers.length} species × ${WIDTHS.join('/')}px WebP, ${(total / 1048576).toFixed(1)} MB total, ${(total / numbers.length / 1024).toFixed(1)} KB per species (${force ? 'forced' : `${pending.length} fetched, ${numbers.length - pending.length} already current`}).`);

async function pool(items, size, worker) {
  let cursor = 0;
  const errors = [];
  const runners = Array.from({ length: Math.max(1, size) }, async () => {
    for (;;) {
      const index = cursor;
      cursor += 1;
      if (index >= items.length) return;
      try {
        await worker(items[index]);
      } catch (error) {
        errors.push({ number: items[index], message: error.message });
      }
    }
  });
  await Promise.all(runners);
  return errors;
}
