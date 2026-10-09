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

## Sprite delivery — 2026-10-08
- Before: each picker result requested the pinned 475×475 official-artwork PNG from jsDelivr. One 60-result picker page measured 8.63 MB over 60 cross-origin requests, with the last image landing 6.6 s after navigation; per-image time to first byte from this network was 0.9–2.8 s.
- After: `predev`/`prebuild` generate 160px and 320px WebP for all 1,025 species into the ignored `public/sprites/`. The same 60 results transfer 417 KB (7.0 KB average) from the site origin and the last image lands in 0.72 s — 95% less weight, one origin, no third-party dependency at runtime.
- Generation is incremental (20.7 MB total, ~14 min on a cold cache at 12 concurrent downloads, seconds on reruns). A single upstream 403 was reported as a failure with the species number instead of publishing a partial set; the rerun fetched only that one file.
- Fidelity was measured, not assumed: rendering 30 species to their display sizes and compositing them on the card background (`--soft`) gives a mean channel deviation of 3.5/255 at 68px, 2.9/255 at 112px and 2.9/255 at 180px, concentrated in outline pixels. WebP chroma subsampling and higher quality settings moved those numbers by less than 0.2, so the residual difference is resampling, not compression.
- The 160px tier is not enough for a 3× phone (68 CSS pixels needs 204), where the deviation rises to 7.6/255 with visible edge softness. Small cards therefore send `srcset` for both tiers: one 60-result picker page measures 417 KB at 1×, 909 KB at 2× and 3×, and the last image lands in 0.77 s, 0.38 s and 0.35 s respectively — still about 90% below the previous 8.63 MB on every display.
- lint, typecheck, 28 unit tests, production build and `check:build` pass. `check:build` now asserts both sprite directories hold exactly one non-empty WebP per species and stay under a 40 MB budget.
- Verified in a real browser against the built output: team card uses `/sprites/official/320/25.webp`, picker card `/sprites/official/160/6.webp`, guide hero decodes at 320px, and no HTTP request leaves the site origin. With sprite requests aborted, the React island and the non-hydrated static guide pages both fall back to the Dex number while names and type badges stay visible.
- The full 40-case Playwright suite could not be validated end to end locally: the portable Chromium build dies on context reuse partway through a serial run (10 of 20 desktop cases and the mobile project fail with `Target page, context or browser has been closed`), and the installed Edge crashes under the suite's `--single-process` launch arguments. This matches the previously recorded local-browser limitation. Both changed browser cases pass when run individually — `sprites are served from the local build and fall back safely` passes in the desktop and mobile projects, and `static guide artwork has a fallback…` passes alone — and GitHub's standard Chromium runner covers the whole suite.

## Score typography — 2026-10-08
Reported: the score that updates on each pick looks too plain for a game. Measured first, on the built site at 1280px: `[data-testid="team-score"] .score-value` computed to **14px / weight 500**, identical to the grey `/ 100` beside it, because `.score-number span { font-size: 14px; font-weight: 500 }` also matched the number span and the declared `28px / 850` never reached the digits. `font-synthesis: none` plus an `Inter` stack that this repository never loads meant no weight could be recovered. That is a silent CSS collision, not a taste problem; the fix scopes the suffix rule to `.score-number > span:last-child`.

Treatment: digits set in Archivo Black with an action-game damage-number recipe copied from a reference site the user named (genshindamagecalculator.com). The reference's own computed styles were read from the live page rather than guessed at: family `Archivo Black`, `color rgb(255,180,60)`, `3px rgb(74,44,18)` text stroke, `paint-order: stroke`, `linear-gradient(rgb(255,253,244), rgb(255,233,168) 45%, rgb(255,180,60))` clipped to text, no text-shadow. Two faces were tried before this — Titan One, then Press Start 2P at the user's pick — and both were set aside when the user pointed at the reference. No asset, font file or code was taken from that site; the font subset is ours from Google Fonts.

Two adaptations were needed. The reference sets its number at 36px on a dark UI; ours is 28px, so a literal 3px stroke was too heavy and the derived widths were re-measured. The stroke is therefore declared in `em` (`.09em`) so it tracks the 28px and 22px breakpoints instead of being pinned to one size: it computes to **2.52px at 1280px and 1.98px at ≤600px**. `paint-order: stroke fill` is load-bearing — without it the stroke paints over the gradient and eats the counters.

Verified after the change (`getComputedStyle`, built site, `deviceScaleFactor: 2`):

| Viewport | `.score-value` | stroke | `/ 100` suffix | Toolbar `scrollWidth` = `clientWidth` | Document overflow |
| --- | --- | --- | --- | --- | --- |
| 1280px | 28px, `Score Digits` | 2.52px | 14px | 822 = 822 | none |
| 390px | 22px, `Score Digits` | 1.98px | 14px | 340 = 340 | none |
| 360px | 22px, `Score Digits` | 1.98px | 14px | 310 = 310 | none |

Widths with the number forced to `100`: `.toolbar-score` is 124px at 1280px. On mobile `.toolbar-score` is a grid cell, so its 167px (390px) and 152px (360px) are the *track* widths set by the container, not the content — the content measures 104px in both, i.e. 63px and 48px of slack. An earlier revision of this report read those track widths as content widths and claimed "3px of slack"; that was a measurement error and is corrected here. Digit advance widths are uniform (`88`, `69` and `47` all measure 29.4px, `100` 44.0px), so the number does not nudge the layout when it crosses from two digits to three.

Contrast — the honest caveat, and it is a real difference from the reference: this gradient was designed for a dark UI. Against our page background `#fffdf5` the gold bottom stop `#ffb43c` is **1.74:1**, the 45% stop `#ffe9a8` is 1.18:1 and the top stop `#fffdf4` is **1.00:1** — effectively invisible at the top of every glyph. WCAG's 3:1 for large text is met by none of the fills; only the `#4a2c12` outline carries the digits, at **12.42:1**, and because `paint-order` makes it a 2.5px ring around a 28px glyph the number is still unambiguous. Ratios come from the sRGB relative-luminance formula against `--page`. The previous pass kept a blue `#2456a6` fill (6.97:1) precisely to avoid this; the gold fill is what the user asked for and is a one-line change back.

Payload: one same-origin request for `archivo-black-digits.woff2`, **3,620 bytes**, `font-display: swap`, no `<link rel=preload>`. Requests counted per page against `astro preview`: `/`, `/weakness-calculator` and `/type-coverage` fetch it once each; `/about` and `/pokemon` fetch it zero times, because `@font-face` resolves only when a `.score-value` digit renders. Confirmed again after the swap by watching `.woff2` requests at all three viewports. No third-party font host is contacted.

Faces measured and set aside, each rendered in the real toolbar (width of "82" at 28px / "100" at 22px): Titan One 36 / 42px, Rubik Mono One 48 / 57px, Silkscreen 49 / 55px (its `8` reads as `#` at 28px), Modak 32 / 34px (counters fill in), Bungee Shade 44 / 52px (ships its own shadow, which fights the CSS ring), Lilita One 31 / 37px, Faster One 45 / 50px, Jersey 15 23 / 27px, Press Start 2P, plus Orbitron, Tektur, Chakra Petch, Rajdhani, Space Grotesk and Bungee in the earlier round.

Guards: `npm run check:build` asserts the font ships non-empty and that the bundled CSS references it by origin-absolute path; `e2e/builder.spec.ts` asserts the digits use the `Score Digits` family and are at least 1.5× the suffix size. `npm run lint`, `npm run typecheck`, `npm test` (28 tests) and the amended e2e case on both projects pass. The full 40-case suite still cannot run in this environment (Playwright limitation recorded above), so this case was executed in isolation with `-g`.

Not done: the `/ 100` suffix, the rating word, the `45 → 52 · +7 points` line and the `+N pts` badges keep the body font — the subset ships ten glyphs, so extending the display face to those lines needs a larger subset and a check that `→` and `+` exist in it.

## Score change effect — 2026-10-08
Asked to make the moment the score changes land harder. What existed: one 480 ms `score-bounce`, `translateY(-5px) scale(1.12)` at 35% — a nudge. The number also snapped to its new value instantly, which is the main reason the change read as flat.

Now, per score change: the digits **roll** old → new over 300 ms (`requestAnimationFrame`, cubic ease-out, integers only), then everything else fires on a 300 ms delay so the impact lands exactly when the roll stops. Gain plays `score-slam` (660 ms: overshoot to 1.52 with a −3° tilt, squash to 0.86, rebound to 1.15, settle) plus `score-flash` (420 ms, `filter: brightness()` peaking at 2.7 — the gold blows out to white at the hit, like a damage number) plus `score-shock` (a `::after` ring, `scale(.3)`→`2.3`, opacity .95→0). A loss plays `score-shake` instead — sink to 0.74, three-frame horizontal shake, blue ring — so direction is legible without reading the digits.

Sequencing detail: with `animation-fill-mode: both`, the 0% frame is held for the whole 300 ms delay, so every 0% keyframe has to be the resting state (`scale(1)`, `brightness(1)`, `opacity:0` on the ring). The first draft started the flash at `brightness(2.6)`, which left the digits blown out *while they rolled*.

Measured on the built site by pausing `document.getAnimations()` at fixed times (`deviceScaleFactor: 2`, 1280px):

| Animation time | `getComputedStyle().transform` | `filter` |
| --- | --- | --- |
| 201 ms (during the roll) | identity | `brightness(1) saturate(1)` |
| 400 ms (100 ms into the slam) | `matrix(1.512, −0.078, …)` → scale 1.51, −3° | `brightness(2.38) saturate(0.55)` |
| 560 ms | scale 0.862 | `brightness(1.30) saturate(1.11)` |
| 700 ms | scale 1.149 | `brightness(1.01)` |
| 1100 ms | identity | `brightness(1) saturate(1)` |

Layout: transforms only, so nothing reflows. At the impact frame `documentElement.scrollWidth == clientWidth` at both 1280px and 390px (1280/1280, 390/390) and no horizontal overflow appears; the scaled number does reach ~24px above the toolbar row (number top 67.8 vs toolbar top 92), which is intentional and harmless because the ring is `pointer-events:none`. Digit advance widths are uniform, so the roll never nudges `/ 100`.

Accessibility: a rolling number inside `aria-live="polite"` would have announced ~30 times per change. `.score-value` is now `aria-hidden="true"` and a `.visually-hidden` span in `.toolbar-score` carries `Team score N of 100`, so the live region fires once with the final value. It is the first child, not the last, because `.toolbar-score > span:last-child { font-size: 12px }` styles the rating word and `.score-number > span:last-child` styles `/ 100` — appending it would have re-skinned both.

Robustness: the roll's target is read from a ref each frame rather than captured at start, and a separate effect syncs the displayed number whenever `analysis.total` moves without a revision bump. Without that, a team change arriving through the URL sync path (`setTeam` at line 65, which does not bump `scoreRevision`) would have left the digits stuck on the old score permanently.

Reduced motion: the JS jumps straight to the final value and CSS sets `animation: none`. That override had to move *below* the animation shorthands at the end of the file — a media query adds no specificity, so the earlier block lost the cascade and the impact kept running. Caught by the existing `toHaveCSS('animation-name','none')` assertion, which is why it is covered rather than assumed.

Guards: `e2e/builder.spec.ts` now asserts `animation-name` matches `score-(slam|shake), score-flash`, a `0.3s, 0.3s` delay pair and `both` fill on both animations, plus the reduced-motion `none`. The one-shot `textContent()` read of the score in the saved-teams case is preceded by a poll that the rolled digits have caught up with the hidden live value — with the number animating, that read could otherwise capture a mid-roll value and make the case flaky. `analysis updates live`, `official type assets…`, `saved teams survive…`, `edit six slots…`, `accessible empty…`, `recommendations apply…`, `continuous building…` and `automatic replacements…` all pass on both projects when run in isolation (the local Playwright context-reuse limitation above still blocks a full serial run).

Pre-existing failure, not from this change: `desktop core tools fit the first screen` asserts the first recommendation button ends at or above 768px at 1366×768; it measures **782.67px**, 14.67px below the fold. Verified unrelated by stashing the whole score change and re-running against the branch HEAD, which fails with the identical `782.671875`, and by confirming that removing the score markup from the live DOM leaves the button at the same y. `origin/main` (c6e9f60) fails the same way locally, yet its last push is green on GitHub's runner in both `Quality checks` and `Deploy GitHub Pages`, so this is a local-Chromium difference at that viewport (font metrics or scrollbar width on Windows), not a live regression. Nothing was changed to chase it.
