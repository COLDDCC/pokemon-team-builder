# MVP verification — 2026-10-04

Phases 0–6 are implemented in the repository. The site has not been deployed.

## Results
- ESLint: passed.
- Astro/TypeScript check: zero errors, warnings or hints.
- Vitest: 20 tests passed, covering data integrity, all 324 type matchups, immunity, dual typing, 4× weakness, repeated weaknesses, empty/full teams, deterministic score weighting, recommendation deltas, URL round-trips and invalid state.
- Production build: 18 HTML pages (17 indexable pages plus 404), sitemap.xml and robots.txt generated.
- Static output validation: all 17 sitemap pages exist; each has one H1, matching canonical, structured data and OG metadata. 404 is noindex. Robots references the production sitemap.
- Playwright: 16 tests passed across desktop Chromium and an iPhone-sized Chromium viewport. Mobile results are viewport emulation, not physical iOS/Safari testing.
- Browser coverage: six-slot editing, search/filtering, duplicate protection, replacement, removal, share restoration, clipboard fallback, malformed links, keyboard Escape/focus return, live scores, matrix content, recommendation application versus predicted scores, SEO defaults and explicit URL overrides, genuine 404 status, and no horizontal overflow.
- axe-core: no WCAG A/AA violations found in the tested empty, populated and picker states at both viewport sizes. Automated checks do not replace human accessibility review.
- Browser spot check of a six-member team: no JavaScript or console errors; no mobile horizontal overflow. Desktop and mobile screenshots were inspected during development.

## Lighthouse limits
Mobile-mode local Lighthouse runs gave 100 for Accessibility, Best Practices and SEO on the home and populated-team pages. Performance was unavailable on repeated runs because this container Chromium failed to collect screenshot traces (`NO_SCREENSHOTS`). One earlier populated-team run returned Performance 100, but this is not treated as a stable performance result. Do not claim production Core Web Vitals from these local runs. Re-run `npm run audit` with a standard Chrome installation and check the deployed site before launch.

## Remaining launch work
Import the repository into Cloudflare Pages or Vercel, connect the purchased domain and confirm HTTPS. Optional GA4 and GSC identifiers remain unset. No DNS changes, production deployment or Search Console submission were performed. See DEPLOYMENT.md.

The MVP uses PokéAPI sprites, base species only, casual rules and a type/base-stat heuristic. Moves, abilities, items, EV/IVs, battle simulation and competitive legality are outside this release.

## Pre-launch usability verification
- Added local named saves, explicit load/delete, 20-edit undo, and centralized rating-band explanations.
- Lint/typecheck/build/static output checks passed; 22 unit tests passed.
- All 20 desktop/mobile browser cases passed across the full run and targeted rerun. The initial 20-worker container run had one SEO hydration wait timeout (19 passed); both viewport versions of that case passed when rerun with two workers.
- New browser cases cover saved-team reload/slot preservation, clearing/loading/recommendation undo, deletion, and blocked-storage sharing fallback.
- No mobile overflow in the saved-team interaction checks. No scoring weights were changed.

## Mobile picker and continuous selection
- Full-screen narrow-screen picker keeps search/filter controls and Done visible while results scroll. A 390×844 screenshot was inspected; scroll checks confirmed search and Done stay visible.
- Continuous building filled all six slots, stopped early with Done, prevented duplicates and closed after replacements in both viewport projects. Score differences display after edits.
- Lint/typecheck/build/static output checks and 22 unit tests passed. All 22 browser cases passed across the full run and targeted rerun: the 22-worker run had two initial hydration timeouts (20 passed), and all four desktop/mobile analysis/recommendation checks passed with four workers on rerun. Accessibility cases passed.
- Physical mobile keyboard and Safari behavior still require a device check after deployment.

## Compact picker follow-up
- Lint/typecheck/build/static output checks passed; all 22 unit tests passed.
- Eight affected desktop/mobile browser cases passed: search/filter dismissal, continuous selection, accessibility states, and compact picker reset/viewport adaptation.
- A mocked VisualViewport shrink to 420px with a 30px offset kept the footer in bounds and left more than 50px of results space; closing restored body scrolling and focus. This simulates the resize event, not a physical software keyboard.
- Inspected a 390×420 screenshot with no horizontal overflow. Filters are collapsed by default; active filters remain visible in the toggle label. Reset/clear actions preserve a usable search flow, and the footer retains the current score during continuous additions.

## Sprite update
- Team cards, picker results and recommendation cards now use a shared 96px PokéAPI sprite source through a pinned jsDelivr URL. Team images load eagerly; candidate images load lazily. Failed requests leave a numbered fallback and the existing visible name/types.
- Lint/typecheck/build/static output checks and 22 unit tests passed. Six desktop/mobile browser cases passed for image rendering/failure recovery, continuous picking, and accessibility.
- Rendering tests use a controlled PNG response and deliberately abort requests to verify failure handling. The live pinned Pikachu PNG was separately retrieved and verified as a 96×96 PNG. Container Chromium external CDN navigation returned ERR_EMPTY_RESPONSE, so this environment cannot establish general live CDN reliability.

## Pokémon-inspired light theme
Shared stylesheet now uses warm white, blue, yellow and red across all routes. Lint, typecheck, 22 unit tests, production build and static SEO checks pass. Four desktop/mobile browser checks pass for search, keyboard dismissal, no horizontal overflow and axe accessibility in empty, populated and picker states.

## Compact core workflow
Verified the 1366×768 home: example team, score and first recommendation action remain inside the initial viewport with scrollY=0; Undo restores the empty team. Desktop/mobile analysis, recommendation application and axe checks pass. Smaller screens may need page scrolling for recommendations; the selection picker exposes the current score and Done action.

## Compact header and portrait selection
Home H1 now lives in the navigation brand with its short functional subtitle, removing the separate hero. Picker results use compact portrait buttons with names, numbers and selected markers; search and filters remain. Lint, typecheck, 22 unit tests, build/static SEO checks and seven applicable desktop/mobile browser checks pass (one desktop-only check skipped on mobile).

## Compact team controls — 2026-10-04
Removed Undo and moved removal to the upper corner of each selected Pokémon card. Total score now sits beside Build team; Share team sits below the team grid. Picker search, Filters and close controls share one row, with the dialog title and result count retained for assistive technology.

Validation: npm run check passed (lint, Astro typecheck, 22 unit tests, build and 17 static SEO page checks). Affected desktop/mobile browser suite: 11 passed, 1 viewport-specific test skipped. Interactive preview verified removal, search, selection and Done; desktop screenshot reviewed.

## Type icon filters — 2026-10-04
Replaced type dropdown with 18 local SVG icon buttons, accessible type names, hover titles and pressed states. Clicking the selected icon clears that type. Filters toolbar uses a sliders icon and selected type symbol; generation remains a labeled selector.
Validation: npm run check passed, six affected desktop/mobile browser tests passed including accessibility. Preview icon selection and toggle reset verified; screenshot reviewed.

## Automatic replacement selection and favorites — 2026-10-04
Auto mode fills empty slots first, then compares all unlocked full-team slots using the existing deterministic score. Results identify the outgoing teammate, retain reasons and actual delta, and deduplicate incoming species. Favorite locks constrain auto and explicit recommendation selection; manual edits remain available. Locks are session-only and cleared on navigation or removal. Type icons are custom drawings, with selected type names for recognition.

Validation: npm run check passed with 25 unit tests and static SEO/build checks. Affected browser tests: seven passed, one desktop-only case skipped on mobile; includes auto/explicit application, all-locked empty state, unlocking, preserving five favorites, accessibility and 1366×768 first-screen action. Preview replacement preserved locked Pikachu; desktop screenshot reviewed.

## Official type icons and selection effects — 2026-10-05
Replaced all 18 custom symbols with byte-preserved original SVGs from zukan.pokemon.co.jp. Verified mapping against official masters data. Added one 650ms soft slot glow and one 480ms score-number bounce on actual changes; replay pending picker feedback after the dialog closes. Reduced-motion preference disables both animations. No score logic changes.

Validation: npm run check passed (25 unit tests, lint/typecheck/build/static SEO). Five affected desktop/mobile browser tests passed, one desktop-only check skipped on mobile; final two icon/effect tests passed after picker replay adjustment. All 18 assets load; accessibility and reduced-motion behavior verified. Interactive preview and official icon screenshot inspected.

## Search and immediate type row — 2026-10-05
Picker search reduced to 36px on desktop; official type buttons sit directly below it in one always-visible row. Narrow touch screens retain 44px targets and allow the type strip to scroll horizontally without page overflow. Filters now expands the generation selector.
Validation: npm run check passed; eight affected desktop/mobile browser tests passed, including search, filters, accessibility, asset loads, viewport handling and effects. Interactive preview filter/selection checked and desktop screenshot reviewed.

## Guide directory, feedback and footer disclaimer — 2026-10-05
Added /pokemon portrait directory linking the six existing data-backed species/teammate guides and a Guides navigation link. Added /feedback with validated draft, copy/download, and optional configured email-draft action; no fake submission or link to inaccessible private Issues. Shared footer explains unofficial ownership and heuristic limitations. Corrected stale About artwork description.
Validation: npm run check passed, including 25 unit tests and 18 static SEO pages. Three desktop/mobile guide/feedback/first-screen tests passed; one desktop-only case skipped on mobile. Public feedback receipt still requires the owner's support email configuration.

## Feedback placeholder — 2026-10-05
Added clearly labeled feedback@example.com placeholder and Cloudflare build-variable/redeploy instructions. Placeholder never enables email sending; a real PUBLIC_FEEDBACK_EMAIL activates the mailto draft. npm run check passed with 25 unit tests, typecheck/lint/build and 18 static SEO page checks.

## Guide batch 2 — 2026-10-05
- Added Corviknight, Gastrodon, Scizor, Azumarill, Gyarados and Clefable guides, plus their computed teammate pages (12 guides total).
- Reviewed batch 1 again: corrected stale directory copy about moves/items/abilities, clarified Gastrodon's Electric immunity on Pikachu's page, aligned jump navigation with section order, and connected available teammate guides.
- Verified all 48 starter moves against Generation 9 learnsets, including pre-evolution learning; checked abilities, items, natures and all evolution chains against Pokémon Showdown data.
- Added permanent guide regression tests to `npm run check`. Each future batch must validate all published guides, including prior batches, not just new pages.
- Browser checks on rendered build HTML: all 12 guides at 390px and 1366px have no horizontal overflow; four move cards, section order, local teammate guide links and native disclosures pass. Remote image delivery and hydrated builder interactions were not part of this static guide check.

## Guide batch 3 — 2026-10-05
- Added Raichu, Arcanine, Flygon, Salamence, Primarina and Slowbro: 18 build guides and 18 computed teammate pages total.
- Rechecked both earlier batches through all-guide mechanics tests and rendered-page browser checks. Existing alternative choices now link to their published guides, as well as keeping their builder action.
- Verified all 72 moves, abilities, items and natures, plus evolution chains, using Generation 9 data including inherited moves.
- `npm run check`: lint, typecheck, 28 unit tests, static build and 42 SEO routes pass.
- Browser checks for all 18 rendered guides at 390px and 1366px: no horizontal overflow, four move cards, teammate section directly after loadout, guide links resolve and disclosures open. Remote image delivery and hydrated builder behavior remain outside this static check.

## Guide batch 4 — 2026-10-05
- Added Blastoise, Venusaur, Tyranitar, Gardevoir, Umbreon and Sylveon, taking the directory to 24 build guides and 24 computed teammate pages.
- All three earlier batches were included in mechanics tests and browser regression checks. All 96 starter moves (including inherited moves), abilities/items/natures and evolution-chain structure passed the existing tests.
- Evolution explanations distinguish Umbreon's nighttime friendship requirement from Sylveon's Generation 9 friendship plus Fairy-move condition. Starter cautions include sleep restrictions and sand damage to teammates.
- Directory description now derives its guide count from the published configuration rather than a manually maintained number.
- All 24 rendered guides passed 390px and 1366px overflow, section-order, local-guide-link and disclosure checks. Lint/typecheck, 28 tests, build and 54 SEO route checks passed before the description change; the final description change also rebuilt successfully.
- These checks cover rendered guide structure and mechanics references, not ranked-format legality, win rates, remote image delivery or hydrated builder interactions.

## Guide batch 5 — 2026-10-05
- Added Amoonguss, Skarmory, Quagsire, Toxapex, Mimikyu and Snorlax: 30 guides and 30 computed teammate pages.
- Included all 24 older guides in the mechanics and rendered-page regression checks. All 120 moves (including pre-evolution learning), abilities, items, natures and evolution-chain structure pass the fixed guide tests.
- Added explicit “does not evolve” copy for single-species evolution displays. Support examples explain Spore immunity and sleep rules, Haze resetting all stat changes, full-HP Sturdy, Disguise HP loss and Rest sleep turns.
- `npm run check` passes lint/typecheck, 28 tests, build and 66 SEO route checks. The final single-species display change also rebuilt successfully.
- Browser checks on all 30 rendered guides at 390px and 1366px pass for overflow, four move cards, section order, local guide links and disclosures. Remote artwork delivery, battle legality and hydrated builder behavior are not covered by this static guide check.

## Guide batch 6 — 2026-10-05
- Added Meowscarada, Skeledirge, Quaquaval, Dragapult, Haxorus and Goodra: 36 build guides and 36 computed teammate pages.
- Rechecked all five previous batches alongside this batch. Fixed tests cover all 144 starter moves including inherited moves, abilities, items, natures and evolution-chain structure.
- New content explains Choice locking, Torch Song and Aqua Step boosts, Mold Breaker not removing type immunities, Assault Vest restrictions and Goodra's overworld-rain evolution condition.
- `npm run check`: lint/typecheck, 28 tests, static build and 78 SEO route checks pass.
- All 36 rendered guides pass browser checks at 390px and 1366px for overflow, move cards, section order, local guide links and disclosures. This remains a static guide check; remote artwork delivery, competitive legality and hydrated builder behavior are excluded.

## Guide batch 7 — 2026-10-05
- Added Magnezone, Milotic, Jolteon, Vaporeon, Leafeon and Glaceon: 42 build guides and 42 computed teammate pages.
- Rechecked all six earlier batches with the fixed all-guide mechanics tests and browser checks. All 168 starter moves including inherited moves, abilities, items, natures and evolution-chain structure pass.
- Evolution conditions explicitly scope Magnezone/Leafeon/Glaceon stones to Generation 9 and Milotic's Prism Scale trade to Scarlet/Violet. New cautions explain trapping exceptions, inactive abilities without required status/weather and delayed Wish recovery.
- `npm run check` passes lint/typecheck, 28 tests, build and 90 static SEO routes.
- All 42 rendered guides pass 390px and 1366px overflow, move-card, section-order, local-guide-link and disclosure checks. These checks do not validate remote artwork delivery, ranked-format legality or hydrated builder interactions.
