import { describe, expect, it } from 'vitest';
import { pokemonById, pokemon } from '../../data/pokemon';
import { pokemonTypes } from '../../data/pokemon/schema';
import { effectiveness } from './types';
import { analyzeTeam } from './index';
import { scoringConfig } from './config';
import { Dex } from '@pkmn/dex';
const get = (id: string) => pokemonById.get(id)!;
describe('Generation 9 type effectiveness', () => {
  it('handles single types, resistances, dual types, 4x weaknesses and immunity', () => {
    expect(effectiveness('Ground', ['Electric'])).toBe(2);
    expect(effectiveness('Water', ['Water'])).toBe(.5);
    expect(effectiveness('Rock', ['Fire','Flying'])).toBe(4);
    expect(effectiveness('Grass', ['Fire','Flying'])).toBe(.25);
    expect(effectiveness('Ground', ['Electric','Flying'])).toBe(0);
    expect(effectiveness('Dragon', ['Fairy'])).toBe(0);
    expect(effectiveness('Ghost', ['Normal'])).toBe(0);
  });
  it('matches the pinned upstream chart in all 324 matchups', () => {
    for (const attack of pokemonTypes) for (const defend of pokemonTypes) {
      const code = Dex.forGen(9).types.get(defend).damageTaken[attack];
      expect(effectiveness(attack, [defend])).toBe(code === 3 ? 0 : code === 1 ? 2 : code === 2 ? .5 : 1);
    }
  });
});
describe('deterministic scores', () => {
  it('returns a zero-score empty state without NaNs', () => {
    expect(analyzeTeam([]).scores).toEqual({offense:0, defense:0, coverage:0, synergy:0});
    expect(analyzeTeam([]).rating).toBe('No team');
  });
  it('reports repeated weaknesses and rewards a resisting teammate', () => {
    const team = ['charizard','moltres','hooh'].map(get);
    const analysis = analyzeTeam(team);
    expect(analysis.defense.find(r => r.type === 'Rock')?.quadruple).toHaveLength(3);
    expect(analysis.insights.some(i => i.text.includes('Rock attacks threaten 3'))).toBe(true);
    expect(analyzeTeam([...team, get('excadrill')]).scores.defense).toBeGreaterThan(analysis.scores.defense);
    expect(analyzeTeam([...team, get('excadrill')]).scores.synergy).toBeGreaterThan(analysis.scores.synergy);
  });
  it('counts type immunity and does not infer ability immunity', () => {
    expect(analyzeTeam([get('gengar')]).defense.find(r => r.type === 'Ground')?.multipliers).toEqual([2]);
    expect(analyzeTeam([get('dragonite')]).defense.find(r => r.type === 'Ground')?.immune).toEqual(['dragonite']);
  });
  it('computes coverage from actual matchups, with deterministic order-independent scores', () => {
    const team = ['pikachu','charizard','venusaur','blastoise','gengar','dragonite'].map(get);
    const a = analyzeTeam(team), b = analyzeTeam([...team].reverse());
    expect(a.scores).toEqual(b.scores); expect(a.total).toBe(b.total);
    expect(analyzeTeam(team)).toEqual(a);
    const expected = Object.entries(a.scores).reduce((n,[key,v]) => n + v * scoringConfig.weights[key as keyof typeof a.scores],0);
    expect(a.total).toBe(Math.round(expected));
    expect(a.coverage.find(r => r.type === 'Water')?.attackers).toContain('pikachu');
    expect(() => analyzeTeam([...team, get('eevee')])).toThrow();
  });
  it('keeps all scores finite and bounded across the full dataset', () => {
    for (const p of pokemon) {
      const a = analyzeTeam([p]);
      for (const value of [a.total, ...Object.values(a.scores)]) { expect(Number.isFinite(value)).toBe(true); expect(value).toBeGreaterThanOrEqual(0); expect(value).toBeLessThanOrEqual(100); }
    }
  });
});
