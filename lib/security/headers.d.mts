export type SecurityEnvironment = "development" | "production";
export type SecurityAdvertisingMode = "live" | "restricted";

export type SecurityPolicyOptions = {
  advertising?: SecurityAdvertisingMode;
  environment?: SecurityEnvironment;
};

export type SecurityHeader = { key: string; value: string };

export const ADSENSE_CSP_SOURCES: Readonly<{
  connect: readonly string[];
  font: readonly string[];
  frame: readonly string[];
  image: readonly string[];
  script: readonly string[];
  style: readonly string[];
}>;

export function buildContentSecurityPolicy(
  options?: SecurityPolicyOptions,
): string;

export function buildSecurityHeaders(
  options?: SecurityPolicyOptions,
): SecurityHeader[];
