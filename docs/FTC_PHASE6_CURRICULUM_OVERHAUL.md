# Phase 6 curriculum overhaul

## Outcome

Phase 6 replaces the Phase 3 thirty-lesson sequence with exactly forty-five multi-stage lessons while preserving the established typing engine, visual keyboard geometry, line measurement, focus behavior, styling, focused practice, typing test, local progress page, achievements, themes, and Calculator Sprint.

The levels are Beginner Foundations (17), Intermediate Fluency (17), and Advanced Application (11). The six existing lesson routes remain substantive indexable skill hubs. Individual runner pages remain `noindex,follow`.

## Lesson execution

`LessonExperience` presents instruction separately, then mounts the existing `TypingTest` for each typed stage. Stage completion uses a narrow callback from the same authoritative physical/virtual input path. Per-stage attempts are not persisted as complete lessons; the final aggregate is written once.

Instruction time is excluded. Untimed stages run until their passage is complete. Only explicitly marked challenges have a time limit. Final formulas are:

- WPM: correct tracked characters ÷ 5 ÷ total active minutes.
- Accuracy: correct tracked keystrokes ÷ total tracked keystrokes.
- Completion: every required stage finished and aggregate accuracy at least 85%.
- Stars: 0 below 85%; 1 at 85%; 2 at 90%; 3 at 95%; 4 at 97% plus standard WPM; 5 at 99% plus mastery WPM.

After a stage set with accuracy below 95% or observed weak keys, the runner can append one optional deterministic reinforcement stage. It selects at most two keys, explains why it appeared, and cannot append another adaptive stage.

## Local progress v5

The canonical key is `freeTypingCamp.progress.v5`. Reads fall back through v4, v3, v2, and legacy results. The v4 migration maps only these strong equivalents:

| Old ID | Current ID |
|---|---|
| `home-row-f-j` | `beginner-f-j-space` |
| `home-row-words` | `intermediate-home-row-words` |
| `top-row-words` | `intermediate-top-row-words` |
| `bottom-row-words` | `intermediate-bottom-row-words` |
| `full-keyboard-common-words-one` | `intermediate-common-words-one` |
| `full-keyboard-common-words-two` | `intermediate-common-words-two` |
| `full-keyboard-alternating-hands` | `intermediate-alternating-hands` |
| `capitals-shift` | `intermediate-shift-capitals` |
| `punctuation-apostrophes-quotes` | `intermediate-apostrophes-quotes` |
| `numbers-one-through-five` | `advanced-numbers-one-five` |
| `numbers-six-through-zero` | `advanced-numbers-six-zero` |
| `numbers-symbols-values` | `advanced-practical-values` |

Other valid old records are kept in bounded `legacyCurriculum` storage and do not count toward current completion. Existing achievement unlocks, selected emblem, and selected theme are retained; an already selected locked theme is grandfathered. Weak-key persistence stores at most twelve aggregate summaries with key, misses, attempts, and last-seen time—never raw text or raw key logs.

## Achievements, themes, and game routes

Achievement IDs remain stable. Milestones use explicit registry tags. Full Keyboard Ranger requires the Beginner Assessment. Trail Complete requires all 45 lessons. Summit requires at least three stars on all 45. The other theme rules remain unchanged.

Calculator Sprint is the only active game. Word Dash and Drill Streak were links to other tools rather than implemented games and were removed. The thin `/games` route permanently redirects to `/games/calculator`; only the calculator route is emitted in the sitemap.

## Verification and limitations

Automated coverage includes exact IDs and level counts, stage invariants, star thresholds, weighted aggregation, capped adaptation, the twelve mappings, legacy preservation, theme preservation, milestone achievements, route metadata, and shared typing behavior. Required responsive checks are 390, 768, 1366, and 1920 pixels.

No new layout system, palette, border, outline, shadow, keyboard geometry, or passage container was introduced.

Verified baseline:

- Root lint: pass.
- Root TypeScript: pass when run independently (the first concurrent run overlapped `.next` regeneration).
- Root tests: 29 files and 177 tests passed.
- Root production build: pass; 80 static/dynamic pages generated, including 45 lesson runners.
- Legacy build: pass with its existing bundle-size warning.
- Legacy lint: unchanged 9 errors and 1 warning.
- Legacy tests: unchanged audit baseline of 356 passed and 21 failed on the confirming run.
- Browser console: no warnings or errors during lesson, skill-hub, overview, calculator, and redirect checks.
- No horizontal document overflow at 390, 768, 1366, or 1920 pixels on the lesson runner, curriculum overview, or Calculator Sprint.
- `/games` resolves to `/games/calculator`.

The `docs/phase6-captures/` directory contains lesson initial states at all four widths, mobile mistake/correction/stage-result states, curriculum overview at all four widths, a representative skill hub, Calculator Sprint at all four widths, and mobile calculator active/round-complete states.

Known limitations:

- Curriculum language and speed targets require final human pedagogical review.
- Weak-key adaptation is intentionally bounded; it is not full personalization.
- Enter is taught as an action, but the passage engine does not score newline submission as a character.
- Old lesson URLs are not redirected without traffic evidence; only local progress is migrated.
