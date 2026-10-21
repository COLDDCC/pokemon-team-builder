# Super Pokémon Team Builder

Astro + React + TypeScript foundation for superpokemonteambuilder.com.

## Local development
Requires Node.js 24 and npm. Run `npm ci`, then `npm run dev`. Open the local address printed by Astro.

`predev` and `prebuild` generate the sprite set into the ignored `public/sprites/`, so the first command on a fresh clone downloads 1,025 pinned artworks and needs network access. Reruns are incremental. Use `npm run sprites:generate -- --force` after changing sizes or quality.

- `npm run lint` — ESLint for Astro, JavaScript and TypeScript.
- `npm run typecheck` — Astro and TypeScript diagnostics.
- `npm test` — non-interactive Vitest.
- `npm run build` — static production output in `dist/`.
- `npm run check` — all four checks.
- `npm run preview` — serve the built output locally.

## Current scope
Phase 0–6 implementation complete: validated local 1,025-species dataset, casual format, six-slot React builder, name/number search, type/generation filters, add/remove/replace, duplicate protection and clean URLs without team parameters. Deterministic type analysis and four explainable scores are implemented. Computed recommendations evaluate all eligible local candidates for a selected empty or occupied slot, show the real score delta, and apply the change in one click. The last 24 team/slot queries are cached. See DATA_SOURCES.md for scope and attribution.

Read PRODUCT_SPEC.md for the supplied plan and TODO.md for the next phases. The team builder is hydrated with React; SEO content remains static. Styling uses plain CSS until the functional UI phase needs further tooling.

## Architecture
`src/components`: interactive UI; `src/data/pokemon`: local dataset; `src/data/formats`: rules; `src/lib/scoring`: deterministic scoring; `src/lib/recommendations`: candidate evaluation; `src/lib/url-state`: team validation and legacy state parsing; `src/config`: shared configuration; `src/pages`: static routes.

## Deployment
Build with `npm ci && npm run build`; publish `dist/` to Cloudflare Pages or Vercel. This commit does not deploy or change DNS. The centralized origin in src/config/site.ts is shared by Astro, metadata, robots and sitemap. No environment secrets are needed. Optional GA4 and GSC public identifiers are documented in .env.example; analytics is omitted when no valid ID is configured.

## Data and rights
The local dataset is derived from MIT-licensed @pkmn/dex; see DATA_SOURCES.md and THIRD_PARTY_NOTICES.md. PokéAPI official artwork is fetched from a pinned upstream commit at build time, resized to 160px and 320px WebP, and served from this site's own origin; the generated files are ignored by git rather than committed. Pokémon and related names belong to their respective owners; this is an unofficial fan project. Data licenses and sprite attribution must be documented before Phase 1 assets are added.

## Browser checks
Run `npx playwright install chromium`, then `npm run test:e2e`. The suite builds and previews production output and checks real builder interactions at desktop and mobile sizes.

## SEO scope
The build includes two focused calculator routes, two generation routes (`/games/gen-9-national-dex` and `/games/gen-3`), the random Pokémon generator and 96 published Pokémon analysis/teammate pairs. No thousands of thin pages are generated. Page templates prefill the relevant Pokémon; an explicit team query overrides this default. Canonical URLs omit team parameters. The sitemap lists static indexable routes.

## Release checks and deployment
See QA_REPORT.md for the local verification results and remaining launch configuration. See DEPLOYMENT.md for Cloudflare Pages or Vercel import settings. The site is deployed to GitHub Pages by the `Deploy GitHub Pages` workflow at `https://colddcc.github.io/pokemon-team-builder/`; Cloudflare Pages and Vercel remain unconfigured alternatives.

`npm run check` also validates all generated sitemap pages, canonical links, H1 counts, structured data, 404, robots and OG output. `npm run audit` runs local mobile Lighthouse checks against the built home and populated-team pages; Chrome must be installed, or set CHROME_PATH to a compatible Chromium executable. Reports go to ignored qa-output/. Automated accessibility checks are included in the browser suite. Local lab results do not replace production Core Web Vitals.

## Saving and undo
Saved teams are kept only in the current browser (up to 20 named teams); load and delete are explicit. Each selected Pokémon has a direct remove action; saved teams can be explicitly reloaded. Shared URL state and Pokémon-page defaults retain priority; saved teams never silently replace a shared team. If browser storage is blocked or full, users can still edit and share a team.

## Fast team selection
Use Build team to fill empty slots in one picker session; each selection moves to the next empty slot. Done stops at any time, and the sixth member closes the picker automatically. Individual slot clicks retain the one-pick workflow. Replacements always close after selection. On narrow screens, the picker fills the viewport with fixed search/filter controls, a scrolling results region, and a fixed Done action. Each team edit displays its previous/current score and signed difference.

The picker now collapses filters until requested, displays active filters, and provides clear/reset actions. On narrow screens it follows VisualViewport height/offset changes so the Done action stays within the available area when a software keyboard shrinks it. Background scrolling is locked only while the picker is open and restored on close. Real mobile keyboard/Safari verification remains a deployment check.

## Visual theme
The site uses a Pokémon-inspired light palette: warm white surfaces, blue headings, yellow primary actions, and red selection accents. Shared CSS applies the same theme to the picker, scores, recommendations, and static routes.

## Compact first screen
The home title and description are shortened. The centered workspace keeps side margins; live score dimensions sit directly below the six team cards in a compact row, with recommendation actions underneath. Share team follows the total score in the team toolbar. Rules, saved teams, recommendation reasons and detailed analysis expand on demand. Try example loads six familiar Pokémon only into an empty team and can be cleared. At 1366×768, the example team, live score and recommendation action fit without page scrolling; smaller screens retain responsive layouts and the picker’s score/Done footer.

At viewport widths of 1024px and above, the central tool stays at up to 960px and each side reserves a 160px ad column with a 40px gap; at 1800px and above, each column expands to 300px. These columns are empty and hidden below 1024px, which retain 12px side margins. The browser tab uses a red-and-white Poké Ball SVG icon.

## Automatic improvements and favorite locks
Recommendations default to Auto: incomplete teams fill their first empty slot; full teams compare all six unlocked replacement positions and show the six best distinct candidates. Each card identifies the outgoing teammate, uses the unchanged deterministic score, and offers expandable reasons. Manual slot selection remains available.

The small lock on a selected Pokémon protects it from recommendations, including manual recommendation-slot selection. Manual editing and Clear team remain explicit user actions. Locks are local to this editing session; URLs and saved teams continue to store the roster and format only. Removing a member clears its lock; browser navigation/reload resets locks.

Type filter symbols use the original SVG assets from the official Japanese Pokémon Pokédex (zukan.pokemon.co.jp). They have accessible names, hover titles and a short selected-type label; each has a 44px touch target.

Selecting or replacing a Pokémon triggers one soft golden flash on that slot. An actual total-score change triggers one short bounce of the score number. Reduced-motion preferences disable both effects; scores update immediately.

## Guides, feedback and disclaimer
/pokemon lists the curated species guides with portrait links; each guide keeps the prefilled builder, stats and type analysis. The shared footer includes feedback, attribution and score limitations. /feedback lets users prepare, copy or download a report without sending it. Configure PUBLIC_FEEDBACK_EMAIL to enable an email draft action; the user must send the draft from their mail app. No feedback is collected by a backend, and the private GitHub repository is not exposed as a public reporting destination.

## Finding a guide
The guide directory supports name or exact Pokédex-number search, one type filter using official type icons, live result counts, clearing filters and sorting by Pokédex number or name. Search tolerates punctuation and accents. All published portrait links are rendered statically and remain available without JavaScript; mobile cards use two columns.
The directory also filters by debut generation (not game availability). Search, type, generation and sorting are encoded in the URL and restored on reload or browser navigation; invalid values fall back to defaults. Filter edits replace the current history entry rather than adding an entry for every keystroke.
If an exact species name or number has no matching guide, the directory offers a prefilled team-builder link for that species. It distinguishes unpublished guides from published guides excluded by current filters. Unknown names retain the normal empty state.
When no guide matches a partial name, up to six matching species provide portrait links into the builder, respecting the selected type and debut generation. Exact matches excluded by filters also offer a direct link to their published guide.

Search supports Enter to open a single matching guide or species action, and Escape to clear the query while retaining filters. Enter does not navigate ambiguous results or interrupt IME composition. Search/select controls have 44px minimum touch heights; cards are reordered only when sorting changes.

Guide and teammate pages include a compact, static breadcrumb path back to the guide directory and the species build guide. Links wrap on small screens, have 44px touch heights and work without JavaScript.

## Staged guide release
Published: 96 species, each with a build guide and teammate page — the launch six (Pikachu, Charizard, Garchomp, Gengar, Dragonite, Lucario), then batches of ten taken in the archive queue order: Corviknight→Salamence, Primarina→Skarmory, Quagsire→Goodra, Magnezone→Krookodile, Breloom→Infernape, Empoleon→Inteleon, Greninja→Weavile, Mamoswine→Conkeldurr and Luxray→Klefki. The remaining 6 guides are preserved on `archive/102-guides`, not included in main. Each batch is produced with `node scripts/release-next-guide.mjs <archive-checkout>`, once per species in a fresh process; the script takes species in the archive branch's own queue order and touches only `src/config/seo-pages.ts`, `src/data/guides.ts` and `src/data/guide-visuals.ts`. The script does not write the two per-species editorial files: each released species needs a reviewed entry in `src/data/guide-depth.ts` and a battle-notes date in `src/data/guide-review.ts`, and `scripts/check-build.mjs` fails the build when a published guide is missing either. Daily release is still disabled: the automatic path needs the repository Actions variable `GUIDE_RELEASE_ENABLED` set to `true`, which has not been created. The release workflow then proposes one species per day in a pull request; review and merge after the quality checks pass. This also requires allowing GitHub Actions to create pull requests. Merging such a pull request deploys the new guide through the same `Deploy GitHub Pages` workflow.

Team edits never write state into the address bar. Share-link UI is disabled by user request. Legacy team links are read once and their query string is removed.

## Card-first species guides
All published build guides use `EvolutionCards.astro`: local artwork, a static named evolution chain, pointer/keyboard tilt and a short tap animation. Motion respects reduced-motion preferences; no runtime API or card-effect dependency is used. Cards are custom Pokédex presentations, not official TCG cards. The breadcrumb follows the guide content so the collection appears immediately below the header. Evolution data currently describes the listed standard chain only; regional and alternate branches are not implied to be exhaustive.

`GuideDepth.astro` renders species-specific mechanics, turn decisions and a base-stat comparison with the existing editorial alternative. `src/data/guide-depth.ts` owns the reviewed text; `GuideText.astro` safely renders explicit `**emphasis**` without raw HTML. Add depth data when releasing another guide; missing depth never invents advice. Existing movesets, partners, evolution notes, source links and the interactive builder are retained. EV spreads, Tera choices and ranked-format legality remain out of scope until individually sourced and reviewed. Typography and emphasis apply to the guide, not the team scoring system.

Editorial approach informed by Clarity (MIT): https://github.com/addyosmani/clarity. No third-party card-effect code or textures were copied.

Review dates are data, not page copy: `src/data/guide-review.ts` records the moveset review date once and one battle-notes entry per release batch. Add the new batch's ids and date when releasing guides — `src/data/guide-review.test.ts` fails when a published species has no date, and `scripts/check-build.mjs` fails when a built page does not show it.

## Generation 3 planning
`/games/gen-3` opens the builder in `gen3-national-casual`. The shared Game/Format controls also switch between Gen 3 and Gen 9, retaining eligible members and reporting removals. Clear/example actions preserve the active format; browser saves retain it. The Gen 3 pool contains 386 base species, historical typings/base stats and 17 types, including Steel resistance to Ghost and Dark. Picker filters, analysis denominators and recommendations all follow the active generation. Reproduce both historical snapshots with `npm run data:generate` using the locked @pkmn/dex.

The Gen 3 page is linked in navigation and included in the sitemap with its own canonical, title and description. The tool precedes game guidance and FAQs; desktop roster/score visibility at 1366×768 is covered by the Gen 3 browser suite. This is a cross-game National Dex planning pool, not a version encounter list or legality validator. No moves, abilities, items or battle damage are modeled; physical/special role indicators remain base-stat proxies.

## Random Pokémon generator
`/random-pokemon-generator` draws 1–6 unique base species with introduction-generation, modern type, legendary/mythical and final-evolution filters. Metadata is regenerated with `npm run data:generate` from the pinned Dex. Locks keep slots fixed while rerolling. The generator uses no scoring bias. Analyze transfers results once via tab-local session storage (five-minute expiry) to the home builder without URL parameters or modifying saved teams. `#team` selects six-result mode. No alternate forms or game encounter validation.
