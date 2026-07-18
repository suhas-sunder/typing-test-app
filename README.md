# Free Typing Camp

The production application is the root Next.js App Router project: a calm, accuracy-first typing program with 45 staged lessons, eight focused-practice topics, a configurable typing test, Calculator Sprint, browser-local progress, achievements, and themes. The legacy Vite React app in `client/` and Express/PostgreSQL app in `server/` remain historical reference material and are not imported by the active runtime.

## Commands

- `npm run dev` starts the Next.js app.
- `npm run lint` runs ESLint non-interactively.
- `npm run typecheck` runs TypeScript.
- `npm run build` creates a production build.
- `npm test` runs the root Vitest suite.

## Local progress

The active app has no authentication or account runtime. Completed typing tests, existing lesson attempts, and Calculator Sprint completions are stored locally in the browser through `lib/progress/`.

The retained `client/` and `server/` directories are not imported by the active Next.js runtime.

## Advertising and deployment

Advertising has explicit `live`, `placeholder`, and `off` modes. Local development defaults to stable placeholders and never requests live ads. Copy `.env.example` for local configuration; see `docs/DEPLOYMENT.md` for production gating, Netlify setup, consent requirements, and launch commands. The public identifiers and route policies are centralized in `lib/ads/config.ts`.

The canonical site origin is `https://freetypingcamp.com`. Exactly 26 substantive routes are indexable; local progress, utility pages, and the 45 exact lesson runners are excluded from the XML sitemap as documented in `docs/FTC_PHASE8_ADS_SEO_LAUNCH.md`.

## Browser identity

The production favicon is the verified blue-and-gold “F” retained from the historical client. The active app publishes ICO, PNG, Apple-touch, manifest, theme-color, and AdSense account metadata from the root layout.
