# Deployment and environment configuration

## Production target

The active application is the root Next.js project. Netlify runs `npm run build`, publishes `.next`, uses Node 20, and applies `@netlify/plugin-nextjs`. The intended canonical origin is `https://freetypingcamp.com`; `www.freetypingcamp.com` is permanently redirected by `next.config.mjs` while preserving the path.

Next static generation is deliberately limited to one worker in `next.config.mjs`. This keeps production output deterministic on the local Node 25 QA host, where the multi-worker build process exited early; it does not change runtime rendering or route behavior.

Netlify's production branch must be set to `main` in the site dashboard. That account-level setting is not encoded in `netlify.toml` and remains a manual launch check.

## Advertisement environment variables

All variables are server-side. Do not expose them with a `NEXT_PUBLIC_` prefix.

| Variable | Accepted values | Default and purpose |
|---|---|---|
| `FTC_ADSENSE_MODE` | `live`, `placeholder`, `off` | Empty defaults to `placeholder`. Invalid input fails closed to `off`. `live` is honored only when `NODE_ENV=production` and deployment context is `production`. |
| `FTC_AD_PLACEHOLDER_STATE` | `placeholder`, `filled`, `unfilled`, `blocked` | Optional visual/test simulation. Invalid or empty input becomes `placeholder`. It never requests AdSense. |
| `FTC_DEPLOYMENT_CONTEXT` | `production` or a non-production label | Portable deployment-context fallback. Netlify's built-in `CONTEXT` takes precedence. |

Production Netlify configuration requires `FTC_ADSENSE_MODE=live`; Netlify supplies `CONTEXT=production` only for the production deploy. Deploy previews therefore fall back to stable placeholders even if `live` is inherited. Local development should use `placeholder`, and automated tests force ads off. Use `off` for an emergency ad shutdown without code changes.

Never put the publisher or slot IDs in environment variables. They are public identifiers owned by the typed registry in `lib/ads/config.ts`, preventing routes from injecting arbitrary inventory.

## Pre-deploy commands

```text
npm ci
npm run lint
npm run typecheck
npm test
npm run build
git diff --check
```

Run the retained client build, lint, and tests as a historical-regression comparison. Its known lint/test debt is not part of the active runtime, but new failures must not be introduced.

## External launch setup

Before enabling live ads, a human must verify the AdSense site and six units, ads.txt authorization, a Google-certified consent management platform, applicable EEA/UK/Switzerland and US-state messages, and a working consent-revisit control. Confirm the canonical domain, TLS, redirect, Search Console property, Google and Bing sitemap submission, Bing verification, and production-branch setting. IndexNow is not automated because this repository has no verified Bing key or deployment-owned submission mechanism; handle submission manually until those prerequisites exist.

After deployment, smoke-test the favicon and Apple icon, canonical and Open Graph tags, `/robots.txt`, `/ads.txt`, `/sitemap.xml`, both redirects, representative 404s, ad suppression, and typing input. Monitor Core Web Vitals, AdSense policy/invalid-traffic notices, and real mobile/assistive-technology behavior.
