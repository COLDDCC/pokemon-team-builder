export const pokemonTypes = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'] as const;
export type PokemonType = typeof pokemonTypes[number];
export const statKeys = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'] as const;
export interface Pokemon {
  id: string; number: number; name: string; types: PokemonType[]; generation: number;
  stats: Record<typeof statKeys[number], number>;
}
export function validatePokemonData(input: unknown): Pokemon[] {
  if (!Array.isArray(input) || !input.length) throw new Error('Missing Pokémon data');
  const ids = new Set<string>();
  const numbers = new Set<number>();
  for (const row of input) {
    if (typeof row !== 'object' || row === null) throw new Error('Invalid Pokémon row');
    const p = row as Partial<Pokemon>;
    if (typeof p.id !== 'string' || !/^[a-z0-9]+$/.test(p.id) || ids.has(p.id)) throw new Error('Invalid or duplicate Pokémon ID');
    if (!Number.isInteger(p.number) || p.number! < 1 || p.number! > 1025 || numbers.has(p.number!)) throw new Error('Invalid or duplicate Pokédex number');
    if (typeof p.name !== 'string' || !p.name.trim() || !Number.isInteger(p.generation) || p.generation! < 1 || p.generation! > 9) throw new Error('Invalid name or generation');
    if (!Array.isArray(p.types) || p.types.length < 1 || p.types.length > 2 || new Set(p.types).size !== p.types.length || p.types.some(t => !pokemonTypes.includes(t))) throw new Error('Invalid types');
    const stats = p.stats;
    if (!stats || statKeys.some(k => !Number.isInteger(stats[k]) || stats[k] < 1 || stats[k] > 255)) throw new Error('Invalid stats');
    ids.add(p.id); numbers.add(p.number!);
  }
  return input as Pokemon[];
}
