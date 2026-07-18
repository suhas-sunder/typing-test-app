# Phase 4 typing-test technical note

## Scope and ownership

Phase 4 completes the existing `/typing-test` route without adding route variants or changing the Phase 1 typing engine. The shared `TypingTest` component still owns input orchestration, focus, elapsed-time updates, visibility handling, responsive line measurement, and the physical/virtual input path.

- `lib/typing/corpus.ts` is the authoritative typed corpus registry and seeded generator.
- `lib/typing/content.ts` remains the compatibility entry point for existing consumers.
- `lib/typing/test-settings.ts` owns validated browser-local test preferences under `freeTypingCamp.typingTest.settings.v1`.
- `lib/progress/repository.ts` owns result persistence and the v2-to-v3 progress migration.
- `lib/progress/typing-test-results.ts` owns accuracy stars, exact-setting comparisons, personal-best rules, and deterministic feedback.
- `app/typing-test/page.tsx` owns canonical metadata and supporting page content.

## Metrics and completion

Phase 1 definitions remain authoritative:

- WPM is currently correct characters divided by five, divided by elapsed active minutes.
- Accuracy is correct tracked character keypresses divided by all tracked character keypresses.
- Backspace and modifier/control input are not tracked keystrokes.
- A corrected error is a historical incorrect keypress whose visible character was removed.
- An uncorrected error is an incorrect character still present at completion.
- The monotonic active timer starts on the first valid character, pauses while the document is hidden, and completes once.

Changing a test setting deliberately creates a clean attempt and preserves the selected settings. It does not navigate or reload the route. Word passages are extended before exhaustion by appending new material to the existing attempt state; cursor position, keystrokes, statuses, timer state, and the active target are preserved.

## Test options

The supported durations are 15, 30, 60, 120, and 300 seconds. Modes are Words and Quotes; difficulties are Easy, Medium, and Hard.

Words mode supports independent punctuation and number controls. Punctuation off produces lowercase word sequences. Punctuation on uses controlled sentence templates. Numbers use sparse practical tokens such as counts, years, percentages, times, money, and measurements. Quote mode preserves authored content, so punctuation and number controls are replaced with an accessible explanation. Live time, WPM, and accuracy may be hidden without changing final calculations.

Preferences are stored separately from progress. Malformed settings are ignored and valid defaults are used. Query parameters remain compatibility inputs, but all variants canonicalize to `/typing-test` and no variant enters the sitemap.

## Corpus architecture and validation

The corpus registry contains:

| Pool | ID | Unique entries | Intended use | Provenance |
| --- | --- | ---: | --- | --- |
| Easy | `words-easy-v1` | 250 | Familiar, generally short beginner vocabulary | Existing Free Typing Camp common-word subset |
| Medium | `words-medium-v1` | 500 | Broader everyday vocabulary and mixed transitions | Existing common-word bank plus reviewed-in-code supplement |
| Hard | `words-hard-v1` | 500 | Longer, less frequent but understandable vocabulary | Common-word overlap plus Phase 4 advanced supplement |
| Quotes | stable `original-{difficulty}-{number}` records | 36 passages / 4,758 authored characters | Short through five-minute quote tests | Original site-written material |

The exact word inventory is the exported `WORD_CORPORA` value in `lib/typing/corpus.ts`; this is the single source used by validation and generation, so the review inventory cannot drift from runtime content. The exact passage inventory is the exported `QUOTE_CORPUS` value in the same file. Every passage includes stable ID, full text, author, source, provenance type, exact character count, difficulty, and content version.

Passage IDs:

- Easy: `original-easy-01` through `original-easy-12`.
- Medium: `original-medium-01` through `original-medium-12`.
- Hard: `original-hard-01` through `original-hard-12`.

All passages are marked `original`, authored as Free Typing Camp material, and use the source label `Original site-written typing passage`. No public-domain or third-party quotation is included, so there is no external copyright-verification burden. Attribution is shown only after completion and is not expected input.

Automated validation covers unique IDs, normalized duplicates, 250/500/500 minimums, the blocked-term set, supported characters, empty/whitespace errors, character counts, provenance consistency, deterministic seeds, distinct difficulty pools, immediate duplicates, short cycles, punctuation/number behavior, virtual-key coverage, and all five durations. The generator creates up to 900 initial words, then extends active word attempts near exhaustion without replacing the attempt.

Human content-review status: the registry above is the complete review inventory. The Phase 4 advanced vocabulary supplement and all 36 original passages require final product-owner wording approval before production deployment. No term has been represented as a universal frequency ranking.

## Local results and migration

The progress key is `freeTypingCamp.progress.v3`. If v3 is absent and a valid `freeTypingCamp.progress.v2` record exists, it is sanitized into v3 and the source is preserved. Older records did not store punctuation or number settings; migration leaves those fields unknown and gives them an `unknown:unknown` activity identifier. They remain visible locally but are never compared speculatively with a Phase 4 result. Legacy v1 migration remains intact.

New typing-test records include duration, mode, difficulty, punctuation, numbers, characters, WPM, accuracy, corrected and uncorrected errors, accuracy stars, elapsed time, completion time, and content version. History remains capped at 50 records.

Exact comparisons require the same duration, mode, difficulty, punctuation setting, and number setting. Quote punctuation and numbers are normalized to authored-content values. The prior comparison uses the most recent exact match.

- Controlled-speed personal best: accuracy must be at least 95%; higher WPM wins, then higher accuracy, then the earlier result on a full tie.
- Accuracy personal best: higher accuracy wins, then higher WPM, then the earlier result on a full tie.
- Accuracy stars: below 85% = 0; 85% = 1; 90% = 2; 95% = 3; 97% = 4; 99% = 5. WPM is not an input.

Feedback ranges are below 85%, 85–89%, 90–94%, 95–97%, and 98% or above. Low-accuracy feedback never celebrates speed.

## Responsive and accessibility behavior

The existing open passage, measured-line translation, central width, keyboard geometry, and focus restoration remain in place. The compact virtual keyboard now includes semicolon/colon so every generated character—including times in numeric material—has an on-screen input path. Settings wrap inside the existing modal; uncommon 2-minute and 5-minute options use explicit labels. Live-stat removal does not reserve an empty row.

Focus remains visible through the existing fill and text-color treatment. This phase adds no borders, outlines, box shadows, gradients, or rating structured data. Results expose one accessible `Accuracy stars: N of 5` label around five actual star icons. Quote-setting limitations and post-test attribution are text-accessible.

## Automated coverage added

Tests cover corpus sizes and validation, seed determinism, pool distinction, repeat avoidance, duration coverage, punctuation/number independence, quote metadata and attribution, settings validation and persistence, v2 migration, unknown configuration handling, exact comparison, speed gating, accuracy personal bests, all star thresholds, feedback ranges, complete result actions, compact keyboard character coverage, and safe passage extension. Existing Phase 1 tests continue to cover input, metrics, timing, visibility, composition, paste, restart, listener cleanup, Strict Mode, lesson completion, and physical/virtual parity.

The legacy client baseline remained exactly 356 passing and 21 failing tests before and after Phase 4. All 21 are unchanged, unrelated pre-existing failures: lesson-menu routing (5), `CalculateLevelMilestones` (6), `FormatFetchedStats` (1), `GetBestStats` (1), `GetVerifyAuth` (2), `PostForgotPwdReset` (1), `DifficultySettings` duplicate text (1), `Footer` (3), and legacy `SpeedTest` (1). None was deleted, weakened, made obsolete, or reclassified as environment-dependent. Legacy lint likewise remains at nine errors and one warning; its production build still passes.

## Manual responsive verification

Production-build browser checks used the same `/typing-test` route at each required width. No horizontal document overflow was present at 390, 768, 1366, or 1920 CSS pixels. The measured central typing tool remained capped at 1,152 pixels at both desktop widths rather than stretching into wide-screen peripheral space.

| Viewport | Verified state | Evidence |
| --- | --- | --- |
| 390 × 844 | Initial; easy, correction, and advanced active attempts; Words and Quotes settings; 80%, 90%, 95%, 97%, and 100% results; exact comparisons and personal bests | `docs/screenshots/phase4/typing-test-390-*.png` |
| 768 × 900 | Initial tool, wrapped duration controls, touch-size controls, and compact keyboard | `docs/screenshots/phase4/typing-test-768-initial.png` |
| 1366 × 900 | Existing desktop proportions, full navigation/keyboard, active quote attempt, and supporting content | `docs/screenshots/phase4/typing-test-1366-*.png` |
| 1920 × 1080 | Capped central tool, active advanced attempt, unchanged hierarchy, and retained peripheral space | `docs/screenshots/phase4/typing-test-1920-*.png` |

At 390 pixels, the settings dialog bottom measured 824 pixels in an 844-pixel viewport, the current character remained visible, all controls were reachable, and the document width remained equal to its client width. A physical-key sequence containing a mistake and Backspace produced the expected corrected state. Real 15-second attempts rendered 0 stars at 80%, 2 at 90%, 3 at 95%, 4 at 97%, and 5 at 100%. A faster 83% attempt received slow-down guidance and a numeric prior comparison but no personal-best label; an exact-configuration 80%-to-100% follow-up received controlled-speed and accuracy personal-best labels. Programmatic text insertion did not start or complete an attempt. The production page reported its self-canonical URL and the exact title `Free Typing Speed Test | FreeTypingCamp`; the browser console contained no warnings or errors.

The 1920 CSS-pixel layout was evaluated directly in the DOM. The in-app capture backend capped that raster artifact at 1,420 pixels, so the screenshot is supporting visual evidence rather than a pixel-for-pixel 1920 export. A real mobile software keyboard cannot be opened by this browser-test environment; the responsive visual-viewport behavior remains a manual-device check.

## Known limitations

- Content is English-only; composition boundaries are protected, but multilingual typing is not claimed.
- Progress and preferences are device/browser local and may be removed when browser data is cleared.
- Clipboard support depends on the browser Clipboard API; a failed copy leaves the result unchanged. The in-app capture browser did not expose `navigator.clipboard`, so the successful `Copied` transition is covered by an automated Clipboard API test rather than a manual screenshot.
- The browser-test environment cannot open a real mobile software keyboard, so visual viewport behavior requires manual device verification.
- Final human wording approval remains required for the Phase 4 corpus inventory identified above.
