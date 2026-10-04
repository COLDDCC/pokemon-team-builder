import type { PokemonType } from '../data/pokemon/schema';
const symbols: Record<PokemonType, string> = {
  Normal: 'M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z',
  Fire: 'M13 2c1 5-5 5-3 10-2-1-3-3-3-3-5 8 0 13 5 13 7 0 10-9 1-20Z',
  Water: 'M12 2S4 11 4 15a8 8 0 0 0 16 0c0-4-8-13-8-13Z',
  Electric: 'M13 2 5 14h6l-1 8 9-13h-6l1-7Z',
  Grass: 'M3 20C1 6 9 3 21 3c0 12-3 20-14 16L17 7 3 20Z',
  Ice: 'M12 2v20M3 7l18 10M3 17 21 7M8 4l4 3 4-3M8 20l4-3 4 3M3 11l4-1-1-4M21 13l-4 1 1 4',
  Fighting: 'M5 12V8h3V5h3v2h3v1h3v3h3v7l-4 4H8l-4-7v-3h1Z',
  Poison: 'M6 15C0 11 3 3 12 3s12 8 6 12v5h-4v-4h-4v4H6v-5ZM8 8h1M15 8h1',
  Ground: 'M2 20 8 8l4 7 4-11 6 16H2Z',
  Flying: 'M3 18C3 6 11 3 22 3L14 11h6l-9 6h5l-9 4-4-3Z',
  Psychic: 'M12 12c5-5 9 3 3 6C5 23-1 8 8 4c10-5 18 7 12 15',
  Bug: 'M8 8 5 3M16 8l3-5M4 9l4 3M20 9l-4 3M3 17l5-2M21 17l-5-2M12 7c-9 0-9 14 0 14s9-14 0-14ZM12 7v14',
  Rock: 'M3 17 5 6l9-3 7 7-3 11H8l-5-4ZM5 6l7 6 9-2M12 12 8 21',
  Ghost: 'M4 21V11a8 8 0 0 1 16 0v10l-4-3-4 3-4-3-4 3ZM8 10h1M15 10h1',
  Dragon: 'M3 20 6 10l7-8-1 6 7-2-2 6 5 4-8 5-1-6-5 6H3Z',
  Dark: 'M17 3a10 10 0 1 0 4 14A10 10 0 0 1 17 3Z',
  Steel: 'M7 3h10l5 9-5 9H7l-5-9 5-9ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
  Fairy: 'M12 2 15 9l7 3-7 3-3 7-3-7-7-3 7-3 3-7Z',
};
const colors: Record<PokemonType, string> = {Normal:'#737367',Fire:'#c44c18',Water:'#2866b6',Electric:'#947000',Grass:'#3f7e25',Ice:'#287f88',Fighting:'#a9342e',Poison:'#874799',Ground:'#926d28',Flying:'#7160ad',Psychic:'#bf3664',Bug:'#6d7d20',Rock:'#8b7630',Ghost:'#62528f',Dragon:'#6740be',Dark:'#594c43',Steel:'#596b80',Fairy:'#af4f85'};
export default function TypeIcon({ type }: { type: PokemonType }) {
  return <span className="type-icon" style={{backgroundColor:colors[type]}}><svg viewBox="0 0 24 24" aria-hidden="true"><path d={symbols[type]} fill={['Ice','Psychic','Bug','Rock'].includes(type) ? 'none' : 'currentColor'} fillRule="evenodd" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></span>;
}
