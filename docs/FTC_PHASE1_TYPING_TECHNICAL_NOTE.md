# Free Typing Camp Phase 1 typing contracts

## Scope and ownership

Phase 1 stabilizes the existing root typing experience and Calculator Sprint. It does not add routes, curriculum, account behavior, progress features, advertising, themes, achievements, or SEO content.

The active ownership boundaries are:

- `components/typing/typing-test.tsx`: attempt lifecycle, browser events, focus, rendering, completion, and result persistence.
- `lib/typing/attempt.ts`: authoritative character state and historical keystroke/error accounting.
- `lib/typing/input.ts`: physical, virtual, and trusted mobile-input normalization.
- `lib/typing/timer.ts`: monotonic timer lifecycle and visibility pauses.
- `lib/typing/metrics.ts`: shared WPM, accuracy, and score formulas.
- `components/typing/visual-keyboard.tsx` and `lib/typing/keyboard.ts`: keyboard geometry, highlighting, Shift state, and virtual-key character mapping.
- `components/games/calculator-sprint.tsx` and `lib/typing/calculator.ts`: Calculator Sprint lifecycle, input, scoring, expression generation, and completion.

Existing exercise generators, responsive line measurement, lesson validation, typing layout, and the calculator's type-the-expression concept remain in place.

## Authoritative metrics

The shared formulas are also documented next to their implementations in `lib/typing/metrics.ts`.

- A **tracked keystroke** is an accepted single-character typing input. Correct and incorrect character attempts are tracked. Backspace, modifiers, navigation/control keys, unsupported input, paste, programmatic input, composition updates, and rejected repeat events are not tracked.
- **WPM** is `currently correct rendered characters / 5 / active elapsed minutes`, rounded up to the displayed whole number. Active elapsed time has a one-second calculation floor to avoid impossible initial values. WPM is based on correct characters and is not adjusted by accuracy a second time.
- **Accuracy** is `correct tracked keystrokes / all tracked keystrokes * 100`, rounded down to the displayed whole percentage.
- An **incorrect keypress** is a tracked wrong character attempt. It remains in historical totals after correction.
- A **corrected error** is a prior incorrect keypress whose visible incorrect character was removed with Backspace.
- An **uncorrected error** is an incorrect character still present when the attempt is inspected or completed.

Backspacing correct text removes current progress without rewriting historical keystrokes. Backspace at position zero is a no-op. Restart clears all attempt-scoped state.

## Timer and visibility lifecycle

The authoritative clock is based on monotonic `performance.now()` timestamps; interval callbacks only refresh the display.

1. Focus and settings interaction do not start timing.
2. The first accepted character input starts timing, whether that character is correct or incorrect.
3. Modifier-only keys, shortcuts, unsupported keys, paste, untrusted programmatic input, and incomplete composition do not start timing.
4. A timed attempt completes against actual elapsed active time, and completion is guarded so it runs once.
5. Hiding the document before typing is a no-op. Hiding an active timed attempt pauses it; returning resumes from a new monotonic timestamp, excluding hidden time. Untimed work is preserved.
6. Repeated visibility events are idempotent. Visibility changes after completion are ignored.
7. Restart creates a clean clock. Unmount removes the interval and visibility listener. Ref guards prevent duplicate timers, persistence, or completion under development Strict Mode.

## Input flow and parity

Physical `keydown`, virtual-key clicks, and trusted single-character `beforeinput` commits pass through the same input transition and attempt reducer. Virtual input cannot bypass validation or scoring and restores focus to the hidden writable typing target.

- Character and Backspace repeat events are deliberately rejected. This prevents held keys from advancing an accuracy-first exercise or corrupting corrections.
- Modifier-only input does not advance or affect metrics. Ctrl, Meta, and Alt shortcuts are ignored. Shift-modified required characters and Caps Lock output are matched by the actual character value.
- Composition updates are ignored. A trusted committed single-character text event may be accepted once; incomplete or duplicate composition input is not processed. This protects English content but is not a claim of complete multilingual support.
- Paste is prevented. Untrusted `beforeinput` is rejected, so programmatic insertion cannot produce a valid score.
- The compact virtual keyboard exposes every character used by current content, including digits, punctuation, Shift, Space, and Delete. Its one-shot Shift mapping matches physical character intent.
- Restart preserves exercise settings, avoids route reloads, and returns focus through the existing flow. The settings dialog traps Tab, closes with Escape, and restores focus to its trigger.

## Lesson completion

Existing lessons continue to consume the shared typing component. Completion requires the actual exercise position to reach the end and is guarded to fire once. Final results use the shared correct-character WPM and tracked-keystroke accuracy definitions, including distinct corrected and uncorrected error totals. Invalid, duplicated, pasted, or incomplete-composition events cannot advance completion.

## Calculator Sprint rules

Calculator Sprint keeps its existing rule: type each displayed expression exactly, then submit it.

- Generated expressions contain only characters supported by the physical and on-screen controls.
- Whitespace is normalized out of the expected target and submission is represented by Enter.
- Current generation uses integer expressions, avoiding floating-point exact-string ambiguity and unsupported signed formatting.
- A correct clean round adds 20 points; a completed round containing a corrected error adds 10; an unresolved incorrect round does not score or advance.
- Incorrect input costs one of four lives. Reaching zero lives ends the game once.
- Completing five expressions ends the game once. A correct submission advances once, and repeated submission is rejected.
- Restart clears score, lives, round progress, errors, and terminal state while retaining difficulty.
- Physical keys and on-screen calculator controls share the same attempt transition, including Delete correction.
- A deterministic 20,000-target sample across medium and hard generation is covered by tests and every target is enterable using supported controls.

## Automated coverage added

The root Vitest/Testing Library suite covers:

- WPM, accuracy, corrected/uncorrected errors, multiple errors at one position, all Backspace boundaries, and restart.
- first-valid-input timing, delayed callback accuracy, visibility transitions, listener cleanup, and single completion under Strict Mode.
- modifier keys and shortcuts, Shift characters, repeat policy, composition boundaries, paste, and untrusted programmatic input.
- existing lesson-content generation and shared completion.
- physical/virtual/mobile input parity and focus recovery.
- calculator character mapping, scoring, correction, restart, completion, answer normalization, repeated submission, and generated-target validity.

## Responsive verification

Manual browser verification used reduced-motion mode and captured initial, active, mistake, corrected, and completed states for both tools at 390, 768, 1366, and 1920 CSS pixels (40 PNG files total).

- 390 px: no document overflow; active target remained visible after reducing viewport height from 844 to 500 px; restart and calculator controls remained reachable; virtual keyboard did not overlap required controls.
- 768 px: no overflow; touch controls and typing proportions remained usable without a dense control row.
- 1366 px: the existing central desktop position and width were preserved.
- 1920 px: the central tool remained constrained instead of stretching into peripheral space.
- Additional checks passed at 844 x 390 landscape, 125% text scaling on all required widths, and 200% root text size without document overflow.

Captures are stored outside the repository at `C:\Users\Suhas\.codex\visualizations\2026\07\16\019f6c45-395f-7853-ad6c-3f5f2e3af178\phase1` so verification artifacts do not become product assets.

## Legacy baseline classification

The legacy client baseline is unchanged: 356 passing and 21 failing tests across 128 suites (109 passing, 19 failing). All 21 failures are unrelated pre-existing failures and were left unchanged:

| Legacy area | Failures | Classification |
| --- | ---: | --- |
| App lesson-menu routing | 5 | Unrelated pre-existing failure |
| `CalculateLevelMilestones` | 6 | Unrelated pre-existing failure |
| `FormatFetchedStats` | 1 | Unrelated pre-existing failure |
| `GetBestStats` | 1 | Unrelated pre-existing failure |
| `GetVerifyAuth` | 2 | Unrelated pre-existing failure |
| `PostForgotPwdReset` | 1 | Unrelated pre-existing failure |
| `DifficultySettings` duplicate text | 1 | Unrelated pre-existing failure |
| `Footer` | 3 | Unrelated pre-existing failure |
| `SpeedTest` | 1 | Unrelated pre-existing failure |

No failing legacy test was deleted, weakened, or reclassified as obsolete or environment-dependent. The existing legacy lint baseline also remains nine errors and one warning.

## Known limitations

- Current content remains English-oriented. Composition safety is covered, but full IME/multilingual exercise support is not implemented.
- Headless browser tooling cannot open a real operating-system software keyboard. The writable mobile input path, focus recovery, touch controls, and dynamic viewport-height response were verified instead; physical-device confirmation remains prudent.
- Character repeat is intentionally rejected. This is a documented accuracy-first policy rather than full native text-field repeat behavior.
- The timer pauses only active timed attempts while hidden. Untimed lessons preserve their work and have no elapsed-time deadline to pause.
- Pre-existing legacy lint/test failures and dependency audit findings remain outside Phase 1.
