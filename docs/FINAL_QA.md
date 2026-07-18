# Final quality assurance record

This record is finalized during main integration. Evidence that depends on the final merge or production build is intentionally filled only after those commands succeed.

| Field | Result |
|---|---|
| Starting branch | `fix/ftc-mobile-typing-ui` |
| Starting commit | `c63862fabc595c3990a5a87e2e7fffdde01de915` |
| Feature branch | `feat/ftc-ads-seo-launch` |
| Final feature commit | Pending final feature-head verification |
| Main integration | Pending verified integration |
| Main merge commit | Pending verified integration |
| Local main hash | Pending verified integration |
| Remote main hash | Pending successful push |
| Root tests | Verification pass 1: 40 files, 239 tests passed |
| Production build | Verification pass 1: passed with Next.js 15.5.20 |
| Generated route count | 80 static pages generated; `/typing-test` is intentionally dynamic for validated query settings |
| Indexable page count | 26 |
| Screenshots/evidence | `docs/evidence/phase8/` (11 PNG files) |
| External checks | AdSense/CMP/domain/search consoles/devices/legal/editorial/CWV/invalid traffic remain incomplete without external evidence |

Browser QA covered 390, 768, 1366, and 1920 CSS-pixel viewports. It confirmed compact/full keyboard selection, real typing input, a completed five-round Calculator Sprint, balanced 160×600 rails at 1920, no rails at 1366, no horizontal overflow, no ads on progress/trust/404, and no browser console warnings/errors. Filled-versus-blocked simulation produced identical placement boxes and an identical 3,627px footer position at 390px. The browser capture backend clipped the 1920 viewport PNG surface to 1415px, so the saved wide PNGs are visual supplements; recorded DOM geometry is the authoritative 1920 evidence (1905px client width, 1152px centered tool, rails at x=120 and x=1624, zero center delta).

Retained client comparison after Phase 8: production build passed; lint retained the same 9 errors and 1 warning observed at task baseline; tests retained the same observed 355 passed/22 failed plus 19 unhandled asynchronous errors. These failures belong to the historical account application and were neither imported nor changed by Phase 8.

The final command record must also include the second feature-head pass, branch/hash verification, main verification, and local/remote main equality. Known legacy failures are recorded exactly rather than relabeled as new active-app failures.
