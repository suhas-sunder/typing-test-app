import { describe, expect, it } from "vitest";
import {
  INTENTIONALLY_BLOCKED_OPTIONAL_REQUESTS,
  isIntentionallyBlockedOptionalCspConsoleError,
  isIntentionallyBlockedOptionalCspViolation,
} from "@/lib/security/csp-violations";

describe("browser CSP violation policy", () => {
  it.each([
    [
      "https://fonts.googleapis.com/css?family=Roboto:500",
      "optional AdSense font request",
    ],
    [
      "https://csi.gstatic.com/csi?v=2&s=pagead&action=csi_pagead",
      "optional AdSense timing request",
    ],
  ])("recognizes the exact %s request as intentionally blocked", (blockedUri) => {
    expect(
      isIntentionallyBlockedOptionalCspViolation({
        blockedUri,
        effectiveDirective: "connect-src",
      }),
    ).toBe(true);
  });

  it("accepts an origin-only browser report for the same optional requests", () => {
    expect(
      isIntentionallyBlockedOptionalCspViolation({
        blockedUri: "https://csi.gstatic.com",
        effectiveDirective: "connect-src",
      }),
    ).toBe(true);
  });

  it.each([
    ["https://fonts.googleapis.com/css2?family=Roboto", "connect-src"],
    ["https://fonts.googleapis.com/css?family=Roboto", "style-src-elem"],
    ["https://csi.gstatic.com/other", "connect-src"],
    ["https://example.com/csi", "connect-src"],
    ["https://static.cloudflareinsights.com/beacon.min.js", "script-src-elem"],
    ["https://us.i.posthog.com/e", "connect-src"],
  ])("keeps an unexpected %s %s violation actionable", (blockedUri, directive) => {
    expect(
      isIntentionallyBlockedOptionalCspViolation({
        blockedUri,
        effectiveDirective: directive,
      }),
    ).toBe(false);
  });

  it("does not turn the narrow request policy into an origin wildcard", () => {
    expect(INTENTIONALLY_BLOCKED_OPTIONAL_REQUESTS).toHaveLength(2);
    for (const request of INTENTIONALLY_BLOCKED_OPTIONAL_REQUESTS) {
      expect(request.hostname).not.toContain("*");
      expect(request.pathname).not.toContain("*");
      expect(request.directive).toBe("connect-src");
      expect(request.purpose.length).toBeGreaterThan(0);
    }
  });

  it("recognizes only the matching CSP console error", () => {
    expect(
      isIntentionallyBlockedOptionalCspConsoleError(
        `Connecting to 'https://csi.gstatic.com/csi?v=2&s=pagead&action=csi_pagead' violates the following Content Security Policy directive: "connect-src 'self'".`,
      ),
    ).toBe(true);
    expect(
      isIntentionallyBlockedOptionalCspConsoleError(
        `Connecting to 'https://unexpected.example/collect' violates the following Content Security Policy directive: "connect-src 'self'".`,
      ),
    ).toBe(false);
    expect(
      isIntentionallyBlockedOptionalCspConsoleError(
        "A normal third-party console error mentioning https://csi.gstatic.com/csi",
      ),
    ).toBe(false);
  });
});
