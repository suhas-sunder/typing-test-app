# Phase 8: advertisements, SEO, trust, and launch readiness

## Outcome

Phase 8 adds one production-gated AdSense system, completes canonical/indexing controls, restores the verified legacy browser icon, corrects trust and product copy, and records launch gates without changing the approved Phase 7 typing keyboard or lesson engine.

## Advertisement architecture

`lib/ads/config.ts` owns the publisher, seller, six slot IDs, typed placement registry, route-family policies, reservation sizes, and runtime resolution. `PageFrame` resolves server environment and provides one route family. `AdRuntimeProvider` owns the one-loader lifecycle. Route components can request only a logical placement; they cannot supply publisher or slot IDs. The stable relationship is reservation container → sibling neutral placeholder plus AdSense `ins`.

Publisher: `ca-pub-4810616735714570`. Seller: `pub-4810616735714570`.

| Logical placement | Slot | Shape | Reservation and eligibility |
|---|---:|---|---|
| `above_header` | `9403252845` | Fixed | 728×90 at viewport ≥800px; no `auto`, mobile replacement, sticky behavior, or smaller-width gap |
| `below_header_or_tool` | `4805532285` | Horizontal | 320×100 at ≥360px; 468×60 at ≥540px; 728×90 at ≥900px |
| `sidebar_left` | `2837844497` | Vertical | Balanced 160×600 pair at ≥1712px; 300×600 pair at ≥2048px |
| `sidebar_right` | `6486967973` | Vertical | Same paired eligibility; never rendered alone |
| `main_content_rectangle` | `1370372660` | Rectangle | 300×250 at ≥340px, only in substantive explanatory content |
| `bottom_page` | `5324407034` | Horizontal | Same horizontal sizes, after content and before the footer |

At the normal maximum page width of 1280px, the 160px rail threshold is `1280 + 160 + 160 + 32 + 32 + 48 safety = 1712px`. The 300px threshold reserves additional scrollbar/page safety: `1280 + 300 + 300 + 32 + 32 + 104 safety = 2048px`. Therefore 1366 has no rails and 1920 uses a balanced 160px pair without narrowing or moving the center. Rails are absolute within the page flow, never fixed or sticky, and cannot create horizontal overflow.

When a visible live unit initializes, both the `ins` and its owning reservation are frozen to the measured request size. It is pushed once per eligible mount, never refreshed, and never tied to typing, stages, scores, themes, or achievements. Hidden breakpoint units are not requested. A loader or push failure is caught once and retains the stable placeholder without console retry loops.

## Runtime modes and placeholder states

| Mode | Behavior |
|---|---|
| `live` | Requires explicit `FTC_ADSENSE_MODE=live`, production Node environment, and production deployment context. Loads the exact script once and requests visible eligible units. |
| `placeholder` | Local/default visual mode. Loads no script and renders exact reservations. `FTC_AD_PLACEHOLDER_STATE` can simulate placeholder, filled, unfilled, or blocked. |
| `off` | Loads no script and emits no reservations or unexplained gaps. Invalid mode input fails here. |

The placeholder reads exactly “Advertisement,” is `aria-hidden`, non-focusable, and pointer-inert. It has no border, outline, shadow, icon, animation, or call to action. It is a sibling of the ad. Official-compatible `data-ad-status="filled"` observation hides only the placeholder; filled, unfilled, blocked, and failed states retain dimensions.

## Route placement and suppression

| Family | Above | Secondary after intro/tool | Paired rails | Rectangle | Bottom |
|---|---:|---:|---:|---:|---:|
| Home | Yes | Yes | Eligible | Explanatory content | Yes |
| Typing test | Yes | After complete tool/results | Eligible | Guide content | Yes |
| Lesson runner | Yes | After every stage/result | Eligible | No | No |
| Lessons hub and six skill hubs | Yes | Yes | Eligible | Guidance content | Yes |
| Practice hub and eight focused routes | Yes | After complete tool where applicable | Eligible | Guidance content | Yes |
| Calculator Sprint | Yes | ≥150px after complete game | Eligible | Separate explanatory content | Yes |
| Learn | Yes | After introduction | Eligible | Long-form content | Yes |
| Progress | No | No | No | No | No |
| About; contact/privacy/terms/cookies/accessibility | No | No | No | No | No |
| Sitemap/socials utility, 404/invalid routes, redirects | No | No | No | No | No |

No ad is inside a typing passage, keyboard, lesson stage, stage transition, result actions, calculator controls, progress record, theme/achievement selector, or footer links.

## Consent and ads.txt

`public/ads.txt` contains exactly `google.com, pub-4810616735714570, DIRECT, f08c47fec0942fa0`. Code does not imply that account authorization is complete. Live advertising requires a Google-certified CMP and the applicable regional messages plus a visible choice-revisit mechanism. Those are external AdSense/Privacy & Messaging checks and remain unverified until a human validates the production account.

## Canonical, routes, and discovery

Canonical origin is `https://freetypingcamp.com`. Metadata, Open Graph URLs, JSON-LD, sitemap, robots, and the www redirect use that host.

- Generated application inventory: 80 static pages from the production build; `/typing-test` is intentionally dynamic so validated compatibility query settings remain functional.
- Indexable inventory: exactly 26 routes — home; typing test; lessons hub; six skill hubs; practice hub; eight focused-practice routes; Calculator Sprint; Learn; About; Contact; Privacy; Terms; Cookies; Accessibility.
- Noindex: `/progress`, `/sitemap`, `/socials`, and all 45 exact lesson runners (`noindex,follow`).
- Redirects: `/dashboard` → `/progress` (307); `/games` → `/games/calculator` (308); www host → non-www preserving path (308/permanent).
- True 404 families: unknown unit, unknown/mismatched lesson parameters, unknown focused-practice ID, removed credentials, and removed games.

Every indexable page has a unique absolute title, unique description, canonical, index/follow rule, and matching Open Graph identity. Structured data is limited to one factual `WebSite` object and one factual `WebApplication` object; there are no ratings, reviews, course claims, or duplicate schema. XML sitemap output is derived from the same exact 26-route registry and has no build-time timestamp churn. Robots exposes the non-www sitemap without crawl-delay directives.

IndexNow was not implemented: no verified Bing key or reliable deployment-owned submission path exists. Bing verification and sitemap submission remain manual launch steps.

## Content, trust, and internal links

Automated source audits reject stale 30-lesson product copy, account actions, removed-game claims, unfinished/MVP language, duplicate rating schema, and literal links to missing or redirect-only routes. Homepage copy links to all six primary implemented destinations. Creator Links and Similar Projects remain distinct. About now lists the factual 45 lessons, eight practice topics, local progress, and lack of cloud/public profiles. Privacy, Cookies, and Terms describe current local storage and production AdSense separation and explicitly require legal review. Accessibility avoids certification claims and records device/screen-reader checks still due.

## Browser identity

The blue-and-gold “F” favicon shown by the prior production code was verified in `client/src/assets/images`. Its ICO and Apple-touch asset are copied byte-for-byte into `public`, with 16, 32, 96, and 196px PNG variants. Root metadata publishes the icon set, manifest, warm-cream theme/tile color, application name, and AdSense account meta tag. Obsolete legacy title, account, achievement, and unlockable claims were not restored.

## Responsive, CLS, performance, and accessibility findings

Static and component tests cover the exact reservation matrix, paired rail policy, fixed 728×90 behavior, no mobile above-header gap, request-size freezing, filled/unfilled/blocked stability, route suppression, post-tool ordering, and 150px game separation. Browser checks at 390/768/1366/1920 found no horizontal overflow. The 1920 layout kept the 1152px tool centered with a zero-pixel center delta and balanced 160×600 rails; 1366 had neither rail. Filled and blocked simulations at 390 kept every placement box and the footer's 3,627px top coordinate identical. Eleven screenshots are stored in `docs/evidence/phase8`; the browser capture backend clipped wide PNG surfaces to 1415px, so recorded DOM geometry is the authoritative 1920 evidence. The approved compact keyboard remains selected below the 68rem component container threshold and the unchanged full keyboard remains above it; Phase 8 does not modify keyboard rows, keys, passage layout, stage order, or typing calculations.

The advertisement placeholder cannot receive focus or pointer input. No new borders, outlines, shadows, gradients, animation, or sticky/fixed ads were added. Focus, reduced-motion, keyboard input, semantic landmarks, and text feedback remain governed by the Phase 7 interface. Real iOS, Android, mobile hardware-keyboard, and screen-reader checks remain external.

## Dependency and security findings

Unused `posthog-js`, `react-ga4`, `react-router-dom`, `react-turnstile`, `uuid`, and UUID types were removed. Next and its ESLint preset moved to 15.5.20; Vitest moved to 4.1.10 with its supported Oxc JSX configuration. This removes the earlier critical and high active audit findings. The remaining production audit report is two moderate entries for PostCSS bundled inside Next 15; npm proposes an unsafe downgrade to Next 9, so it is documented rather than forced. Static generation is limited to one worker through Next's `experimental.cpus` setting because the local Node 25 host terminated multi-worker builds; the configured Netlify runtime remains Node 20. No secrets were introduced; publisher and slot identifiers are intentionally public AdSense identifiers.

## Manual launch checklist and remaining risk

Unverified external items: AdSense Ready status; existence/configuration of all six units; CMP and regional messages; consent revisit; ads.txt Authorized status; Netlify canonical domain, TLS, and `main` production branch; production www redirect; Search Console; Google/Bing sitemap submissions; Bing verification/IndexNow handling; production policy warnings; iOS/Android/hardware-keyboard/screen-reader tests; legal review; 45-lesson pedagogical and corpus editorial review; all-theme visual review; real Core Web Vitals; invalid-traffic monitoring.

The primary residual risks are those external account/device checks, the documented moderate bundled PostCSS advisory, and behavior of third-party live ad creative that placeholder mode cannot reproduce. Do not enable `live` until consent and AdSense account checks are complete.
