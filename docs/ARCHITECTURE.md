# Active application architecture

## Runtime boundary

The production application is the root Next.js App Router project.

- `app/` owns routes, metadata, and route-level composition.
- `components/` owns the current shared UI and interactive client components.
- `lib/typing/` owns typing-domain content, metrics, input behavior, and exercise state.
- `lib/progress/` owns browser-local progress persistence, validation, migration, summaries, and subscriptions.
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

Only `lib/progress/repository.ts` accesses `window.localStorage`. Consumers pass typed completion data to repository functions. The repository checks for browser availability, so server rendering does not cross the browser boundary.

`lib/progress/types.ts` defines the versioned schema and limits. `lib/progress/ids.ts` defines stable activity and event identifiers. `lib/progress/summary.ts` derives accuracy-first comparable typing-test bests. These files depend on typing-domain identifiers; the typing engine does not depend on the progress UI.

## Route behavior

`/progress` is a public client-backed summary inside the shared `PageFrame`. It is noindex and is not emitted by the XML sitemap. It renders a hydration-safe loading state before reading the browser record.

`/dashboard` is retained only as a redirect to `/progress`. The former credential routes and account APIs are absent from the active route tree.

## Historical applications

`client/` contains the retained legacy Vite React application. `server/` contains the retained legacy Express/PostgreSQL application. They are historical reference systems and are not imported by the active Next.js runtime. Their builds and tests remain useful as a regression baseline, but new root application behavior must not call their account endpoints.

Removing or archiving those directories is a separate future decision. Phase 2 does not rewrite them or move their useful exercise data.

## Repository hygiene

Generated Next.js output and TypeScript build information are ignored and untracked. Source, documentation, and intentional planning assets remain versioned. New runtime code should not be added to generated directories.

## Dependency direction

Keep dependencies one-way:

```text
app routes -> components -> lib/progress -> lib/typing data/types
                         \-> lib/typing engine
```

Do not import client components into `lib/progress`, call browser storage from server components, or reintroduce account API calls into progress consumers. Future schema changes must increment the schema version and add an explicit migration rather than mutating unknown stored data in place.
