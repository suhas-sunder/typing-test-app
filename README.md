# Free Typing Camp Next.js MVP

This branch contains the first Next.js App Router MVP migration. The legacy Vite React app remains in `client/` and the legacy Express/PostgreSQL server remains in `server/` as the source of truth for preserved behavior and contracts.

## Commands

- `npm run dev` starts the Next.js app.
- `npm run lint` runs ESLint non-interactively.
- `npm run typecheck` runs TypeScript.
- `npm run build` creates a production build.

## Preserved Runtime Contracts

The Next.js route handlers preserve the existing `/v1/api/...` URL shape for account scores, progress stats, difficulty settings, and user login/register/session verification.

Required server-only environment variables remain:

- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`
- `DB_DATABASE`
- `JWT_SECRET`
- `SESSION_EXP` optional
- `DB_SSL=true` optional for SSL PostgreSQL connections

Do not expose these as `NEXT_PUBLIC_*` variables.
