# Free Typing Camp repository-specific rebuild backlog

This backlog is derived only from `docs/FTC_MVP_AUDIT.md`. It deliberately excludes implementation and generic research. Work is grouped into six safe phases/prompts. Product code was not changed during backlog creation.

## Backlog conventions

- Dependencies reference task IDs in this document.
- “Likely files” are seams, not permission for broad refactors.
- Preserve the existing warm palette, typography direction, component language, typing layout, names, and route conventions unless a task explicitly changes a route.
- No new CSS borders, outlines, box shadows, gradients, or decorative UI systems.
- Every phase must leave the active typing experience usable and pass root lint, typecheck, build, and the new relevant tests.

## Phase 1 / Prompt 1: stabilize the existing typing engine

Goal: establish behavioral contracts and repair demonstrated input/timer/accessibility defects without redesigning pages or changing routes, ads, curriculum, auth, or persistence schemas.

### FTC-1.1 Add active-app test tooling and characterization coverage

- Dependencies: none.
- Likely files/systems: root `package.json`, a minimal Vitest/JSDOM configuration, `lib/typing/*.test.ts`, `components/typing/*.test.tsx`.
- Work:
  - Add unit coverage for current metrics, content generation, query option parsing (extract only if needed), lesson lookup, and local-result validation.
  - Add component/integration coverage for physical input, virtual input, backspace, restart, first-character timer start, text exhaustion, time exhaustion, focus recovery, paste blocking, modifier behavior, and settings reset.
  - Record current approved WPM/accuracy outputs before changing formulas.
- Regression risks: tests coupled to layout details; accidental formula changes; fake timers masking browser behavior.
- Acceptance criteria:
  - Tests assert behavior rather than Tailwind class strings.
  - Active root has explicit unit/component scripts.
  - Existing lint/typecheck/build still pass.
- Required tests: all behaviors above plus malformed text/status inputs.
- Human review: approve the WPM/accuracy characterization expectations.

### FTC-1.2 Extend attempt state for corrected and uncorrected errors

- Dependencies: FTC-1.1 and human answer on corrected-error semantics.
- Likely files: `components/typing/typing-test.tsx`, `lib/typing/types.ts`, `lib/typing/metrics.ts`; optionally one small `lib/typing/attempt.ts` module.
- Work:
  - Preserve current component props and visual layout.
  - Track key attempts/history separately from current character display status.
  - Backspace may clear the visible position but must not erase a historical corrected mistake.
  - Return correct characters, incorrect attempts, corrected errors, and uncorrected errors from one metrics path.
  - Prevent zero-time full-text results from persisting inconsistent duration/metrics.
- Regression risks: cursor off-by-one, double counting, lesson completion, local payload compatibility.
- Acceptance criteria:
  - A wrong key followed by backspace and correction produces one corrected error, zero uncorrected errors, and the approved accuracy.
  - Uncorrected errors remain visible and counted.
  - Restart clears all attempt history.
- Required tests: multi-backspace, backspace at zero, repeated corrections, error on last character, completion immediately after correction.
- Human review: result terminology and accuracy rule.

### FTC-1.3 Make time and input deterministic

- Dependencies: FTC-1.1; human visibility/repeat/IME decisions.
- Likely files: `components/typing/typing-test.tsx`, new focused helpers if useful.
- Work:
  - Calculate elapsed time from timestamps rather than interval callback count.
  - Apply the approved hidden-tab policy with `visibilitychange`.
  - Apply an explicit `event.repeat` policy.
  - Guard composition with `isComposing`/composition events according to the approved policy.
  - Keep Ctrl/Meta/Alt shortcuts from entering test characters and keep paste blocked.
- Regression risks: timer flakiness, duplicate event handling between textarea and document listener, hydration/browser API guards.
- Acceptance criteria:
  - Timer result is correct after delayed callbacks.
  - Exactly one path processes any key event.
  - Repeat/composition/paste behavior is covered and explained accessibly when blocked.
- Required tests: fake-clock drift, visibility transition, repeat events, composing events, Ctrl+V/Meta+V, Shifted characters.
- Human review: policy copy.

### FTC-1.4 Repair responsive input and typing accessibility

- Dependencies: FTC-1.1 and FTC-1.3.
- Likely files: `components/typing/visual-keyboard.tsx`, `lib/typing/keyboard.ts`, `components/typing/typing-test.tsx`, `app/globals.css` only if a reusable existing-color focus treatment is needed.
- Work:
  - Restore complete required key coverage at compact widths without changing the central typing layout.
  - Decide whether compact virtual keys are a complete input method or whether a non-read-only mobile input surface is required.
  - Remove/disable inert virtual modifier buttons or give them real defined behavior.
  - Add restrained live-region messages for start/completion/results/errors; do not announce each timer tick.
  - Fix dialog initial focus, containment, Escape, and focus return.
  - Replace the pre-existing focus ring shadow only with a strong fill/text/weight treatment; never simply remove focus visibility.
  - Respect reduced motion.
- Regression risks: mobile keyboard height, tab-order explosion, screen-reader verbosity, typing focus loss.
- Acceptance criteria:
  - Every character generated by each mode can be entered at 390px without a physical keyboard.
  - Keyboard-only users can open/close settings and return focus correctly.
  - Screen readers receive completion and result status.
- Required tests: 390/768 component behavior, focus sequence, modal keyboard flow, reduced-motion CSS assertion, accessible-name audit.
- Human review: mobile input preference and announcement wording.

## Phase 2 / Prompt 2: no-account local progress foundation

Goal: retire active authentication dependencies safely, migrate compatible local results, and provide a truthful local progress destination.

### FTC-2.1 Introduce a versioned local profile repository

- Dependencies: Phase 1.
- Likely files: `lib/typing/progress.ts`, new `lib/progress/*` modules, tests.
- Work:
  - Define a schema envelope for lessons, stars, bests, attempts, test history, activity dates, achievements, selected badge/theme, and settings.
  - Read and migrate valid `freeTypingCamp.results.v1` records; keep v1 untouched for rollback during the migration window.
  - Add validation, bounded histories/size, write capability state, corruption recovery, and same-tab subscription.
  - Never store raw prompt text or sensitive identity data.
- Regression risks: lost existing local records, quota failures, bad date/test-name mappings.
- Acceptance criteria:
  - Valid v1 records survive with WPM/accuracy/stars/timestamp.
  - Corrupt/oversized data cannot crash typing.
  - Failed writes produce truthful UI state.
- Required tests: absent/corrupt/partial/oversized schemas, quota exception, migration idempotence, unknown test names.
- Human review: retention caps and reset/export requirements.

### FTC-2.2 Disconnect account runtime and wording

- Dependencies: FTC-2.1; human decision on existing accounts/data.
- Likely files: `app/layout.tsx`, `components/auth/*`, `components/site-nav.tsx`, `components/site-footer.tsx`, `lib/site-links.ts`, `components/typing/typing-test.tsx`, `components/lessons/lessons-overview.tsx`, `app/dashboard/*`, `app/login/*`, `app/register/*`, `app/v1/api/*` in a later cleanup.
- Work:
  - Make local progress the only active save/read path.
  - Remove sign-in/sign-up/dashboard navigation and copy.
  - Remove `AuthProvider` from normal runtime after all consumers are migrated.
  - Add temporary noindex/transition handling for auth routes; do not delete APIs until external-consumer and data decisions are complete.
  - Remove `jwt_token` only as auth is retired; do not convert it to progress.
- Regression risks: accidental score-save loss, broken layout gaps, existing-user confusion.
- Acceptance criteria:
  - Site is fully usable without auth calls or database environment variables.
  - No UI promises account saving.
  - Local save confirmation is accurate.
- Required tests: no network calls during typing/lessons/progress, nav/footer link assertions, storage-disabled state.
- Human review: existing-account notice and redirect destination.

### FTC-2.3 Build `/progress` as a noindex local page

- Dependencies: FTC-2.1 and FTC-2.2.
- Likely files: new `app/progress/page.tsx`, new focused components, `lib/site-links.ts`, metadata/sitemap.
- Work:
  - Show meaningful local summaries: attempts, controlled bests, accuracy trend, lesson progress, activity dates, weak keys when data supports them.
  - Avoid dashboard-card boilerplate and excessive metrics.
  - Add clear empty, unavailable-storage, reset, and optional export states.
  - Set `noindex,follow` and exclude from XML sitemap.
- Regression risks: misleading comparisons across unlike activities, overclaiming weak keys, local reset accidents.
- Acceptance criteria:
  - Comparable attempts are grouped by the same activity.
  - Speed is never celebrated when accuracy falls below target.
  - Page works with zero, one, and many records.
- Required tests: grouping/trends, rushed vs controlled outcomes, reset confirmation, noindex metadata.
- Human review: displayed metrics and reset/export copy.

## Phase 3 / Prompt 3: controlled lessons and focused practice

Goal: replace inconsistent drill data with the approved 25–35-lesson curriculum and the controlled route set.

### FTC-3.1 Expand the curriculum registry and validator

- Dependencies: Phase 2; final human curriculum package.
- Likely files: `lib/typing/lessons.ts`, `lib/typing/types.ts`, new curriculum validation tests, `components/lessons/lessons-overview.tsx`.
- Work:
  - Add introduced/permitted keys, finger assignments, objectives, instructions, targets, prerequisites, copy, and stable IDs.
  - Add build/test-time validation for characters, lengths, repetitions, targets, and unique IDs.
  - Replace contradictory active drills only with approved authored content.
- Regression risks: breaking stored lesson identifiers, invalid authored passages, overlong lesson list.
- Acceptance criteria:
  - 25–35 approved lessons validate.
  - Existing compatible progress maps explicitly.
  - Every exercise respects its permitted-key rules.
- Required tests: full registry validation and migration mapping.
- Human content review: mandatory for every lesson string/instruction/target.

### FTC-3.2 Add six unit routes and deliberate drill routing

- Dependencies: FTC-3.1.
- Likely files: new `app/lessons/{home-row,top-row,bottom-row,full-keyboard,capitals-punctuation,numbers-symbols}/page.tsx`, current dynamic lesson page, metadata helpers.
- Work:
  - Build distinct, substantial unit pages using existing components/styles.
  - Keep the tool near the top and supporting content after it.
  - Validate dynamic drill params; invalid params return 404.
  - Make drill states noindex unless human-approved as substantial canonical pages.
- Regression risks: route collisions, duplicate H1/metadata, stored URL/test-name mismatch.
- Acceptance criteria:
  - Six routes have distinct purpose, canonical, metadata, instructions, mistakes, and next steps.
  - Unknown lesson params never return first-lesson 200.
- Required tests: route generation/404, metadata/canonical/noindex, internal links.
- Human content review: mandatory.

### FTC-3.3 Add eight focused-practice routes

- Dependencies: FTC-3.1 and approved content.
- Likely files: new `app/typing-practice/*`, shared practice configuration/components, `lib/typing/content.ts`.
- Work:
  - Add ASDF/JKL, QWERTYUIOP, ZXCVBNM, quotes, left hand, right hand, numbers/symbols, and common words.
  - Share engine and page template without keyword-swapped boilerplate.
  - One canonical route per intent; settings/state do not create indexable URLs.
- Regression risks: content duplication, impossible characters on compact keyboard, too many near-identical pages.
- Acceptance criteria:
  - Each route has unique validated prompt content and original guidance.
  - Internal links connect relevant lessons/practice/test.
- Required tests: configuration completeness, key coverage, route metadata/canonical, compact input.
- Human content review: mandatory.

### FTC-3.4 Build an exact legacy route map

- Dependencies: FTC-3.2, FTC-3.3, supplied Search Console/analytics export.
- Likely files: Next config/route handlers or a dedicated explicit redirect map; never a broad fallback in `getLesson`.
- Work:
  - Map only verified high-value old numeric lesson URLs to the closest relevant canonical unit/practice page.
  - Redirect old trust/case routes directly.
  - Return 404/410 for unmapped thin/irrelevant routes.
- Regression risks: redirect chains/loops, mass many-to-one soft-404 signals, loss of high-value history.
- Acceptance criteria:
  - No redirect chain.
  - Every mapped source has documented rationale.
  - Unknown params 404.
- Required tests: table-driven status/location tests and canonical checks.
- Human review: approve every mapping group.

## Phase 4 / Prompt 4: complete typing-test options and controlled scoring

### FTC-4.1 Expand original test corpora and independent options

- Dependencies: Phase 1 and approved content policy.
- Likely files: `lib/typing/content.ts`, `lib/typing/types.ts`, `components/typing/typing-entry.tsx`, `components/typing/typing-test.tsx`, route query parser.
- Work:
  - Provide sufficient varied content for 15/30/60/120 seconds.
  - Add independent punctuation and number options without multiplying indexable URLs.
  - Keep common-word and quote modes; validate content and originality.
- Regression risks: hydration differences, prompt exhaustion, impossible compact keys, predictable generation.
- Acceptance criteria:
  - Each duration has adequate content headroom.
  - Same seed/config is deterministic for tests; restart produces a new valid prompt.
- Required tests: generation constraints, option combinations, duration headroom, canonical query behavior.
- Human content review: mandatory.

### FTC-4.2 Implement accuracy-gated comparisons and lesson-aware stars

- Dependencies: FTC-1.2, FTC-2.1, human thresholds, FTC-3.1 for lessons.
- Likely files: `lib/typing/metrics.ts`, progress comparison helpers, lesson target data, result panel.
- Work:
  - Compare only like activities and rolling recent attempts.
  - Add controlled-improvement/rushed/repeat/ready labels.
  - Gate speed gains by accuracy; include weak-key improvement when valid.
  - Replace global beginner 20-WPM star floor with lesson-specific rules.
- Regression risks: changing historical star display, rewarding speed regressions, incomparable histories.
- Acceptance criteria:
  - Major speed gain with accuracy below target is not a win.
  - Stable 100% accuracy plus small speed gain is rewarded.
  - Migration preserves old stars as historical values while new evaluations use versioned rules.
- Required tests: scoring examples from repository instructions, threshold boundaries, rolling averages, same-activity grouping.
- Human review: thresholds and wording.

### FTC-4.3 Add personal bests/history to test and progress UI

- Dependencies: FTC-2.3 and FTC-4.2.
- Likely files: typing results UI, `/progress` components.
- Work: show local history and best controlled WPM/accuracy without cluttering active typing.
- Acceptance criteria: detailed feedback appears after completion; active typing retains only essential stats.
- Required tests: empty/history/best/rushed cases.
- Human review: metric density.

## Phase 5 / Prompt 5: achievements, themes, and games

### FTC-5.1 Add deterministic achievements, badges, and activity streaks

- Dependencies: Phase 2 and FTC-4.2.
- Likely files: new `lib/progress/achievements.ts`, progress UI, schema.
- Work: pure definitions/evaluator, earned timestamps, selectable local badge, honest streak dates.
- Regression risks: timezone/date errors, unlocks from corrupt data, irreproducible awards.
- Acceptance criteria: achievements recompute from validated records; no public profile/leaderboard/avatar upload.
- Required tests: boundaries, timezones, recomputation, selection fallback.
- Human review: names, icons, thresholds, copy.

### FTC-5.2 Add semantic default/accessibility/unlockable themes

- Dependencies: FTC-2.1 and human theme definitions.
- Likely files: `app/globals.css` variables, a small theme provider, settings/progress UI.
- Work: override existing semantic variables only; default and accessibility themes always available; persist selection; respect system/reduced motion as approved.
- Regression risks: contrast failures, hydration flash, new palette/component language.
- Acceptance criteria: WCAG contrast checked; no component-specific parallel palette; locked theme falls back safely.
- Required tests: token application, persistence, unavailable theme, SSR/hydration, contrast audit.
- Human design/accessibility review: mandatory.

### FTC-5.3 Repair Calculator Sprint

- Dependencies: Phase 1 and local result schema.
- Likely files: `components/games/calculator-sprint.tsx`, `lib/typing/calculator.ts`, tests, game content page.
- Work:
  - Make displayed spaces enterable or remove them consistently from target/display semantics.
  - End at zero lives, prevent post-game scoring, make difficulty reset deterministic, and add accessible lives/completion announcements.
  - Define accuracy-first score/stars and local history.
- Regression risks: physical/virtual input mismatch, arithmetic appearance vs typed target, infinite game loop.
- Acceptance criteria: every generated target is completable physically and virtually at 390px; zero lives ends once; restart fully resets.
- Required tests: every operator/difficulty, spaces/enter/backspace, zero lives, restart, scoring, accessibility.
- Human review: score thresholds and explanatory content.

### FTC-5.4 Add at most two approved games

- Dependencies: FTC-5.3; explicit human selection.
- Likely files: `/games` and new game modules reusing engine/progress.
- Work: only if each game teaches a distinct useful skill and has real reusable logic. Do not relabel test presets as games.
- Acceptance criteria: no more than two new games; accuracy-gated scoring; accessible keyboard operation; local persistence; substantive content.
- Required tests: complete game contracts and route checks.
- Human content/design review: mandatory.

## Phase 6 / Prompt 6: content, trust, SEO, redirects, and advertising

### FTC-6.1 Complete page-specific content and internal links

- Dependencies: Phases 3–5.
- Likely files: all indexable `app/**/page.tsx`, shared info/content components, `lib/site-links.ts`.
- Work: original explanations of tool/technique/mistakes/next steps; accurate feature claims; no thin keyword swaps.
- Regression risks: tool pushed too far down, duplicated copy, unsupported claims.
- Acceptance criteria: tool remains near top; every indexable page has distinct useful content and relevant internal links.
- Required tests: link existence and content/heading smoke tests.
- Human editorial review: mandatory.

### FTC-6.2 Fix metadata, canonical host, sitemap, robots, and noindex

- Dependencies: canonical-host decision, final routes, FTC-3.4.
- Likely files: `app/layout.tsx`, route metadata/generateMetadata, `app/sitemap.ts`, `public/robots.txt`, hosting redirects.
- Work: unique metadata; one canonical per intent; host redirect; accurate last-modified dates; exclude utility/auth/drill variants; noindex progress/sitemap/transitions.
- Regression risks: wrong host, accidental deindexing, canonical loops.
- Acceptance criteria: one host 301s to the other; all indexable routes self-canonicalize; no query variants in sitemap; invalid routes 404.
- Required tests: metadata table, sitemap snapshot, HTTP redirect/404 checks.
- Human SEO review: exact titles/descriptions and legacy mappings.

### FTC-6.3 Update trust pages and add accessibility page

- Dependencies: actual local storage, analytics/consent/ad behavior finalized.
- Likely files: `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/cookies/page.tsx`, new `app/accessibility/page.tsx`, About/Contact.
- Work: remove account inaccuracies; accurately describe local data, ads, cookies/consent, analytics, children/classroom context, and accessibility contact.
- Acceptance criteria: no feature or data-flow claim is aspirational; dates/contact are correct.
- Required tests: route/metadata/link smoke tests.
- Human legal/accessibility review: mandatory.

### FTC-6.4 Add centralized, CLS-safe AdSense regions

- Dependencies: FTC-6.1, FTC-6.3, consent decision, ad breakpoint/size decisions.
- Likely files: `components/page-frame.tsx`, new `components/ads/*`, route policy helper, page templates, root layout metadata/script.
- Work:
  - Load publisher `ca-pub-4810616735714570` once.
  - Implement slots `9403252845`, `4805532285`, `2837844497`, `6486967973`, `1370372660`, and `5324407034` exactly as audited.
  - Use sibling placeholder/ad nodes in stable reserved regions; placeholder text only “Advertisement”; no pointer interception.
  - CSS-gate above-header and side rails before requesting ads.
  - Place post-tool banner after the entire typing/lesson/practice/game tool and keyboard.
  - No auto-refresh, click tracking, or active-session movement.
- Regression risks: CLS, duplicate loader/requests, accidental mobile gap, ads inside controls, side rails shrinking center, consent violations.
- Acceptance criteria:
  - Script appears at most once.
  - No ad request for ineligible side rails/mobile above-header.
  - Placeholder/ad state swaps without bounding-box change.
  - Typing DOM/layout does not move when ad state changes.
- Required tests: route-policy unit tests, DOM sibling structure, mocked fill/unfilled/blocked states, viewport request assertions at 390/768/1366/1920, Playwright CLS/layout snapshots.
- Human AdSense/legal review: mandatory before production IDs are enabled.

### FTC-6.5 Final regression and launch audit

- Dependencies: all prior tasks.
- Work: run root lint/typecheck/unit/integration/build/E2E; verify all routes, keyboard input, calculations, storage migration, noindex/canonical/redirects, responsive captures, focus/announcements, and ad reservations.
- Acceptance criteria: every item in `AGENTS.md` validation checklist is evidenced; product code diff is scoped; no legacy client restoration.
- Human review: curriculum/content, trust/legal, accessibility, ads, and final route map.

## Recommended next prompt

Implement Phase 1 only: add active-app tests and stabilize the existing typing engine’s attempt history, corrected/uncorrected errors, timestamp timer, approved visibility/repeat/composition behavior, mobile key coverage, focus/dialog behavior, and restrained accessibility announcements. Preserve the current route set, visual design, component names, typing-page layout, WPM/accuracy formulas unless explicitly approved, local-storage v1 schema, auth behavior, lesson content, games, and ads. Do not begin Phase 2 or later work in the same prompt.
