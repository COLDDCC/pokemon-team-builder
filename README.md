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
Phase 0–6 implementation complete: validated local 1,025-species dataset, casual format, six-slot React builder, name/number search, type/generation filters, add/remove/replace, duplicate protection and versioned share URLs. Deterministic type analysis and four explainable scores are implemented. Computed recommendations evaluate all eligible local candidates for a selected empty or occupied slot, show the real score delta, and apply the change in one click. The last 24 team/slot queries are cached. See DATA_SOURCES.md for scope and attribution.

Read PRODUCT_SPEC.md for the supplied plan and TODO.md for the next phases. The team builder is hydrated with React; SEO content remains static. Styling uses plain CSS until the functional UI phase needs further tooling.

## Architecture
`src/components`: interactive UI; `src/data/pokemon`: local dataset; `src/data/formats`: rules; `src/lib/scoring`: deterministic scoring; `src/lib/recommendations`: candidate evaluation; `src/lib/url-state`: share state; `src/config`: shared configuration; `src/pages`: static routes.

## Deployment
Build with `npm ci && npm run build`; publish `dist/` to Cloudflare Pages or Vercel. This commit does not deploy or change DNS. The centralized origin in src/config/site.ts is shared by Astro, metadata, robots and sitemap. No environment secrets are needed. Optional GA4 and GSC public identifiers are documented in .env.example; analytics is omitted when no valid ID is configured.

## Data and rights
The local dataset is derived from MIT-licensed @pkmn/dex; see DATA_SOURCES.md and THIRD_PARTY_NOTICES.md. PokéAPI sprites are loaded from a pinned jsDelivr source; no sprite binaries are bundled. Pokémon and related names belong to their respective owners; this is an unofficial fan project. Data licenses and sprite attribution must be documented before Phase 1 assets are added.

## Browser checks
Run `npx playwright install chromium`, then `npm run test:e2e`. The suite builds and previews production output and checks real builder interactions at desktop and mobile sizes.

## SEO scope
The build includes two focused calculator routes, one casual format route and six curated Pokémon analysis/teammate pairs. No thousands of thin pages are generated. Page templates prefill the relevant Pokémon; an explicit team query overrides this default. Canonical URLs omit team parameters. The sitemap lists static indexable routes.

## Release checks and deployment
See QA_REPORT.md for the local verification results and remaining launch configuration. See DEPLOYMENT.md for Cloudflare Pages or Vercel import settings. A deployment has not been performed.

`npm run check` also validates all generated sitemap pages, canonical links, H1 counts, structured data, 404, robots and OG output. `npm run audit` runs local mobile Lighthouse checks against the built home and populated-team pages; Chrome must be installed, or set CHROME_PATH to a compatible Chromium executable. Reports go to ignored qa-output/. Automated accessibility checks are included in the browser suite. Local lab results do not replace production Core Web Vitals.

## Saving and undo
Saved teams are kept only in the current browser (up to 20 named teams); load and delete are explicit. Each selected Pokémon has a direct remove action; saved teams can be explicitly reloaded. Shared URL state and Pokémon-page defaults retain priority; saved teams never silently replace a shared team. If browser storage is blocked or full, users can still edit and share a team.

## Fast team selection
Use Build team to fill empty slots in one picker session; each selection moves to the next empty slot. Done stops at any time, and the sixth member closes the picker automatically. Individual slot clicks retain the one-pick workflow. Replacements always close after selection. On narrow screens, the picker fills the viewport with fixed search/filter controls, a scrolling results region, and a fixed Done action. Each team edit displays its previous/current score and signed difference.

The picker now collapses filters until requested, displays active filters, and provides clear/reset actions. On narrow screens it follows VisualViewport height/offset changes so the Done action stays within the available area when a software keyboard shrinks it. Background scrolling is locked only while the picker is open and restored on close. Real mobile keyboard/Safari verification remains a deployment check.

## Visual theme
The site uses a Pokémon-inspired light palette: warm white surfaces, blue headings, yellow primary actions, and red selection accents. Shared CSS applies the same theme to the picker, scores, recommendations, and static routes.

## Compact first screen
The home title and description are shortened. Desktop team editing and live scores sit side by side, with compact recommendation actions underneath. Rules, saved teams, recommendation reasons and detailed analysis expand on demand. Try example loads six familiar Pokémon only into an empty team and can be cleared. At 1366×768, the example team, live score and recommendation action fit without page scrolling; smaller screens retain responsive layouts and the picker’s score/Done footer.

Desktop side rails are reserved without ad scripts: 120px per side at widths ≥1440px and 160px at ≥1536px. The central tool stays at up to 1120px; smaller screens hide the rails.

## Automatic improvements and favorite locks
Recommendations default to Auto: incomplete teams fill their first empty slot; full teams compare all six unlocked replacement positions and show the six best distinct candidates. Each card identifies the outgoing teammate, uses the unchanged deterministic score, and offers expandable reasons. Manual slot selection remains available.

The small lock on a selected Pokémon protects it from recommendations, including manual recommendation-slot selection. Manual editing and Clear team remain explicit user actions. Locks are local to this editing session; URLs and saved teams continue to store the roster and format only. Removing a member clears its lock; browser navigation/reload resets locks.

Type filter symbols are original simplified SVG drawings, not official Pokémon type logos. They have accessible names, hover titles and a short selected-type label; each has a 44px touch target.
