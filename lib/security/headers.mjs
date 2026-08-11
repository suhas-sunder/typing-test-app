export const ADSENSE_CSP_SOURCES = Object.freeze({
  connect: Object.freeze([
    "https://pagead2.googlesyndication.com",
    "https://googleads.g.doubleclick.net",
    "https://ep1.adtrafficquality.google",
  ]),
  font: Object.freeze(["https://fonts.gstatic.com"]),
  frame: Object.freeze([
    "https://googleads.g.doubleclick.net",
    "https://tpc.googlesyndication.com",
  ]),
  image: Object.freeze([
    "https://pagead2.googlesyndication.com",
    "https://googleads.g.doubleclick.net",
    "https://tpc.googlesyndication.com",
  ]),
  script: Object.freeze([
    "https://pagead2.googlesyndication.com",
    "https://fundingchoicesmessages.google.com",
  ]),
  style: Object.freeze(["https://fonts.googleapis.com"]),
});

const POSTHOG_ORIGINS = ["posthog.com", "posthogusercontent.com"];

export function isLiveAdvertisingEnvironment({
  configuredMode,
  deploymentContext,
  nodeEnv,
}) {
  return (
    nodeEnv === "production" &&
    deploymentContext === "production" &&
    configuredMode === "live"
  );
}

export function buildContentSecurityPolicy({
  advertising = "restricted",
  environment = "production",
} = {}) {
  const development = environment === "development";
  const liveAdvertising = advertising === "live";
  const directives = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "'unsafe-inline'",
      ...(development ? ["'unsafe-eval'"] : []),
      ...(liveAdvertising ? ADSENSE_CSP_SOURCES.script : []),
    ],
    "script-src-attr": ["'none'"],
    "style-src": ["'self'", "'unsafe-inline'"],
    "style-src-elem": [
      "'self'",
      ...(development ? ["'unsafe-inline'"] : []),
      ...(liveAdvertising ? ADSENSE_CSP_SOURCES.style : []),
    ],
    "style-src-attr": ["'unsafe-inline'"],
    "img-src": [
      "'self'",
      ...(liveAdvertising ? ADSENSE_CSP_SOURCES.image : []),
    ],
    "font-src": [
      "'self'",
      ...(liveAdvertising ? ADSENSE_CSP_SOURCES.font : []),
    ],
    "connect-src": [
      "'self'",
      ...(liveAdvertising ? ADSENSE_CSP_SOURCES.connect : []),
    ],
    "frame-src": liveAdvertising ? ADSENSE_CSP_SOURCES.frame : ["'none'"],
    "frame-ancestors": ["'none'"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "manifest-src": ["'self'"],
    "worker-src": ["'none'"],
    ...(development ? {} : { "upgrade-insecure-requests": [] }),
  };

  const policy = Object.entries(directives)
    .map(([directive, sources]) =>
      sources.length > 0 ? `${directive} ${sources.join(" ")}` : directive,
    )
    .join("; ");

  if (policy.includes("*")) {
    throw new Error("Security policy must not contain wildcard sources.");
  }
  if (POSTHOG_ORIGINS.some((origin) => policy.includes(origin))) {
    throw new Error(
      "Analytics origins require a separate approved integration.",
    );
  }
  return policy;
}

export function buildSecurityHeaders({
  advertising = "restricted",
  environment = "production",
} = {}) {
  const headers = [
    {
      key: "Content-Security-Policy",
      value: buildContentSecurityPolicy({ advertising, environment }),
    },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    {
      key: "Permissions-Policy",
      value:
        "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
    { key: "X-Frame-Options", value: "DENY" },
  ];

  if (environment === "production") {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=31536000",
    });
  }
  return headers;
}
