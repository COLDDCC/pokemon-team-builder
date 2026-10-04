import { defaultFormat, getFormat, isAllowed } from '../../data/formats';
import { pokemonById } from '../../data/pokemon';
export interface TeamState { format: string; slots: (string | null)[]; }
export const emptyTeam = (): TeamState => ({ format: defaultFormat.id, slots: Array(6).fill(null) });
export function parseTeamState(search: string): { state: TeamState; repaired: boolean } {
  const params = new URLSearchParams(search);
  const format = getFormat(params.get('format'));
  const state: TeamState = { format: format.id, slots: Array(6).fill(null) };
  let repaired = Boolean(params.get('format') && params.get('format') !== format.id);
  if (params.has('v') && params.get('v') !== '1') return { state, repaired: true };
  const raw = params.get('team');
  if (raw === null) return { state, repaired };
  if (raw.length > 512) return { state, repaired: true };
  const ids = raw.split(',');
  if (ids.length > 6) repaired = true;
  const seen = new Set<string>();
  ids.slice(0, 6).forEach((id, i) => {
    if (!id) return;
    const p = pokemonById.get(id);
    if (!p || !isAllowed(p, format) || seen.has(id)) { repaired = true; return; }
    state.slots[i] = id; seen.add(id);
  });
  return { state, repaired };
}
export function teamUrl(base: string, state: TeamState): string {
  const url = new URL(base);
  url.searchParams.set('v', '1');
  url.searchParams.set('format', state.format);
  url.searchParams.set('team', state.slots.slice(0, 6).map(id => id ?? '').join(','));
  return url.toString();
}
export function setTeamSlot(state: TeamState, index: number, id: string | null): TeamState {
  if (!Number.isInteger(index) || index < 0 || index >= 6) return state;
  if (id !== null) {
    const p = pokemonById.get(id);
    if (!p || !isAllowed(p, getFormat(state.format)) || state.slots.some((s, i) => i !== index && s === id)) return state;
  }
  return { ...state, slots: state.slots.map((old, i) => i === index ? id : old) };
}
