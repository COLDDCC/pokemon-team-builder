import type { PokemonGuide } from '../data/guides';

const MAX_TITLE = 60;
const MAX_DESCRIPTION = 155;

/** Truncate at a whole word, preserving the species name at the beginning. */
function limitWords(value: string, max = MAX_DESCRIPTION): string {
  if (value.length <= max) return value;
  const prefix = value.slice(0, max + 1);
  const cut = prefix.lastIndexOf(' ');
  return (cut > 0 ? prefix.slice(0, cut) : value.slice(0, max)).replace(/[ ,;:.]+$/, '') + '.';
}

export function buildGuideSeo(name: string, guide: PokemonGuide): { title: string; description: string } {
  const primary = `${name} Build: Best Moveset, Nature & Evolution`;
  const title = primary.length <= MAX_TITLE ? primary : `${name} Build: Moveset & Evolution`;
  const makeDescription = (secondMove: boolean, includeAbility: boolean) =>
    `${name} build: ${guide.item}${includeAbility ? `, ${guide.ability}` : ''}, ${guide.nature} nature with ${guide.moves[0]}${secondMove && guide.moves[1] ? ` and ${guide.moves[1]}` : ''}. Weaknesses, best teammates and how to evolve ${name}.`;
  let description = makeDescription(true, true);
  if (description.length > MAX_DESCRIPTION) description = makeDescription(false, true);
  if (description.length > MAX_DESCRIPTION) description = makeDescription(false, false);
  return { title, description: limitWords(description) };
}

export function teammateSeo(name: string, names: readonly string[]): { title: string; description: string } {
  const primary = `Best ${name} Teammates (Gen 9) – Team Builder`;
  const title = primary.length <= MAX_TITLE ? primary : `Best ${name} Teammates & Team Ideas`;
  const listed = names.length >= 3 ? `${names[0]}, ${names[1]} and ${names[2]}` : names.join(', ');
  const description = `Top teammates for ${name}: ${listed}, picked by type weaknesses and coverage. Start a ${name} team in the free builder.`;
  return { title, description: limitWords(description) };
}
