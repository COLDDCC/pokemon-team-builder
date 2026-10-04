import { describe, expect, it } from 'vitest';
import { site } from './site';
describe('deployment configuration', () => {
  it('uses the intended HTTPS origin without a path', () => {
    const url = new URL(site.url);
    expect(url.protocol).toBe('https:');
    expect(url.hostname).toBe('superpokemonteambuilder.com');
    expect(url.pathname).toBe('/');
  });
});
