# Phase 3 curriculum and focused-practice implementation

## Scope and ownership

Phase 3 adds a controlled 30-lesson curriculum and eight focused-practice destinations to the active Next.js application. It extends the Phase 1 typing engine and the Phase 2 browser-local repository. It does not add authentication, accounts, advertisements, themes, achievements, a new visual system, or new games.

The authoritative curriculum modules are:

- `lib/curriculum/registry.ts`: six units, 30 stable lesson IDs, ordering, objectives, stages, allowed characters, key introductions, targets, prerequisites, and related practice.
- `lib/curriculum/finger-map.ts`: canonical QWERTY finger assignments.
- `lib/curriculum/stars.ts`: the lesson-star contract.
- `lib/curriculum/validator.ts`: build/test-time structural and content validation.
- `lib/practice/registry.ts`: the eight practice definitions, variants, lengths, metadata copy, and deterministic passage builders.

Routes and components read those registries; they do not contain independent curriculum copies. Lesson attempts and practice results are written through `lib/progress/repository.ts`, the only localStorage boundary.

## Curriculum contract

The enabled registry contains exactly six units and 30 lessons:

| Unit | Lesson sequence | Count | Canonical unit route |
|---|---:|---:|---|
| Home Row | 1-7 | 7 | `/lessons/home-row` |
| Top Row | 8-13 | 6 | `/lessons/top-row` |
| Bottom Row | 14-19 | 6 | `/lessons/bottom-row` |
| Full Keyboard | 20-24 | 5 | `/lessons/full-keyboard` |
| Capitals and Punctuation | 25-27 | 3 | `/lessons/capitals-punctuation` |
| Numbers and Symbols | 28-30 | 3 | `/lessons/numbers-symbols` |

Every lesson has a stable ID, global sequence, objective, introduced keys, allowed-character set, finger assignments, one preceding prerequisite at most, three authored stages, standard and mastery WPM targets, five accuracy thresholds, related practice IDs, and a content version. Prerequisites guide the recommended sequence; they do not lock direct access.

The validator rejects duplicate IDs or sequences, missing units, invalid prerequisites, non-increasing WPM targets, malformed thresholds, unsupported practice references, stage text outside the allowed-character set, and introduced keys that have no finger mapping. Registry tests also require the exact unit and lesson counts.

Individual lesson attempts use the existing three-segment runner shape:

`/lessons/lesson/{unit-id}/lesson/{lesson-id}`

The runner resolves only an exact known lesson whose unit matches the URL. Unknown IDs, unknown units, and other section values return 404. Lesson attempts are `noindex,follow`, have a canonical URL, and are excluded from the XML sitemap. Unit routes are the indexable curriculum destinations.

## Lesson score and completion rules

Stars are performance scores, not reviews:

| Stars | Requirement |
|---:|---|
| 0 | Accuracy below 85% |
| 1 | Accuracy at least 85% |
| 2 | Accuracy at least 90% |
| 3 | Accuracy at least 95% |
| 4 | Accuracy at least 97% and WPM at least the lesson's standard target |
| 5 | Accuracy at least 99% and WPM at least the lesson's mastery target |

Every genuine finished attempt is recorded. One or more stars marks a lesson completed; a zero-star attempt remains an attempt without fabricating completion. Best stars, WPM, and accuracy are monotonic best values, while attempt count and most-recent attempt date continue updating. Existing compatible Phase 2 lesson records retain their values.

WPM, accuracy, corrected errors, uncorrected errors, timer, input filtering, focus recovery, physical/virtual parity, and exact-once completion remain owned by the shared Phase 1 engine. Phase 3 does not fork those formulas.

## Focused-practice contract

The practice hub is `/typing-practice`. The eight canonical pages are:

- `/typing-practice/asdf-jkl`
- `/typing-practice/qwertyuiop`
- `/typing-practice/zxcvbnm`
- `/typing-practice/quotes`
- `/typing-practice/left-hand`
- `/typing-practice/right-hand`
- `/typing-practice/numbers-symbols`
- `/typing-practice/common-words`

Each page has a distinct title, description, canonical, open-graph metadata, technique guidance, common mistakes, next step, and related lesson links. Settings are local UI state and never create indexable URL variants. The shared engine remains the only input and metric path.

Row, hand, number/symbol, and common-word activities provide short, medium, and long choices. Quotes provide short and medium choices so passages end at a natural authored boundary. Variants are activity-specific (for example strict row drills versus mixed application). Common-word passages draw deterministically from curated 100-, 250-, and 500-word pools. Quote passages are original project copy rather than attributed quotations.

A practice personal best is comparable only when practice ID, length, and variant all match. Practice history is bounded by the existing repository limits and stays in the `freeTypingCamp.progress.v2` record. Practice does not award lesson stars or mark curriculum lessons complete.

## Content-quality rules

- Every lesson stage must pass its declared allowed-character set and key-order validation.
- Unit and practice pages must have a distinct objective, technique explanation, activity-specific mistakes, and a useful next step; keyword-swapped boilerplate is not acceptable.
- Practice setting changes must stay on one canonical route rather than generating thin variants.
- Common-word pools are finite and reviewed as 100-, 250-, and 500-word sets; they are not generated from search terms.
- Quote practice uses original project passages and does not imply third-party attribution.
- Individual lesson runners remain noindex because the six unit pages carry the substantial curriculum intent.
- Lesson stars are local performance scores, never ratings or structured review data.

## Browser-local progress compatibility

The canonical key remains `freeTypingCamp.progress.v2`; no schema-version bump was required because the Phase 2 schema intentionally reserved practice progress. Reads still validate unknown/corrupt data and recover to an empty safe record. The Phase 1 `freeTypingCamp.results.v1` import stays idempotent and untouched.

Migration policy:

- Preserve recognized existing lesson IDs and their recorded values.
- Never guess that one of the 1,752 legacy numeric lesson URLs is equivalent to a new authored lesson.
- Never fabricate stars for a legacy attempt that did not store a compatible lesson score.
- Keep comparisons scoped to the same activity configuration.
- Continue bounding histories and processed event IDs to prevent unbounded localStorage growth.

## Interface corrections included

The existing warm cream/navy/coral/sage palette, typography, spacing, central typing width, line measurement, keyboard geometry, and responsive breakpoint system are preserved. Phase 3 makes only the approved corrections:

- Desktop navigation is exactly Typing Test, Lessons, Practice, Games, Learn, Progress; the compact menu exposes the same six destinations.
- The lesson hub presents a calm sequence, actual earned star totals, completion status, and recommended next lesson without account or cloud language.
- Lesson tiles use the existing flat warm surfaces and a full orange hover/focus state; no new borders, outlines, or box shadows were introduced.
- Typing prompts remain open on the page rather than gaining a new enclosing rectangle.
- Results remain flat and show WPM, accuracy, corrected errors, uncorrected errors, and one five-star row. No raw score, save-account panel, or second star row was added.
- The footer uses full-width background bands, the existing creator links, exact utility links, and the three approved similar-project links. It is not a nested box grid.

## Accessibility verification

The six-link desktop and compact navigation structures use named links and an explicitly named menu button. Typing retains the Phase 1 hidden input, focus recovery, status announcements, paste/composition filtering, physical/virtual parity, and keyboard labels. Result stars are exposed as one accessible `n of 5 stars` value rather than five competing announcements. Lesson previous/next links are inside a named navigation region, and each checked page had one H1. Keyboard focus on a lesson tile uses the same full orange fill and white text as hover; no new border, outline, ring, or box-shadow rule was added. Real screen-reader and mobile-device testing remains required before release.

## Automated coverage

Phase 3 adds or extends deterministic tests for:

- exact unit and lesson counts;
- stable unique IDs and sequences;
- canonical lesson href construction;
- finger assignments;
- all star threshold boundaries;
- curriculum validation and invalid fixture rejection;
- exactly eight practice definitions;
- practice route/variant/length completeness;
- passage determinism and allowed characters;
- the 100/250/500 common-word pools;
- Phase 2 progress compatibility, zero-star lesson attempts, completed lesson attempts, practice history, and like-for-like practice bests;
- sitemap inclusion for units/practice and exclusion for individual lesson attempts and `/progress`;
- the six-link navigation contract.

## Responsive verification

Manual browser checks were run against the local production code at 390, 768, 1366, and 1920 CSS pixels. The lesson hub and representative practice pages had no horizontal document overflow. At 1366 and 1920 the typing surface remained capped at the existing 1152px maximum instead of stretching into peripheral space. At 390, reduced viewport height did not cover the current character or restart control, and tapping the typing surface restored the hidden input's focus. The unit/lesson runner, completion results, canonical metadata, noindex directive, and true unknown-lesson 404 were also checked.

The capture set includes the lesson hub at all four required widths; a lesson runner at initial, active, mistake, zero-star, three-star, and five-star states; ASDF JKL, QWERTYUIOP, ZXCVBNM, and quotes at their required mobile/desktop widths; all four remaining practice topics at 390px; the orange lesson interaction state; corrected-error results; and desktop/mobile footer bands with Creator Links and Similar Projects visible.

Screenshots are in `docs/screenshots/phase3/`. Synthetic browser key events were used only to reach deterministic active/error/results states; the resulting automated WPM is not a human performance benchmark. Browser tooling cannot open a real iOS or Android software keyboard, so physical-device keyboard/viewport behavior remains a release check.

## Known limitations and required human review

- The curriculum and practice copy is structurally valid but still requires the requested human educational/content review before release.
- English QWERTY content remains the supported curriculum; this phase does not claim multilingual instruction.
- Exact legacy redirects require Search Console or analytics evidence and an approved source-to-destination table. No speculative redirect was added.
- Browser automation cannot validate real mobile keyboard chrome, safe-area behavior, or assistive-technology output on hardware.
- Phase 4 typing-test corpus/options and scoring expansion is intentionally not included here.
