# Development rules
Read PRODUCT_SPEC.md and README.md before changing code.
Keep Astro, React, and TypeScript. Use local/build-time data; do not fetch each recommendation at runtime.
Implement one phase per commit. Run npm run lint, npm run typecheck, npm test, and npm run build after each phase.
Phase 0–2 contain infrastructure, local data and the basic builder. Do not add scoring or recommendation logic until Phase 3–4.
Keep scoring in src/lib/scoring, recommendations in src/lib/recommendations, and format data in src/data/formats.
Centralize scoring constants. Every scoring change requires meaningful tests.
Never use an LLM to assign team scores. Do not copy competitor content or assets.
Record unresolved scope or format questions in TODO.md; do not expand the MVP.
