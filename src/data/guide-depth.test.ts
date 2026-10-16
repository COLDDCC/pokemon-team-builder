import { describe, expect, it } from 'vitest';
import { featuredPokemonIds } from '../config/seo-pages';
import { guideDepth } from './guide-depth';

describe('published editorial depth', () => {
  it('covers every published species with distinct mechanics and decisions', () => {
    expect(Object.keys(guideDepth).sort()).toEqual([...featuredPokemonIds].sort());
    const mechanisms = new Set<string>();
    for (const id of featuredPokemonIds) {
      const content = guideDepth[id];
      mechanisms.add(content.mechanism);
      expect(content.decisions.length, id).toBeGreaterThanOrEqual(2);
      for (const text of [content.mechanism, ...content.decisions.flatMap(d => [d.when, d.action])]) {
        expect(text, id).not.toMatch(/<[^>]*>|\[TK|TODO/);
        expect((text.match(/\*\*/g) ?? []).length % 2, id).toBe(0);
      }
    }
    expect(mechanisms.size).toBe(featuredPokemonIds.length);
  });
});
