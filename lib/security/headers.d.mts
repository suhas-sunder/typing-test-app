export type SecurityEnvironment = "development" | "production";
export type SecurityAdvertisingMode = "live" | "restricted";

export type SecurityPolicyOptions = {
  advertising?: SecurityAdvertisingMode;
  environment?: SecurityEnvironment;
  includeStrictTransportSecurity?: boolean;
};

export type RequestSecurityPolicyOptions = Omit<
  SecurityPolicyOptions,
  "includeStrictTransportSecurity"
> & {
  hostname?: string;
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

export const CANONICAL_PRODUCTION_HOSTNAME: string;
export const STRICT_TRANSPORT_SECURITY_HEADER: Readonly<SecurityHeader>;

export function buildContentSecurityPolicy(
  options?: SecurityPolicyOptions,
): string;

export function buildSecurityHeaders(
  options?: SecurityPolicyOptions,
): SecurityHeader[];

export function shouldApplyStrictTransportSecurity(
  options?: Pick<RequestSecurityPolicyOptions, "environment" | "hostname">,
): boolean;

export function buildRequestSecurityHeaders(
  options?: RequestSecurityPolicyOptions,
): SecurityHeader[];
