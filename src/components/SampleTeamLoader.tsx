import { useState } from 'react';

export default function SampleTeamLoader({ ids }: { ids: string[] }) {
  const [error, setError] = useState('');
  function load() {
    try {
      // Reuse the existing one-time tab-local transfer. Never put a team in a URL.
      sessionStorage.setItem('pokemon-random-team-transfer', JSON.stringify({ ids, created: Date.now() }));
      window.location.assign('/');
    } catch {
      setError('Your browser blocks session storage. Add the listed Pokémon manually.');
    }
  }
  return <div><button type="button" className="button primary" onClick={load}>Load this team in the builder</button>{error && <p role="alert">{error}</p>}</div>;
}
