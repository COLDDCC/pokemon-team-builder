import { pokemon } from '../../data/pokemon';
import metadata from '../../data/pokemon/random-metadata.json';
import type { Pokemon } from '../../data/pokemon/schema';
export interface Filters { generation: string; type: string; special: boolean; evolved: boolean }
export const defaultFilters: Filters = { generation: '', type: '', special: true, evolved: false };
export function candidatePool(filters: Filters): Pokemon[] {
  return pokemon.filter(p => (!filters.generation || p.generation === Number(filters.generation)) && (!filters.type || p.types.some(t => t === filters.type)) && (filters.special || !metadata[p.id as keyof typeof metadata].special) && (!filters.evolved || metadata[p.id as keyof typeof metadata].fullyEvolved));
}
export function drawPokemon(pool: readonly Pokemon[], count: number, locked: readonly Pokemon[] = [], random = Math.random): Pokemon[] {
  const kept = [...new Map(locked.map(p => [p.id, p])).values()].slice(0, count);
  const remaining = pool.filter(p => !kept.some(k => k.id === p.id));
  for (let i = remaining.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [remaining[i], remaining[j]] = [remaining[j], remaining[i]]; }
  return [...kept, ...remaining.slice(0, Math.max(0, count - kept.length))];
}
export const transferKey = 'pokemon-random-team-transfer';
