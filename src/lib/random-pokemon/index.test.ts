import { describe, it, expect } from 'vitest';
import { candidatePool, defaultFilters, drawPokemon } from './index';
import { pokemon } from '../../data/pokemon';
describe('random Pokémon', () => {
  it('filters by introduction and modern typing', () => { const pool=candidatePool({...defaultFilters,generation:'1',type:'Fairy'});expect(pool.length).toBeGreaterThan(0);expect(pool.every(p=>p.generation===1&&p.types.includes('Fairy'))).toBe(true); });
  it('excludes legendary and mythical species but retains paradox species', () => {const pool=candidatePool({...defaultFilters,special:false});expect(pool.some(p=>p.id==='mewtwo'||p.id==='mew'||p.id==='articuno'||p.id==='pecharunt')).toBe(false);expect(pool.some(p=>p.id==='greattusk')).toBe(true);});
  it('uses modern final evolution status',()=>{const pool=candidatePool({...defaultFilters,evolved:true});expect(pool.some(p=>p.id==='pikachu'||p.id==='primeape')).toBe(false);expect(pool.some(p=>p.id==='annihilape')).toBe(true);});
  it('draws unique results and preserves locks',()=>{const result=drawPokemon(pokemon,6,[pokemon[24]],()=>.5);expect(result).toHaveLength(6);expect(new Set(result.map(p=>p.id)).size).toBe(6);expect(result).toContain(pokemon[24]);});
  it('handles empty and insufficient pools',()=>{expect(drawPokemon([],6)).toEqual([]);expect(drawPokemon(pokemon.slice(0,2),6)).toHaveLength(2);});
});
