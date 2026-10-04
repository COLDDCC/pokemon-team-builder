import type { Pokemon } from '../pokemon/schema';
export interface Format {
  id: string; name: string; game: string; generation: number; maxTeamSize: number; description: string;
}
export const formats: readonly Format[] = [{
  id: 'gen9-national-casual', name: 'National Dex · Casual', game: 'Generation 9', generation: 9, maxTeamSize: 6,
  description: 'Base species #001–1025, using Generation 9 data. A casual planning pool, not a VGC, ranked, or Showdown National Dex legality validator. Regional, Mega and alternate forms are not included yet.',
}];
export const defaultFormat = formats[0];
export function getFormat(id: string | null | undefined): Format { return formats.find(f => f.id === id) ?? defaultFormat; }
export function isAllowed(p: Pokemon, format: Format): boolean { return p.generation <= format.generation && p.number <= 1025; }
