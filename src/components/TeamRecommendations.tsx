import { useMemo, useState } from 'react';
import { pokemonById } from '../data/pokemon';
import { recommend, type Recommendation } from '../lib/recommendations';
import type { TeamState } from '../lib/url-state';
export default function TeamRecommendations({ state, currentScore, apply }: { state: TeamState; currentScore: number; apply: (r: Recommendation) => void }) {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const emptySlot = state.slots.findIndex(id => !id);
  const targetSlot = selectedSlot ?? (emptySlot === -1 ? 0 : emptySlot);
  const results = useMemo(() => recommend(state, targetSlot), [state, targetSlot]);
  const hasTeam = state.slots.some(Boolean);
  const replacement = state.slots[targetSlot] ? pokemonById.get(state.slots[targetSlot]!) : undefined;
  return <section className="recommendations" aria-labelledby="recommend-title">
    <div className="recommend-header"><div><p className="eyebrow">FIND A BETTER FIT</p><h2 id="recommend-title">Recommended Pokémon</h2></div><label>Slot to optimize<select aria-label="Slot to optimize" value={targetSlot} onChange={e => setSelectedSlot(Number(e.target.value))}>{state.slots.map((id, index) => <option key={index} value={index}>Slot {index + 1} · {id ? `Replace ${pokemonById.get(id)?.name}` : 'Add a teammate'}</option>)}</select></label></div>
    <p className="recommend-note">{replacement ? `Replacing ${replacement.name} in slot ${targetSlot + 1}.` : `Adding to empty slot ${targetSlot + 1}.`} Each candidate is scored using the same rules as your current team. Only positive score changes are shown.</p>
    {!hasTeam ? <p className="recommend-empty">Choose your first Pokémon above to get personalized teammate suggestions.</p> : !results.length ? <p className="recommend-empty">No candidate improves the score for this slot. Try another replacement slot or keep your favorites.</p> : <div className="recommend-grid">{results.map(r => <article key={r.pokemon.id} className="recommend-card" data-testid="recommendation" data-pokemon={r.pokemon.id} data-new-score={r.newScore}>
      <div className="recommend-top"><span className={`mini-token type-${r.pokemon.types[0].toLowerCase()}`} aria-hidden="true">{r.pokemon.name.slice(0, 2).toUpperCase()}</span><span className="delta">+{r.delta} pts</span></div>
      <h3>{r.pokemon.name}</h3><div className="type-badges">{r.pokemon.types.map(t => <span key={t} className={`type-badge type-${t.toLowerCase()}`}>{t}</span>)}</div>
      <p className="score-comparison">Team score {currentScore} → <strong>{r.newScore}</strong></p><ul>{r.reasons.map(reason => <li key={reason}>{reason}</li>)}</ul>
      <button className="button secondary" onClick={() => { apply(r); setSelectedSlot(null); }} aria-label={`${replacement ? 'Replace with' : 'Add recommended'} ${r.pokemon.name}`}>{replacement ? `Replace ${replacement.name}` : 'Add to team'} ↗</button>
    </article>)}</div>}
    <p className="recommend-note">Suggestions optimize this initial planning heuristic. Your preferences and actual battle strategy may favor another Pokémon.</p>
  </section>;
}
