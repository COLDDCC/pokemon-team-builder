import { describe, expect, it } from 'vitest';
import { emptyTeam, parseTeamState, setTeamSlot, teamUrl } from './index';
describe('team state', () => {
  it('round-trips a full team and holes without losing slot order', () => {
    for (const slots of [['pikachu','charizard','venusaur','blastoise','gengar','dragonite'], ['pikachu', null, 'mrmime', null, null, 'flabebe']]) {
      const state = { ...emptyTeam(), slots };
      expect(parseTeamState(new URL(teamUrl('https://example.com/?utm_source=test', state)).search).state).toEqual(state);
    }
  });
  it('repairs unknown, duplicate, excess and hostile input safely', () => {
    const result = parseTeamState('?format=unknown&team=pikachu,pikachu,nope,charizard,,gengar,dragonite');
    expect(result.repaired).toBe(true);
    expect(result.state.slots).toEqual(['pikachu', null, null, 'charizard', null, 'gengar']);
    expect(parseTeamState('?team=%3Cscript%3E').state).toEqual(emptyTeam());
    expect(parseTeamState('?v=999&team=pikachu').state).toEqual(emptyTeam());
    expect(parseTeamState('?team=' + 'a'.repeat(513)).state).toEqual(emptyTeam());
  });
  it('handles empty state and preserves unrelated query parameters', () => {
    expect(parseTeamState('').state).toEqual(emptyTeam());
    expect(new URL(teamUrl('https://example.com/?utm_source=test#main', emptyTeam())).searchParams.get('utm_source')).toBe('test');
  });
  it('adds, replaces and removes without allowing duplicates', () => {
    let state = setTeamSlot(emptyTeam(), 0, 'pikachu');
    expect(setTeamSlot(state, 1, 'pikachu')).toBe(state);
    state = setTeamSlot(state, 0, 'charizard');
    expect(state.slots[0]).toBe('charizard');
    expect(setTeamSlot(state, 0, null).slots[0]).toBe(null);
    expect(setTeamSlot(state, 8, 'gengar')).toBe(state);
    expect(setTeamSlot(state, 0, 'unknown')).toBe(state);
  });
});
