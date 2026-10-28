# Random generator follow-ups (recorded, not in current scope)
- [ ] Decide whether to add a base-stat-total (BST) range filter. Competing generators offer it; it can use local base-stat data without new sources.
- [ ] Shiny mode: no shiny artwork is in the pipeline. Needs a sourced asset set and licence notes before any shiny feature ships.
- [ ] Game-specific availability (encounters, versions) remains out of scope until per-version data is sourced.
- [x] Checked: the GitHub Pages project URL 302-redirects to http://superpokemonteambuilder.com/, so GitHub Pages serves the primary domain. Keep `NOINDEX_DEPLOY` unset for this workflow; setting it would deindex the live site.

# Next phases
- [x] Phase 1: choose and document a single initial format, data source/license, sprite attribution, and validated local dataset. Do not imply current competitive legality without a verified ruleset.
- [x] Phase 2: implement six slots, accessible search/filter dialog, add/remove/replace, and safe URL round-trip.
- [x] Phase 3: deterministic type engine and four scores; tests for immunities, dual types, 4x weaknesses, repeated weaknesses, empty/full teams.
- [x] Phase 4: evaluate candidates using the same score function; explain computed deltas.
- [x] Phase 5: SEO routes, sitemap, robots, OG and structured data; analytics only after configuration.
- [x] Phase 6: keyboard/mobile/browser QA, invalid URLs, performance and deployment.

The builder supports editing, deterministic type analysis, scores and computed recommendations. Team edits keep URLs clean; share-link UI is disabled. See README.md for current behavior.

## Deployment and remaining verification
- [x] GitHub Pages serves the primary domain, superpokemonteambuilder.com. Quality checks and Pages deployment passed for commit `29ae7f3` (verified October 28, 2026).
- [ ] Add actual GA4/GSC identifiers if wanted, rebuild and submit the sitemap after verifying ownership.
- [ ] Verify production HTTPS redirects, response headers and 404 behavior; run a production performance check.
- [ ] Validate the current tool visually on physical mobile devices. Local official artwork is implemented; alternate forms and competitive legality remain outside scope.
- Saving and sharing are not a current development priority. Share-link UI remains disabled; preserve existing browser-local saves.
- Daily guide preparation is gated by `GUIDE_RELEASE_ENABLED`; scheduled runs are skipped while disabled. All 102 archived guides are already published, so there is no remaining release queue.

## Pre-launch usability update
- [x] Browser-local named team saves (20 maximum), explicit load/delete and storage failure fallback.
- [x] Direct per-member remove buttons replace the former Undo action.
- [x] Explain score tier thresholds using the centralized scoring configuration.
- Alternate forms and actual game-specific availability remain follow-up work; scoring remains a casual planning heuristic.
- [x] Continuous six-slot selection with explicit Done, duplicate protection and one-pick replacement behavior.
- [x] Full-screen mobile picker with persistent controls and scrolling results; larger touch targets.
- [x] Show previous/current score and signed difference after team edits.
- [ ] Validate the picker with a physical iPhone/Android software keyboard after deployment; Chromium viewport checks do not emulate real keyboard resizing.
- [x] Collapsible picker filters with active labels, clear search and no-results reset.
- [x] Respond to VisualViewport height/offset changes and restore background scrolling on close.
- [x] Restore keyboard focus to an enabled toolbar action when filling the last slot disables the original opener.
- [x] Replace letter tokens with PokéAPI sprites in team cards, search results and recommendations, with fixed dimensions and request-failure fallback.
- [x] Serve artwork from the site origin: build-time 160px/320px WebP for all 1,025 species replaces the 475px jsDelivr PNG, cutting one picker page from 8.63 MB to about 0.4 MB.

## Sprite delivery follow-ups
- [ ] Re-run `npm run audit` on the built output and compare Lighthouse LCP and network weight against the recorded CDN baseline.
- [ ] Confirm sprite weight against a real mobile budget after deployment; 23 MB now lives on the origin, so the host's static file cache and bandwidth limits are worth checking.
- [ ] Consider committing the generated WebP set (or caching `.sprite-cache/` in Actions) if CI build time or CDN egress becomes a problem.
- Alternate forms and cosmetic sprites remain unavailable; the pinned upstream is keyed by National Dex number and the pool is base species only.

- Gen 3 follow-up: source per-version encounter/trading/event/postgame availability before offering Emerald or FireRed/LeafGreen availability filters. Current Gen 3 scope is explicitly the cross-game 386-species National Dex, without tier bans, abilities or moveset legality.
