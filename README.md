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
Phase 0 only: project tooling, layout, static development preview, 404, configuration, CI and architecture boundaries. Team slots are visual placeholders. Selection, scoring and recommendations are not implemented.

Read PRODUCT_SPEC.md for the supplied plan and TODO.md for the next phases. React is installed for the future interactive builder; this foundation does not hydrate unused components. Styling uses plain CSS until the functional UI phase needs further tooling.

## Architecture
`src/components`: interactive UI; `src/data/pokemon`: local dataset; `src/data/formats`: rules; `src/lib/scoring`: deterministic scoring; `src/lib/recommendations`: candidate evaluation; `src/lib/url-state`: share state; `src/config`: shared configuration; `src/pages`: static routes.

## Deployment
Build with `npm ci && npm run build`; publish `dist/` to Cloudflare Pages or Vercel. This commit does not deploy or change DNS. Update the centralized origin in src/config/site.ts and astro.config.mjs together if the domain changes. No environment secrets are needed; .env.example documents future configuration.

## Data and rights
No Pokémon dataset or third-party artwork is bundled yet. Pokémon and related names belong to their respective owners; this is an unofficial fan project. Data licenses and sprite attribution must be documented before Phase 1 assets are added.
