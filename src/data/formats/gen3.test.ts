import { describe, expect, it } from 'vitest';
import { getFormat, pokemonForFormat, pokemonInFormat, typesForFormat } from './index';
import { analyzeTeam } from '../../lib/scoring';
import { effectiveness } from '../../lib/scoring/types';
import { recommend } from '../../lib/recommendations';
import { emptyTeam, parseTeamState, setTeamSlot } from '../../lib/url-state';
import { parseSavedTeams, serializeSavedTeams } from '../../lib/saved-teams';
const format = getFormat('gen3-national-casual');
const member = (id: string) => pokemonInFormat(id, format)!;
describe('Generation 3 rules across the builder', () => {
  it('loads all 386 historical species, including old typings and pre-buff stats', () => {
    expect(pokemonForFormat(format)).toHaveLength(386);
    expect(member('gardevoir').types).toEqual(['Psychic']);
    expect(member('mawile').types).toEqual(['Steel']);
    expect(member('clefable').types).toEqual(['Normal']);
    expect(member('pikachu').stats.def).toBe(30);
    expect(member('pikachu').stats.spd).toBe(40);
    expect(pokemonInFormat('garchomp', format)).toBeUndefined();
    expect(typesForFormat(format)).toHaveLength(17);
  });
  it('uses historical Steel resistances and 17-target coverage without changing modern rules', () => {
    expect(effectiveness('Ghost', ['Steel'], 3)).toBe(.5);
    expect(effectiveness('Dark', ['Steel'], 3)).toBe(.5);
    expect(effectiveness('Ghost', ['Steel'])).toBe(1);
    const analysis = analyzeTeam([member('mawile'), member('gardevoir')], 3);
    expect(analysis.defense).toHaveLength(17);
    expect(analysis.coverage).toHaveLength(17);
    expect(analysis.defense.some(r => r.type === 'Fairy')).toBe(false);
    expect(analysis.defense.find(r => r.type === 'Ghost')?.multipliers).toEqual([.5, 2]);
    expect(analysis.insights.some(i => i.text.includes('of 17'))).toBe(true);
  });
  it('rejects later species and restores the Gen 3 format in links and saved teams', () => {
    const state = setTeamSlot(emptyTeam(format.id), 0, 'gardevoir');
    expect(setTeamSlot(state, 1, 'garchomp')).toBe(state);
    const parsed = parseTeamState('?format=gen3-national-casual&team=gardevoir,garchomp');
    expect(parseTeamState('?team=gardevoir,garchomp', format.id).state).toEqual(parsed.state);
    expect(parsed.repaired).toBe(true);
    expect(parsed.state.slots.slice(0, 2)).toEqual(['gardevoir', null]);
    expect(parseSavedTeams(serializeSavedTeams([{id: 'gen3', name: 'Hoenn', state}]))[0].state).toEqual(state);
  });
  it('ranks only historical candidates and displays exactly the recalculated score', () => {
    const state = setTeamSlot(emptyTeam(format.id), 0, 'gardevoir');
    const before = analyzeTeam([member('gardevoir')], 3);
    const results = recommend(state, 1);
    expect(results.length).toBeGreaterThan(0);
    for (const r of results) {
      expect(r.pokemon.number).toBeLessThanOrEqual(386);
      expect(r.pokemon).toEqual(member(r.pokemon.id));
      const after = analyzeTeam([member('gardevoir'), r.pokemon], 3);
      expect(r.newScore).toBe(after.total);
      expect(r.delta).toBe(after.total - before.total);
    }
  });
});
