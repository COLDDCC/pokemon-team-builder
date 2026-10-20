import { useEffect, useMemo, useState } from 'react';
import { pokemonTypes, type Pokemon } from '../data/pokemon/schema';
import { candidatePool, defaultFilters, drawPokemon, transferKey, type Filters } from '../lib/random-pokemon';
import PokemonSprite from './PokemonSprite';
export default function RandomPokemonGenerator() {
  const [filters, setFilters] = useState(defaultFilters);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<Pokemon[]>([]);
  const [locked, setLocked] = useState<string[]>([]);
  const [notice, setNotice] = useState('Choose your filters, then generate a Pokémon.');
  const [ready, setReady] = useState(false);
  const pool = useMemo(() => candidatePool(filters), [filters]);
  useEffect(() => { if (window.location.hash === '#team') setCount(6); setReady(true); }, []);
  function change(next: Filters) { setFilters(next); setResults([]); setLocked([]); setNotice('Filters changed. Generate a new result.'); }
  function generate() {
    const kept = results.filter(p => locked.includes(p.id));
    const draws = drawPokemon(pool, count, kept);
    // Keep locked Pokémon in their original slots.
    const fresh = draws.filter(p => !locked.includes(p.id));
    const next = Array.from({length: draws.length}, (_, i) => locked.includes(results[i]?.id) ? results[i] : fresh.shift()!).filter(Boolean);
    setResults(next); setNotice(`${next.length} Pokémon generated.${next.length < count ? ` Only ${pool.length} match these filters.` : ''}`);
  }
  function reroll(index: number) {
    const available = pool.filter(p => !results.some(r => r.id === p.id));
    const next = drawPokemon(available, 1)[0];
    if (!next) { setNotice('No other Pokémon match. Try broader filters.'); return; }
    setResults(results.map((p,i) => i === index ? next : p)); setNotice(`Slot ${index + 1} rerolled.`);
  }
  function analyze() {
    try { sessionStorage.setItem(transferKey, JSON.stringify({ ids: results.map(p => p.id), created: Date.now() })); window.location.assign('/'); }
    catch { setNotice('Browser storage is unavailable. Copy the names and add them in the builder.'); }
  }
  async function copy() { try { await navigator.clipboard.writeText(results.map(p=>p.name).join(', ')); setNotice('Pokémon names copied.'); } catch { setNotice('Copy unavailable. Select the names below to copy them manually.'); } }
  return <section className="random-workspace" aria-label="Random Pokémon generator">
    <div className="random-controls">
      <label>How many?<select value={count} onChange={e=>{setCount(Number(e.target.value));setResults([]);setLocked([]);}}>{[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n === 6 ? '6 · Full team' : n}</option>)}</select></label>
      <label>First introduced in<select value={filters.generation} onChange={e=>change({...filters,generation:e.target.value})}><option value="">All generations</option>{[1,2,3,4,5,6,7,8,9].map(n=><option key={n} value={n}>Generation {n}</option>)}</select></label>
      <label>Type<select value={filters.type} onChange={e=>change({...filters,type:e.target.value})}><option value="">All types</option>{pokemonTypes.map(t=><option key={t}>{t}</option>)}</select></label>
      <button className="button primary" disabled={!ready || !pool.length} onClick={generate}>Generate{locked.length ? ' unlocked slots' : ''}</button>
    </div>
    <details className="random-advanced"><summary>More filters · {pool.length} eligible Pokémon</summary><label><input type="checkbox" checked={filters.special} onChange={e=>change({...filters,special:e.target.checked})}/> Include legendary and mythical Pokémon</label><label><input type="checkbox" checked={filters.evolved} onChange={e=>change({...filters,evolved:e.target.checked})}/> Fully evolved or does not evolve</label><p>Unique species only. Uses modern types; generation means first appearance, not availability in a specific game. Changing filters clears results and locks.</p></details>
    <p role="status">{!pool.length ? 'No Pokémon match. Change the type or generation.' : notice}</p>
    <div className={`random-results${count === 1 ? ' single-result' : ''}`}>
      {results.length ? results.map((p,i)=><article key={p.id} className="random-card"><span className="eyebrow">#{String(p.number).padStart(3,'0')}</span><PokemonSprite pokemon={p} size="large" eager/><h2>{p.name}</h2><p>{p.types.join(' / ')}</p><div><button className="button secondary" aria-pressed={locked.includes(p.id)} onClick={()=>setLocked(locked.includes(p.id) ? locked.filter(id=>id!==p.id) : [...locked,p.id])}>{locked.includes(p.id) ? 'Locked' : 'Lock'}</button><button className="button secondary" disabled={locked.includes(p.id)} onClick={()=>reroll(i)}>Reroll</button></div></article>) : <div className="random-empty">{count === 1 ? 'Your next Pokémon is one click away.' : 'Generate six unique Pokémon for your next team.'}</div>}
    </div>
    {results.length > 0 && <div className="random-actions"><button className="button primary" onClick={analyze}>Analyze {results.length === 1 ? 'this Pokémon' : 'this team'}</button><button className="button secondary" onClick={copy}>Copy names</button><button className="button secondary" onClick={()=>{setLocked([]);setResults([]);setFilters(defaultFilters);setNotice('Reset. Ready to generate.');}}>Reset</button></div>}
    <noscript>Enable JavaScript to generate random Pokémon.</noscript>
  </section>;
}
