# Browser security policy

The active root Next.js application defines its browser security policy in
`lib/security/headers.mjs`. `next.config.mjs` applies the generated common
headers to normal Next.js responses, while `middleware.ts` applies the same
generated policy to the legacy 308 and 410 responses it returns directly.
There is no Netlify-specific duplicate policy or header literal set.

## Current resource requirements

| Resource                                            | Current source                               | CSP directive                                   | Reason                                              |
| --------------------------------------------------- | -------------------------------------------- | ----------------------------------------------- | --------------------------------------------------- |
| Next.js runtime and application bundles             | Same origin                                  | `script-src`                                    | Client hydration and interactive typing             |
| App Router hydration/RSC payloads                   | Inline, generated per static page            | `script-src 'unsafe-inline'`                    | Preserves static generation without request nonces  |
| Theme bootstrap                                     | Inline deterministic script                  | `script-src 'unsafe-inline'`                    | Applies the saved theme before paint                |
| WebSite and WebApplication JSON-LD                  | Inline JSON script blocks                    | `script-src 'unsafe-inline'`                    | Preserves structured data                           |
| Tailwind/application CSS and local fonts            | Same origin                                  | `style-src-elem`, `font-src`                    | Compiled local assets                               |
| Theme tokens, typing transforms/progress, ad sizing | Inline style attributes/CSSOM                | `style-src-attr 'unsafe-inline'`                | Required dynamic presentation state                 |
| Icons and images                                    | Same origin                                  | `img-src`                                       | Local application and manifest assets               |
| Development HMR                                     | Same origin plus development-only evaluation | `connect-src`, development `script-src`         | Next.js development tooling only                    |
| Placeholder/off advertising                         | No external source                           | `frame-src 'none'`, self-only connections       | Safe default and CI behavior                        |
| Explicit production/live advertising                | Exact centralized Google origins             | Script, connection, image, and frame directives | Current AdSense loader and its core frame endpoints |

The active application does not use remote fonts, remote application images,
XHR/fetch APIs, WebSockets outside development HMR, workers, authentication,
analytics, or user-facing external forms.

## CSP architecture

The policy is enforced, not report-only. Production starts at
`default-src 'self'`, blocks objects and framing, constrains base and form
targets, prevents inline event handlers, and omits `unsafe-eval`.

Per-request nonces were deliberately not introduced. Next.js App Router emits
many route-specific inline hydration/RSC script blocks even for statically
generated pages. Hashing only the theme and JSON-LD scripts would not authorize
those framework blocks, while enumerating generated page hashes is not a stable
header contract. A nonce would make normal pages request-bound and sacrifice
the current static/CDN rendering model. The remaining `script-src
'unsafe-inline'` is therefore explicit technical debt rather than an accidental
allowance. `script-src-attr 'none'` still blocks injected inline event handlers.

Inline style attributes remain necessary for theme CSS variables, typing
position/progress state, and measured live-ad reservations. CSP3-capable
browsers separately restrict style elements to same-origin production CSS.

## Advertising modes

Development policy contains no Google origin and permits no advertising
frames. Production CSP includes the proven AdSense sources as a supported
repository-owned capability; browser runtime activation remains independently
restricted to the exact canonical hostname `freetypingcamp.com`. Netlify
previews and unexpected hosts therefore cannot load the AdSense runtime even
though they use a production build.

The live policy names exact Google origins by their demonstrated resource
roles. Core delivery uses `pagead2.googlesyndication.com`,
`googleads.g.doubleclick.net`, and `tpc.googlesyndication.com`. Production
verification also demonstrated AdSense traffic-quality delivery through
`ep1.adtrafficquality.google` and `ep2.adtrafficquality.google`, and the
configured Google Privacy & Messaging surface through
`fundingchoicesmessages.google.com`, with its Google Fonts stylesheet and font
origins. The traffic-quality runtime uses `ep1.adtrafficquality.google` for its
configuration/pixel traffic, while its demonstrated frame targets are limited
to `ep2.adtrafficquality.google` and `www.google.com`. No wildcard Google domain
is allowed.

Passive production inspection also found two optional AdSense-initiated
connection attempts that remain intentionally blocked. AdSense code creates
`fonts.googleapis.com/css` stylesheet links for optional Google-font styling;
the live policy already permits those links through `style-src-elem` and the
corresponding `fonts.gstatic.com` payloads through `font-src`, but does not grant
Google Fonts general connection authority. The `csi.gstatic.com/csi` request is
Google client-side timing instrumentation (`action=csi_pagead`), not ad content
or FTC functionality. Filled and unfilled ads continued to work while that
telemetry was blocked, so `csi.gstatic.com` is not authorized.

The browser error gate still fails every unexpected CSP violation. Its narrow
optional-request policy recognizes only those exact HTTPS paths under
`connect-src`; different paths, directives, or origins remain failures. The
externally injected Cloudflare Insights beacon remains blocked and is not
authorized by FTC policy. No generic CSP-console suppression is used. Policy
tests exercise live mode without loading the AdSense network. Because
third-party ad delivery can change downstream origins, controlled live-mode
browser/network review remains required when Google changes delivery behavior.

PostHog is not integrated and no PostHog or generic analytics origin is
authorized. A future analytics task must reassess `script-src`, `connect-src`,
privacy behavior, and tests explicitly.

## Other headers

- HSTS is one year only for the canonical `freetypingcamp.com` production
  host, without `includeSubDomains` or `preload` commitments. Localhost,
  Netlify previews, and unexpected hosts receive the common protections but
  no HSTS commitment.
- `frame-ancestors 'none'` and `X-Frame-Options: DENY` prevent site framing.
- COOP and CORP use `same-origin`; COEP is intentionally omitted because it
  would conflict with deliberate cross-origin advertising resources.
- Permissions Policy disables the small set of powerful capabilities the
  typing product clearly does not use.
- Obsolete scanner-oriented headers such as `X-XSS-Protection` are omitted.
