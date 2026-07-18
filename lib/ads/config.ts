export const ADSENSE_PUBLISHER_ID = "ca-pub-4810616735714570" as const;
export const ADSENSE_SELLER_ID = "pub-4810616735714570" as const;
export const ADSENSE_LOADER_ID = "ftc-adsense-loader" as const;
export const ADSENSE_LOADER_URL =
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}` as const;

export const AD_SLOT_IDS = {
  above_header: "9403252845",
  below_header_or_tool: "4805532285",
  sidebar_left: "2837844497",
  sidebar_right: "6486967973",
  main_content_rectangle: "1370372660",
  bottom_page: "5324407034",
} as const;

export type AdPlacementId = keyof typeof AD_SLOT_IDS;
export type AdRuntimeMode = "live" | "placeholder" | "off";
export type AdPlaceholderState = "placeholder" | "filled" | "unfilled" | "blocked";
export type AdShape = "fixed" | "horizontal" | "vertical" | "rectangle";

export type AdReservation = {
  minViewportWidth: number;
  width: number;
  height: number;
};

export type AdPlacementDefinition = {
  id: AdPlacementId;
  slotId: (typeof AD_SLOT_IDS)[AdPlacementId];
  shape: AdShape;
  responsive: boolean;
  reservations: readonly AdReservation[];
  placeholderLabel: "Advertisement";
  suppressionRules: readonly string[];
};

const HORIZONTAL_RESERVATIONS = [
  { minViewportWidth: 360, width: 320, height: 100 },
  { minViewportWidth: 540, width: 468, height: 60 },
  { minViewportWidth: 900, width: 728, height: 90 },
] as const;

const SIDEBAR_RESERVATIONS = [
  { minViewportWidth: 1712, width: 160, height: 600 },
  { minViewportWidth: 2048, width: 300, height: 600 },
] as const;

export const AD_PLACEMENTS: Record<AdPlacementId, AdPlacementDefinition> = {
  above_header: {
    id: "above_header",
    slotId: AD_SLOT_IDS.above_header,
    shape: "fixed",
    responsive: false,
    reservations: [{ minViewportWidth: 800, width: 728, height: 90 }],
    placeholderLabel: "Advertisement",
    suppressionRules: ["viewport below 800px", "suppressed route family"],
  },
  below_header_or_tool: {
    id: "below_header_or_tool",
    slotId: AD_SLOT_IDS.below_header_or_tool,
    shape: "horizontal",
    responsive: true,
    reservations: HORIZONTAL_RESERVATIONS,
    placeholderLabel: "Advertisement",
    suppressionRules: ["viewport below 360px", "suppressed route family", "never inside an interactive tool"],
  },
  sidebar_left: {
    id: "sidebar_left",
    slotId: AD_SLOT_IDS.sidebar_left,
    shape: "vertical",
    responsive: true,
    reservations: SIDEBAR_RESERVATIONS,
    placeholderLabel: "Advertisement",
    suppressionRules: ["both rails do not fit", "suppressed route family"],
  },
  sidebar_right: {
    id: "sidebar_right",
    slotId: AD_SLOT_IDS.sidebar_right,
    shape: "vertical",
    responsive: true,
    reservations: SIDEBAR_RESERVATIONS,
    placeholderLabel: "Advertisement",
    suppressionRules: ["both rails do not fit", "suppressed route family"],
  },
  main_content_rectangle: {
    id: "main_content_rectangle",
    slotId: AD_SLOT_IDS.main_content_rectangle,
    shape: "rectangle",
    responsive: false,
    reservations: [{ minViewportWidth: 340, width: 300, height: 250 }],
    placeholderLabel: "Advertisement",
    suppressionRules: ["thin content", "interactive controls", "suppressed route family"],
  },
  bottom_page: {
    id: "bottom_page",
    slotId: AD_SLOT_IDS.bottom_page,
    shape: "horizontal",
    responsive: true,
    reservations: HORIZONTAL_RESERVATIONS,
    placeholderLabel: "Advertisement",
    suppressionRules: ["viewport below 360px", "thin content", "suppressed route family"],
  },
};

export type AdRouteFamily =
  | "home"
  | "typing_test"
  | "lesson_runner"
  | "lessons_hub"
  | "practice_hub"
  | "focused_practice"
  | "calculator"
  | "learn"
  | "progress"
  | "about"
  | "trust"
  | "utility"
  | "error";

export type AdRoutePolicy = {
  placements: readonly AdPlacementId[];
  reason: string;
};

const FULL_CONTENT_INVENTORY = [
  "above_header",
  "below_header_or_tool",
  "sidebar_left",
  "sidebar_right",
  "bottom_page",
] as const satisfies readonly AdPlacementId[];

export const ROUTE_AD_POLICIES: Record<AdRouteFamily, AdRoutePolicy> = {
  home: { placements: FULL_CONTENT_INVENTORY, reason: "Substantive public product overview." },
  typing_test: { placements: FULL_CONTENT_INVENTORY, reason: "Static placements remain outside the complete typing tool." },
  lesson_runner: {
    placements: ["above_header", "sidebar_left", "sidebar_right", "below_header_or_tool", "bottom_page"],
    reason: "Lessons use a restrained inventory after the complete staged experience.",
  },
  lessons_hub: { placements: FULL_CONTENT_INVENTORY, reason: "Substantive curriculum and skill guidance." },
  practice_hub: { placements: FULL_CONTENT_INVENTORY, reason: "Substantive focused-practice overview." },
  focused_practice: { placements: FULL_CONTENT_INVENTORY, reason: "Static placements remain outside the complete practice tool." },
  calculator: { placements: FULL_CONTENT_INVENTORY, reason: "Static placements remain physically separated from gameplay." },
  learn: { placements: FULL_CONTENT_INVENTORY, reason: "Substantive long-form typing guidance." },
  progress: { placements: [], reason: "Browser-local personal progress and customization stay ad-free." },
  about: { placements: [], reason: "About remains a restrained, ad-free trust page." },
  trust: { placements: [], reason: "Contact, privacy, terms, cookies, and accessibility stay ad-free." },
  utility: { placements: [], reason: "No ads on utility or noindex routes." },
  error: { placements: [], reason: "No ads on error, invalid, or redirect responses." },
};

export function routeAllowsPlacement(routeFamily: AdRouteFamily, placement: AdPlacementId) {
  return ROUTE_AD_POLICIES[routeFamily].placements.includes(placement);
}

export function routeHasAdvertisements(routeFamily: AdRouteFamily) {
  return ROUTE_AD_POLICIES[routeFamily].placements.length > 0;
}

export function resolveAdRuntimeMode({
  configuredMode,
  deploymentContext,
  nodeEnv,
}: {
  configuredMode: string | undefined;
  deploymentContext: string | undefined;
  nodeEnv: string | undefined;
}): AdRuntimeMode {
  if (nodeEnv === "test") return "off";
  if (configuredMode === "off") return "off";
  if (configuredMode === "placeholder") return "placeholder";
  if (configuredMode !== undefined && configuredMode !== "" && configuredMode !== "live") return "off";

  const isProductionDeployment = nodeEnv === "production" && deploymentContext === "production";
  if (configuredMode === "live") return isProductionDeployment ? "live" : "placeholder";
  return isProductionDeployment ? "live" : "placeholder";
}

export function resolvePlaceholderState(value: string | undefined): AdPlaceholderState {
  return value === "filled" || value === "unfilled" || value === "blocked" || value === "placeholder" ? value : "placeholder";
}

