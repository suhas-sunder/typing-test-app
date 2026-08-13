import { describe, expect, it } from "vitest";
import {
  ADSENSE_CSP_SOURCES,
  buildRequestSecurityHeaders,
  buildContentSecurityPolicy,
  buildSecurityHeaders,
  shouldApplyStrictTransportSecurity,
} from "@/lib/security/headers.mjs";

function parsePolicy(policy: string) {
  return new Map(
    policy.split(";").map((part) => {
      const [directive, ...sources] = part.trim().split(/\s+/);
      return [directive, sources] as const;
    }),
  );
}

function headerMap(environment: "development" | "production") {
  return new Map(
    buildSecurityHeaders({ environment }).map(({ key, value }) => [
      key.toLowerCase(),
      value,
    ]),
  );
}

describe("security policy", () => {
  it("uses a restrictive production baseline around the required inline Next runtime", () => {
    const policy = buildContentSecurityPolicy();
    const directives = parsePolicy(policy);

    expect(directives.get("default-src")).toEqual(["'self'"]);
    expect(directives.get("script-src")).toEqual(["'self'", "'unsafe-inline'"]);
    expect(directives.get("script-src-attr")).toEqual(["'none'"]);
    expect(directives.get("style-src-elem")).toEqual(["'self'"]);
    expect(directives.get("style-src-attr")).toEqual(["'unsafe-inline'"]);
    expect(directives.get("object-src")).toEqual(["'none'"]);
    expect(directives.get("frame-ancestors")).toEqual(["'none'"]);
    expect(directives.get("frame-src")).toEqual(["'none'"]);
    expect(directives.get("worker-src")).toEqual(["'none'"]);
    expect(directives.get("img-src")).toEqual(["'self'"]);
    expect(directives.get("base-uri")).toEqual(["'self'"]);
    expect(directives.get("form-action")).toEqual(["'self'"]);
    expect(directives.has("upgrade-insecure-requests")).toBe(true);
    expect(policy).not.toContain("'unsafe-eval'");
    expect(policy).not.toContain("*");
  });

  it("keeps placeholder and off-style policy closed to ads and analytics", () => {
    const policy = buildContentSecurityPolicy({
      advertising: "restricted",
      environment: "production",
    });
    for (const origin of Object.values(ADSENSE_CSP_SOURCES).flat()) {
      expect(policy).not.toContain(origin);
    }
    expect(policy).not.toMatch(/posthog|analytics/i);
  });

  it("opens only the centralized AdSense origins in explicit live mode", () => {
    const directives = parsePolicy(
      buildContentSecurityPolicy({
        advertising: "live",
        environment: "production",
      }),
    );

    ADSENSE_CSP_SOURCES.script.forEach((origin) =>
      expect(directives.get("script-src")).toContain(origin),
    );
    ADSENSE_CSP_SOURCES.connect.forEach((origin) =>
      expect(directives.get("connect-src")).toContain(origin),
    );
    ADSENSE_CSP_SOURCES.frame.forEach((origin) =>
      expect(directives.get("frame-src")).toContain(origin),
    );
    ADSENSE_CSP_SOURCES.image.forEach((origin) =>
      expect(directives.get("img-src")).toContain(origin),
    );
    ADSENSE_CSP_SOURCES.style.forEach((origin) =>
      expect(directives.get("style-src-elem")).toContain(origin),
    );
    ADSENSE_CSP_SOURCES.font.forEach((origin) =>
      expect(directives.get("font-src")).toContain(origin),
    );

    expect(directives.get("connect-src")).not.toContain(
      "https://fonts.googleapis.com",
    );
    expect(directives.get("connect-src")).not.toContain(
      "https://csi.gstatic.com",
    );
    expect(directives.get("style-src-elem")).toContain(
      "https://fonts.googleapis.com",
    );
  });

  it("keeps the proven AdSense origins in the repository-owned production policy", () => {
    const production = buildContentSecurityPolicy({
      advertising: "live",
      environment: "production",
    });
    const development = buildContentSecurityPolicy({
      advertising: "restricted",
      environment: "development",
    });
    expect(production).toContain("https://pagead2.googlesyndication.com");
    expect(development).not.toContain("googlesyndication.com");
  });

  it("permits development tooling without carrying eval into production", () => {
    const development = buildContentSecurityPolicy({
      environment: "development",
    });
    const production = buildContentSecurityPolicy({
      environment: "production",
    });
    expect(development).toContain("'unsafe-eval'");
    expect(development).toContain("style-src-elem 'self' 'unsafe-inline'");
    expect(development).not.toContain("upgrade-insecure-requests");
    expect(production).not.toContain("'unsafe-eval'");
  });

  it("emits the common headers without a host-blind HSTS commitment", () => {
    const production = headerMap("production");
    const development = headerMap("development");

    expect(production.get("content-security-policy")).toBeTruthy();
    expect(production.get("referrer-policy")).toBe(
      "strict-origin-when-cross-origin",
    );
    expect(production.get("x-content-type-options")).toBe("nosniff");
    expect(production.get("cross-origin-opener-policy")).toBe("same-origin");
    expect(production.get("cross-origin-resource-policy")).toBe("same-origin");
    expect(production.get("x-frame-options")).toBe("DENY");
    expect(production.get("permissions-policy")).toContain("camera=()");
    expect(production.has("strict-transport-security")).toBe(false);
    expect(development.has("strict-transport-security")).toBe(false);
  });

  it("limits request-aware HSTS to the canonical production hostname", () => {
    const canonical = new Map(
      buildRequestSecurityHeaders({
        environment: "production",
        hostname: "freetypingcamp.com",
      }).map(({ key, value }) => [key.toLowerCase(), value]),
    );
    const preview = new Map(
      buildRequestSecurityHeaders({
        environment: "production",
        hostname: "deploy-preview-123--freetypingcamp.netlify.app",
      }).map(({ key, value }) => [key.toLowerCase(), value]),
    );
    const localhost = new Map(
      buildRequestSecurityHeaders({
        environment: "development",
        hostname: "localhost",
      }).map(({ key, value }) => [key.toLowerCase(), value]),
    );

    expect(canonical.get("strict-transport-security")).toBe("max-age=31536000");
    expect(canonical.get("strict-transport-security")).not.toMatch(
      /includeSubDomains|preload/i,
    );
    expect(preview.has("strict-transport-security")).toBe(false);
    expect(localhost.has("strict-transport-security")).toBe(false);
    expect(preview.get("content-security-policy")).toContain(
      "default-src 'self'",
    );
    expect(localhost.get("content-security-policy")).toContain(
      "default-src 'self'",
    );

    expect(
      shouldApplyStrictTransportSecurity({
        environment: "production",
        hostname: "freetypingcamp.com",
      }),
    ).toBe(true);
    expect(
      shouldApplyStrictTransportSecurity({
        environment: "production",
        hostname: "www.freetypingcamp.com",
      }),
    ).toBe(false);
  });

  it("does not authorize wildcard, PostHog, or Cloudflare Analytics sources", () => {
    const policy = buildContentSecurityPolicy({
      advertising: "live",
      environment: "production",
    });

    expect(policy).not.toContain("*");
    expect(policy).not.toMatch(/posthog/i);
    expect(policy).not.toMatch(/cloudflareinsights|cloudflare\.com/i);
  });
});
