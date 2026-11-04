/** Canonicalize internal page paths without changing files, search, or hashes. */
export function withSlash(path: string): string {
  const match = path.match(/^([^?#]*)([\s\S]*)$/);
  if (!match) return path;
  const [, pathname, suffix] = match;
  if (!pathname || pathname === '/' || pathname.endsWith('/') || /\.[a-z0-9]+$/i.test(pathname)) return path;
  return pathname + '/' + suffix;
}
