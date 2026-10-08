# Deploy the static MVP

The repository builds a static site. No server, API keys or runtime database are required.

## Cloudflare Pages
1. Connect this GitHub repository using Pages Git integration and select the `main` production branch.
2. Choose the Astro build preset. Build command: `npm run build`. Output directory: `dist`. Project root: repository root.
3. Use Node.js 24 (`.node-version` is committed; explicitly set `NODE_VERSION=24` if the dashboard requires it).
4. Deploy and verify the generated Pages preview before adding the custom domain.
5. Add `superpokemonteambuilder.com` through Pages custom domains, then complete the DNS instructions shown by Cloudflare and confirm HTTPS.

The generated top-level 404.html is intentional: unknown URLs should show a real 404 rather than an SPA fallback. `_headers` contains two basic response headers for Pages. Vercel does not consume this file.

## Vercel alternative
Import the repository and use the Astro framework preset. The committed vercel.json sets the build command and `dist` output. Select Node.js 24 in project settings, then add the custom domain after checking the preview. Choose one production host; do not point the same domain at both.

## Domain, indexing and optional analytics
The origin in src/config/site.ts feeds Astro configuration, canonical URLs, OG metadata, robots and sitemap. Preview hosts intentionally retain the production canonical.

Set these optional build environment variables only when their identifiers are available:
- PUBLIC_GA4_MEASUREMENT_ID: a valid G-… measurement ID.
- PUBLIC_GOOGLE_SITE_VERIFICATION: the Search Console verification token.

Rebuild after changing identifiers. No GA4 script is rendered when the measurement ID is absent or invalid. Page-view location tracking excludes URL query parameters so team IDs are not included in that field. This is a page-view integration; custom interaction analytics are not implemented.

After the actual production domain is reachable over HTTPS, verify Search Console ownership and submit `https://superpokemonteambuilder.com/sitemap.xml`. Confirm the canonical and OG URLs use the intended domain. Check home, calculator routes, featured Pokémon pages, sharing, sitemap, robots, image and an unknown path.

## Validation before release
`npm ci`, `npm run check`, `npx playwright install --with-deps chromium`, `npm run test:e2e`.

`prebuild` generates the 1,025 resized sprites into `public/sprites/`, so a build needs outbound access to the pinned jsDelivr commit and publishes roughly 23 MB of extra static files. `npm run check:build` fails when either size is incomplete, which is why a host that builds in CI needs network egress rather than a pre-committed image set.

This change prepares hosting configuration and instructions. It does not create a Cloudflare/Vercel project, alter DNS, deploy the site, register Search Console or configure a real analytics account.

Official references:
- https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
- https://vercel.com/docs/frameworks/frontend/astro

Optional feedback contact: set PUBLIC_FEEDBACK_EMAIL to a real public support address before building. This enables a mailto draft on /feedback, not server-side collection. Without an address, only copy/download are offered and the page explicitly says feedback is not submitted. Never point public users to the current private repository's Issues page.

Feedback placeholder: feedback@example.com is deliberately nonfunctional and clearly labeled on /feedback. In Cloudflare Pages, set the build environment variable PUBLIC_FEEDBACK_EMAIL to your real support mailbox and redeploy. Creating a variable does not create a mailbox; use an existing address or separately configure mail routing. The fake example.com address never enables the Send draft button.
