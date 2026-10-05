import { useState } from 'react';
import type { PokemonType } from '../data/pokemon/schema';
// Original assets from the official Pokémon Japanese Pokédex; see DATA_SOURCES.md.
export default function TypeIcon({ type }: { type: PokemonType }) {
  const [failed, setFailed] = useState(false);
  return <span className="type-icon">{failed ? <span className="type-icon-fallback">{type}</span> : <img src={`/type-icons/${type.toLowerCase()}.svg`} width="30" height="30" alt="" aria-hidden="true" onError={() => setFailed(true)}/>}</span>;
}
