# Phase 2 local progress technical note

## Scope

Phase 2 establishes browser-local progress as the only active progress system, removes the active account runtime, and adds a local `/progress` experience. It does not add routes beyond `/progress`, curriculum, achievements, themes, advertisements, authentication, or cloud synchronization.

## Storage contract

The authoritative owner is `lib/progress/`. UI components call its repository functions and do not read or write storage directly.

- Storage technology: `window.localStorage`
- Canonical key: `freeTypingCamp.progress.v2`
- Schema version: `2`
- Legacy source key: `freeTypingCamp.results.v1`
- Typing-test history cap: 50 records
- Completed activity-date cap: 366 unique dates
- Processed-event ID cap: 250 IDs

The canonical record stores:

- typing-test history and an aggregate completed-test counter retained beyond the detail-history cap;
- existing lesson completion, attempt count, best WPM, best accuracy, optional best stars, and first/latest completion dates;
- Calculator Sprint completed-session count, best score, and latest completion date;
- unique completed activity dates;
- bounded event IDs used to reject duplicate completion events;
- migration metadata and the record's last update timestamp.

The record deliberately does not store names, email addresses, raw passages, individual key histories, authentication tokens, public profiles, or cloud identifiers.

## Validation and failure behavior

Every read validates the persisted value before the UI uses it. Invalid individual records are omitted while valid compatible records are retained. Numeric values must be finite and within explicit ranges; dates must be canonical ISO timestamps; lesson and game IDs must be known to the current application.

Storage states are reported as `available`, `corrupt`, `quota`, `unavailable`, or `unsupported`. Malformed JSON is not allowed to crash a route. A future schema version is treated as unsupported and is not overwritten. Completion remains usable when a storage write fails, and the completion UI reports that progress could not be saved.

Repository functions are safe during server rendering: when `window` is absent, they return an empty unavailable result and do not access browser APIs.

## Legacy migration

When no canonical record exists, the repository reads `freeTypingCamp.results.v1` once. It imports only validated records for:

- `words` and `quote` typing tests; and
- lesson IDs that still exist in the current lesson catalog.

Unknown activity names and malformed records are skipped. Legacy results did not contain trustworthy corrected/uncorrected error data, so migration does not invent those fields. Imported typing records use the explicit `legacy` difficulty marker. Migration writes a marker into the canonical record, making subsequent reads idempotent.

The legacy key is intentionally retained. A reset writes an empty canonical record with a completed migration marker, so retained legacy data is not silently reimported.

## Completion and duplicate rules

Typing tests, current lessons, and Calculator Sprint write progress only after their existing single-completion guards accept a genuine completion. Each completion receives a stable bounded event ID. A previously processed ID is ignored, which protects against duplicate React effects, repeated result rendering, and repeated game submissions.

Typing-test personal bests are compared only within the same mode, duration, and difficulty. Accuracy ranks first, WPM breaks an accuracy tie, and the newer timestamp breaks a complete tie. This keeps the progress summary aligned with the product's accuracy-first scoring direction.

## Same-tab and cross-tab updates

Successful repository writes dispatch a same-tab progress event. Other tabs update through the browser `storage` event. `subscribeToProgress` owns both listeners and returns a cleanup function. Components do not create polling loops.

## Reset behavior

`/progress` provides an explicit confirmation dialog. Confirmation clears only the canonical Free Typing Camp progress record by replacing it with a validated empty version. It does not call `localStorage.clear()` and does not remove unrelated browser data. The dialog has initial focus, Tab containment, Escape cancellation, focus return, and a live status message.

## Account-runtime removal

The active Next.js application no longer includes an authentication provider, credential forms, login/register routes, account settings endpoints, user endpoints, JWT client handling, or the PostgreSQL/passport/bcrypt/jsonwebtoken runtime. `/dashboard` redirects to `/progress` to preserve an existing internal destination. `/login` and `/register` now return the ordinary application 404.

The legacy `client/` and `server/` directories remain as historical reference and are not imported by the active Next.js runtime. Their old account code was not broadened into this cleanup because removing those retained applications belongs to a later repository decision.

## Route and indexing decisions

- `/progress` is public, local-only, and explicitly `noindex, follow`.
- `/progress` is omitted from the XML sitemap.
- `/dashboard` redirects to `/progress`.
- `/login`, `/register`, and the removed account API paths are not active routes.
- Navigation and trust-page language describe the no-account, device-local behavior factually.

## Minimal repository cleanup

Generated `.next` output and `tsconfig.tsbuildinfo` had been committed despite existing ignore rules. They were untracked without changing ignore policy. The root `df` file was verified as an ANSI-colored Git log capture with no runtime references and removed. Planning assets were retained.

## Tests added

Automated coverage includes:

- empty, valid, partial, malformed, corrupt, unsupported, quota, unavailable, and server-rendering storage states;
- legacy migration, source preservation, filtering, and idempotence;
- duplicate completion rejection and all bounded collections;
- comparable accuracy-first personal bests;
- typing-test, lesson, and Calculator Sprint persistence integration;
- same-tab updates, cross-tab updates, unsubscribe cleanup, and reset;
- `/progress` empty, populated, corrupt, and reset states;
- `/progress` noindex metadata;
- removal of account actions and sitemap exclusions.

## Responsive behavior verified

The progress experience uses the existing page shell, spacing, typography, warm surfaces, buttons, and responsive utilities. It adds no CSS borders, outlines, box shadows, gradients, fixed content widths, or new breakpoints. Manual browser evidence covers 390px, 768px, 1366px, and 1920px widths, including empty, populated, and reset-dialog states. The malformed-storage recovery state is covered by deterministic repository and component tests; the browser harness used for screenshots deliberately does not mutate local storage directly, so no synthetic malformed-storage screenshot was produced.

## Known limitations

- Progress belongs to one browser profile on one device and is not synchronized or backed up.
- Clearing site data removes the canonical record.
- Private browsing and restrictive storage policies may prevent persistence.
- Activity dates are derived from canonical completion timestamps and stored as ISO calendar dates.
- Typing history is intentionally bounded; `totalCompleted` preserves the aggregate count after older detail records are pruned.
- No data export/import UI is included in this phase.
- Legacy corrected and uncorrected error counts cannot be recovered because the old schema did not preserve them reliably.
- Existing legacy applications still contain historical account code but are outside the active runtime.
