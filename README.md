# Free Typing Camp

The production application is the root Next.js App Router project: a calm, accuracy-first typing program with 45 staged lessons, eight focused-practice topics, a configurable typing test, Calculator Sprint, browser-local progress, achievements, and themes. The legacy Vite React app in `client/` and Express/PostgreSQL app in `server/` remain historical reference material and are not imported by the active runtime.

## Runtime

The active root application uses Node.js 24.18.1 LTS and the npm 11.16.0 bundled with that release. `.nvmrc` pins the local runtime, `package.json` limits supported development to the Node 24 line, and `netlify.toml` mirrors the exact runtime for the current Netlify deployment. Use a Node version manager that honors `.nvmrc` before installing dependencies or running the commands below.

## Commands

- `npm run dev` starts the Next.js app.
- `npm run verify:fast` runs the normal local gate: lint, TypeScript, and the full Vitest suite.
- `npm run verify` runs the complete release-quality gate: `verify:fast`, the production build, and the full Playwright suite.
- `npm run lint` runs ESLint non-interactively.
- `npm run typecheck` runs TypeScript.
- `npm run build` creates a production build.
- `npm test` runs the root Vitest suite.
- `npm run test:e2e` starts the app and runs the Playwright browser suite in Chromium.
- `npm run test:e2e:headed` runs the same browser suite with a visible browser.

## Browser tests

Install the managed Chromium binary once with `npx playwright install chromium`, then use `npm run verify` for the complete local gate or `npm run test:e2e` for browser-only iteration. Playwright starts the local Next.js application automatically and covers core typing, local progress, focused practice, lesson continuation, mobile behavior, advertising safety, redirects, browser runtime errors, and serious or critical axe accessibility findings on key pages.

The browser suite is a regression gate for the tested flows, not a claim of full cross-browser coverage or WCAG conformance. Chromium is the initial required browser; broader browser and manual accessibility testing remain separate work. Serious or critical axe findings, including color contrast, fail without a rule suppression or baseline.

## Continuous integration

GitHub Actions runs `Quality` and `Browser and accessibility` checks for pull requests targeting `master` or `main` and for pushes to either branch. `Quality` runs `npm run verify:fast` followed by the production build. `Browser and accessibility` installs Chromium and its Linux dependencies, then runs the same browser gate composed by `npm run verify`, including desktop, 390px mobile, runtime-error, advertising-safety, and unsuppressed axe coverage.

Normal development pull requests target the `master` integration branch. The `main` branch remains the explicit production release branch watched by Netlify. CI validates both branches but does not merge, promote, invoke Netlify, or deploy production.

## Local progress

The active app has no authentication or account runtime. Completed typing tests, existing lesson attempts, and Calculator Sprint completions are stored locally in the browser through `lib/progress/`.

The retained `client/` and `server/` directories are not imported by the active Next.js runtime.

## Advertising and deployment

Advertising has explicit `live`, `placeholder`, and `off` modes. Live advertising requires an explicit production opt-in; unspecified production and local modes default to stable placeholders and never request live ads. Copy `.env.example` for local configuration; see `docs/DEPLOYMENT.md` for production gating, Netlify setup, consent requirements, and launch commands. The public identifiers and route policies are centralized in `lib/ads/config.ts`.

The canonical site origin is `https://freetypingcamp.com`. Exactly 26 substantive routes are indexable; local progress, utility pages, and the 45 exact lesson runners are excluded from the XML sitemap as documented in `docs/FTC_PHASE8_ADS_SEO_LAUNCH.md`.

## Browser identity

The production favicon is the verified blue-and-gold “F” retained from the historical client. The active app publishes ICO, PNG, Apple-touch, manifest, theme-color, and AdSense account metadata from the root layout.
