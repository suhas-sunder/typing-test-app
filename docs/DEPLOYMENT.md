# Deployment and environment configuration

## Production target

The active application is the root Next.js project. Netlify is the current deployment target: it runs `npm run build`, publishes `.next`, uses Node.js 24.18.1 LTS with its bundled npm 11.16.0, and applies `@netlify/plugin-nextjs`. The intended canonical origin is `https://freetypingcamp.com`; `www.freetypingcamp.com` is permanently redirected by `next.config.mjs` while preserving the path.

`.nvmrc` is the exact local runtime pin, `package.json` declares support for the Node 24 line, and `netlify.toml` mirrors the exact version used for deployment. Next static generation remains deliberately limited to one worker in `next.config.mjs`; that setting is unchanged by this runtime standardization and should be reassessed separately rather than coupled to it.

Netlify is the current production platform, but this does not make it the permanent hosting choice for future substantial server infrastructure. Reassess hosting separately when persistent server workloads justify it.

## Branch and release policy

`master` is the GitHub default and primary integration branch. Feature branches and ordinary completed development work target `master`. Merging or pushing development work to `master` does not trigger the Netlify production deployment.

`main` is the production release branch. Netlify watches `main` and automatically starts a production deployment whenever `main` is pushed or updated. Updating `main` must therefore be treated as an explicit production release action, not as an ordinary integration step.

Validated work moves through this release boundary:

```text
feature/work branch
        ↓
      master
   integration
        ↓
 explicit release action
        ↓
       main
 production branch
        ↓
     Netlify
        ↓
    production
```

Changes should be integrated and validated on `master` before a deliberate promotion of the approved `master` state to `main`. There is currently no automated `master`-to-`main` synchronization or release mechanism.

## Advertisement environment variables

All variables are server-side. Do not expose them with a `NEXT_PUBLIC_` prefix.

| Variable | Accepted values | Default and purpose |
|---|---|---|
| `FTC_ADSENSE_MODE` | `live`, `placeholder`, `off` | Empty defaults to `placeholder` in production, previews, and local development. Invalid input fails closed to `off`. `live` is honored only when explicitly configured with `NODE_ENV=production` and deployment context `production`. |
| `FTC_AD_PLACEHOLDER_STATE` | `placeholder`, `filled`, `unfilled`, `blocked` | Optional visual/test simulation. Invalid or empty input becomes `placeholder`. It never requests AdSense. |
| `FTC_DEPLOYMENT_CONTEXT` | `production` or a non-production label | Portable deployment-context fallback. Netlify's built-in `CONTEXT` takes precedence. |

Netlify remains the current deployment target and supplies `CONTEXT=production` only for the production deploy. Production stays on stable placeholders unless `FTC_ADSENSE_MODE=live` is deliberately configured; deploy previews remain placeholders even if `live` is inherited. Set `FTC_ADSENSE_MODE=placeholder` for a production visual simulation, or `off` for an emergency ad shutdown without code changes. Automated tests force ads off. Enabling live mode does not replace the separate legal, consent-management, and AdSense readiness checks below.

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

Do not include `client/` or `server/` commands in the active release gate. Their explicitly named `*:historical` commands are for deliberate local reference only; see `docs/ARCHITECTURE.md` for the canonical status of both historical applications.

## External launch setup

Before enabling live ads, a human must verify the AdSense site and six units, ads.txt authorization, a Google-certified consent management platform, applicable EEA/UK/Switzerland and US-state messages, and a working consent-revisit control. Confirm the canonical domain, TLS, redirect, Search Console property, Google and Bing sitemap submission, and Bing verification. IndexNow is not automated because this repository has no verified Bing key or deployment-owned submission mechanism; handle submission manually until those prerequisites exist.

After deployment, smoke-test the favicon and Apple icon, canonical and Open Graph tags, `/robots.txt`, `/ads.txt`, `/sitemap.xml`, both redirects, representative 404s, ad suppression, and typing input. Monitor Core Web Vitals, AdSense policy/invalid-traffic notices, and real mobile/assistive-technology behavior.
