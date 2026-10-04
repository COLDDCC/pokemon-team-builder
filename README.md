# Super Pokémon Team Builder

Astro + React + TypeScript foundation for superpokemonteambuilder.com.

## Local development
Requires Node.js 24 and npm. Run `npm ci`, then `npm run dev`. Open the local address printed by Astro.

- `npm run lint` — ESLint for Astro, JavaScript and TypeScript.
- `npm run typecheck` — Astro and TypeScript diagnostics.
- `npm test` — non-interactive Vitest.
- `npm run build` — static production output in `dist/`.
- `npm run check` — all four checks.
- `npm run preview` — serve the built output locally.

## Current scope
Phase 0–4 complete: validated local 1,025-species dataset, casual format, six-slot React builder, name/number search, type/generation filters, add/remove/replace, duplicate protection and versioned share URLs. Deterministic type analysis and four explainable scores are implemented. Computed recommendations evaluate all eligible local candidates for a selected empty or occupied slot, show the real score delta, and apply the change in one click. The last 24 team/slot queries are cached. See DATA_SOURCES.md for scope and attribution.

Read PRODUCT_SPEC.md for the supplied plan and TODO.md for the next phases. The team builder is hydrated with React; SEO content remains static. Styling uses plain CSS until the functional UI phase needs further tooling.

## Architecture
`src/components`: interactive UI; `src/data/pokemon`: local dataset; `src/data/formats`: rules; `src/lib/scoring`: deterministic scoring; `src/lib/recommendations`: candidate evaluation; `src/lib/url-state`: share state; `src/config`: shared configuration; `src/pages`: static routes.

## Deployment
Build with `npm ci && npm run build`; publish `dist/` to Cloudflare Pages or Vercel. This commit does not deploy or change DNS. Update the centralized origin in src/config/site.ts and astro.config.mjs together if the domain changes. No environment secrets are needed; .env.example documents future configuration.

## Data and rights
The local dataset is derived from MIT-licensed @pkmn/dex; see DATA_SOURCES.md and THIRD_PARTY_NOTICES.md. No third-party artwork is bundled. Pokémon and related names belong to their respective owners; this is an unofficial fan project. Data licenses and sprite attribution must be documented before Phase 1 assets are added.

## Browser checks
Run `npx playwright install chromium`, then `npm run test:e2e`. The suite builds and previews production output and checks real builder interactions at desktop and mobile sizes.
