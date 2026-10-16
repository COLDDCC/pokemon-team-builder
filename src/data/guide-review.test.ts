import { describe, expect, it } from 'vitest';
import { featuredPokemonIds } from '../config/seo-pages';
import { guideDepth } from './guide-depth';
import { battleNotesAddedOn, formatReviewDate, movesetReviewedOn, reviewedSpeciesIds } from './guide-review';

describe('guide review dates', () => {
  it('names exactly the published species', () => {
    expect([...reviewedSpeciesIds].sort()).toEqual([...featuredPokemonIds].sort());
  });

  it('covers every species that has battle-notes copy', () => {
    for (const id of Object.keys(guideDepth)) expect(reviewedSpeciesIds, id).toContain(id);
  });

  it('keeps dates ISO in data and readable on the page', () => {
    for (const id of featuredPokemonIds) expect(battleNotesAddedOn(id), id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(formatReviewDate(movesetReviewedOn)).toBe('October 6, 2026');
    expect(formatReviewDate('2026-10-16')).toBe('October 16, 2026');
    expect(() => formatReviewDate('October 2026')).toThrow();
  });
});
