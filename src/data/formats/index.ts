import gen3Raw from '../pokemon/gen3.json';
import { validatePokemonData, pokemonTypes } from '../pokemon/schema';
import { pokemon, pokemonById } from '../pokemon';
import type { Pokemon } from '../pokemon/schema';
export interface Format {
  id: string; name: string; game: string; generation: number; maxTeamSize: number; description: string;
}
export const formats: readonly Format[] = [{
  id: 'gen9-national-casual', name: 'National Dex · Casual', game: 'Generation 9', generation: 9, maxTeamSize: 6,
  description: 'Base species #001–1025, using Generation 9 data. A casual planning pool, not a VGC, ranked, or Showdown National Dex legality validator. Regional, Mega and alternate forms are not included yet.',
}, {
  id: 'gen3-national-casual', name: 'Gen 3 National Dex · Casual', game: 'Generation 3', generation: 3, maxTeamSize: 6,
  description: 'All 386 base species from Generations 1–3, with Generation 3 types, base stats and the 17-type chart. A cross-game planning pool for Ruby, Sapphire, Emerald, FireRed and LeafGreen; trading, events, version availability and competitive bans are not validated.',
}];
export const defaultFormat = formats[0];
export function getFormat(id: string | null | undefined): Format { return formats.find(f => f.id === id) ?? defaultFormat; }
export function isAllowed(p: Pokemon, format: Format): boolean { return p.generation <= format.generation && p.number <= 1025; }

const gen3Pokemon = validatePokemonData(gen3Raw);
const gen3ById = new Map(gen3Pokemon.map(p => [p.id, p]));
export function pokemonForFormat(format: Format): readonly Pokemon[] { return format.generation === 3 ? gen3Pokemon : pokemon; }
export function pokemonInFormat(id: string, format: Format): Pokemon | undefined { return (format.generation === 3 ? gen3ById : pokemonById).get(id); }
export function typesForFormat(format: Format) { return pokemonTypes.filter(t => format.generation !== 3 || t !== 'Fairy'); }
