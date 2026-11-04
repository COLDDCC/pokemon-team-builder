import { describe, expect, it } from 'vitest';
import { withSlash } from './paths';
describe('withSlash', () => {
  it.each([
    ['/', '/'], ['/pokemon', '/pokemon/'], ['/pokemon/', '/pokemon/'],
    ['/pokemon/x/best-teammates', '/pokemon/x/best-teammates/'],
    ['/random-pokemon-generator#team', '/random-pokemon-generator/#team'],
    ['/feedback?from=/pokemon/x', '/feedback/?from=/pokemon/x'],
    ['/sitemap.xml', '/sitemap.xml'], ['/third-party-notices.txt', '/third-party-notices.txt'],
    ['/favicon.svg', '/favicon.svg'], ['/pokemon/x/?from=here#team', '/pokemon/x/?from=here#team'],
  ])('%s → %s', (input, expected) => expect(withSlash(input)).toBe(expected));
});
