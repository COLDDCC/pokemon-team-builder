import { parseTeamState, teamUrl, type TeamState } from '../url-state';
export const savedTeamsKey = 'super-pokemon-saved-teams-v1';
export interface SavedTeam { id: string; name: string; state: TeamState; }
export function parseSavedTeams(raw: string | null): SavedTeam[] {
  if (!raw || raw.length > 100_000) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    const seen = new Set<string>();
    return data.slice(0, 20).flatMap(item => {
      if (!item || typeof item.id !== 'string' || item.id.length > 100 || seen.has(item.id) || typeof item.name !== 'string' || !item.name.trim() || typeof item.search !== 'string') return [];
      const parsed = parseTeamState(item.search);
      if (parsed.repaired || !parsed.state.slots.some(Boolean)) return [];
      seen.add(item.id);
      return [{ id: item.id, name: item.name.trim().slice(0, 60), state: parsed.state }];
    });
  } catch { return []; }
}
export function serializeSavedTeams(teams: SavedTeam[]): string {
  return JSON.stringify(teams.slice(0, 20).map(t => ({ id: t.id, name: t.name, search: new URL(teamUrl('https://example.com', t.state)).search })));
}
