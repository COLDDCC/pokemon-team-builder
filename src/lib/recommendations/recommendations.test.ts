import { describe, expect, it } from 'vitest';
import { pokemonById } from '../../data/pokemon';
import { getFormat, isAllowed } from '../../data/formats';
import { analyzeTeam } from '../scoring';
import { emptyTeam, setTeamSlot } from '../url-state';
import { recommend } from './index';
const team = (slots: (string | null)[]) => ({...emptyTeam(), slots});
const members = (slots: (string | null)[]) => slots.flatMap(id => id ? [pokemonById.get(id)!] : []);
describe('computed recommendations', () => {
  it('returns no recommendations for empty teams or invalid slots', () => {
    expect(recommend(emptyTeam(), 0)).toEqual([]);
    expect(recommend(team(['pikachu',null,null,null,null,null]), -1)).toEqual([]);
    expect(recommend(team(['pikachu',null,null,null,null,null]), 6)).toEqual([]);
  });
  it('ranks legal additions by real score delta and never suggests a duplicate', () => {
    const state = team(['charizard','moltres','hooh',null,null,null]);
    const before = analyzeTeam(members(state.slots)).total;
    const rows = recommend(state, 3);
    expect(rows).toHaveLength(6);
    rows.forEach((r,i) => {
      expect(state.slots).not.toContain(r.pokemon.id);
      expect(isAllowed(r.pokemon, getFormat(state.format))).toBe(true);
      const after = analyzeTeam(members(setTeamSlot(state, r.targetSlot, r.pokemon.id).slots));
      expect(r.newScore).toBe(after.total); expect(r.delta).toBe(after.total - before); expect(r.delta).toBeGreaterThan(0);
      expect(r.reasons.length).toBeGreaterThan(0);
      if (i) expect(rows[i-1].delta).toBeGreaterThanOrEqual(r.delta);
    });
    expect(recommend(state, 3)).toEqual(rows);
    expect(state.slots).toEqual(['charizard','moltres','hooh',null,null,null]);
  });
  it('computes six-member replacements against the original full-team score', () => {
    const state = team(['charizard','moltres','hooh','talonflame','articuno','butterfree']);
    const before = analyzeTeam(members(state.slots)).total;
    const rows = recommend(state, 2);
    expect(rows.length).toBeGreaterThan(0);
    for (const r of rows) {
      const next = setTeamSlot(state, 2, r.pokemon.id);
      expect(next.slots).toHaveLength(6);
      expect(next.slots[0]).toBe('charizard'); expect(next.slots[3]).toBe('talonflame');
      expect(r.delta).toBe(analyzeTeam(members(next.slots)).total - before);
      expect(r.targetSlot).toBe(2);
    }
  });
  it('keeps caches separate for replacement slot and team changes', () => {
    const a = team(['charizard','pikachu',null,null,null,null]);
    const rows = recommend(a, 0);
    expect(recommend(a, 1).every(r => r.targetSlot === 1)).toBe(true);
    const b = setTeamSlot(a, 1, 'blastoise');
    expect(recommend(b, 0)).not.toEqual(rows);
  });
});
