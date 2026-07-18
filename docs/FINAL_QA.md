# Final quality assurance record

This record is finalized during main integration. Evidence that depends on the final merge or production build is intentionally filled only after those commands succeed.

| Field | Result |
|---|---|
| Starting branch | `fix/ftc-mobile-typing-ui` |
| Starting commit | `c63862fabc595c3990a5a87e2e7fffdde01de915` |
| Feature branch | `feat/ftc-ads-seo-launch` |
| Final feature commit | `8f62ff3ee921949cd7a264b10fe02a74d71a1080` |
| Main integration | Explicit `--no-ff` merge after fetching and fast-forward checking `origin/main`; no conflicts |
| Main merge commit | `57b088c2aac2d7e72ec0b22e4c140878b0a3638b` |
| Local main integration hash | `57b088c2aac2d7e72ec0b22e4c140878b0a3638b` |
| Remote main pre-push hash | `e71c7d70362cc51ea3fd68abf8d5e9ed3d216856` |
| Root tests | Verification passes 1 and 2: 40 files, 239 tests passed on each run |
| Production build | Verification passes 1 and 2: passed with Next.js 15.5.20 |
| Generated route count | 80 static pages generated; `/typing-test` is intentionally dynamic for validated query settings |
| Indexable page count | 26 |
| Screenshots/evidence | `docs/evidence/phase8/` (11 PNG files) |
| External checks | AdSense/CMP/domain/search consoles/devices/legal/editorial/CWV/invalid traffic remain incomplete without external evidence |

Browser QA covered 390, 768, 1366, and 1920 CSS-pixel viewports. It confirmed compact/full keyboard selection, real typing input, a completed five-round Calculator Sprint, balanced 160×600 rails at 1920, no rails at 1366, no horizontal overflow, no ads on progress/trust/404, and no browser console warnings/errors. Filled-versus-blocked simulation produced identical placement boxes and an identical 3,627px footer position at 390px. The browser capture backend clipped the 1920 viewport PNG surface to 1415px, so the saved wide PNGs are visual supplements; recorded DOM geometry is the authoritative 1920 evidence (1905px client width, 1152px centered tool, rails at x=120 and x=1624, zero center delta).

Retained client comparison after Phase 8: production build passed; lint retained the same 9 errors and 1 warning observed at task baseline; the final run produced 356 passed/21 failed plus 19 unhandled asynchronous errors, matching the established historical baseline. An earlier before/after run produced 355/22 when the legacy randomized calculation generator hit its known division-by-zero assertion; Phase 8 does not import or modify that generator. The remaining failures belong to the historical account application and were neither imported nor changed by Phase 8.

The feature head passed its second lint, typecheck, 239-test, production-build, diff, and clean-status gate before integration. The final release report records the post-documentation local and remote `main` hash because a commit cannot embed its own content-derived hash. Known legacy failures are recorded exactly rather than relabeled as new active-app failures.
