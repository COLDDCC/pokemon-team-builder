import { describe, expect, it } from 'vitest';
import { pokemon, pokemonById, normalizeSearch } from './index';
import { validatePokemonData } from './schema';
import { defaultFormat, getFormat, isAllowed } from '../formats';
describe('local data snapshot', () => {
  it('contains each base species exactly once', () => {
    expect(pokemon).toHaveLength(1025);
    expect(new Set(pokemon.map(p => p.number)).size).toBe(1025);
    expect(pokemonById.get('pikachu')?.types).toEqual(['Electric']);
    expect(pokemonById.get('charizard')?.types).toEqual(['Fire', 'Flying']);
    expect(pokemonById.get('pecharunt')?.number).toBe(1025);
  });
  it('rejects duplicate rows and invalid data', () => {
    expect(() => validatePokemonData([pokemon[0], pokemon[0]])).toThrow();
    expect(() => validatePokemonData([{...pokemon[0], types: ['Unknown']}])).toThrow();
    expect(() => validatePokemonData([{...pokemon[0], stats: {...pokemon[0].stats, hp: 0}}])).toThrow();
    expect(() => validatePokemonData(null)).toThrow();
  });
  it('normalizes punctuation and accented names', () => {
    expect(normalizeSearch('Flabébé')).toBe('flabebe');
    expect(normalizeSearch('Mr. Mime')).toBe('mrmime');
  });
  it('uses a safe default for unknown formats and allows the local pool', () => {
    expect(getFormat('invalid')).toBe(defaultFormat);
    expect(pokemon.every(p => isAllowed(p, defaultFormat))).toBe(true);
    expect(defaultFormat.maxTeamSize).toBe(6);
  });
});
