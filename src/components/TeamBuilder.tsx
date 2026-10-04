import { parseSavedTeams, savedTeamsKey, serializeSavedTeams, type SavedTeam } from '../lib/saved-teams';
import TeamRecommendations from './TeamRecommendations';
import type { Recommendation } from '../lib/recommendations';
import TeamAnalysis from './TeamAnalysis';
import { analyzeTeam } from '../lib/scoring';
import { useEffect, useMemo, useRef, useState } from 'react';
import { formats, getFormat, isAllowed } from '../data/formats';
import { normalizeSearch, pokemon, pokemonById } from '../data/pokemon';
import { pokemonTypes, type Pokemon } from '../data/pokemon/schema';
import { emptyTeam, parseTeamState, setTeamSlot, teamUrl, type TeamState } from '../lib/url-state';
function TypeBadges({ item }: { item: Pokemon }) {
  return <span className="type-badges">{item.types.map(t => <span key={t} className={`type-badge type-${t.toLowerCase()}`}>{t}</span>)}</span>;
}
export default function TeamBuilder({ initialPokemon, focus = 'all' }: { initialPokemon?: string; focus?: 'all' | 'weakness' | 'coverage' }) {
  const [team, setTeam] = useState<TeamState>(() => initialPokemon ? setTeamSlot(emptyTeam(), 0, initialPokemon) : emptyTeam());
  const [savedTeams, setSavedTeams] = useState<SavedTeam[]>([]);
  const [teamName, setTeamName] = useState('');
  const [undoStack, setUndoStack] = useState<TeamState[]>([]);
  const [ready, setReady] = useState(false);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [generation, setGeneration] = useState('');
  const [limit, setLimit] = useState(60);
  const [message, setMessage] = useState('');
  const [shareLink, setShareLink] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const format = getFormat(team.format);
  const members = team.slots.map(id => id ? pokemonById.get(id) : undefined);
  const selectedPokemon = useMemo(() => team.slots.flatMap(id => { const p = id ? pokemonById.get(id) : undefined; return p ? [p] : []; }), [team]);
  const analysis = useMemo(() => analyzeTeam(selectedPokemon), [selectedPokemon]);
  const count = selectedPokemon.length;
  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(window.location.search);
      const parsed = params.has('team') || params.has('v') || params.has('format') ? parseTeamState(window.location.search) : { state: initialPokemon ? setTeamSlot(emptyTeam(), 0, initialPokemon) : emptyTeam(), repaired: false };
      setTeam(parsed.state); setUndoStack([]);
      setMessage(parsed.repaired ? 'Some invalid or duplicate entries in this link were removed.' : '');
      setShareLink('');
    };
    restore();
    try { setSavedTeams(parseSavedTeams(localStorage.getItem(savedTeamsKey))); } catch { /* Storage may be blocked; sharing still works. */ }
    setReady(true);
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, [initialPokemon]);
  useEffect(() => {
    if (activeSlot !== null && !dialog.current?.open) { dialog.current?.showModal(); search.current?.focus(); }
  }, [activeSlot]);
  const results = useMemo(() => {
    const key = normalizeSearch(query);
    return pokemon.filter(p => isAllowed(p, format) && (!key || normalizeSearch(p.name).includes(key) || String(p.number) === query.trim().replace(/^#?0*/, '')) && (!type || p.types.includes(type as typeof pokemonTypes[number])) && (!generation || p.generation === Number(generation)));
  }, [query, type, generation, format]);
  function update(next: TeamState, notice: string, remember = true) {
    if (remember) setUndoStack(old => [...old.slice(-19), team]);
    setTeam(next); setShareLink(''); setMessage(notice);
    window.history.replaceState(null, '', teamUrl(window.location.href, next));
  }
  function undo() {
    const previous = undoStack.at(-1);
    if (!previous) return;
    setUndoStack(old => old.slice(0, -1));
    update(previous, 'Previous team restored.', false);
  }
  function persistSaved(next: SavedTeam[], notice: string) {
    try {
      localStorage.setItem(savedTeamsKey, serializeSavedTeams(next));
      setSavedTeams(next); setMessage(notice); return true;
    } catch { setMessage('Browser storage is unavailable or full. Use Share team to keep a copy.'); return false; }
  }
  function saveTeam() {
    if (!count || !teamName.trim()) return;
    if (savedTeams.length >= 20) { setMessage('You have 20 saved teams. Delete one before saving another.'); return; }
    if (persistSaved([...savedTeams, { id: crypto.randomUUID(), name: teamName.trim().slice(0, 60), state: team }], 'Team saved in this browser.')) setTeamName('');
  }
  function applyRecommendation(r: Recommendation) {
    const next = setTeamSlot(team, r.targetSlot, r.pokemon.id);
    if (next === team) return;
    const newScore = analyzeTeam(next.slots.flatMap(id => id ? [pokemonById.get(id)!] : [])).total;
    update(next, `${r.pokemon.name} added to slot ${r.targetSlot + 1}. Team score ${analysis.total} → ${newScore}.`);
  }
  function openSlot(index: number, button: HTMLButtonElement) {
    opener.current = button; setQuery(''); setType(''); setGeneration(''); setLimit(60); setActiveSlot(index);
  }
  function closePicker() { dialog.current?.close(); }
  function choose(p: Pokemon) {
    if (activeSlot === null) return;
    const next = setTeamSlot(team, activeSlot, p.id);
    if (next === team) return;
    update(next, `${p.name} added to slot ${activeSlot + 1}.`);
    closePicker();
  }
  async function share() {
    const link = teamUrl(window.location.href, team);
    setShareLink(link);
    try { await navigator.clipboard.writeText(link); setMessage('Team link copied. Open it in another browser to restore your team.'); }
    catch { setMessage('Copy the team link below to share your team.'); }
  }
  return <>
    <section className="builder" aria-labelledby="team-title">
      <div className="builder-toolbar"><div><p className="eyebrow">TEAM WORKSPACE</p><h2 id="team-title">Your team <span className="count">{count} / 6</span></h2></div><div className="toolbar-actions"><button className="button secondary" disabled={!ready || !undoStack.length} onClick={undo}>Undo</button><button className="button secondary" disabled={!ready || !count} onClick={() => update(emptyTeam(), 'Team cleared.')}>Clear team</button><button className="button primary" disabled={!ready} onClick={share}>Share team ↗</button></div></div>
      <div className="format-fields"><label>Game<select aria-label="Game" value="gen9" onChange={() => {}}><option value="gen9">Generation 9</option></select></label><label>Format<select aria-label="Format" value={team.format} onChange={e => update({ ...team, format: e.target.value }, 'Format updated.')} >{formats.map(f => <option value={f.id} key={f.id}>{f.name}</option>)}</select></label></div>
      <p className="format-note">{format.description}</p>
      <div className="team-grid">{members.map((p, index) => <article className={`team-card ${p ? 'filled' : ''}`} key={index} data-testid={`slot-${index}`}>
        <span className="slot-number">SLOT 0{index + 1}</span>
        {p ? <><div className={`pokemon-token type-${p.types[0].toLowerCase()}`} aria-hidden="true">{p.name.slice(0, 2).toUpperCase()}</div><span className="dex-number">#{String(p.number).padStart(3, '0')}</span><h3>{p.name}</h3><TypeBadges item={p}/><div className="card-actions"><button onClick={e => openSlot(index, e.currentTarget)} aria-label={`Replace ${p.name}`}>Replace</button><button onClick={() => update(setTeamSlot(team, index, null), `${p.name} removed.`)} aria-label={`Remove ${p.name}`}>Remove</button></div></> : <button className="empty-slot" disabled={!ready} onClick={e => openSlot(index, e.currentTarget)} aria-label={`Add Pokémon to slot ${index + 1}`}><span className="plus" aria-hidden="true">+</span><strong>Add Pokémon</strong><span>Choose your next teammate</span></button>}
      </article>)}</div>
      <p className="live-message" role="status">{message || (ready ? 'Click any empty slot to start. Search 1,025 Pokémon by name or Pokédex number.' : 'Loading team workspace…')}</p>
      {shareLink && <label className="share-field">Your team link<input readOnly value={shareLink} onFocus={e => e.currentTarget.select()}/></label>}
      <details className="saved-teams"><summary>Saved teams · {savedTeams.length}</summary>
        <p>Keep up to 20 teams in this browser. Use Share team to move them to another device. Clearing browser data removes saved teams.</p>
        <form className="save-team-form" onSubmit={e => { e.preventDefault(); saveTeam(); }}><label>Team name<input value={teamName} maxLength={60} onChange={e => setTeamName(e.target.value)} placeholder="My adventure team" /></label><button className="button secondary" disabled={!ready || !count || !teamName.trim()}>Save current team</button></form>
        {!savedTeams.length && <p>No saved teams yet.</p>}
        <ul>{savedTeams.map(saved => <li key={saved.id}><div><strong>{saved.name}</strong><span>{saved.state.slots.filter(Boolean).length}/6 · {saved.state.slots.flatMap(id => id ? [pokemonById.get(id)!.name] : []).join(', ')}</span></div><div className="toolbar-actions"><button className="button secondary" onClick={() => update(saved.state, `${saved.name} loaded.`)} aria-label={`Load ${saved.name}`}>Load</button><button className="button secondary" onClick={() => persistSaved(savedTeams.filter(t => t.id !== saved.id), `${saved.name} deleted.`)} aria-label={`Delete ${saved.name}`}>Delete</button></div></li>)}</ul>
      </details>
      <noscript><p>Enable JavaScript to search, edit, and share your Pokémon team.</p></noscript>
    </section>
    <TeamAnalysis team={selectedPokemon} analysis={analysis} focus={focus}/>
    <TeamRecommendations state={team} currentScore={analysis.total} apply={applyRecommendation}/>
    <dialog ref={dialog} className="pokemon-dialog" aria-labelledby="picker-title" onKeyDown={e => { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closePicker(); } }} onClose={() => { setActiveSlot(null); opener.current?.focus(); }} onClick={e => { if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closePicker(); } }}>
      <div className="dialog-head"><div><p className="eyebrow">FIND YOUR NEXT PICK</p><h2 id="picker-title">Choose Pokémon · Slot {(activeSlot ?? 0) + 1}</h2></div><button className="close-button" onClick={closePicker} aria-label="Close Pokémon picker">×</button></div>
      <label className="search-label">Name or Pokédex number<input ref={search} value={query} onChange={e => { setQuery(e.target.value); setLimit(60); }} placeholder="Try Pikachu, Garchomp, or #025" type="search" /></label>
      <div className="filter-fields"><label>Type<select aria-label="Type" value={type} onChange={e => { setType(e.target.value); setLimit(60); }}><option value="">All types</option>{pokemonTypes.map(t => <option key={t}>{t}</option>)}</select></label><label>Generation<select aria-label="Generation" value={generation} onChange={e => { setGeneration(e.target.value); setLimit(60); }}><option value="">All generations</option>{Array.from({ length: 9 }, (_, i) => <option key={i} value={i + 1}>Generation {i + 1}</option>)}</select></label></div>
      <p className="result-count" role="status">{results.length} Pokémon found · already selected teammates are disabled</p>
      <div className="pokemon-results">{results.slice(0, limit).map(p => {
        const selected = team.slots.some((id, index) => index !== activeSlot && id === p.id);
        return <button key={p.id} className="result-card" disabled={selected} onClick={() => choose(p)} aria-label={selected ? `${p.name}, already in team` : `Choose ${p.name}`}><span className={`mini-token type-${p.types[0].toLowerCase()}`} aria-hidden="true">{p.name.slice(0, 2).toUpperCase()}</span><span className="result-info"><span className="dex-number">#{String(p.number).padStart(3, '0')}{selected ? ' · In team' : ''}</span><strong>{p.name}</strong><TypeBadges item={p}/></span></button>;
      })}</div>
      {!results.length && <p className="no-results">No Pokémon match these filters. Try another name, number, or type.</p>}
      {results.length > limit && <button className="button secondary load-more" onClick={() => setLimit(old => old + 60)}>Show more Pokémon ({results.length - limit} remaining)</button>}
    </dialog>
    <p className="data-credit">Data: Pokémon Showdown / @pkmn/dex · Base species only · Artwork placeholders</p>
  </>;
}
