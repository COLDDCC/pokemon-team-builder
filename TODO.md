# Next phases
- [x] Phase 1: choose and document a single initial format, data source/license, sprite attribution, and validated local dataset. Do not imply current competitive legality without a verified ruleset.
- [x] Phase 2: implement six slots, accessible search/filter dialog, add/remove/replace, and safe URL round-trip.
- [x] Phase 3: deterministic type engine and four scores; tests for immunities, dual types, 4x weaknesses, repeated weaknesses, empty/full teams.
- [x] Phase 4: evaluate candidates using the same score function; explain computed deltas.
- [x] Phase 5: SEO routes, sitemap, robots, OG and structured data; analytics only after configuration.
- [x] Phase 6: keyboard/mobile/browser QA, invalid URLs, performance and deployment.

The Phase 2 builder supports editing and sharing. Type analysis, deterministic scores and computed recommendations are now available. Hosting and DNS are not configured by this change.

## Launch configuration still needed
- Choose Cloudflare Pages or Vercel, import this repository, deploy and connect the custom domain.
- Add actual GA4/GSC identifiers if wanted, rebuild and submit the sitemap after HTTPS is live.
- Verify production redirects, headers, 404 and domain ownership; run a production performance check.
- Review the implemented tool visually. Pokémon artwork remains placeholders; alternate forms and competitive rules are outside this MVP.

## Pre-launch usability update
- [x] Browser-local named team saves (20 maximum), explicit load/delete and storage failure fallback.
- [x] Undo the last 20 team edits, including clear, load and recommendation changes.
- [x] Explain score tier thresholds using the centralized scoring configuration.
- Artwork/forms and actual game-specific availability remain follow-up work; scoring remains a casual planning heuristic.
- [x] Continuous six-slot selection with explicit Done, duplicate protection and one-pick replacement behavior.
- [x] Full-screen mobile picker with persistent controls and scrolling results; larger touch targets.
- [x] Show previous/current score and signed difference after team edits.
- [ ] Validate the picker with a physical iPhone/Android software keyboard after deployment; Chromium viewport checks do not emulate real keyboard resizing.
- [x] Collapsible picker filters with active labels, clear search and no-results reset.
- [x] Respond to VisualViewport height/offset changes and restore background scrolling on close.
- [x] Restore keyboard focus to an enabled toolbar action when filling the last slot disables the original opener.
