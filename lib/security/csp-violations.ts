export type CspViolation = {
  blockedUri: string;
  effectiveDirective: string;
};

type IntentionallyBlockedRequest = {
  directive: "connect-src";
  hostname: string;
  pathname: string;
  purpose: string;
};

/**
 * Optional third-party requests that production evidence showed can remain
 * blocked without affecting FTC or live ad delivery. This is deliberately
 * narrower than an origin allowlist: directive, hostname, and path must match.
 */
export const INTENTIONALLY_BLOCKED_OPTIONAL_REQUESTS = Object.freeze([
  Object.freeze({
    directive: "connect-src",
    hostname: "fonts.googleapis.com",
    pathname: "/css",
    purpose:
      "Optional AdSense font stylesheet fetch; actual stylesheet loading is separately constrained by style-src-elem.",
  }),
  Object.freeze({
    directive: "connect-src",
    hostname: "csi.gstatic.com",
    pathname: "/csi",
    purpose:
      "Optional Google client-side timing instrumentation for AdSense.",
  }),
] satisfies readonly IntentionallyBlockedRequest[]);

export function isIntentionallyBlockedOptionalCspViolation(
  violation: CspViolation,
) {
  if (violation.effectiveDirective !== "connect-src") {
    return false;
  }

  let blockedUrl: URL;
  try {
    blockedUrl = new URL(violation.blockedUri);
  } catch {
    return false;
  }

  return INTENTIONALLY_BLOCKED_OPTIONAL_REQUESTS.some(
    ({ directive, hostname, pathname }) =>
      directive === violation.effectiveDirective &&
      blockedUrl.protocol === "https:" &&
      blockedUrl.hostname === hostname &&
      (blockedUrl.pathname === pathname ||
        // Browsers may redact a cross-origin blocked URI to its origin in the
        // SecurityPolicyViolationEvent while retaining the full URL in the
        // corresponding console message.
        (blockedUrl.pathname === "/" && !blockedUrl.search)),
  );
}

export function isIntentionallyBlockedOptionalCspConsoleError(
  message: string,
) {
  if (
    !message.includes("Content Security Policy") ||
    !message.includes("connect-src")
  ) {
    return false;
  }

  const blockedUri = message.match(/https:\/\/[^'\"\s]+/)?.[0];
  return Boolean(
    blockedUri &&
      isIntentionallyBlockedOptionalCspViolation({
        blockedUri,
        effectiveDirective: "connect-src",
      }),
  );
}
