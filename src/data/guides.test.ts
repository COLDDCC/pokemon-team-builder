import { describe, expect, it } from 'vitest';
import { Dex } from '@pkmn/dex';
import { featuredPokemonIds } from '../config/seo-pages';
import { pokemonById } from './pokemon';
import { pokemonGuides } from './guides';
import { guideVisuals } from './guide-visuals';
const dex = Dex.forGen(9);
describe('published Pokémon guides, including previous batches', () => {
  it('provides a complete guide and valid linked species for every published page', () => {
    expect(Object.keys(pokemonGuides).sort()).toEqual([...featuredPokemonIds].sort());
    expect(Object.keys(guideVisuals).sort()).toEqual([...featuredPokemonIds].sort());
    for (const id of featuredPokemonIds) {
      const guide = pokemonGuides[id];
      expect(pokemonById.has(guide.alternative)).toBe(true);
      expect(guide.moves).toHaveLength(4);
      expect(new Set(guide.moves).size).toBe(4);
      for (const partner of guideVisuals[id].partners) {
        expect(pokemonById.has(partner.id)).toBe(true);
        expect(partner.id).not.toBe(id);
        expect(partner.reason.length).toBeGreaterThan(20);
      }
    }
  });
  it('uses valid abilities, items, natures and Gen 9 moves including pre-evolution learning', async () => {
    for (const id of featuredPokemonIds) {
      const guide = pokemonGuides[id];
      const species = dex.species.get(id);
      expect(Object.values(species.abilities), id).toContain(guide.ability);
      expect(dex.items.get(guide.item).exists, guide.item).toBe(true);
      expect(dex.natures.get(guide.nature).exists, guide.nature).toBe(true);
      for (const move of guide.moves) {
        let member = species;
        let found = false;
        while (member.exists) {
          const learnset = await dex.learnsets.get(member.id);
          if (learnset?.learnset?.[dex.moves.get(move).id]?.some(source => source.startsWith('9'))) { found = true; break; }
          if (!member.prevo) break;
          member = dex.species.get(member.prevo);
        }
        expect(found, `${id}: ${move}`).toBe(true);
      }
    }
  });
  it('keeps evolution chains consistent with the mechanics data', () => {
    for (const id of featuredPokemonIds) {
      const chain = guideVisuals[id].evolution;
      expect(chain.some(step => step.id === id)).toBe(true);
      chain.forEach((step, index) => {
        expect(pokemonById.has(step.id)).toBe(true);
        if (!index) return;
        const species = dex.species.get(step.id);
        expect(dex.species.get(species.prevo ?? "").id).toBe(chain[index - 1].id);
        if (species.evoLevel) expect(step.condition).toContain(String(species.evoLevel));
        if (species.evoItem) expect(step.condition).toContain(species.evoItem);
        if (species.evoType === 'trade') expect(step.condition).toContain('Trade');
        if (species.evoType === 'levelFriendship') expect(step.condition).toContain('friendship');
      });
    }
  });
});
