import type { Pokemon, PokemonType } from '../../data/pokemon/schema';
import { scoringConfig as c } from './config';
import { effectiveness, targetTypes } from './types';
export interface DefenseRow { type: PokemonType; weak: string[]; quadruple: string[]; resist: string[]; immune: string[]; multipliers: number[]; }
export interface CoverageRow { type: PokemonType; multiplier: number; attackers: string[]; }
export interface Insight { kind: 'warning' | 'positive' | 'info'; text: string; }
export interface Analysis {
  total: number; scores: { offense: number; defense: number; coverage: number; synergy: number };
  rating: 'Poor' | 'Fair' | 'Good' | 'Excellent' | 'No team'; defense: DefenseRow[]; coverage: CoverageRow[]; insights: Insight[];
}
const clampScore = (v: number) => Math.round(Math.max(0, Math.min(100, v)));
export function analyzeTeam(team: readonly Pokemon[]): Analysis {
  if (team.length > c.maxTeamSize) throw new Error('A team can contain at most six Pokémon');
  const defense: DefenseRow[] = targetTypes.map(type => {
    const multipliers = team.map(p => effectiveness(type, p.types));
    return { type, multipliers, weak: team.filter((_, i) => multipliers[i] > 1).map(p => p.id), quadruple: team.filter((_, i) => multipliers[i] === 4).map(p => p.id), resist: team.filter((_, i) => multipliers[i] < 1).map(p => p.id), immune: team.filter((_, i) => multipliers[i] === 0).map(p => p.id) };
  });
  const coverage: CoverageRow[] = targetTypes.map(type => {
    const hits = team.map(p => Math.max(...p.types.map(attack => effectiveness(attack, [type]))));
    const multiplier = hits.length ? Math.max(...hits) : 0;
    return { type, multiplier, attackers: team.filter((_, i) => hits[i] > 1).map(p => p.id) };
  });
  if (!team.length) return { total: 0, scores: { offense: 0, defense: 0, coverage: 0, synergy: 0 }, rating: 'No team', defense, coverage, insights: [{ kind: 'info', text: 'Add your first Pokémon to see its strengths and weaknesses.' }] };
  const neutral = coverage.filter(row => row.multiplier >= 1).length / targetTypes.length;
  const superEffective = coverage.filter(row => row.multiplier > 1).length / targetTypes.length;
  const attackPower = team.reduce((sum, p) => sum + Math.min(1, Math.max(p.stats.atk, p.stats.spa) / c.offense.attackStatScale), 0) / team.length;
  const resistance = defense.filter(row => row.resist.length).length / targetTypes.length;
  const weaknessPressure = defense.reduce((sum, row) => sum
    + (row.resist.length === 0 ? row.weak.length / team.length * c.defense.unprotectedWeaknessPenalty : 0)
    + Math.max(0, row.weak.length - 1) / team.length * c.defense.repeatedWeaknessPenalty
    + row.quadruple.length / team.length * c.defense.quadruplePenalty, 0) / targetTypes.length;
  let weaknessPairs = 0, rescuedPairs = 0;
  for (const row of defense) for (const id of row.weak) { weaknessPairs++; if (row.resist.some(other => other !== id)) rescuedPairs++; }
  const rescue = weaknessPairs ? rescuedPairs / weaknessPairs : 1;
  // Role proxies are base-stat signals, not inferred moves or competitive roles.
  const physical = team.some(p => p.stats.atk > p.stats.spa);
  const special = team.some(p => p.stats.spa >= p.stats.atk);
  const bulky = team.some(p => p.stats.hp + p.stats.def + p.stats.spd >= c.synergy.bulkyTotal);
  const roles = [physical, special, bulky].filter(Boolean).length / c.synergy.roleCoverageCount;
  const fast = team.some(p => p.stats.spe >= c.synergy.fastSpeed) ? 1 : 0;
  const scores = {
    offense: clampScore(100 * (neutral * c.offense.neutralCoverageWeight + attackPower * c.offense.attackingStatsWeight)),
    defense: clampScore(100 * (resistance * c.defense.resistanceWeight + Math.max(0, 1 - weaknessPressure) * c.defense.safetyWeight)),
    coverage: clampScore(100 * superEffective),
    synergy: clampScore(100 * (rescue * c.synergy.rescueWeight + roles * c.synergy.roleWeight + fast * c.synergy.speedWeight)),
  };
  const total = clampScore(scores.offense * c.weights.offense + scores.defense * c.weights.defense + scores.coverage * c.weights.coverage + scores.synergy * c.weights.synergy);
  const rating = total >= c.ratings.excellent ? 'Excellent' : total >= c.ratings.good ? 'Good' : total >= c.ratings.fair ? 'Fair' : 'Poor';
  const insights: Insight[] = [];
  const risky = defense.filter(row => row.weak.length && !row.resist.length).sort((a, b) => b.weak.length - a.weak.length || b.quadruple.length - a.quadruple.length || a.type.localeCompare(b.type));
  for (const row of risky.slice(0, 2)) insights.push({ kind: 'warning', text: `${row.type} attacks threaten ${row.weak.length} of ${team.length} teammates, with no teammate resisting them by type.` });
  const repeated = defense.filter(row => row.weak.length >= 3 && row.resist.length).sort((a, b) => b.weak.length - a.weak.length || a.type.localeCompare(b.type))[0];
  if (repeated) insights.push({ kind: 'warning', text: `${repeated.weak.length} teammates share a ${repeated.type} weakness. You have a resistance, but switching options are limited.` });
  const quadruple = defense.find(row => row.quadruple.length);
  if (quadruple) insights.push({ kind: 'warning', text: `${team.filter(p => quadruple.quadruple.includes(p.id)).map(p => p.name).join(', ')} takes 4× damage from ${quadruple.type} attacks by type.` });
  insights.push({ kind: 'info', text: `Your own types can hit ${coverage.filter(row => row.multiplier > 1).length} of 18 single-type targets super effectively. Actual move coverage can differ.` });
  if (rescue > 0) insights.push({ kind: 'positive', text: `Teammate resistances cover ${Math.round(rescue * 100)}% of member–type weaknesses.` });
  if (!fast) insights.push({ kind: 'info', text: `No teammate has a base Speed of ${c.synergy.fastSpeed} or higher. Consider adding a faster option.` });
  return { total, scores, rating, defense, coverage, insights: insights.slice(0, c.maxInsights) };
}
