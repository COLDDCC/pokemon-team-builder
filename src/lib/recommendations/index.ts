import { getFormat, isAllowed } from '../../data/formats';
import { pokemon, pokemonById } from '../../data/pokemon';
import type { Pokemon } from '../../data/pokemon/schema';
import { analyzeTeam, type Analysis } from '../scoring';
import { scoringConfig } from '../scoring/config';
import { setTeamSlot, type TeamState } from '../url-state';
export interface Recommendation { pokemon: Pokemon; targetSlot: number; newScore: number; delta: number; reasons: string[]; }
const cache = new Map<string, readonly Recommendation[]>();
const CACHE_LIMIT = 24;
const members = (state: TeamState) => state.slots.flatMap(id => { const p = id ? pokemonById.get(id) : undefined; return p ? [p] : []; });
function explain(before: Analysis, after: Analysis): string[] {
  const reasons: string[] = [];
  for (const row of before.defense.filter(r => r.weak.length && !r.resist.length)) {
    if (after.defense.find(r => r.type === row.type)!.resist.length) reasons.push(`Adds ${row.type} resistance or immunity`);
  }
  const addedCoverage = after.coverage.filter(row => row.multiplier > 1 && before.coverage.find(r => r.type === row.type)!.multiplier <= 1);
  if (addedCoverage.length) reasons.push(`Adds super-effective coverage against ${addedCoverage.map(r => r.type).slice(0, 3).join(', ')}${addedCoverage.length > 3 ? ' and more' : ''}`);
  if (after.scores.defense > before.scores.defense) reasons.push(`Defense ${before.scores.defense} → ${after.scores.defense}`);
  if (after.scores.synergy > before.scores.synergy) reasons.push(`Synergy ${before.scores.synergy} → ${after.scores.synergy}`);
  if (after.scores.offense > before.scores.offense) reasons.push(`Offense ${before.scores.offense} → ${after.scores.offense}`);
  return reasons.slice(0, 3);
}
// Evaluates local candidates using the exact displayed scoring engine. No API requests.
export function recommend(state: TeamState, targetSlot: number): readonly Recommendation[] {
  if (!Number.isInteger(targetSlot) || targetSlot < 0 || targetSlot >= 6 || state.slots.length !== 6) return [];
  const current = members(state);
  if (!current.length) return [];
  const key = JSON.stringify([scoringConfig.version, state.format, state.slots, targetSlot]);
  const cached = cache.get(key);
  if (cached) return cached;
  const format = getFormat(state.format), before = analyzeTeam(current);
  const existing = new Set(state.slots);
  const results: Recommendation[] = [];
  for (const candidate of pokemon) {
    if (existing.has(candidate.id) || !isAllowed(candidate, format)) continue;
    const next = setTeamSlot(state, targetSlot, candidate.id);
    const after = analyzeTeam(members(next));
    const delta = after.total - before.total;
    if (delta > 0) results.push({ pokemon: candidate, targetSlot, newScore: after.total, delta, reasons: explain(before, after) });
  }
  results.sort((a, b) => b.delta - a.delta || a.pokemon.number - b.pokemon.number);
  const top = results.slice(0, 6);
  if (cache.size >= CACHE_LIMIT) cache.delete(cache.keys().next().value!);
  cache.set(key, top);
  return top;
}

// Fill an empty slot first; full teams compare all unlocked replacement slots.
export function recommendBest(state: TeamState, lockedIds: readonly string[] = []): readonly Recommendation[] {
  if (state.slots.length !== 6 || !state.slots.some(Boolean)) return [];
  const empty = state.slots.findIndex(id => !id);
  if (empty !== -1) return recommend(state, empty);
  const rows = state.slots.flatMap((id, slot) => id && lockedIds.includes(id) ? [] : [...recommend(state, slot)]);
  rows.sort((a, b) => b.delta - a.delta || a.pokemon.number - b.pokemon.number || a.targetSlot - b.targetSlot);
  const seen = new Set<string>();
  return rows.filter(r => { if (seen.has(r.pokemon.id)) return false; seen.add(r.pokemon.id); return true; }).slice(0, 6);
}
