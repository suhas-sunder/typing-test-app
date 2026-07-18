# Reviewed route migration decisions

## Current Phase 8 policy

The canonical host is `https://freetypingcamp.com`. Phase 8 preserves the evidence-first migration policy: a redirect is eligible only when the historical source and destination have the same user intent. Unknown lesson parameters return 404 instead of silently rendering unrelated content. Exact lesson runners are valid learning routes but remain `noindex,follow`; public skill hubs carry the indexable curriculum intent.

Active path redirects are `/dashboard` to `/progress` (307) and `/games` to `/games/calculator` (308). The www host permanently redirects to non-www while preserving the path. No speculative credential, policy-alias, case, or legacy numeric-lesson redirects were added.

## Active canonical routes

| Route family | Decision | Index behavior |
|---|---|---|
| `/lessons` | Retain as curriculum hub | Index |
| `/lessons/{six-known-unit-ids}` | Retain as the six substantial unit destinations | Index |
| `/lessons/lesson/{unit-id}/lesson/{lesson-id}` | Retain only for exact registry matches; mismatch/unknown returns 404 | `noindex,follow`; excluded from sitemap |
| `/typing-practice` | Add as focused-practice hub | Index |
| `/typing-practice/{eight-known-practice-ids}` | Add as canonical focused practice | Index |
| Unknown unit or practice slug | 404 | No indexable fallback |
| Practice length/variant state | Keep in component state; do not create route/query canonicals | Canonical remains the base practice URL |
| `/games` | Permanent redirect to the sole implemented game | Excluded from sitemap |
| `/games/calculator` | Retain Calculator Sprint | Index |
| `/learn`, `/about`, `/contact`, `/privacy`, `/terms`, `/cookies`, `/accessibility` | Retain substantive guidance/trust destinations | Index |
| `/progress`, `/sitemap`, `/socials` | Retain local/utility destinations | Noindex; excluded from XML sitemap |

The final XML sitemap has exactly 26 canonical routes: 12 static product/trust routes, six curriculum skill hubs, and eight focused-practice routes. The 45 lesson runners plus the three explicit local/utility routes form the 48-route noindex inventory.

## Historical sources reviewed but not mapped

| Historical source | Evidence | Phase 3 decision | Evidence still required |
|---|---|---|---|
| `/lessons/lesson/1/sec-1/lvl-1` through the legacy numeric matrix | `client/src/data/LessonNavData.ts` contains 1,752 URLs across 15 categories; legacy tests prove only a few representative meanings | Do not blanket-redirect. The active runner no longer falls back to lesson one, so these URLs now 404 unless they exactly match the new canonical pattern | Search Console/analytics landing-page data and a human-approved semantic mapping for each retained group |
| `/login`, `/register`, `/verify-email`, `/forgot-password` | Legacy account routes; target product has no authentication | No Phase 3 redirect | Decision on existing-account communication and whether credential-only routes should redirect or be retired |
| `/profile`, `/profile/summary`, `/profile/stats`, `/profile/achievements`, `/profile/themes`, `/profile/img`, `/profile/account` | Legacy client routes combine server-account and local customization concepts | No Phase 3 redirect | Human decision about which have genuine progress intent and external traffic |
| `/privacypolicy`, `/cookiespolicy`, `/termsofservice` | Direct legacy trust-route names | No Phase 3 redirect | Deployment-level confirmation and human approval of `/privacy`, `/cookies`, and `/terms` as exact successors |
| `/Learn` | Legacy case variant | No Phase 3 redirect | Hosting/case behavior and traffic evidence |
| `/socials` | Active but peripheral page | Retain unchanged for now | Human decision whether to consolidate later |

## Replaced Phase 3 lesson identifiers

The 30 Phase 3 lesson URLs are not redirected automatically. Twelve strong equivalents are mapped only inside the v4-to-v5 local-progress migration. Other valid old results remain in bounded legacy history and do not count toward the 45 current lessons. URL redirects still require traffic evidence and separate approval.

## Proposed mappings awaiting approval

These are proposals, not implemented behavior:

| Source | Candidate destination | Rationale |
|---|---|---|
| `/privacypolicy` | `/privacy` | Direct policy equivalent |
| `/cookiespolicy` | `/cookies` | Direct policy equivalent |
| `/termsofservice` | `/terms` | Direct policy equivalent |
| `/Learn` | `/learn` | Case normalization |
| Selected verified numeric home-row URLs | `/lessons/home-row` or `/typing-practice/asdf-jkl` | Only when the old exercise intent is verified |
| Selected verified numeric top-row URLs | `/lessons/top-row` or `/typing-practice/qwertyuiop` | Only when the old exercise intent is verified |
| Selected verified numeric bottom-row URLs | `/lessons/bottom-row` or `/typing-practice/zxcvbnm` | Only when the old exercise intent is verified |

## Acceptance rules for a later redirect change

- Use an explicit table, not a broad dynamic fallback.
- Document evidence and rationale for every source or tightly equivalent group.
- Avoid redirect chains and mass unrelated many-to-one redirects.
- Preserve one canonical URL per intent.
- Keep individual lesson runners noindex unless a later content review explicitly changes that policy.
- Add table-driven status/location tests before deployment.
- Test unknown parameters as true 404s.
