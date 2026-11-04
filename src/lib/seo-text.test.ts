import { describe, expect, it } from 'vitest';
import { featuredPokemonIds } from '../config/seo-pages';
import { pokemonById } from '../data/pokemon';
import { pokemonGuides } from '../data/guides';
import { buildGuideSeo, teammateSeo } from './seo-text';

describe('metadata for published guides', () => {
  it('keeps unique titles and useful descriptions in the SERP limits', () => {
    const titles = new Set<string>();
    for (const id of featuredPokemonIds) {
      const name = pokemonById.get(id)!.name;
      for (const seo of [buildGuideSeo(name, pokemonGuides[id]), teammateSeo(name, ['Garchomp', 'Corviknight', 'Rotom'])]) {
        expect(seo.title.length, id).toBeLessThanOrEqual(60);
        expect(seo.description.length, id).toBeLessThanOrEqual(155);
        expect(seo.description.toLowerCase(), id).toContain(name.toLowerCase());
        expect(titles.has(seo.title), seo.title).toBe(false);
        titles.add(seo.title);
      }
    }
  });
});
