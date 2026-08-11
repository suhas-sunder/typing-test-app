import { describe, expect, it } from "vitest";
import { resolveAdRuntimeMode } from "@/lib/ads/config";
import {
  ADSENSE_CSP_SOURCES,
  buildContentSecurityPolicy,
  buildSecurityHeaders,
  isLiveAdvertisingEnvironment,
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
  });

  it("matches the application's explicit production live-ad opt-in", () => {
    const cases = [
      {
        configuredMode: undefined,
        deploymentContext: "production",
        nodeEnv: "production",
      },
      {
        configuredMode: "live",
        deploymentContext: "deploy-preview",
        nodeEnv: "production",
      },
      {
        configuredMode: "live",
        deploymentContext: "production",
        nodeEnv: "development",
      },
      {
        configuredMode: "live",
        deploymentContext: "production",
        nodeEnv: "production",
      },
      {
        configuredMode: "placeholder",
        deploymentContext: "production",
        nodeEnv: "production",
      },
    ] as const;

    for (const options of cases) {
      expect(isLiveAdvertisingEnvironment(options)).toBe(
        resolveAdRuntimeMode(options) === "live",
      );
    }
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

  it("emits the chosen baseline headers and a scoped HSTS commitment", () => {
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
    expect(production.get("strict-transport-security")).toBe(
      "max-age=31536000",
    );
    expect(production.get("strict-transport-security")).not.toMatch(
      /includeSubDomains|preload/i,
    );
    expect(development.has("strict-transport-security")).toBe(false);
  });
});
