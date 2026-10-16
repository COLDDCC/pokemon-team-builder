import gen3Chart from '../../data/pokemon/type-chart-gen3.json';
import rawChart from '../../data/pokemon/type-chart.json';
import { pokemonTypes, type PokemonType } from '../../data/pokemon/schema';
const chart: Record<PokemonType, Record<PokemonType, number>> = rawChart;
// Chart rows are attacking types; columns are defending types. Dual-type damage multiplies.
export function effectiveness(attack: PokemonType, defenders: readonly PokemonType[], generation = 9): number {
  return defenders.reduce((multiplier, defense) => multiplier * (generation === 3 ? (gen3Chart as Partial<Record<PokemonType, Partial<Record<PokemonType, number>>>>)[attack]?.[defense] ?? 1 : chart[attack][defense]), 1);
}
export const targetTypes = pokemonTypes;
