# Free Typing Camp Next.js MVP

This branch contains the Next.js App Router MVP. The legacy Vite React app remains in `client/` and the legacy Express/PostgreSQL server remains in `server/` as historical reference material.

## Commands

- `npm run dev` starts the Next.js app.
- `npm run lint` runs ESLint non-interactively.
- `npm run typecheck` runs TypeScript.
- `npm run build` creates a production build.

## Local progress

The active app has no authentication or account runtime. Completed typing tests, existing lesson attempts, and Calculator Sprint completions are stored locally in the browser through `lib/progress/`.

The retained `client/` and `server/` directories are not imported by the active Next.js runtime.
