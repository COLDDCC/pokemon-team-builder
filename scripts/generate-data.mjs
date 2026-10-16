import { Dex } from '@pkmn/dex';
import { writeFileSync } from 'node:fs';
const rows = Dex.forGen(9).species.all()
  .filter(s => s.exists && s.num > 0 && s.num <= 1025 && s.gen <= 9 && !s.forme && !s.isCosmeticForme && !['CAP', 'Custom', 'Future'].includes(s.isNonstandard))
  .map(s => ({ id: s.id, number: s.num, name: s.name, types: s.types, generation: s.gen, stats: s.baseStats }))
  .sort((a, b) => a.number - b.number);
if (rows.length !== 1025 || new Set(rows.map(s => s.number)).size !== 1025) throw new Error('Expected exactly 1025 base species');
writeFileSync(new URL('../src/data/pokemon/pokemon.json', import.meta.url), JSON.stringify(rows) + '\n');
console.log(`Generated ${rows.length} base species`);

const types = Dex.forGen(9).types.all().filter(t => t.name !== 'Stellar');
const chart = Object.fromEntries(types.map(attacker => [attacker.name,
  Object.fromEntries(types.map(defender => {
    const code = defender.damageTaken[attacker.name];
    const multiplier = code === 3 ? 0 : code === 1 ? 2 : code === 2 ? 0.5 : 1;
    return [defender.name, multiplier];
  })),
]));
if (types.length !== 18) throw new Error('Expected 18 standard types');
writeFileSync(new URL('../src/data/pokemon/type-chart.json', import.meta.url), JSON.stringify(chart) + '\n');

// Historical data must come from the historical Dex, not a modern species filter.
const gen3 = Dex.forGen(3);
const historical = gen3.species.all()
  .filter(s => s.exists && s.num > 0 && s.num <= 386 && s.gen <= 3 && !s.forme && !s.isCosmeticForme)
  .map(s => ({ id: s.id, number: s.num, name: s.name, types: s.types, generation: s.gen, stats: s.baseStats }))
  .sort((a, b) => a.number - b.number);
if (historical.length !== 386 || new Set(historical.map(s => s.number)).size !== 386) throw new Error('Expected 386 Gen 3 base species');
writeFileSync(new URL('../src/data/pokemon/gen3.json', import.meta.url), JSON.stringify(historical) + '\n');
const oldTypes = gen3.types.all().filter(t => t.exists && t.name !== 'Stellar' && t.name !== 'Fairy');
if (oldTypes.length !== 17) throw new Error('Expected 17 Gen 3 types');
const oldChart = Object.fromEntries(oldTypes.map(attack => [attack.name, Object.fromEntries(oldTypes.map(defense => {
  const code = defense.damageTaken[attack.name];
  return [defense.name, code === 3 ? 0 : code === 1 ? 2 : code === 2 ? 0.5 : 1];
}))]));
writeFileSync(new URL('../src/data/pokemon/type-chart-gen3.json', import.meta.url), JSON.stringify(oldChart) + '\n');
console.log(`Generated ${historical.length} historical species and ${oldTypes.length}-type chart`);
