# Free Typing Camp MVP rebuild audit

Audit date: 2026-07-16

Audit branch: `audit/ftc-mvp-rebuild-plan`

Audited deployment: `https://freetypingcamp.com`
Scope: investigation and planning only; no product-code changes

## 1. Executive summary

Free Typing Camp should be extended from the root Next.js MVP, not restarted and not replaced by the retained `client/` application. The deployed site matches the root Next.js App Router application. The older Vite/React client and Express/PostgreSQL server remain useful as a record of historical routes, content, score contracts, and test cases, but they are not the live UI and should not be restored wholesale.

The current MVP has a compact, understandable typing implementation. It already supports physical and clickable virtual-key input, expected-key highlighting, correct/error styling, responsive text flow, four timed modes, word/quote modes, three difficulty transforms, restart, completion, live WPM/accuracy, stars, and bounded local result storage. This is the correct extension point. Replacing it would introduce more regression risk than improving it.

The highest-risk defects are narrow and demonstrable:

- Backspace erases an error status, so corrected mistakes disappear from accuracy and no corrected/uncorrected distinction is possible.
- The timer counts interval callbacks rather than elapsed wall time; background throttling can make tests run long.
- Held-key repeat, IME/composition, and page visibility are not explicitly handled.
- Mobile uses a reduced clickable keyboard that omits `G` and `H` and all number/punctuation keys; the read-only hidden textarea is also an unreliable way to summon a native mobile keyboard.
- The calculator target contains spaces, while both physical and virtual input reject spaces, so normal expressions cannot be completed. Zero lives does not end the game.
- Any values in `/lessons/lesson/[category]/[section]/[level]` fall back to the first lesson and return HTTP 200. Old numeric lesson URLs therefore render duplicate first-lesson content instead of a valid mapping, redirect, or 404.
- Signed-out results are saved locally, but the result panel says “Sign in to save your progress.”
- Query variants, host variants, and dynamic lesson pages have no canonicals. Both `www` and non-`www` hosts return 200.
- Authentication, dashboard copy, account APIs, and trust-page statements conflict with the confirmed no-account rebuild direction.
- No AdSense loader or slots exist in the active Next.js app. The legacy HTML has one publisher loader but no reusable slot system.
- Most indexable product pages are too thin for the requested search/AdSense role. Trust pages are stronger, but privacy/terms/cookies describe accounts that will be removed.

Recommended delivery is six bounded implementation prompts. The first should stabilize and test the existing typing engine without changing routes, visual design, ads, lessons, or persistence schema.

## 2. Current framework and architecture

### Active application

- Next.js 15.5 App Router, React 19, strict TypeScript, Tailwind CSS 3.
- Netlify deployment through `@netlify/plugin-nextjs`.
- Server components by default; interactive typing, lessons, auth, dashboard, navigation, and calculator components are client components.
- Root shared frame: `components/page-frame.tsx`, `components/site-nav.tsx`, and `components/site-footer.tsx`.
- Active typing modules: `components/typing/*` and `lib/typing/*`.
- Active local persistence: `lib/typing/progress.ts`.
- Active account compatibility layer: `components/auth/*`, `lib/server/*`, and `app/v1/api/*` backed by JWT and PostgreSQL environment variables.
- No state-management library; local React state and one authentication context.
- No active analytics initialization and no active ad component.

### Retained legacy application

- `client/`: Vite/React Router application, 15 lesson-category data modules, a 1,752-entry lesson navigation list, account/profile UI, one calculator game, and 377 Vitest tests.
- `server/`: legacy Express/PostgreSQL source retained for contracts.
- The legacy client is excluded from the root TypeScript build. It is reference material, not an alternate active frontend.
- Its lesson text is partly fetched from `typingbooks.com`; static repository data is primarily titles, hierarchy, and supporting articles. That external dependency must not be reintroduced casually.

### Deployment confirmation

The live homepage DOM, title, links, and rendered design match `app/page.tsx` and the root components. The live site contains no AdSense slot elements or Google ad script. Current product/trust routes return 200. `/typing-practice`, `/progress`, and `/accessibility` return 404.

## 3. Current route inventory

All page routes are public at the HTTP level. “Indexable now” means no page-level `noindex`; it does not assert that a search engine has indexed the URL. Unless noted, current canonical behavior is “none.” All active pages use the shared header/footer internal links.

| Route | Indexable now | Purpose / interactive behavior | Supporting content and metadata | Storage / ads | Recommendation and reason |
|---|---|---|---|---|---|
| `/` | Yes | Homepage and test-settings entry; links to a query-configured typing test | Distinct H1 but inherited title/description; short feature copy contains stale sign-in claims | Auth token read by provider; no ads | Retain and extend. Preserve the hero and entry control; remove account wording and add original supporting copy. |
| `/typing-test` plus `duration`, `mode`, `difficulty` query variants | Yes | Main typing test, virtual keyboard, live/final stats, restart, settings | Inherited generic metadata; only title/subtitle below tool; no canonical | Saves `freeTypingCamp.results.v1`; reads `jwt_token`; no ads | Retain and extend. Canonicalize all settings to `/typing-test`; keep settings usable but not separately indexable. |
| `/lessons` | Yes | Lists 15 current drills and locally/account-derived stars | Inherited generic metadata; very short introduction | Reads local results or account score API; no ads | Retain and adapt into the controlled curriculum hub. |
| `/lessons/lesson/[category]/[section]/[level]` | Yes | Locked-text instance of the typing engine | Inherited generic metadata; thin, no instructional copy; invalid params silently fall back to first lesson | Saves local/account result; no ads | Do not retain as an open indexable pattern. Validate params immediately. Migrate valid historical URLs deliberately; use canonical unit pages and noindex drill states if separate drill URLs remain. |
| `/games` | Yes | Links to calculator and labels typing-test/lessons variants as “games” | Inherited generic metadata; thin; “Word Dash” and “Drill Streak” are not distinct games | Auth provider only; no ads | Retain, accurately describe available games, and delay new game promises until implemented. |
| `/games/calculator` | Yes | Numeric-expression typing game | Inherited generic metadata; no explanatory content | No persistence; no ads | Retain only after repairing impossible space input, zero-life completion, scoring, and tests. |
| `/learn` | Yes | Two links to lessons/test | Inherited generic metadata; one sentence; no actual guide | Auth provider only; no ads | Retain and extend into a substantive guide; currently too thin to index confidently. |
| `/dashboard` | Yes | Account-only aggregate stats or sign-in prompt | Inherited generic metadata; account wording | Reads `jwt_token` and account APIs; no ads | Replace intent with local `/progress`; redirect only after local progress exists. Mark noindex during transition. |
| `/login` | Yes and in sitemap | Login form | Inherited generic metadata | Reads/writes `jwt_token`; no ads | Remove from navigation/sitemap; redirect to `/progress` or an explanatory no-account destination after human confirmation. |
| `/register` | Yes and in sitemap | Registration form | Inherited generic metadata | Account API and `jwt_token`; no ads | Same as `/login`. Do not retain auth in this rebuild. |
| `/about` | Yes | Product purpose | Distinct metadata; useful original content and internal actions | Auth provider only; no ads | Retain and lightly update no-account facts. |
| `/contact` | Yes | Support information and mail link | Distinct metadata; adequate content if the address is operational | Auth provider only; no ads | Retain; human-verify the email and response claims. |
| `/privacy` | Yes | Privacy policy | Distinct metadata; substantial, but explicitly describes accounts/tokens/server progress | Auth provider only; no ads | Retain and rewrite accurately for local-only data, analytics, consent, and AdSense. Human/legal review required. |
| `/terms` | Yes | Terms | Distinct metadata; substantial, but describes accounts | Auth provider only; no ads | Retain and update for no-account operation and ads. Human/legal review required. |
| `/cookies` | Yes | Cookie/browser-storage policy | Distinct metadata; lists several technologies not currently used and account sessions | Auth provider only; no ads | Retain and update after actual storage/consent/ad implementation. Human/legal review required. |
| `/sitemap` | Yes and in XML sitemap | Human-readable link directory | Distinct metadata; includes auth destinations | Auth provider only; no ads | Retain as a utility page, update links, and mark noindex. |
| `/socials` | Yes and in XML sitemap | Creator/project external links | Distinct metadata but thin and peripheral | Auth provider only; no ads | Consolidate into About/footer or retain noindex; remove from XML sitemap. |

### API route patterns

`/v1/api/account/[resource]`, `/v1/api/settings/difficulty`, and `/v1/api/user/[resource]` are JSON endpoints, not content pages. They preserve legacy auth/score/settings contracts and require PostgreSQL/JWT configuration. The no-account rebuild should stop calling them before they are decommissioned. Deletion should be a later, explicit cleanup after confirming no external consumers and deciding how existing account data is handled.

### Legacy route facts relevant to migration

- The retained React Router file declares 227 explicit route paths: 201 lesson-level paths, seven profile paths, and 19 other paths.
- `LessonNavData.ts` contains 1,752 numeric lesson URLs across 15 categories, while the legacy XML sitemap contains 1,762 URLs.
- Old trust URLs `/privacypolicy`, `/cookiespolicy`, and `/termsofservice` currently return 404 on the live MVP.
- A live old URL such as `/lessons/lesson/1/sec-1/lvl-1` currently returns 200 but displays the first new lesson because of fallback lookup. This is not a valid migration.
- The legacy sitemap includes login/register and a large collection of thin lesson URLs. It must not be restored.

## 4. Existing typing-engine assessment

### Current behavior

| Area | Current implementation | Assessment |
|---|---|---|
| Physical input | Hidden read-only textarea handler plus a document-level `keydown` fallback; Ctrl/Meta/Alt combinations ignored | Good low-latency basis. Document handler improves focus recovery. Needs repeat/composition rules and tests. |
| Virtual keyboard | Clickable full keyboard at `xl`; reduced keyboard below `xl` | Reusable component and expected-key model. Reduced layout omits G/H and nonletters; full keyboard contains inert modifiers. |
| Active/expected key | Expected character highlighted; last pressed key flashes correct/error/neutral | Useful and should be preserved. Uppercase expected characters do not identify Shift because matching is case-insensitive. |
| Correct/incorrect characters | `CharStatus[]` with `idle`, `correct`, `error`; text uses sage or peach/coral | Clear and reusable. Status model is too small for corrected-error history. |
| Backspace | Moves cursor back and resets the prior position to `idle` | Functional correction UI, but deletes error history and can inflate final accuracy. |
| Corrected/uncorrected errors | Not represented separately | Required deeper state-model change, but safely addable within the current engine. |
| WPM | Correct characters / 5 / elapsed minutes, rounded up, then multiplied by accuracy | Works consistently with legacy logic but is not contract-tested. Very high early live values are possible; formula decision needs human confirmation. |
| Accuracy | `floor(correct / (correct + current errors) * 100)` | Simple, but corrected errors disappear. |
| Timer | Starts on first accepted character; one-second interval increments state; completes at duration | Usable foreground behavior. Must use timestamps for accuracy across throttling/visibility changes. |
| Lesson completion | Completes on text exhaustion or 60-second timeout | Reuses the test engine safely. Completion/target semantics are not curriculum-aware. |
| Exercise generation | 49 local common words, five local quotes, deterministic step pattern and difficulty transforms; regenerate seeds with current time | Easy to extend. Quote duration does not affect content length; long modes can exhaust text. Corpus is too small. |
| Restart/settings | Restart regenerates unlocked text and refocuses; settings change resets test | Preserve. Confirm whether settings may change after a test starts. |
| Focus | Initial focus, click-to-focus, and document fallback | Good intent. Nested `role=textbox` plus a hidden textarea needs accessible simplification. |
| Mobile | Clickable reduced keyboard; hidden read-only textarea | Layout is responsive, but input coverage and native mobile keyboard behavior are not reliable enough to claim full mobile support. |
| Paste | Read-only input plus ignored Ctrl/Meta combinations prevents ordinary paste | Correct for test integrity. Add an explicit test and clipboard-event guard if input architecture changes. |
| Key repeat | `event.repeat` is not checked | Defect/undefined policy. Current behavior accepts held-key repeats. |
| Modifiers | Ctrl/Meta/Alt ignored; Shift itself ignored but shifted character is accepted | Mostly sensible. Shift highlighting/finger guidance is missing. |
| Composition/IME | No `isComposing`, composition events, or before-input path | Unsupported. Define whether composed input is blocked with an accessible explanation or supported atomically. |
| Visibility | No `visibilitychange` handling; interval ticks are throttling-sensitive | Defect. Decide whether tests continue using wall time or pause while hidden. |
| Accessibility announcements | No live region for expected character, timer, mistakes, completion, or result guidance | Missing. Visual feedback is not announced. |

### Reliability and preservation boundary

Preserve the visual layout, `TypingTest` public props, `VisualKeyboard`, `buildTypingText`, route query parsing, `buildLessonTestName`, and the current local-save failure isolation. Do not rewrite the whole engine. Extract or introduce a small, testable attempt-state transition layer only as needed to record input history and make timer/input behavior deterministic.

Do not change the WPM/accuracy formulas until characterization tests document current output and the product owner answers the corrected-error and adjusted-WPM questions. The score and star algorithms currently reward accuracy, but lesson stars are also gated at 20 WPM, which is inappropriate for early beginner lessons and not lesson-specific.

### Clear defects

1. Corrected mistakes are erased by backspace.
2. Zero-second full-text completions are saved with duration 0 while metrics clamp calculation time to 1 second.
3. Background throttling distorts duration.
4. Held-key repeat is accepted without an explicit policy.
5. Mobile clickable keyboard lacks G/H, numbers, and punctuation.
6. No IME/composition contract.
7. No accessibility announcements.
8. Settings modal has no focus trap, initial focus, or focus return.
9. Same-tab storage updates are not broadcast; the lessons page sees progress on a fresh mount, but a concurrently mounted consumer would not.
10. Signed-out save copy contradicts the successful local save.

## 5. Typing-test feature matrix

| Expected feature | Exists | Notes / change depth |
|---|---|---|
| 15 seconds | Yes | Safe to preserve. |
| 30 seconds | Yes | Safe to preserve. |
| 60 seconds | Yes | Default. |
| Longer mode | Yes | 120 seconds. Corpus/quote length may end early. |
| Common-word mode | Partial | Words are common-ish but the corpus is only 49 camp/product words and uses a predictable sequence. Safe content-layer extension. |
| Quote mode | Yes, limited | Five joined original-looking quotes; same set for every duration. Safe content-layer extension after review. |
| Punctuation option | Partial | Medium quotes include punctuation; no independent toggle. Add safely through settings/content generation. |
| Number option | Partial | Hard difficulty injects digits; no independent toggle. Add safely through settings/content generation. |
| Live WPM | Yes | Needs formula/timer characterization tests. |
| Live accuracy | Yes | Incorrect after corrections because error history is erased. |
| Final WPM | Yes | Same metrics path as live. |
| Final accuracy | Yes | Same correction defect. |
| Corrected errors | No | Requires attempt-state/history extension, not engine replacement. |
| Uncorrected errors | Partial | Current remaining `error` statuses approximate this, but are not labeled separately. |
| Restart | Yes | Preserve. |
| Local personal best | No | Results exist locally; aggregation/UI can be added safely after storage migration. |
| Local history | Stored, not shown | Up to 250 records. Add through a storage service and `/progress`. |
| Responsive keyboard | Partial | Switches at 1280px, but compact key coverage is incomplete. |
| Accessible operation | Partial | Physical/click input and many focus fills work; announcements, modal focus, compact keyboard completeness, and semantic input need repair. |

## 6. Lesson-system assessment

### Active lesson system

- 3 categories, 4 sections, and 15 levels total.
- Progression: six “home row left hand” drills, four “home row right hand” drills, three common-camp-word drills, and two short quotes.
- Data format: typed `LessonCategory -> LessonSection -> LessonLevel` objects in `lib/typing/lessons.ts` with authored strings.
- Individual drills use the shared typing test with `lockText` and a 60-second duration.
- No key restriction schema, introduced-key list, finger assignment, instruction body, target accuracy/WPM, content validation, prerequisite, unlock rule, or per-lesson star thresholds.
- Stars use a global WPM/accuracy function. This is speed-heavy for early lessons and does not implement controlled-improvement logic.
- Current drills are authored, while the typing test is generated from a small local corpus.
- Individual lesson URLs are not listed in the active XML sitemap but are indexable if discovered.

### Content quality findings

Several early exercises contradict their labels or implied key restrictions. Examples include `staff`, `draft`, and `fast` in a left-hand home-row section; `kick`, `jill`, `silk`, and `lake` in early right-hand home-row drills; and words that introduce non-home-row letters before any modeled introduction. The system cannot validate these issues because permitted keys are not data.

The `href` field produced by the helper always points to the beginner left-hand pattern regardless of the actual category; the overview currently ignores this field, so it is latent duplication rather than an active navigation bug.

### Legacy lesson material

The legacy repository names 15 broad categories and 1,752 navigation entries, including animal/fact/quote categories that conflict with the controlled-scale direction. Much exercise text was fetched from an external `typingbooks.com` JSON path and a placeholder says lessons are “still under development” when fetches fail. The old hierarchy and tests may help identify historic URLs, but the huge corpus should not be migrated wholesale.

### Capacity for 25–35 lessons

The active typed hierarchy can support 25–35 lessons after adding curriculum fields and validators. It does not need a new CMS or a route per micro-level. Recommended shape: six indexable unit landing pages, with authored drills represented as data and either embedded state or canonical/noindex drill URLs. A single validated curriculum registry should drive navigation, text, metadata, progress IDs, and redirects.

### Human inputs required before curriculum implementation

- Final lesson titles and unit boundaries.
- Exact key-introduction order and cumulative permitted-key rules.
- Finger assignments and wording.
- Authored exercise strings and lesson explanations.
- Target accuracy, controlled-WPM ranges, repeat/consistency rules, and star thresholds per difficulty stage.
- Capitalization, punctuation, numbers, and symbol introduction policy.
- Content validation rules: permitted characters, minimum unique words, repetition limits, passage length, reading level, and quote/source policy.
- Whether individual drills should have shareable URLs, and if so, which are canonical/indexable.

## 7. Local-storage assessment

### Current storage

| Technology / key | Schema and use | Limits / handling | Privacy |
|---|---|---|---|
| `localStorage`: `freeTypingCamp.results.v1` | Array of `{accuracy, createdAt, duration, score, stars, testName, wpm}` | Newest first; capped at 250; field validation and numeric clamping; parse/quota/private-mode failures return safely | Stores performance timestamps, not raw typed text or personal identity. Device/browser-local and accessible to scripts on the origin. |
| `localStorage`: `jwt_token` | Bearer token for account APIs | No schema/version; cleared on verification failure/logout | Sensitive credential in script-readable storage. Must be retired in the no-account rebuild. |

No active `sessionStorage`, IndexedDB, cookie persistence, migration registry, settings store, achievement store, or theme store was found in the Next.js MVP. The legacy client imports `localforage`, but that is not active-app persistence and should not be assumed reusable.

The results key contains `v1` in its name but the payload has no envelope version. Corrupt JSON is ignored; the next successful save replaces it with a valid array. Valid records with semantically wrong `testName` values are retained. Storage is coupled to `TypingTest` for writes and `LessonsOverview` for reads, but the helper module is a good seam for a repository/service layer.

### Recommended migration path

1. Keep `freeTypingCamp.results.v1` read-only compatible during the first migration.
2. Introduce one versioned local profile envelope, for example a v2 key with `schemaVersion`, `migratedAt`, activities, curriculum progress, achievements, settings, and cosmetic selections. Final naming is an implementation decision.
3. On first read, validate v2. If absent, parse valid v1 records, map known `testName` identifiers, preserve timestamps/WPM/accuracy/stars, and record unknown legacy identifiers without granting fabricated completion.
4. Write v2 atomically (serialize validated next state, then set one key). Keep the v1 key untouched for at least one release as rollback protection.
5. Add bounded histories: typing-test history and per-lesson comparable attempts. Define caps by records and approximate serialized bytes, not only count.
6. Add corruption recovery that preserves a bounded backup string only when safe, exposes a non-alarming reset option, and never blocks typing.
7. Add a storage capability state (`available`, `unavailable`, `quota`) so UI copy never promises persistence when writes fail.
8. Remove all `jwt_token` reads/writes only after auth UI/API calls are disconnected. Do not interpret JWT/account data as local progress.

## 8. Achievement and theme assessment

### Existing reusable pieces

- A five-star renderer and star aggregation exist in the active app.
- Local results can seed best results and lesson attempts.
- The active palette is expressed as semantic CSS variables and Tailwind `camp.*` colors.
- The legacy app contains profile-image catalogs and score/milestone concepts, but active legacy achievements/themes are literal “Coming Soon” placeholders.

### Missing systems

- No theme switching or dark mode.
- No persisted theme/settings.
- No deterministic achievement definitions or evaluator.
- No achievement badges or selected local emblem.
- No streak/activity-date calculation.
- No local progress summary page.
- No controlled-improvement or weak-key trend model.

Add themes by overriding existing semantic variables, not by creating a parallel component palette. Default and accessibility themes should always be available. Unlocks and achievements must be pure deterministic functions of validated local activity data; store earned timestamps and selections, but be able to recompute eligibility. There should be no public profile, avatar upload, global leaderboard, or server identity.

## 9. Advertising assessment

### Current implementation

- Active Next.js app: no AdSense account meta, no loader, no ad component, no slots, no reserved regions, and no placeholders.
- `public/ads.txt` correctly lists publisher `pub-4810616735714570`.
- Legacy `client/index.html` includes the correct account meta, one async AdSense loader, and a Funding Choices script. No reusable slot placement components were found.
- There is therefore no active duplicated loader, but also no active ad inventory.

### Required centralized model

Create a single client-safe loader and a route-policy registry. A stable `AdRegion` should render sibling `ins` and placeholder elements inside one reserved wrapper. The placeholder text is exactly “Advertisement,” has no pointer events, and occupies the same allocation whether the ad is requested, filled, unfilled, blocked, or suppressed. Never wrap the ad with the placeholder. Do not auto-refresh or track clicks.

| Slot | ID | Repository-specific placement recommendation |
|---|---|---|
| Above header | `9403252845` | Add outside `SiteNav` in `PageFrame`; desktop-only fixed-format reservation, no mobile node/gap. Exact eligible breakpoint and fixed dimensions need owner confirmation. |
| Below header/tool | `4805532285` | Ordinary content pages: after header. Typing, lesson, practice, and game pages: after the complete interactive component/keyboard/results region, before explanatory content. This requires a page-template slot, not unconditional placement in `PageFrame`. |
| Left rail | `2837844497` | Outside the central `page-shell`; only request at wide viewports. At 1366px the 1280px shell leaves insufficient rail space. At 1920px there is about 320px per outer side before considering gutters, so wide-only rails are feasible without changing the center. Start eligibility no lower than a measured wide breakpoint (likely 1600–1700px), confirmed with actual creative minimums. |
| Right rail | `6486967973` | Same as left; both rails must be independently suppressed before they could overlap or shrink the main tool. |
| Main content | `1370372660` | Only inside substantial page-specific explanatory copy, never inside `TypingTest`, `VisualKeyboard`, settings, results, lesson controls, or calculator. |
| Bottom banner | `5324407034` | After substantive content/related links and before `SiteFooter`. |

### Route eligibility

- Suppress main-content and side-rail ads initially on `/progress`, utility/noindex pages, auth-transition routes, error pages, and any page without substantial copy.
- Typing/test/lesson/practice/game routes may use above-header (desktop), post-tool banner, and bottom banner after content. Side rails only at genuinely eligible widths. Main-content rectangle only after supporting content exists.
- Trust pages can use conservative banner/content placements only after legal/UX review; privacy/cookies/accessibility should not become ad-heavy.
- Current `/learn`, `/games`, `/games/calculator`, `/typing-test`, and `/lessons` do not yet have enough substantial content for every intended placement.

### CLS and safety constraints for implementation

- Reserve deterministic dimensions before script execution; never insert or move ads after typing starts.
- Use CSS media queries for eligibility at first paint. Do not request an ineligible rail and hide it later with JavaScript.
- Load the publisher script once from a root component, with consent handling decided first.
- Keep above-header allocation outside the 80px site header and ensure no mobile blank area.
- Central layout remains `max-w-7xl`; rails occupy unused viewport space, not grid columns that reduce it.
- Track only ad lifecycle state required for rendering; no click listeners.

## 10. SEO and content assessment

### Cross-site findings

- Only About, Contact, Privacy, Terms, Cookies, Sitemap, and Socials define route metadata. Product pages inherit the generic title/description.
- No canonical links exist. Query settings create duplicate `/typing-test` variants. Both `https://freetypingcamp.com` and `https://www.freetypingcamp.com` return 200 without canonicalization.
- `siteUrl` and robots/sitemap use `www`, while the supplied live MVP URL is non-`www`. Choose one host and redirect the other.
- `sitemap.ts` sets `lastModified` to build time for every URL and includes login/register/socials; it omits dynamic lessons. This overstates freshness and exposes obsolete utility routes.
- No JSON-LD/structured data was found. Do not add review/rating schema for lesson stars.
- Product pages have limited unique explanatory content. About and policy pages are the strongest current pages.
- No fake reviews/ratings were found. Stars are labeled performance stars, which should remain explicit.

### Current indexable page value

| Page/pattern | Content strength and gaps | Index recommendation |
|---|---|---|
| `/` | Moderate positioning and entry tool; stale account claims; needs no-account, accuracy-first explanation and links to high-priority practice | Keep indexed after update. |
| `/typing-test` | Excellent near-top tool, very thin support; no formulas, technique, mistake guidance, or next steps | Keep indexed after adding original content and canonical. |
| `/lessons` | Useful interactive inventory, but only 15 inconsistent drills and little curriculum explanation | Keep indexed after curriculum/content repair. |
| Dynamic lesson pattern | Thin and duplicative; invalid paths 200-fallback; no metadata | Noindex/redirect/404 until deliberate canonical units exist. |
| `/games` | Thin and overstates two linked variants as games | Keep only after accurate copy and substantive overview; otherwise temporary noindex. |
| `/games/calculator` | Broken completion and no supporting content | Noindex until repaired; then index if original instructions/benefit/content are added. |
| `/learn` | One sentence and two buttons | Noindex until expanded; then index as the primary learning guide. |
| `/about` | Strong, original, aligned | Keep indexed; update no-account facts. |
| `/contact` | Adequate utility value | Keep indexed if email is verified; no structured data needed. |
| `/privacy`, `/terms`, `/cookies` | Substantial but factually stale for target architecture | Keep public; indexability is acceptable after accuracy/legal review. |
| `/sitemap` | Utility directory | Noindex; keep crawlable links. |
| `/socials` | Thin/peripheral | Consolidate or noindex. |
| `/dashboard`, `/login`, `/register` | Utility/account-only and obsolete | Noindex immediately; redirect/remove after local progress destination exists. |

### Missing intent coverage

The active app has no dedicated indexable coverage for ASDF/JKL, top row, bottom row, left hand, right hand, numbers/symbols, or focused common-word practice. Quotes exist only as a test mode and two drills. These should be covered by the controlled provisional routes, not hundreds of lesson-level pages. Supporting copy must be authored per route and reviewed for technique accuracy, repetition, and originality.

## 11. Styling-system inventory

### Files and tokens

- Global Tailwind layers and reusable classes: `app/globals.css`.
- Tailwind token mapping: `tailwind.config.ts`.
- Local fonts loaded in `app/layout.tsx`: Lato for body and Nunito Bold for display. `font-mono` currently resolves to Tailwind/system monospace; JetBrains Mono is not configured.
- Active CSS variables:
  - cream `#f6f0e5`, paper `#fffcf7`, surface `#ffffff`
  - ink `#0f1d32`, navy `#1d2b3c`, muted `#4a596f`
  - orange `#f16f46`, coral `#db5338`, sage `#84a292`, tan `#efe5d6`, peach `#ffe8dd`
  - card radius 22px
- `--shadow-soft` and `--shadow-lift` are `none`.
- Reusable primitives: `page-shell`, `section-pad`, heading/body/eyebrow classes, card, primary/secondary/ghost buttons, pills, input, and nav background.

### Dimensions and responsive behavior

- Header minimum height: 80px.
- Central shell: Tailwind `max-w-7xl` (1280px) with 20/28/32px horizontal padding.
- Typing content and full keyboard: `max-w-6xl` (1152px).
- Compact keyboard: `max-w-md` (448px).
- Tailwind default breakpoints: 640, 768, 1024, and 1280px are the used `sm/md/lg/xl` thresholds.
- Full visual keyboard and side stats appear only at 1280px and above. Below that, the compact keyboard and top stats are used.
- At 1366px the shell leaves roughly 43px outside each side before shell padding, so side ads cannot fit. At 1920px the 1280px shell leaves roughly 320px per side, enough to investigate wide rails without shrinking the center.

### Existing borders/outlines/shadows

The active root source generally avoids CSS borders. It deliberately applies `outline-none` and uses fill/text changes for most focus states. Existing exceptions that predate this audit include keyboard/button lower-edge box shadows, hard-coded keyboard feedback halo shadows, and a `focus-visible:ring-4` on visual keys (Tailwind implements the ring with box-shadow). The audit did not remove them. Future work should not add new borders/outlines/shadows and should replace the focus ring only when an equally visible existing-color/fill/weight treatment is in place.

The repository instructions prefer Manrope/JetBrains Mono, while the live MVP actually uses Lato/Nunito. Because this task explicitly requires preserving current typography direction, changing the font family should be treated as a separate human-approved decision, not bundled into functional work.

## 12. Accessibility assessment

### Existing strengths

- Native buttons/links are used throughout and global pointer cursors are present.
- Main navigation has an accessible label; menu and settings icons have labels.
- Most controls have visible hover/focus fill or text changes without relying on borders.
- Correct and error characters differ by fill/text as well as color.
- Typing can begin from broad document focus, and clickable virtual keys provide a pointer alternative.
- Text contrast is generally strong and motion is limited.

### Gaps

- No skip link.
- The typing surface is a focusable `role="textbox"` containing a separate screen-reader-only read-only textarea, creating duplicate/unclear semantics.
- No `aria-live` or status messages for start, expected key, errors, timer, completion, storage failure, or feedback label.
- The settings dialog lacks focus containment, initial focus, focus return, and explicit keyboard close instructions.
- Every visual key is tabbable, producing a very long keyboard-navigation sequence. Inert modifier keys are announced as buttons even though they do nothing.
- Compact keyboard omits required characters; accessibility and functional coverage fail together.
- Expected Shift/finger state is not communicated.
- Timer updates should not announce every second, but completion and optional milestone warnings need a considered live-region strategy.
- Result guidance is generic and does not distinguish rushed attempts or controlled improvement.
- No reduced-motion media query. Existing translations/transitions are small but should respect the preference.
- No accessibility statement route.
- Calculator container/input semantics and game-over/lives announcements are incomplete.
- Focus visibility exists for most controls, but the visual-key ring conflicts with the no-shadow rule and should be replaced with a strong fill/text/weight treatment, not removed.

## 13. Test and build baseline

### Active Next.js app

Dependencies were installed with `npm ci` from the existing lockfile. Installation reported 11 audit findings (4 moderate, 7 high); no automatic audit fix was run.

| Check | Result |
|---|---|
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm run build` | Pass; 21 routes generated/recognized |
| Unit tests | Do not exist in root scripts/config |
| Integration tests | Do not exist |
| Browser/E2E tests | Do not exist |

The build updated tracked generated `.next`/TypeScript cache files. Because the initial tree was clean and these were created by the audit, only those generated changes were restored to the recorded baseline. Product source was not touched.

### Retained legacy client

Dependencies were installed with its lockfile. Installation reported 30 audit findings (1 low, 7 moderate, 19 high, 3 critical); no automatic fix was run.

| Check | Result |
|---|---|
| `npm run lint` | Fail: 9 errors and 1 warning, mainly stale unused disable directives plus one hook dependency warning |
| `npm test -- --run` | Fail: 377 tests run; 356 pass, 21 fail; 19 of 128 suites fail. Failures include stale milestone/stat expectations, request mocks/localStorage, footer counts/auth state, duplicate text selectors, and unhandled stats formatting rejections. |
| `npm run build` | Pass; warns about a 2.2MB JS chunk and outdated Browserslist data |

These legacy failures predate this audit. The active app does not import this client at runtime.

### Responsive screenshots

Viewport screenshots were captured from the live deployment at 390, 768, 1366, and 1920px for `/`, `/typing-test`, `/lessons`, and `/games/calculator`. They are stored outside the repository under:

`C:/Users/Suhas/.codex/visualizations/2026/07/16/019f6c45-395f-7853-ad6c-3f5f2e3af178/`

Files follow `{home|typing-test|lessons|calculator}-{width}.png`. They show no screenshot-driven UI modifications.

## 14. Reusable systems

- Root Next.js App Router and Netlify deployment.
- Shared `PageFrame`, navigation/footer, semantic palette, spacing, and warm visual language.
- Typing page composition and responsive text-line measurement.
- Physical/document input seam and clickable visual keyboard concept.
- Current character rendering and expected-key feedback.
- Pure content, keyboard, metrics, and progress helper modules as extension seams.
- Query parsing for test duration/mode/difficulty.
- Existing 15/30/60/120-second options and word/quote/difficulty UI.
- Local v1 result validation, clamping, bounded history, and failure isolation.
- Lesson hierarchy types, stable lesson test-name builder, overview/progress aggregation concept.
- Stars as performance presentation, after replacing global speed-heavy thresholds with lesson-aware rules.
- Calculator visual/layout concept and legacy calculator tests/generator ideas, after repairing active logic.
- Trust-page `InfoPage` layout.
- Legacy route lists and data names as migration evidence only.

## 15. Systems requiring repair

1. Attempt state: corrected/uncorrected errors, key repeat, modifiers, composition policy, zero-time completion.
2. Timer: timestamp-based elapsed time and visibility policy.
3. Mobile keyboard/input coverage.
4. Calculator spaces, lives/game-over, scoring, completion, focus, and persistence.
5. Dynamic lesson validation and historical URL behavior.
6. Lesson content/key restrictions and lesson-aware scoring.
7. Local-save messaging and same-tab update signaling.
8. Product metadata, canonical host/URLs, sitemap, robots consistency, and utility noindex.
9. Accessibility semantics, live regions, dialog focus, focus treatment, reduced motion.
10. Stale auth/navigation/footer/trust wording.
11. Character-encoding artifacts such as `Â©` in the active footer and arrow/copyright artifacts in legacy files.

## 16. Systems requiring new implementation

- Versioned local profile/progress repository and migration.
- `/progress` with local summaries, history, personal bests, activity dates, achievements, selected badge/theme, and reset/export controls as approved.
- Controlled 25–35-lesson curriculum registry with validators and six unit pages.
- Eight focused practice pages driven by shared engine/content configuration.
- Test options for independent punctuation/numbers and richer original corpora.
- Deterministic controlled-improvement, consistency, weak-key, achievement, streak, and unlock rules.
- Semantic theme overrides and accessibility themes.
- Accessibility statement page.
- Central ad loader, route placement policy, stable ad regions, and consent/privacy integration.
- Original page-specific content, metadata/canonicals, internal links, and only appropriate structured data.
- Root unit/integration/browser test harness focused on typing behavior.

## 17. Proposed route migration table

This is a proposal only; do not implement redirects until canonical host and historical search data are confirmed.

| Current / historical route | Proposed destination/action | Rationale |
|---|---|---|
| `/` | Retain | Core entry. |
| `/typing-test?...` | Canonical `/typing-test`; settings remain functional | One intent, many non-indexable settings. |
| `/lessons` | Retain | Curriculum hub. |
| Valid current slug drills | Map to the relevant unit/practice content; use noindex drill states if kept | Preserve progress identifiers without thin indexable pages. |
| `/lessons/lesson/1/...` through `/15/...` | Build an explicit exact mapping only for URLs with verified historic value; otherwise 404/410, not blanket first-lesson fallback | Avoid losing valuable URLs while preventing 1,752 thin redirects to one page. Search Console/analytics export required. |
| `/dashboard` | `/progress` after local page is ready | Same user intent, no account. |
| `/profile`, `/profile/summary`, `/profile/stats`, `/profile/achievements`, `/profile/themes` | `/progress` or a relevant progress anchor after review | Consolidates old local progress/customization intent. |
| `/profile/img`, `/profile/account` | `/progress` or 410 depending historical use | Avatar/account concepts are not in target scope. |
| `/login`, `/register`, `/verify-email`, `/forgot-password` | Prefer `/progress` with a one-time no-account explanation, or 410 for credential-only URLs | Human decision needed; do not imply accounts still exist. |
| `/privacypolicy` | `/privacy` | Direct trust-page equivalent. |
| `/cookiespolicy` | `/cookies` | Direct trust-page equivalent. |
| `/termsofservice` | `/terms` | Direct trust-page equivalent. |
| `/Learn` | `/learn` | Normalize case. |
| `/games` | Retain | Controlled game hub. |
| `/games/calculator` | Retain after repair | Existing useful concept. |
| `/sitemap` | Retain noindex | Human utility. |
| `/socials` | `/about` if consolidated; otherwise retain noindex | Peripheral thin route. |
| Unknown lesson parameters | 404 | Stop silent duplicate fallback. |

## 18. Proposed index/noindex table

| Route/group | Proposed directive |
|---|---|
| `/`, `/typing-test`, `/lessons`, `/games`, `/learn`, `/about`, `/contact` | Index once content and canonical issues are addressed |
| Six lesson unit routes | Index; each must have distinct instruction, focus, mistakes, and next steps |
| Eight focused practice routes | Index; one canonical per intent, no setting variants |
| `/games/calculator` | Index only after functional repair and substantive content |
| Up to two future real game routes | Index only when complete and independently useful; delay otherwise |
| `/privacy`, `/terms`, `/cookies`, `/accessibility` | Public and generally indexable after factual/human review |
| `/progress` | `noindex,follow` |
| `/sitemap` | `noindex,follow` |
| `/socials` if retained | `noindex,follow` |
| Login/register/dashboard/profile transition URLs | `noindex,follow` until redirected/removed |
| Test query variants | Canonical to `/typing-test`; no separate sitemap entries |
| Individual drill/state URLs below canonical lesson/practice pages | `noindex,follow` unless specifically promoted with unique substantial content |
| Invalid dynamic lesson parameters and 404s | 404 and noindex |
| API routes | Not content; exclude from sitemaps |

## 19. Risks and unknowns

- No search-console or analytics export was supplied, so exact legacy redirect value is unknown.
- Existing account users and server-side scores may exist. The no-auth rebuild needs a retention/communication decision even though server migration is out of product scope.
- No root typing tests exist; engine changes have high regression risk until characterization coverage is added.
- The WPM/accuracy/score/star formulas are not documented as product contracts.
- The current lesson corpus contradicts key labels; a validator will reject several drills.
- Mobile native keyboard behavior varies and was not tested on physical iOS/Android devices.
- AdSense format minimums, consent requirements by geography, fill behavior, and policy review are not specified.
- Both canonical hosts currently serve 200. Changing host behavior can affect indexing and must be coordinated with Netlify/Cloudflare.
- The legacy lesson corpus may have licensing/originality and external-dependency concerns.
- Contact email operability and policy/legal approval were not verified.
- Dependency audit findings exist in both root and legacy trees; this audit did not run automatic upgrades.

## 20. Questions requiring human answers

1. Which canonical host should win: `www` or non-`www`?
2. Can you provide Search Console/analytics exports for historical lesson and trust URLs before redirect implementation?
3. What happens to existing accounts and server-side score data when authentication is removed?
4. What is the approved WPM formula, and should live WPM be raw or accuracy-adjusted?
5. Does a corrected error remain in accuracy forever, and how should corrected versus uncorrected errors be displayed?
6. Should a timed test continue by wall clock while the tab is hidden, pause, or end?
7. Should held-key repeat be rejected entirely or accepted after an initial delay?
8. Is IME/composed text unsupported by design or supported as committed graphemes?
9. Provide final lesson titles, key order, finger assignments, lesson copy, target thresholds, and content validation rules.
10. Approve original common-word and quote corpora and any attribution/licensing policy.
11. Define achievement/badge/theme names, thresholds, accessibility theme requirements, and unlock order.
12. Choose zero, one, or two additional games after the calculator; do not count typing-test presets as games.
13. Confirm ad consent approach, above-header fixed size, and minimum viewport for side rails.
14. Confirm `support@freetypingcamp.com` is monitored.
15. Should `/socials` remain a page or be consolidated into About/footer?
16. Should Lato/Nunito remain the implementation fonts despite the repository guideline preference for Manrope/JetBrains Mono?

## 21. Recommended minimum implementation sequence

Use six implementation prompts, each independently reviewable:

1. **Typing engine stabilization and tests.** Add root test tooling and characterize/fix input history, corrected/uncorrected errors, timer/visibility, repeat, composition policy, focus, mobile key coverage, completion, metrics, and announcements. Preserve layout and formulas unless explicitly approved.
2. **No-account local data foundation.** Add the versioned repository/migration, remove active auth dependencies and account wording, build `/progress` noindex, and preserve compatible v1 results.
3. **Curriculum and focused-practice foundation.** Add validated curriculum configuration, 25–35 approved lessons, six unit pages, eight practice pages, stable IDs, and explicit legacy route handling based on supplied mapping data.
4. **Typing-test content/options and scoring.** Expand original common-word/quote corpora, independent punctuation/number options, comparable histories/personal bests, controlled-improvement labels, and lesson-specific stars.
5. **Customization and games.** Add deterministic achievements, badge/theme selection, accessibility themes, repair calculator, then add at most two human-approved games if warranted.
6. **Content, trust, SEO, redirects, and ads.** Finish page-specific copy, metadata/canonicals/sitemap/internal links, trust/legal updates, accessibility page, exact redirects, then centralized CLS-safe AdSense placement after content is substantial.

Do not combine all six into one rebuild prompt. Prompt 1 is the exact recommended next scope.
