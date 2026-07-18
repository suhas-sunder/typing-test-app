# Phase 7: responsive typing interface correction

## Scope and starting point

Phase 7 started from `be5204535372a422ec40fb7a2d592419e0c4e6e0` on `feat/ftc-curriculum-overhaul` and was implemented on `fix/ftc-mobile-typing-ui`.

The phase changes only the responsive shared keyboard presentation and lesson-stage hierarchy. It does not change the 45-lesson registry, lesson copy or order, typing corpora, metrics, progress schema, achievements, themes, Calculator Sprint rules, routes, metadata, advertising, trust pages, footer structure, or SEO content.

## Regression cause

The historical check produced two separate findings:

1. `components/typing/visual-keyboard.tsx` and `lib/typing/keyboard.ts` are equivalent at the Phase 4 final commit (`8807c3d`), Phase 5 final commit (`ab013ed`), and Phase 6 starting commit (`be520453`). Phase 6 did not literally replace or bypass the compact component.
2. The retained compact layout was an old five-row, all-at-once representation: a permanent digit row, three letter rows, and punctuation/utility controls. Phase 6 then reused that shared surface throughout the new multi-stage curriculum. Its new lesson composition placed stage title and instructions after the keyboard through `TypingTest`'s ordinary post-attempt context, where the same block could carry a `Results` eyebrow. This made the old crowded keyboard and the hierarchy defect prominent on every lesson stage.

The correction therefore does not replace the Phase 1 input engine. It keeps the full keyboard data and desktop renderer geometry, replaces only the compact presentation, and moves ownership of lesson context and final lesson results to the lesson runner.

## Approved baseline and intentional differences

The Phase 4 390px captures are the pre-Phase-6 visual baseline. They establish the warm surface, restrained keyboard container, 40px primary-key height, passage/metrics relationship, and keyboard-button language. The Phase 5 desktop captures establish the full 1,152px keyboard cap and 48px minimum desktop key height.

Intentional compact differences from the Phase 4 baseline:

- the permanent number row is removed;
- alphabet rows are exactly `QWERTYUIOP`, `ASDFGHJKL`, and `ZXCVBNM,.`;
- Space and Delete remain on a fourth utility row;
- `.?123` opens a content-specific secondary layer;
- Shift appears only when the active content supports capitals;
- Enter is opt-in and appears only when the consumer assigns it meaning;
- irrelevant keys are disabled rather than appearing actionable;
- the active layer and cross-layer expected-character hint are programmatic.

The full desktop rows, labels, width classes, 48px key height, 1,152px maximum width, expected-key styling, pressed-key feedback, metric placement, and central content cap are unchanged.

## Compact keyboard architecture

`lib/typing/keyboard.ts` is the data and policy boundary:

- `MOBILE_KEYBOARD` defines the three alphabet rows.
- `buildCompactSymbolRows(content)` builds the bounded secondary layer from characters actually required by the passage plus stable common punctuation.
- `SUPPORTED_COMPACT_SYMBOLS` limits output to the existing virtual-key registry.
- `compactLayerForCharacter` and `defaultCompactLayer` provide predictable expected/default-layer rules.
- `compactContentSupportsShift` decides whether contextual Shift is meaningful.
- `FULL_KEYBOARD_MIN_WIDTH_PX` and `isFullKeyboardEligible` document the 1,088px available-width threshold.

`VisualKeyboard` renders a single controller containing both full and compact views. The controller owns only temporary layer and virtual-Shift state. `TypingTest` passes the active passage, optional strict allowed-character set, expected character, pressed-key feedback, and a restart token.

`app/globals.css` uses a named inline-size container:

```text
available keyboard width < 68rem  -> compact
available keyboard width >= 68rem -> full
```

The selection is CSS-only and stable from the initial render. There is no viewport listener, ResizeObserver, user-agent check, post-mount swap, or local-progress state. The 68rem threshold allows the full renderer to retain its approved key sizes and spacing inside the existing 1,152px tool cap.

## Alphabet, secondary layer, and Shift

The alphabet layer provides:

- three compact letter rows;
- comma and period on the primary layer;
- `.?123`;
- contextual Shift;
- prominent Space;
- Delete;
- optional Enter.

The secondary layer provides only required approved characters. Depending on the active passage it can include digits, apostrophe, quotation mark, semicolon, colon, slash, question mark, exclamation mark, hyphen, equals, brackets, parentheses, percentage, dollar, plus, backslash, underscore, and other characters already represented in the existing full-key registry. `ABC`, Space, Delete, and optional Enter remain available. Unsupported characters are excluded.

The visitor controls ordinary layer switching. The selected layer survives harmless rerenders and consecutive relevant input. Restart or a new stage remounts the controller and chooses the appropriate default: alphabet for ordinary text and symbols for explicitly number/symbol-focused content. Expected input on the other layer highlights the switcher and attaches a static accessible description; it does not auto-switch, move focus, or create a live announcement per character.

Compact Shift is one-shot. It appears only when capitals exist in the active content, has an `aria-pressed` state, uses the existing coral selected fill, produces the next uppercase letter through the same virtual-input callback, and then clears. Restart and accepted physical/virtual feedback also clear transient Shift. Caps Lock is never added.

## Physical and virtual parity

There is still one authoritative attempt transition. Physical keyboard, hidden writable input, composition, paste protection, timer, visibility, metrics, error accounting, and focus recovery remain in `components/typing/typing-test.tsx`. Both full and compact virtual keys call the existing `processVirtualKey` path.

The responsive change does not fork the engine. It changes only which controls can generate a supported character. Automated parity tests cover equivalent virtual output, allowed keys, uppercase, punctuation, and restart state. Browser-driven touch/click verification exercised letters, Space, Delete, apostrophe, quotation mark, comma, Shift, layer switching, and symbol-only defaults.

Browser automation intentionally cannot bypass the application's programmatic-input protection to impersonate trusted hardware typing. Existing Phase 1 physical-input tests remain the authoritative regression coverage; real phone/tablet hardware-keyboard checks remain required.

## Lesson-stage hierarchy

`LessonExperience` now owns the active lesson hierarchy:

1. lesson position and stage position;
2. lesson title;
3. typed-stage position and stage title;
4. brief objective and finger guidance;
5. existing restart control, passage, progress, metrics, and keyboard;
6. a stage action only after stage completion.

Instruction and active stages do not render `Results`. Intermediate completion says `Stage complete`, reports stage metrics, offers `Continue to next stage` and `Retry stage`, omits stars, and cannot expose next-lesson navigation.

After all required typed stages and any accepted optional reinforcement are finished, `LessonExperience` alone renders:

- the `Results` eyebrow;
- aggregate WPM and accuracy;
- corrected and uncorrected errors;
- five lesson stars;
- weak-key feedback;
- retry final stage;
- repeat full lesson;
- next lesson;
- related practice.

The final completion announcement is a single polite status. Retry final stage removes only the final contributing result; repeat full lesson clears the entire in-memory lesson attempt. Aggregate scoring and exact-once local persistence are unchanged.

## Shared surfaces

- Typing test passes its generated passage to the compact keyboard. Punctuation and number settings therefore have a complete content-specific virtual path.
- Lesson runner passes the registry's allowed characters and the active stage text. Capital, punctuation, number, symbol, and adaptive content are supported without weakening validation.
- Focused practice passes its current generated text as the allowed compact set. Strict variants retain the same scoring and comparable-local-best identity.
- Calculator Sprint does not render `VisualKeyboard`; its calculator-specific control grid, input rules, scoring, restart, and route are unchanged.

## Responsive evidence

Browser measurements used the rendered component, not only the viewport label.

| Viewport | Selected layout | Keyboard size | Minimum measured key | Document overflow | Result |
| --- | --- | --- | --- | --- | --- |
| 390×844 | Compact | 335×198px | 28×40px alphabet key; 40px utility height | none (`scrollWidth == clientWidth`) | passage, metrics, and four-row keyboard remain coherent |
| 768×900 | Compact | 697×220px | 44px high | none | no compressed full keyboard or crowded tablet toolbar |
| 1366×900 | Full | 1,152×320px | 48×48px | none | approved full rows and geometry retained |
| 1920×1080 | Full | 1,152×320px | 48×48px | none | central cap retained; peripheral space does not stretch the tool |
| 844×390 | Compact | 773×220px | 44px high | none | landscape reflows without swapping to a compressed full keyboard |
| 390×600 | Compact | 335×198px | 40px high | none | reduced height increases ordinary page scrolling but does not overlap passage, controls, or keyboard |

The approved Phase 4 compact primary keys used the same `h-10`/`sm:h-11` classes (40/44px). Phase 7 retains that height while removing two always-visible rows and giving alphabet keys more horizontal room. At 390px the compact keyboard is 198px tall rather than the former five-row footprint.

Browser-level 125% zoom and 200% text emulation were not exposed by the selected in-app browser; an attempted browser zoom command left layout metrics unchanged. No claim is made for those settings. The container-query rule, flexible rows, absence of fixed page widths, and no-overflow checks provide code-level protection, but manual browser zoom and real-device text-size checks remain required.

No new animation was introduced. Existing reduced-motion behavior and all Phase 1 timing tests remain unchanged.

## Accessibility evidence

- every compact control has an accessible name;
- the keyboard group names the active alphabet or symbols layer;
- layer and Shift use `aria-pressed`;
- disabled keys use native `disabled`;
- expected input on another layer is associated with a non-live description;
- no timer tick or ordinary expected-character change is announced;
- Shift selection uses text/state plus the existing coral fill;
- active, stage-complete, and final-result announcements are distinct;
- `Results` is absent from instruction, active, and intermediate states;
- final lesson results are announced once;
- buttons remain native controls in DOM order and retain existing non-border focus treatment;
- compact input has no custom focus trap or Tab handler;
- state is not conveyed by color alone: labels, disabled state, pressed state, and text feedback accompany visual treatment.

The automated browser cannot reproduce a real iOS or Android software keyboard, OS text scaling, or a hardware keyboard attached to a phone/tablet. Those are explicit launch-device checks.

## Visual comparisons and captures

Historical references:

- `docs/screenshots/phase4/typing-test-390-initial.png` — approved pre-Phase-6 compact styling and key-height baseline.
- `docs/screenshots/phase4/typing-test-1366-initial.png` — approved full desktop typing-test baseline.
- `docs/phase5-captures/global-base-typing-test-1366.png` — approved Phase 5 desktop baseline.
- `docs/phase6-captures/lesson-correction-390.png` — Phase 6 five-row keyboard with active lesson context incorrectly following the keyboard.

Phase 7 captures are in `docs/phase7-captures/`:

- 390px instruction, active alphabet, symbol/number, Shift, comma expected, quotation expected, number expected, adaptive reinforcement, stage complete, and final results;
- 390px typing test, punctuation/number-enabled test, focused practice, and unchanged Calculator Sprint;
- 768px active lesson and typing test;
- 1366px active lesson/full keyboard and typing test/full keyboard;
- 1920px active lesson/full keyboard and typing test/full keyboard;
- 844×390 landscape and 390×600 reduced-height lesson states.

Every intentional visual difference is limited to compact row/layer availability and corrected lesson ordering. Passage width, metric order, background treatment, typography, palette, full keyboard, and Calculator Sprint are preserved.

## Automated coverage

New focused coverage includes:

- compact/full eligibility from available width;
- three alphabet rows, comma, period, utilities, modifier absence, no number row, optional Enter, allowed/disabled treatment, expected highlighting, and minimum key height;
- content-derived number/symbol layers, unsupported-character exclusion, default layer, explicit switching, harmless rerender persistence, restart reset, cross-layer hint, and no automatic switching;
- contextual Shift visibility, pressed state, one-shot uppercase, and Caps Lock absence;
- all typed stages in all 45 lessons, every focused-practice variant, and all approved test mode/difficulty/punctuation/number combinations having a compact virtual path;
- active lesson context ordering and absence of active `Results`;
- intermediate stage presentation and final-results gating;
- aggregate metrics, exact-once persistence, retry final stage, and final actions;
- existing full-key output and physical/virtual input integration.

Final root total: 33 test files and 195 passing tests.

## Verification baseline

Before product changes:

- root lint: pass;
- root TypeScript check: pass;
- root tests: 29 files, 177 passed;
- root production build: pass, 80 generated pages;
- `git diff --check`: pass;
- legacy build: pass with the existing bundle-size and `caniuse-lite` warnings;
- legacy lint: unchanged 9 errors and 1 warning;
- legacy tests: unchanged 356 passed and 21 failed.

Phase 7 does not modify `client/` or its dependency graph. The legacy failures remain the documented unrelated baseline.

## Known limitations and remaining launch checks

- Verify iOS Safari and Android Chrome software-keyboard opening, viewport-height changes, focus recovery, and touch latency on real devices.
- Verify a hardware keyboard attached to a tablet/phone.
- Verify 125% browser zoom, 200% browser text sizing, and OS-level large text manually.
- Verify reduced motion in an OS/browser profile even though this phase adds no motion.
- Confirm compact touch comfort with students on the smallest supported physical device; the primary key height is not below the approved baseline, but ten-key row width is necessarily narrower than the utility controls.
- Enter remains opt-in. Current typing-test, lesson, and focused-practice passages do not require Enter, so it is not displayed.
- The CSS container threshold is intentionally conservative. A future central-layout change must remeasure the full keyboard before changing 68rem.
