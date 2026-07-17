# Active application architecture

## Runtime boundary

The production application is the root Next.js App Router project.

- `app/` owns routes, metadata, and route-level composition.
- `components/` owns the current shared UI and interactive client components.
- `lib/typing/` owns typing-domain content, the validated typing-test corpus and settings, metrics, input behavior, and exercise state.
- `lib/progress/` owns browser-local progress persistence, validation, migration, summaries, and subscriptions.
- `lib/curriculum/` owns the controlled lesson registry, finger map, star rubric, and validation.
- `lib/practice/` owns focused-practice definitions and deterministic passage generation.
- `public/` owns static assets.

The root application has no active authentication, account database, or server-side user-progress API.

## Local progress flow

```text
Typing test / lesson / Calculator Sprint
                 |
                 v
       lib/progress/repository
       - validate completion
       - reject duplicate event
       - migrate legacy data if needed
       - read/write canonical local record
                 |
                 v
       window.localStorage (browser only)
                 |
                 v
       same-tab event / storage event
                 |
                 v
          /progress summary UI
```

Only `lib/progress/repository.ts` accesses the versioned progress record in `window.localStorage`. Consumers pass typed completion data to repository functions. The repository checks for browser availability, so server rendering does not cross the browser boundary. Test preferences use the separate validated `lib/typing/test-settings.ts` boundary and never share the progress envelope.

`lib/progress/types.ts` defines the versioned schema and limits. `lib/progress/ids.ts` defines stable activity and event identifiers. `lib/progress/typing-test-results.ts` owns exact-configuration comparisons, accuracy stars, and personal-best rules; `lib/progress/summary.ts` derives the minimal progress-page summary. These files depend on typing-domain identifiers; the typing engine does not depend on the progress UI.

## Route behavior

`/progress` is a public client-backed summary inside the shared `PageFrame`. It is noindex and is not emitted by the XML sitemap. It renders a hydration-safe loading state before reading the browser record.

`/typing-test` is the sole canonical typing-test route. Its settings may be represented in local state or compatibility query parameters, but route variants are not generated or emitted in the sitemap. `lib/typing/corpus.ts` is its authoritative content registry; rendering remains in the shared `components/typing/typing-test.tsx` surface used by lessons and practice.

`/dashboard` is retained only as a redirect to `/progress`. The former credential routes and account APIs are absent from the active route tree.

`/lessons` and the six `/lessons/{unit-id}` pages are the indexable curriculum destinations. Exact lesson attempts use `/lessons/lesson/{unit-id}/lesson/{lesson-id}`, are `noindex,follow`, and 404 when either identifier is unknown or mismatched. `/typing-practice` and its eight registry-backed child pages are canonical, indexable focused-practice destinations; length and variant settings stay in client state.

The XML sitemap is generated from the curriculum and practice registries. It includes unit and focused-practice pages, but excludes individual lesson attempts and local `/progress`.

## Historical applications

`client/` contains the retained legacy Vite React application. `server/` contains the retained legacy Express/PostgreSQL application. They are historical reference systems and are not imported by the active Next.js runtime. Their builds and tests remain useful as a regression baseline, but new root application behavior must not call their account endpoints.

Removing or archiving those directories is a separate future decision. Phase 2 does not rewrite them or move their useful exercise data.

## Repository hygiene

Generated Next.js output and TypeScript build information are ignored and untracked. Source, documentation, and intentional planning assets remain versioned. New runtime code should not be added to generated directories.

## Dependency direction

Keep dependencies one-way:

```text
app routes -> components -> lib/curriculum / lib/practice
                         \-> lib/progress -> lib/typing data/types
                         \-> lib/typing engine
```

Do not import client components into `lib/progress`, call browser storage from server components, or reintroduce account API calls into progress consumers. Future schema changes must increment the schema version and add an explicit migration rather than mutating unknown stored data in place.
