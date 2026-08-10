# Legacy URL migration ledger

The active product is the root Next.js application. The historical `client/`
and `server/` applications are evidence only and are never executed by this
migration. The canonical host remains `https://freetypingcamp.com`.

The executable source of truth is `lib/seo/legacy-routes.ts`. This ledger
records the evidence and the deliberately unresolved cases without duplicating
every generated route.

## Decision matrix

| Legacy route or group                                    | Historical intent                                                   | Current equivalent               | Action             | Confidence |
| -------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------- | ------------------ | ---------- |
| `/cookiespolicy`, `/privacypolicy`, `/termsofservice`    | Trust policies                                                      | `/cookies`, `/privacy`, `/terms` | Permanent redirect | High       |
| `/Learn`                                                 | Learning guide                                                      | `/learn`                         | Permanent redirect | High       |
| 12 exact prior-curriculum lesson IDs                     | Authored keyboard skills                                            | Exact current successor lessons  | Permanent redirect | High       |
| Numeric categories 1–2                                   | Row-specific keyboard drills and words                              | Matching current row/unit        | Permanent redirect | High       |
| Numeric category 3, sections 1–4                         | Numbers, brackets, symbols, and mixed-character drills              | `/lessons/numbers-symbols`       | Permanent redirect | High       |
| Numeric category 5 and `/lessons/quotes`                 | Quote typing                                                        | `/typing-practice/quotes`        | Permanent redirect | High       |
| Numeric category 6 and `/lessons/common-english-words`   | Common-word typing                                                  | `/typing-practice/common-words`  | Permanent redirect | High       |
| Historical account and profile pages                     | Server-backed identity, account settings, images, themes, and stats | None                             | 410 Gone           | High       |
| Numeric category 4                                       | Historical graduation page                                          | None                             | 410 Gone           | High       |
| Numeric categories 7–15 and their category landing pages | Fact/themed typing content no longer offered                        | None                             | 410 Gone           | High       |
| `/v1/api/{settings,account,images,user}/*`               | Historical Express/PostgreSQL API                                   | None                             | 410 Gone           | High       |
| Numeric category 3, section 5                            | Mixed tricky-word/symbol drills                                     | No single proven successor       | Unresolved (404)   | Low        |
| `/lessons/{beginner,intermediate,advanced}`              | Old level menus spanning several current skill units                | No single proven successor       | Unresolved (404)   | Low        |
| 18 unmatched prior-curriculum lesson IDs                 | Authored keyboard skills changed during curriculum replacement      | No human-approved successor      | Unresolved (404)   | Low        |

## Implemented permanent redirects

Next.js returns HTTP 308 for these permanent redirects. Every destination is
the final canonical route; no source redirects to another legacy source.

| Source                          | Destination                     | Evidence                                  |
| ------------------------------- | ------------------------------- | ----------------------------------------- |
| `/cookiespolicy`                | `/cookies`                      | Direct cookie-policy successor            |
| `/privacypolicy`                | `/privacy`                      | Direct privacy-policy successor           |
| `/termsofservice`               | `/terms`                        | Direct terms-of-service successor         |
| `/Learn`                        | `/learn`                        | Historical case variant of the same guide |
| `/lessons/quotes`               | `/typing-practice/quotes`       | Same quote-typing intent                  |
| `/lessons/common-english-words` | `/typing-practice/common-words` | Same common-word practice intent          |

Twelve routes from the previous 30-lesson root curriculum redirect to their
exact human-reviewed successors. The shared mapping also drives v4-to-v5 local
progress migration, preventing route and persisted-progress semantics from
drifting.

The 1,752-route numeric inventory in
`client/src/data/LessonNavData.ts` is bounded exactly. Of those URLs, 295 map to
the matching current keyboard-row, numbers/symbols, quote-practice, or
common-word destination. Mapping uses the historical category and section
titles, not numeric similarity alone.

## Implemented 410 Gone routes

Known browser-facing retired URLs receive a real HTML response with HTTP 410,
`X-Robots-Tag: noindex, follow`, no redirect, and no canonical pointing at the
homepage.

- Account: `/login`, `/register`, `/verify-email`, `/forgot-password`.
- Profile: `/profile` and its `summary`, `img`, `stats`, `achievements`,
  `themes`, and `account` children.
- Retired category landing pages: graduation, animal, bird, insect,
  prehistoric, reptile, fantasy, sea-life, dog, and flower content.
- Numeric category 4 and categories 7–15: 1,452 routes whose historical
  content has no current equivalent.

`/profile` does not redirect to `/progress`: the historical parent was a
protected account shell and its children mixed PostgreSQL-backed speed-test
statistics with identity, image, theme, and account management. The current
`/progress` page is local-first and is not an equivalent account resource.

## Historical APIs retired

The four known Express mount points under `/v1/api/` (`settings`, `account`,
`images`, and `user`) return JSON with HTTP 410. The middleware response occurs
inside the active Next.js application; no historical Express, PostgreSQL, JWT,
or email code is imported or invoked. Unknown `/v1/api/*` paths remain normal
404s rather than being claimed as known historical endpoints.

## Unresolved historical URLs

These URLs intentionally retain normal 404 behavior:

- Five numeric routes in category 3, section 5. Their mixed words, casing, and
  symbols span several current skills, so one destination cannot be proven.
- `/lessons/beginner`, `/lessons/intermediate`, and `/lessons/advanced`. The
  old level menus cut across the current skill-unit structure.
- Eighteen lesson URLs from the prior 30-lesson root curriculum that lack an
  approved entry in the v4-to-v5 progress migration map.
- Any numeric lesson parameters outside the exact historical 1,752-route
  inventory.

No unresolved URL is redirected to `/`, `/lessons`, or the first lesson.

## SEO and crawler behavior

- Legacy sources are absent from the XML sitemap; only canonical current URLs
  remain.
- Redirect destinations emit their normal canonical metadata.
- 410 responses emit no canonical and explicitly allow link following while
  preventing indexing.
- `public/robots.txt` allows crawlers to observe redirects and 410 responses;
  it does not disallow these paths.
- The existing www-to-apex permanent redirect remains unchanged and preserves
  the requested path.

## External verification still needed

Search Console indexed-URL exports, historical access/Netlify logs, and
backlink reports are still needed to decide whether any of the 26 known
unresolved URLs merit an additional exact mapping. The same evidence can reveal
historical URLs outside the checked-in route inventories. Unknown URLs should
remain 404 until that evidence establishes their former meaning.
