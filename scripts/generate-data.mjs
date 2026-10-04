import { Dex } from '@pkmn/dex';
import { writeFileSync } from 'node:fs';
const rows = Dex.forGen(9).species.all()
  .filter(s => s.exists && s.num > 0 && s.num <= 1025 && s.gen <= 9 && !s.forme && !s.isCosmeticForme && !['CAP', 'Custom', 'Future'].includes(s.isNonstandard))
  .map(s => ({ id: s.id, number: s.num, name: s.name, types: s.types, generation: s.gen, stats: s.baseStats }))
  .sort((a, b) => a.number - b.number);
if (rows.length !== 1025 || new Set(rows.map(s => s.number)).size !== 1025) throw new Error('Expected exactly 1025 base species');
writeFileSync(new URL('../src/data/pokemon/pokemon.json', import.meta.url), JSON.stringify(rows) + '\n');
console.log(`Generated ${rows.length} base species`);
