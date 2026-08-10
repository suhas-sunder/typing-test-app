import {
  buildSecurityHeaders,
  isLiveAdvertisingEnvironment,
} from "./lib/security/headers.mjs";

const environment =
  process.env.NODE_ENV === "development" ? "development" : "production";
const advertising = isLiveAdvertisingEnvironment({
  configuredMode: process.env.FTC_ADSENSE_MODE,
  deploymentContext: process.env.FTC_DEPLOYMENT_CONTEXT,
  nodeEnv: process.env.NODE_ENV,
})
  ? "live"
  : "restricted";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
