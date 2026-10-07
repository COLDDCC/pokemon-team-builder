import raw from './pokemon.json' with { type: 'json' };
import { validatePokemonData } from './schema';
export const pokemon = validatePokemonData(raw);
export const pokemonById = new Map(pokemon.map(p => [p.id, p]));
export function normalizeSearch(value: string): string {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
}
