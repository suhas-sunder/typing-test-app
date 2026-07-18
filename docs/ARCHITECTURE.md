# Active application architecture

## Runtime boundary

The production application is the root Next.js App Router project.

- `app/` owns routes, metadata, and route-level composition.
- `components/` owns the current shared UI and interactive client components.
- `lib/typing/` owns typing-domain content, the validated typing-test corpus and settings, metrics, input behavior, and exercise state.
- `lib/progress/` owns browser-local progress persistence, validation, migration, summaries, and subscriptions.
- `lib/themes/` owns the typed semantic theme registry, availability rules, and minimal pre-paint theme bootstrap.
- `lib/curriculum/` owns the 45-lesson registry, three progression levels, six skill-hub tags, authored stages, adaptive rules, finger map, star rubric, and validation.
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
       - evaluate deterministic achievements
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

Only `lib/progress/repository.ts` reads and writes the versioned progress record in `window.localStorage`. Consumers pass typed completion or customization data to repository functions. The generated theme bootstrap is the sole exception: it performs a read-only pre-paint lookup of a validated v5 theme and cannot mutate progress. The repository checks for browser availability, so server rendering does not cross the browser boundary. Test preferences use the separate validated `lib/typing/test-settings.ts` boundary and never share the progress envelope.

`lib/progress/types.ts` defines the v5 schema and limits. Its v4 migration maps twelve strong lesson equivalents, preserves other old records in bounded legacy history, retains existing unlocks and selections, and stores only bounded aggregate weak-key summaries. `lib/progress/ids.ts` defines stable activity and event identifiers. `lib/progress/achievements.ts` owns the twenty definitions and deterministic evaluators.

## Route behavior

`/progress` is a public client-backed summary and customization surface inside the shared `PageFrame`. It is noindex and is not emitted by the XML sitemap. It renders a hydration-safe loading state before reading the browser record. Achievements, the Camp emblem, theme selection, and Calculator Sprint comparisons remain local and do not create public profile or reward routes.

`/typing-test` is the sole canonical typing-test route. Its settings may be represented in local state or compatibility query parameters, but route variants are not generated or emitted in the sitemap. `lib/typing/corpus.ts` is its authoritative content registry; rendering remains in the shared `components/typing/typing-test.tsx` surface used by lessons and practice.

`/dashboard` is retained only as a redirect to `/progress`. The former credential routes and account APIs are absent from the active route tree.

`/lessons` presents Beginner Foundations (17), Intermediate Fluency (17), and Advanced Application (11). The six `/lessons/{unit-id}` pages remain indexable skill hubs rather than six linear units. Exact lesson attempts use `/lessons/lesson/{unit-id}/lesson/{lesson-id}`, are `noindex,follow`, and 404 when either identifier is unknown or mismatched. `/typing-practice` and its eight registry-backed child pages remain canonical focused-practice destinations.

The XML sitemap is generated from the curriculum and practice registries. It includes unit and focused-practice pages, but excludes individual lesson attempts and local `/progress`.

`/games/calculator` is the sole active game destination. The thin `/games` hub permanently redirects to it and is excluded from the sitemap.

## Staged lesson flow

`components/lessons/lesson-experience.tsx` sequences instruction and typed stages. Typed stages reuse `components/typing/typing-test.tsx`; a narrow callback returns the Phase 1 engine metrics without persisting each stage. Required stages aggregate tracked keystrokes and active milliseconds. One optional adaptive stage can be appended, after which the aggregate result is written once.

## Historical applications

`client/` contains the retained legacy Vite React application. `server/` contains the retained legacy Express/PostgreSQL application. They are historical reference systems and are not imported by the active Next.js runtime. Their builds and tests remain useful as a regression baseline, but new root application behavior must not call their account endpoints.

Removing or archiving those directories is a separate future decision. Phase 2 does not rewrite them or move their useful exercise data.

## Repository hygiene

Generated Next.js output and TypeScript build information are ignored and untracked. Source, documentation, and intentional planning assets remain versioned. New runtime code should not be added to generated directories.

## Dependency direction

Keep dependencies one-way:

```text
app routes -> components -> lib/curriculum / lib/practice
                         \-> lib/progress -> lib/themes / lib/typing data/types
                         \-> lib/themes
                         \-> lib/typing engine
```

Do not import client components into `lib/progress`, call browser storage from server components, or reintroduce account API calls into progress consumers. Future schema changes must increment the schema version and add an explicit migration rather than mutating unknown stored data in place.
