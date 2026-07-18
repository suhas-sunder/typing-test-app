import { describe, expect, it } from "vitest";
import {
  AD_PLACEMENTS,
  AD_SLOT_IDS,
  ADSENSE_LOADER_URL,
  ADSENSE_PUBLISHER_ID,
  ROUTE_AD_POLICIES,
  resolveAdRuntimeMode,
  resolvePlaceholderState,
  routeAllowsPlacement,
} from "@/lib/ads/config";

describe("central advertisement registry", () => {
  it("owns the exact publisher, loader, and six supplied slot IDs", () => {
    expect(ADSENSE_PUBLISHER_ID).toBe("ca-pub-4810616735714570");
    expect(ADSENSE_LOADER_URL).toBe(
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4810616735714570",
    );
    expect(AD_SLOT_IDS).toEqual({
      above_header: "9403252845",
      below_header_or_tool: "4805532285",
      sidebar_left: "2837844497",
      sidebar_right: "6486967973",
      main_content_rectangle: "1370372660",
      bottom_page: "5324407034",
    });
    expect(Object.keys(AD_PLACEMENTS)).toHaveLength(6);
  });

  it("defines a shape, reservations, placeholder, and suppression rules for every placement", () => {
    Object.values(AD_PLACEMENTS).forEach((placement) => {
      expect(["fixed", "horizontal", "vertical", "rectangle"]).toContain(placement.shape);
      expect(placement.reservations.length).toBeGreaterThan(0);
      expect(placement.reservations.every((size) => size.width > 0 && size.height > 0)).toBe(true);
      expect(placement.placeholderLabel).toBe("Advertisement");
      expect(placement.suppressionRules.length).toBeGreaterThan(0);
    });
  });

  it("keeps the above-header placement fixed at 728 by 90 without auto sizing", () => {
    expect(AD_PLACEMENTS.above_header).toMatchObject({
      shape: "fixed",
      responsive: false,
      reservations: [{ minViewportWidth: 800, width: 728, height: 90 }],
    });
  });

  it("defines horizontal mobile, tablet, and desktop reservations", () => {
    expect(AD_PLACEMENTS.below_header_or_tool.reservations).toEqual([
      { minViewportWidth: 360, width: 320, height: 100 },
      { minViewportWidth: 540, width: 468, height: 60 },
      { minViewportWidth: 900, width: 728, height: 90 },
    ]);
    expect(AD_PLACEMENTS.bottom_page.reservations).toEqual(AD_PLACEMENTS.below_header_or_tool.reservations);
    expect(AD_PLACEMENTS.below_header_or_tool.shape).toBe("horizontal");
    expect(AD_PLACEMENTS.bottom_page.shape).toBe("horizontal");
  });

  it("defines balanced 160 and 300 pixel vertical rails without changing the center", () => {
    expect(AD_PLACEMENTS.sidebar_left.reservations).toEqual([
      { minViewportWidth: 1712, width: 160, height: 600 },
      { minViewportWidth: 2048, width: 300, height: 600 },
    ]);
    expect(AD_PLACEMENTS.sidebar_right.reservations).toEqual(AD_PLACEMENTS.sidebar_left.reservations);
    expect(AD_PLACEMENTS.sidebar_left.shape).toBe("vertical");
    expect(AD_PLACEMENTS.sidebar_right.shape).toBe("vertical");
  });

  it("keeps the content unit a 300 by 250 rectangle", () => {
    expect(AD_PLACEMENTS.main_content_rectangle).toMatchObject({
      shape: "rectangle",
      responsive: false,
      reservations: [{ minViewportWidth: 340, width: 300, height: 250 }],
    });
  });
});

describe("advertisement runtime modes", () => {
  it("defaults local and preview environments to placeholders", () => {
    expect(resolveAdRuntimeMode({ configuredMode: undefined, deploymentContext: undefined, nodeEnv: "development" })).toBe("placeholder");
    expect(resolveAdRuntimeMode({ configuredMode: "live", deploymentContext: "deploy-preview", nodeEnv: "production" })).toBe("placeholder");
  });

  it("enables live ads only for an explicit production deployment", () => {
    expect(resolveAdRuntimeMode({ configuredMode: "live", deploymentContext: "production", nodeEnv: "production" })).toBe("live");
  });

  it("never enables live ads in automated tests and fails malformed values closed", () => {
    expect(resolveAdRuntimeMode({ configuredMode: "live", deploymentContext: "production", nodeEnv: "test" })).toBe("off");
    expect(resolveAdRuntimeMode({ configuredMode: "unexpected", deploymentContext: "production", nodeEnv: "production" })).toBe("off");
    expect(resolveAdRuntimeMode({ configuredMode: "off", deploymentContext: "production", nodeEnv: "production" })).toBe("off");
  });

  it("accepts only the documented placeholder simulations", () => {
    expect(resolvePlaceholderState("filled")).toBe("filled");
    expect(resolvePlaceholderState("unfilled")).toBe("unfilled");
    expect(resolvePlaceholderState("blocked")).toBe("blocked");
    expect(resolvePlaceholderState("other")).toBe("placeholder");
  });
});

describe("route-family policies", () => {
  it("gives substantive public families centralized eligible placements", () => {
    for (const family of ["home", "typing_test", "lessons_hub", "practice_hub", "focused_practice", "calculator", "learn"] as const) {
      expect(routeAllowsPlacement(family, "above_header")).toBe(true);
      expect(routeAllowsPlacement(family, "sidebar_left")).toBe(true);
      expect(routeAllowsPlacement(family, "sidebar_right")).toBe(true);
    }
  });

  it("keeps lesson runners restrained and keeps personal, trust, utility, and error routes ad-free", () => {
    expect(routeAllowsPlacement("lesson_runner", "below_header_or_tool")).toBe(true);
    expect(routeAllowsPlacement("lesson_runner", "main_content_rectangle")).toBe(false);
    for (const family of ["progress", "about", "trust", "utility", "error"] as const) {
      expect(ROUTE_AD_POLICIES[family].placements).toEqual([]);
    }
  });

  it("never permits only one rail", () => {
    Object.values(ROUTE_AD_POLICIES).forEach((policy) => {
      expect(policy.placements.includes("sidebar_left")).toBe(policy.placements.includes("sidebar_right"));
    });
  });
});

