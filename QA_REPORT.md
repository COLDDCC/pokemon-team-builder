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

The MVP deliberately uses placeholder artwork, base species only, casual rules and a type/base-stat heuristic. Moves, abilities, items, EV/IVs, battle simulation and competitive legality are outside this release.
