import { describe, expect, it } from 'vitest';
import { emptyTeam, setTeamSlot } from '../url-state';
import { parseSavedTeams, serializeSavedTeams } from './index';
describe('saved teams', () => {
  it('preserves named teams and empty slot positions', () => {
    const teams = [{ id: 'one', name: 'My team', state: setTeamSlot(emptyTeam(), 3, 'pikachu') }];
    expect(parseSavedTeams(serializeSavedTeams(teams))).toEqual(teams);
  });
  it('rejects damaged, duplicate and unsupported records safely', () => {
    expect(parseSavedTeams('{')).toEqual([]);
    expect(parseSavedTeams(JSON.stringify([{id:'x',name:'Bad',search:'?v=99&team=pikachu'}]))).toEqual([]);
    const valid = {id:'x',name:'Okay',search:'?v=1&team=pikachu'};
    expect(parseSavedTeams(JSON.stringify([null, valid, valid, {...valid,id:'bad',search:'?team=pikachu,pikachu'}]))).toHaveLength(1);
  });
});
