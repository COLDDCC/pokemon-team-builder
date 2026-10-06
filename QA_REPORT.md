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

## Guide batch 8 — 2026-10-05
- Added Flareon, Espeon, Tentacruel, Krookodile, Breloom and Chandelure: 48 build guides and 48 computed teammate pages. All eight standard Eevee evolution guides are now present.
- All 42 prior guides were included in the fixed mechanics tests and rendered-guide browser regression checks. Checks cover all 192 starter moves including inherited moves, abilities, items, natures and evolution-chain structure.
- Breloom's guide explicitly warns to learn Spore as Shroomish before evolution; Espeon notes daytime friendship and Sylveon condition priority. New utility notes cover Magic Bounce limitations, Ghost types blocking Rapid Spin and item-exchange limitations.
- `npm run check`: lint/typecheck, 28 tests, build and 102 static SEO routes pass.
- All 48 rendered guides pass 390px and 1366px overflow, move-card, section-order, local-guide-link and disclosure checks. Remote artwork delivery, ranked-format legality and hydrated builder interactions remain outside this static guide check.

## Guide batch 9 — 2026-10-05
- Added Meganium, Typhlosion, Feraligatr, Sceptile, Blaziken and Swampert: 54 build guides and 54 computed teammate pages. Updated outdated six-guide counts in README.
- Rechecked every earlier batch with all-guide mechanics tests, covering 216 moves including pre-evolution learning, abilities, items, natures and evolution-chain structure.
- New cautions explain screen limitations, HP-dependent Eruption, Sheer Force removing secondary effects, Leaf Storm stat drops, setup risks and Swampert's four-times Grass weakness. Standard forms are distinguished from Hisuian and Mega forms where relevant.
- `npm run check` passes lint/typecheck, 28 tests, build and 114 static SEO routes.
- All 54 rendered guides pass 390px and 1366px overflow, move-card, section-order, local-guide-link and disclosure checks. Remote artwork delivery, ranked-format legality and hydrated builder interactions remain outside this static guide check.

## Guide batch 10 — 2026-10-05
- Added Torterra, Infernape, Empoleon, Serperior, Incineroar and Decidueye: 60 build guides and 60 computed teammate pages. README now reflects the current guide count.
- All 54 earlier guides were included in the mechanics and rendered-page checks. Tests cover all 240 moves including pre-evolution learning, abilities, items, natures and evolution-chain structure.
- New explanations cover Shell Smash, Contrary, Competitive, recoil, stat-drop immunity and trapping exceptions. Standard Decidueye is distinguished from its Hisuian form. Corrected a draft teammate claim: Empoleon resists Ice and Flying but takes neutral Fire damage.
- `npm run check` passes lint/typecheck, 28 tests, build and 126 static SEO routes. Rebuilt after the text correction.
- All 60 rendered guides pass 390px and 1366px checks for overflow, four move cards, section order, local guide links and working disclosures. This static guide check excludes remote artwork delivery, ranked-format legality and hydrated builder interactions.

## Guide batch 11 — 2026-10-05
- Added Samurott, Delphox, Chesnaught, Rillaboom, Cinderace and Inteleon: 66 build guides and 66 computed teammate pages. Updated the README count.
- All 60 earlier guides were included in mechanics and rendered-page regression checks. Tests cover all 264 moves including pre-evolution learning, abilities, items, natures and evolution-chain structure.
- New explanations distinguish standard Samurott from its Hisuian form, describe Bulletproof's limited move coverage, Grassy Terrain's effect on Earthquake, Court Change swapping field effects and U-turn's physical damage category. Corrected a draft claim: Incineroar resists Fire and Ice but takes neutral Bug damage.
- `npm run check` passes lint/typecheck, 28 tests, build and 138 static SEO routes. Rebuilt after the text correction.
- All 66 rendered guides pass checks at 390px and 1366px for overflow, four move cards, section order, local guide links and disclosures. Remote artwork delivery, ranked-format legality and hydrated builder interactions are excluded from this static guide check.

## Guide batch 12 — 2026-10-05
- Added Greninja, Emboar, Metagross, Hydreigon, Garganacl and Electivire: 72 build guides and 72 computed teammate pages. Updated README count. Aerodactyl was excluded because the mechanics data has no Gen 9 move sources for it.
- All 66 prior guides were included in mechanics and rendered-page regression checks. Tests cover all 288 moves including pre-evolution learning, abilities, items, natures and evolution-chain structure.
- New notes cover Reckless retaining recoil, standard Greninja's chosen Torrent ability, Levitate exceptions, full-HP Sturdy and Electirizer trade evolution. Garganacl explicitly uses Sturdy rather than Purifying Salt.
- Manual review corrected previous Tyranitar and Empoleon partner descriptions: Corviknight takes neutral Fighting damage, not resisted damage. Corrected the same draft claim in Garganacl's new partner card.
- `npm run check` passes lint/typecheck, 28 tests, build and 150 static SEO routes. Rebuilt after the prose corrections.
- All 72 rendered guides pass 390px and 1366px checks for overflow, four move cards, section order, local guide links and disclosures. This static check excludes remote artwork delivery, ranked-format legality and hydrated builder interactions.

## Guide batch 13 — 2026-10-05
- Added Talonflame, Staraptor, Heracross, Weavile, Mamoswine and Donphan: 78 build guides and 78 computed teammate pages. Updated README count. Togekiss was excluded because the mechanics data has no Gen 9 move sources for it.
- All 72 prior guides were included in mechanics and rendered-page regression checks. Tests cover all 312 moves including pre-evolution learning, abilities, items, natures and evolution-chain structure.
- New cautions cover recoil, Guts retaining burn chip damage, Ice Spinner removing terrain, Thick Fat limitations and Ghost types blocking Rapid Spin. Weavile's night/Razor Claw and Mamoswine's Ancient Power conditions are explicit.
- Corrected the older Torterra partner card and new Donphan draft: Corviknight takes neutral Ice damage rather than resisting it.
- `npm run check` passes lint/typecheck, 28 tests, build and 162 static SEO routes. Rebuild completion after prose corrections is confirmed by its log. Automatic approval rejected a later process-output poll due to Astro telemetry; no telemetry workaround was used. Browser checks were rerun independently against existing generated HTML.
- All 78 rendered guides pass 390px and 1366px checks for overflow, four move cards, section order, local guide links and disclosures. Remote artwork delivery, ranked-format legality and hydrated builder interactions are excluded from this static check.

## Guide batch 14 — 2026-10-05
- Added Blissey, Slowking, Poliwrath, Kingdra, Porygon-Z and Dusknoir: 84 build guides and 84 computed teammate pages. README count updated.
- All 78 earlier guides were included in mechanics and rendered-page regression checks. Tests cover all 336 moves including pre-evolution learning, abilities, items, natures and evolution-chain structure.
- New notes cover Natural Cure, delayed versus direct recovery, Water Absorb, self-set rain's team effects, Adaptability limitations and Pain Split's dependence on current HP. Evolution cards identify held trade items and Happiny's daytime/Oval Stone condition.
- Corrected a draft Poliwrath partner statement: Empoleon resists Flying, Psychic and Fairy but takes neutral Grass damage.
- `ASTRO_TELEMETRY_DISABLED=1 npm run check` passes lint/typecheck, 28 tests, build and 174 static SEO routes. Rebuilt with telemetry disabled after prose correction.
- All 84 rendered guides pass 390px and 1366px checks for overflow, four move cards, section order, local guide links and disclosures. Remote artwork delivery, ranked-format legality and hydrated builder interactions are excluded from this static check.

## Guide batch 15 — 2026-10-05
- Added Gallade, Conkeldurr, Luxray, Magmortar, Galvantula and Reuniclus: 90 build guides and 90 computed teammate pages. Updated README count. Alakazam was excluded from this batch because the data has no Gen 9 move sources for it.
- All 84 earlier guides were included in mechanics and rendered-page regression checks. Tests cover all 360 moves including pre-evolution learning, abilities, items, natures and evolution-chain structure.
- New notes cover male Kirlia's Dawn Stone condition, Mach Punch inherited learning, Guts retaining burn chip damage, Volt Switch being blocked by immunity, Sticky Web's grounded-target requirement, Compound Eyes not guaranteeing accuracy and Magic Guard avoiding Life Orb recoil.
- `ASTRO_TELEMETRY_DISABLED=1 npm run check` passes lint/typecheck, 28 tests, build and 186 static SEO routes.
- All 90 rendered guides pass 390px and 1366px checks for overflow, four move cards, section order, local guide links and disclosures. Remote artwork delivery, ranked-format legality and hydrated builder interactions are excluded from this static check.

## Guide batch 16 — 2026-10-05
- Added Pelipper, Torkoal, Hippowdon, Abomasnow, Whimsicott and Klefki: 96 build guides and 96 computed teammate pages. Updated README count.
- All 90 earlier guides were included in mechanics and rendered-page regression checks. Tests cover all 384 moves including pre-evolution learning, abilities, items, natures and evolution-chain structure.
- New notes cover weather affecting both teams, Boots not extending rain, sand's Rock-only Special Defense boost, Gen 9 snow versus hail, Aurora Veil's weather requirement and Dark-target immunity to opponent-targeted Prankster status moves. Whimsicott explicitly uses a Sun Stone evolution.
- `ASTRO_TELEMETRY_DISABLED=1 npm run check` passes lint/typecheck, 28 tests, build and 198 static SEO routes.
- All 96 rendered guides pass 390px and 1366px checks for overflow, four move cards, section order, local guide links and disclosures. Remote artwork delivery, ranked-format legality and hydrated builder interactions are excluded from this static check.

## Guide batch 17 — 2026-10-05
- Added Houndoom, Honchkrow, Mismagius, Froslass, Bronzong and Forretress: 102 build guides and 102 computed teammate pages. README count updated.
- All 96 earlier guides were included in mechanics and rendered-page regression checks. Tests cover all 408 moves including pre-evolution learning, abilities, items, natures and evolution-chain structure.
- New notes cover Sucker Punch conditions, losing Moxie boosts on switching, Froslass's female Snorunt/Dawn Stone requirement, Ghost typing not blocking all hazard removal, Bronzong's chosen Levitate versus Heatproof and Forretress's four-times Fire weakness.
- `ASTRO_TELEMETRY_DISABLED=1 npm run check` passes lint/typecheck, 28 tests, build and 210 static SEO routes.
- All 102 rendered guides pass 390px and 1366px checks for overflow, four move cards, section order, local guide links and disclosures. Remote artwork delivery, ranked-format legality and hydrated builder interactions are excluded from this static check.

## Guide directory discovery — 2026-10-05
- Added name/exact Pokédex-number search, official type-icon filters, combined search/type matching, result counts, clear filters, empty results and number/name sorting to the 102-guide directory. Cards now show Pokédex numbers and use two columns on mobile.
- Kept all guide links in static HTML. Controls only appear after their script is ready, preserving no-JavaScript browsing and crawlable links.
- `ASTRO_TELEMETRY_DISABLED=1 npm run check` passes lint/typecheck, 28 tests, build and 210 static SEO routes.
- Browser checks against generated production assets pass at 390px and 1366px: leading-zero number search, punctuation-insensitive Porygon-Z search, combined mismatches, type-only matching, selection ARIA state, reset, name and number sorting, no horizontal overflow and no page errors. A separate JavaScript-disabled browser confirms all 102 static guide links remain present.
- Browser assets were served through an intercepted local test origin; external image requests were blocked. Remote artwork delivery and production network performance are not covered. The single-process test browser failed when opening a second context; rerunning the no-JavaScript check in a separate browser completed successfully.

## Guide directory generation and URL state — 2026-10-05
- Added a debut-generation selector, clearly distinguished from game availability. Name/number search, type and generation combine; sorting remains independent.
- URL parameters `q`, `type`, `gen` and `sort` preserve directory state for sharing, reload and back navigation. Invalid type/generation/sort values fall back safely; search length is limited to 80 characters. Clearing filters also clears their URL parameters while retaining sorting.
- Filter changes replace the current history entry rather than creating per-keystroke entries. Filtering continues if browser history updates are unavailable; all 102 links remain in static HTML.
- `ASTRO_TELEMETRY_DISABLED=1 npm run check` passes lint/typecheck, 28 tests, build and 210 static SEO routes.
- Production-asset browser checks pass at 390px and 1366px: existing name/number/type/reset/sort checks, combined generation/type selection, URL encoding, reload/back restoration, clearing parameters, invalid-value fallbacks, no overflow and no page errors. All 102 guide links remain present with JavaScript disabled. Browser assets used an intercepted test origin; remote artwork delivery and production network behavior are excluded.

## Directory empty-result builder fallback — 2026-10-05
- Added an exact-name/number lookup across the existing 1,025-species local dataset for empty guide results. Known species receive a portrait/name and a prefilled builder link; no additional guide pages are generated.
- Copy distinguishes unpublished guides from published guides excluded by filters. Unknown names produce no species link. Portrait failure hides the image while retaining the named builder action.
- `ASTRO_TELEMETRY_DISABLED=1 npm run check` passes lint/typecheck, 28 tests, build and 210 static SEO routes.
- Browser regression passes at 390px and 1366px for prior directory search/filter/sort/URL restoration checks plus unpublished Eevee name and leading-zero number lookup, correct prefilled URL, unknown-name handling and filtered-Pikachu messaging. All 102 static guide links remain present without JavaScript. Remote artwork requests were blocked during the test, so external image delivery is not verified.

## Directory partial-name suggestions — 2026-10-05
- Empty results now offer up to six species matching a partial name, ranked by prefix match then Pokédex number. Candidates respect type and debut-generation filters and link to prefilled teams. Exact matches retain the existing fallback rather than duplicating suggestions.
- A published exact match excluded by filters also offers a direct Read guide action. Unknown names still produce no unrelated entry.
- `ASTRO_TELEMETRY_DISABLED=1 npm run check` passes lint/typecheck, 28 tests, build and 210 static SEO routes.
- Production-asset browser regressions pass at 390px and 1366px for existing search/filter/sort/URL state behavior, partial Eev-to-Eevee lookup, correct builder URL, candidate limit, type-filter exclusion and filtered Pikachu's direct guide URL. All 102 static guide links remain present without JavaScript. External artwork requests were blocked; remote image delivery is excluded.

## Directory keyboard and touch polish — 2026-10-05
- Added Enter navigation for a single result and Escape to clear only the search query. IME composition is ignored; ambiguous results remain on the directory. A compact search hint describes both shortcuts.
- Search and select controls have 44px minimum touch heights. Filtering no longer re-appends every guide card; DOM ordering updates only when the sort changes.
- `ASTRO_TELEMETRY_DISABLED=1 npm run check` passes lint/typecheck, 28 tests, build and 210 static SEO routes.
- Production-asset browser regressions pass at 390px and 1366px, including all previous directory checks, Escape preserving type/generation, Enter navigation to Pikachu, Enter targeting Eevee's builder link, ambiguous Enter remaining on the directory, IME safety and control heights. All 102 guide links remain available without JavaScript. External artwork requests were blocked; remote image delivery and production performance measurements are excluded.

## Guide navigation paths — 2026-10-05
- Added a shared static breadcrumb to all 102 species guides and 102 teammate pages. Users can return directly to the directory, or from teammate comparisons to the species guide. Current-page text uses aria-current; links wrap and have 44px touch heights with visible keyboard focus.
- `ASTRO_TELEMETRY_DISABLED=1 npm run check` passes with zero typecheck errors/warnings, 28 tests and 210 static SEO routes.
- JavaScript-disabled browser checks at 390px and 1366px cover all 204 pages: breadcrumb destinations/current-page labels, layout overflow, and existing guide move cards, section order, local links and disclosures. This static check excludes hydrated team-builder behavior and external artwork delivery.
- The previous directory production-asset regression also passes at both widths, including filtering, URL restoration, keyboard navigation and no-JavaScript guide links.

## Core builder and existing-guide audit — 2026-10-05
- Scope: selection, continuous adding, replacement, removal, duplicate prevention, locks, recommendations, live scores and responsive layout. Saving and sharing were deliberately excluded at the user's request.
- Production-asset browser checks at 390px and 1366px passed: #025 lookup, focused search, continuous additions, duplicate disabled state, Done/escape closing, slot flash on close, replacement, removal, zero score after clearing, six-member example, predicted recommendation score matching the applied score, all-locked suppression, only-unlocked replacement and empty-search reset. No page errors or horizontal overflow occurred. External artwork requests were blocked; device keyboards and external image delivery were not tested.
- All 28 unit tests pass, including data checks across all 102 guides for moves/Gen 9 learning sources, abilities, items, natures, evolution links and linked species. This does not certify every prose claim or ranked-format legality.
- Rechecked ten existing evolution/partner records, including Pikachu, Garchomp, Corviknight, Empoleon, Incineroar, Kingdra, Porygon-Z, Froslass, Forretress and Whimsicott. Previously corrected neutral matchups remain intact.
- Corrected stale directory E2E assumptions: guide count uses the curated ID list, navigation selects Pikachu explicitly rather than assuming the first number-sorted card is Pikachu, and the heading matches the current build-guide title.
- Lint and typecheck pass with zero diagnostics; production build and the 210-route static check pass. Search/filter and official-icon/reduced-motion E2E cases passed on desktop and mobile. The initial combined run hit the single-process browser's context reuse failure; isolated lock/recommendation runs passed on both projects.
- The corrected guide-directory/navigation/feedback E2E test also passes in isolated desktop and mobile runs. No product behavior changes were needed for the audited workflows.

## Prelaunch interaction review — 2026-10-06
- Published scope remains six species, with their build-guide and teammate routes. Unpublished Corviknight routes return 404.
- Reviewed rendered home, guide and directory pages at desktop and mobile sizes. Corrected the mobile toolbar's narrow stacked action column using a two-column action grid.
- Added error fallback for static guide/directory artwork outside hydrated React islands; interactive image handling remains owned by React.
- Walked picker selection and recommendation application at 320, 390, 768 and 1366 pixels. Displayed target scores matched actual updates; no horizontal overflow or page JavaScript errors.
- Opened the picker on all six guide pages and checked 96 internal link instances without broken responses.
- lint, typecheck, all 28 unit tests, production build and generated route/sitemap checks passed. Both new mobile regression tests passed individually.
- The local portable Chromium crashes when contexts are reused during the full suite; full browser validation uses GitHub's standard Chromium runner. Real iOS/Safari and software-keyboard testing remain unverified.
- Full GitHub browser review additionally reproduced mobile overflow after expanding detailed analysis. The implicit grid column used the table's intrinsic width; constrained the mobile workspace to `minmax(0, 1fr)` and allowed grid children to shrink. Added an overflow assertion after expanding methodology. The previously failing mobile analysis/clear-team scenario now passes locally without forced clicks or scrolling workarounds.

## First-six editorial refinement — 2026-10-06
- Added a purpose and limitation for all 24 moves, more concrete entry/setup guidance, and reciprocal support plus remaining weaknesses for all 12 partner cards. Corrected Corviknight's Rock matchup to neutral damage.
- Checked evolution conditions against the installed Showdown Dex; checked all six items, abilities, natures and move names. Existing data tests verify Gen 9 learning sources.
- Move-note and loadout grids now shrink and wrap on small screens; the mobile item card spans both columns for readable item names.
- Changed daily-release merging to preserve edited current records and their type declarations. A temporary fixture with deliberately stale archived Pikachu content verified all six current records survive while exactly one archived species is appended.
- Local lint, typecheck, 28 unit tests, production build and route checks pass. Production browser checks cover all six guides at 320, 390, 768 and 1366 pixels, with four move explanations, two partner cards and no horizontal overflow per page.
- Published scope remains six species; the release schedule remains gated.
