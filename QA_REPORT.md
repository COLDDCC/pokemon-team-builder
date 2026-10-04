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
