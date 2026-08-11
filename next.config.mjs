import {
  buildSecurityHeaders,
  isLiveAdvertisingEnvironment,
} from "./lib/security/headers.mjs";

const environment =
  process.env.NODE_ENV === "development" ? "development" : "production";
const configuredAdMode = process.env.FTC_ADSENSE_MODE;
const deploymentContext =
  process.env.FTC_DEPLOYMENT_CONTEXT ?? process.env.CONTEXT;
const advertising = isLiveAdvertisingEnvironment({
  configuredMode: configuredAdMode,
  deploymentContext,
  nodeEnv: process.env.NODE_ENV,
})
  ? "live"
  : "restricted";

const embeddedAdEnvironment = {
  ...(configuredAdMode === undefined
    ? {}
    : { FTC_ADSENSE_MODE: configuredAdMode }),
  ...(deploymentContext === undefined
    ? {}
    : { FTC_DEPLOYMENT_CONTEXT: deploymentContext }),
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: embeddedAdEnvironment,
  experimental: {
    cpus: 1,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: buildSecurityHeaders({ advertising, environment }),
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.freetypingcamp.com" }],
        destination: "https://freetypingcamp.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
