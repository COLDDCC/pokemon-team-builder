import rawChart from '../../data/pokemon/type-chart.json';
import { pokemonTypes, type PokemonType } from '../../data/pokemon/schema';
const chart: Record<PokemonType, Record<PokemonType, number>> = rawChart;
// Chart rows are attacking types; columns are defending types. Dual-type damage multiplies.
export function effectiveness(attack: PokemonType, defenders: readonly PokemonType[]): number {
  return defenders.reduce((multiplier, defense) => multiplier * chart[attack][defense], 1);
}
export const targetTypes = pokemonTypes;
