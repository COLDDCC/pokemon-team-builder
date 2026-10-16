// Editorial review dates for published build guides.
// `movesetReviewedOn` covers the starter moveset copy, which comes from `archive/102-guides`.
// Each release batch needs its own `battleNotesAddedOn` entry, otherwise a guide shows the
// date its battle notes were actually written. `guide-review.test.ts` fails if a published
// species is missing, so a new batch cannot ship silently with the previous batch's date.

export const movesetReviewedOn = '2026-10-06';

const battleNoteBatches = [
  {
    addedOn: '2026-10-16',
    speciesIds: [
      'pikachu', 'charizard', 'garchomp', 'gengar', 'dragonite', 'lucario',
      'corviknight', 'gastrodon', 'scizor', 'azumarill', 'gyarados', 'clefable',
      'raichu', 'arcanine', 'flygon', 'salamence', 'primarina', 'slowbro',
      'blastoise', 'venusaur', 'tyranitar', 'gardevoir', 'umbreon', 'sylveon',
      'amoonguss', 'skarmory',
    ],
  },
  {
    addedOn: '2026-10-16',
    speciesIds: [
      'quagsire', 'toxapex', 'mimikyu', 'snorlax', 'meowscarada', 'skeledirge',
      'quaquaval', 'dragapult', 'haxorus', 'goodra',
    ],
  },
];

const dateNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export function battleNotesAddedOn(id: string): string {
  const batch = battleNoteBatches.find(entry => entry.speciesIds.includes(id));
  if (!batch) throw new Error(`${id} has no battle-notes date; add it to a batch in src/data/guide-review.ts`);
  return batch.addedOn;
}

export function formatReviewDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day || !dateNames[month - 1]) throw new Error(`Unparseable review date: ${iso}`);
  return `${dateNames[month - 1]} ${day}, ${year}`;
}

export function reviewDatesFor(id: string): { moveset: string; battleNotes: string } {
  return { moveset: formatReviewDate(movesetReviewedOn), battleNotes: formatReviewDate(battleNotesAddedOn(id)) };
}

export const reviewedSpeciesIds = battleNoteBatches.flatMap(entry => entry.speciesIds);
