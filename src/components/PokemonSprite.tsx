import { useState } from 'react';
import type { Pokemon } from '../data/pokemon/schema';
const spriteBase = 'https://cdn.jsdelivr.net/gh/PokeAPI/sprites@a3a1432e688ea028f12c51371d5253037cb9f17b/sprites/pokemon';
export default function PokemonSprite({ pokemon, size = 'small', eager = false }: { pokemon: Pokemon; size?: 'small' | 'large'; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  return <span className={`pokemon-sprite sprite-${size}`} aria-hidden="true">
    {failed ? <span className="sprite-fallback">#{pokemon.number}</span> : <img key={pokemon.number} src={`${spriteBase}/${pokemon.number}.png`} alt="" width="96" height="96" loading={eager ? 'eager' : 'lazy'} decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)}/>}
  </span>;
}
