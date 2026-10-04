import PokemonSprite from './PokemonSprite';
import { useMemo, useState } from 'react';
import { pokemonById } from '../data/pokemon';
import { recommend, recommendBest, type Recommendation } from '../lib/recommendations';
import type { TeamState } from '../lib/url-state';
export default function TeamRecommendations({ state, currentScore, apply, lockedIds = [] }: { state: TeamState; lockedIds?: readonly string[]; currentScore: number; apply: (r: Recommendation) => void }) {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const emptySlot = state.slots.findIndex(id => !id);
  const targetSlot = selectedSlot ?? (emptySlot === -1 ? 0 : emptySlot);
  const results = useMemo(() => selectedSlot === null ? recommendBest(state, lockedIds) : state.slots[targetSlot] && lockedIds.includes(state.slots[targetSlot]!) ? [] : recommend(state, targetSlot), [state, targetSlot, selectedSlot, lockedIds]);
  const hasTeam = state.slots.some(Boolean);
  const replacement = state.slots[targetSlot] ? pokemonById.get(state.slots[targetSlot]!) : undefined;
  return <section className="recommendations" aria-labelledby="recommend-title">
    <div className="recommend-header"><div><p className="eyebrow">FIND A BETTER FIT</p><h2 id="recommend-title">Recommended Pokémon</h2></div><label>Slot to optimize<select aria-label="Slot to optimize" value={selectedSlot ?? 'auto'} onChange={e => setSelectedSlot(e.target.value === 'auto' ? null : Number(e.target.value))}><option value="auto">Auto · Best improvement</option>{state.slots.map((id, index) => <option key={index} value={index} disabled={Boolean(id && lockedIds.includes(id))}>Slot {index + 1} · {id ? `Replace ${pokemonById.get(id)?.name}` : 'Add a teammate'}</option>)}</select></label></div>
    <p className="recommend-note">{selectedSlot === null ? (emptySlot === -1 ? 'Comparing all unlocked teammates.' : 'Fill your empty slots first.') : replacement ? `Replacing ${replacement.name} in slot ${targetSlot + 1}.` : `Adding to empty slot ${targetSlot + 1}.`} Each candidate is scored using the same rules as your current team. Only positive score changes are shown.</p>
    {!hasTeam ? <p className="recommend-empty">Choose your first Pokémon above to get personalized teammate suggestions.</p> : !results.length ? <p className="recommend-empty">No available change improves this score. Keep your favorites, or unlock a teammate to compare replacements.</p> : <div className="recommend-grid">{results.map(r => { const outgoing = state.slots[r.targetSlot] ? pokemonById.get(state.slots[r.targetSlot]!) : undefined; return <article key={r.pokemon.id} className="recommend-card" data-testid="recommendation" data-pokemon={r.pokemon.id} data-new-score={r.newScore}>
      <div className="recommend-top"><PokemonSprite pokemon={r.pokemon} size="large"/><span className="delta">+{r.delta} pts</span></div>
      <h3>{r.pokemon.name}</h3><div className="type-badges">{r.pokemon.types.map(t => <span key={t} className={`type-badge type-${t.toLowerCase()}`}>{t}</span>)}</div>
      {outgoing && <p className="swap-summary">Replaces {outgoing.name}</p>}<p className="score-comparison">Team score {currentScore} → <strong>{r.newScore}</strong></p><details className="recommend-reasons"><summary>Why this Pokémon?</summary><ul>{r.reasons.map(reason => <li key={reason}>{reason}</li>)}</ul></details>
      <button className="button secondary" onClick={() => { apply(r); setSelectedSlot(null); }} aria-label={`${outgoing ? 'Replace with' : 'Add recommended'} ${r.pokemon.name}`}>{outgoing ? `Replace ${outgoing.name}` : 'Add to team'} ↗</button>
    </article>; })}</div>}
    <p className="recommend-note">Suggestions optimize this initial planning heuristic. Your preferences and actual battle strategy may favor another Pokémon.</p>
  </section>;
}
