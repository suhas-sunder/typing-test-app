# Phase 5: local achievements, themes, and Calculator Sprint progress

## Scope and ownership

Phase 5 extends the approved browser-local progress system. It adds no route, account, network request, public profile, leaderboard, advertisement, currency, purchase, or new game.

- `lib/progress/repository.ts` remains the sole read/write owner of the progress envelope.
- `lib/progress/achievements.ts` is the authoritative achievement registry and deterministic evaluator.
- `lib/themes/registry.ts` is the authoritative theme registry, availability evaluator, and semantic-token source.
- `lib/themes/bootstrap.ts` generates a minimal read-only pre-paint script. It reads the canonical envelope only to apply a validated available theme; it never mutates progress.
- `/progress` remains public, noindex, absent from the sitemap, and backed only by this browser.

## Canonical v4 schema and migration

The canonical key is `freeTypingCamp.progress.v4`. The v4 envelope preserves typing tests, lessons, focused practice, activity dates, processed event IDs, legacy migration metadata, and compatible Calculator Sprint aggregates. It adds:

- achievement unlock records (`id`, first recorded `unlockedAt`, `retroactive`, `contentVersion`);
- customization (`selectedEmblemId` or `null`, and `selectedThemeId`);
- distinct completed focused-practice IDs so the eight-mode achievement survives bounded history;
- the lesson-level `perfectRun` fact;
- bounded Calculator Sprint run history, separate completed/game-over counts, and a completed-run personal-best ID.

Migration order is v3, v2, then v1. Source records are retained at their old keys and are never overwritten. A successful migration writes v4 once and records its source. Invalid canonical v4 data is sanitized; an unsupported future schema is not overwritten.

Achievements supported by migrated facts are evaluated once at migration. Their timestamp is the migration time because the historical unlock instant is unknown, and `retroactive` is `true`. Missing historical facts are not fabricated: old calculator aggregates do not become five-round records, and old lessons do not become Perfect Runs. Existing visitors remain on Base Camp with no emblem selected.

Reset removes all Free Typing Camp v4 progress and customization in this browser and returns the appearance to Base Camp. It does not clear unrelated browser data or retained legacy source keys.

## Achievement registry

Exactly twenty achievements are defined, in five categories:

| Category | IDs |
| --- | --- |
| Progress | `first-lesson`, `home-row-complete`, `top-row-complete`, `bottom-row-complete`, `full-keyboard-complete`, `capitals-punctuation-complete`, `numbers-symbols-complete`, `curriculum-complete` |
| Accuracy | `first-accurate-lesson`, `ten-accurate-lessons`, `near-perfect-lesson`, `perfect-run` |
| Speed | `twenty-wpm`, `forty-wpm`, `sixty-wpm` |
| Consistency | `three-day-streak`, `seven-day-streak`, `fourteen-day-streak` |
| Exploration | `practice-explorer`, `calculator-finisher` |

Evaluation runs only after a validated, non-duplicate completed activity is persisted. It derives from canonical facts, is idempotent, and returns only newly recorded IDs to the completion UI. It does not run per keystroke or from a route visit.

- Lesson completion requires at least one star.
- Accurate-lesson milestones count distinct curriculum lessons.
- Perfect Run requires a completed starred lesson, 100% accuracy, zero corrected and uncorrected errors, and at least ten characters. This protects against empty or trivial attempts while retaining the curriculum engine's completion requirement.
- Speed milestones use completed typing-test history only and require at least 95% accuracy.
- Streaks use the longest sequence of unique, valid stored date strings; malformed and future dates are ignored.
- Practice Explorer uses all eight authoritative practice IDs.
- Calculator Finisher requires a persisted completed outcome with all five rounds.

## Camp emblem

Every unlocked achievement may be selected as the local Camp emblem. Locked or unknown IDs are rejected by the repository even if component state is manipulated. The user may select “No emblem.” Unlocking or migrating an achievement never changes the selection automatically. The emblem is shown only in the local progress interface and is not a profile or avatar.

Same-tab repository events and browser storage events update `/progress` and theme state where available.

## Theme registry and semantic tokens

Exactly six themes are defined:

| Theme | Availability |
| --- | --- |
| Base Camp | Always available and default |
| High Contrast | Always available accessibility option |
| Campfire Glow | Five distinct lessons with at least one star |
| Pine Trail | Fifteen total lesson stars |
| Stargazer | Week at Camp achievement unlocked |
| Summit | At least three stars on all thirty lessons |

Unlocking a theme does not select it. Locked, unknown, or manipulated selections fall back to Base Camp. The pre-paint script validates the same stored facts before applying a theme, preventing an unavailable theme from being forced through storage.

The registry controls semantic values for page and section surfaces, primary/secondary/muted text, accent and accent contrast, hover/selected/focus states, success/warning/error, typing current/correct/incorrect states, keyboard and key surfaces, and restrained secondary surfaces. Existing `camp-*` utilities map to those semantic values, so themes change colour tokens rather than geometry. Base Camp reproduces the prior values exactly. No new border, outline, box shadow, font, breakpoint, content width, keyboard geometry, or navigation structure was introduced.

## Calculator Sprint persistence and comparison

A new run is persisted once when it reaches either a completed five-round outcome or game over at zero lives. Restart before a terminal outcome does not persist. Stored facts include outcome, rounds, clean and corrected rounds, score, lives, generator version, and—when accurately available—start/completion time, total mistakes, and keystroke accuracy. Expressions and individual keypresses are not stored. History is capped at 50 records.

Only completed five-round runs qualify for the personal best. Comparison order is:

1. more clean rounds;
2. higher accuracy when both values are available;
3. higher score;
4. fewer mistakes when both values are available;
5. earlier result when otherwise tied.

Game-over runs are counted and shown but cannot become the completed-sprint best. Compatible old aggregates retain their completed count and best score, while detailed historical fields remain unknown.

## Completion and progress UI

Lesson, practice, and typing-test completions receive newly unlocked achievement IDs from the repository. The existing result area shows one restrained combined message and a `/progress` link after persistence; it does not interrupt active typing. Calculator results show outcome details, clean/corrected rounds, accuracy, mistakes, local-best state, new unlock count, retry, and progress access.

`/progress` retains its purpose, local-storage explanation, continue recommendation, existing summaries, recent activity, and reset dialog. It adds a restrained local identity summary, categorized achievements with real locked requirements, Camp-emblem selection, and a flat six-theme selector. The empty state still exposes Base Camp and High Contrast without suggesting an account.

## Tests added

Focused tests cover registry counts and uniqueness, every evaluator family, unit and curriculum completion boundaries, distinct accurate lessons, Perfect Run exclusions, speed accuracy gates, longest streak behavior, practice exploration, Calculator Finisher, idempotent/retroactive unlocks, v3-to-v4 migration, compatible aggregates, invalid selection guards, reset, theme availability/fallback, SSR-safe pre-paint generation, completed/game-over calculator persistence, duplicate protection, personal-best eligibility, bounded history, completion payloads, and progress rendering.

Phase 1 through Phase 4 root tests remain unchanged and pass with the Phase 5 suite.

## Responsive and accessibility behavior

New selectors use existing responsive grids and wrapping controls: one column at 390px, two where space permits at 768px, and three theme choices at desktop widths. Text and controls wrap without fixed widths; touch controls retain the existing button sizing. Themes do not change layout dimensions, so the central typing surface and wide-screen peripheral space remain unchanged.

Selected and locked states use text labels in addition to colour. Theme and emblem controls are native buttons with `aria-pressed` where applicable. Unlock messages use a polite status region. No auto-focus or animated celebration is added. Existing focus fill/text treatments, reduced-motion behavior, typing error styling, and no-outline/no-border rules remain in force.

## Human review inventory

Human visual review should confirm:

- Base Camp is visually unchanged from the approved Phase 4 captures;
- High Contrast remains readable for body text, muted text, links, selected/disabled controls, typing states, keys, stars, footer links, and destructive reset wording;
- Campfire Glow, Pine Trail, Stargazer, and Summit remain restrained and on-brand;
- achievement icon repetition and density are acceptable on a full twenty-item progress page;
- locked requirement wording and the terms “Camp emblem” and “local completed-sprint best” are clear;
- 390px and zoomed layouts remain comfortable with the full achievement list;
- dark Stargazer full-width bands and header/footer transitions feel intentional;
- no theme appears approved solely because automated tests pass.

## Manual capture inventory

Browser captures are stored in `docs/phase5-captures/`.

- Empty Base Camp `/progress`: 390, 768, 1366, and 1920 pixels.
- Calculator initial state: 390, 768, 1366, and 1920 pixels.
- Calculator mistake, corrected-active, and completed/personal-best states at 390 pixels.
- Base Camp and High Contrast on the homepage, typing test, lesson runner, focused practice, calculator, and progress at 1366 pixels.
- Base Camp and High Contrast footer states at 1366 pixels.
- Base Camp and High Contrast theme selectors, including a selected Calculator Finisher Camp emblem.

At all four required widths, measured document `scrollWidth` equalled `clientWidth` for `/progress` and Calculator Sprint, so no horizontal document overflow was present. The same equality was verified on the six core page types under Base Camp and High Contrast. The browser console recorded no errors.

No all-unlocked or Stargazer manual fixture was added. The repository has no approved fixture route, and adding fake production progress or a query-controlled bypass would violate the local-progress and no-fake-data rules. Campfire Glow, Pine Trail, Stargazer, Summit, multiple-unlock result combinations, and the all-unlocked 390px state remain explicit human-review items; their availability and selection guards are covered deterministically by tests.

## Known limitations

- Historical v3 calculator aggregates lack per-run details, so their accuracy, mistakes, clean rounds, failed runs, and personal-best record remain unknown.
- Historical lessons lack mistake and character facts, so migration cannot retroactively infer Perfect Run.
- The pre-paint code is deliberately small and applies only validated v4 selections; migration from an older key happens after hydration and therefore stays on Base Camp for that first paint.
- Achievements and themes are device/browser local and are removed when relevant browser data is cleared.
- This phase does not add multilingual typing support, public reward pages, exports, certificates, cloud synchronization, or advertisements.
