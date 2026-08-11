import {
  CANONICAL_PRODUCTION_HOSTNAME,
  STRICT_TRANSPORT_SECURITY_HEADER,
  buildSecurityHeaders,
} from "./lib/security/headers.mjs";

const environment =
  process.env.NODE_ENV === "development" ? "development" : "production";
const advertising = environment === "production" ? "live" : "restricted";

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
        headers: buildSecurityHeaders({
          advertising,
          environment,
          includeStrictTransportSecurity: false,
        }),
      },
      ...(environment === "production"
        ? [
            {
              source: "/:path*",
              has: [{ type: "host", value: CANONICAL_PRODUCTION_HOSTNAME }],
              headers: [STRICT_TRANSPORT_SECURITY_HEADER],
            },
          ]
        : []),
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
