"use client";

import { createContext, useContext, useEffect } from "react";
import {
  ADSENSE_LOADER_ID,
  ADSENSE_LOADER_URL,
  type AdPlaceholderState,
  type AdRouteFamily,
  type AdRuntimeMode,
  routeHasAdvertisements,
} from "@/lib/ads/config";

type AdsByGoogleWindow = Window & { adsbygoogle?: Array<Record<string, never>> };

type AdRuntimeContextValue = {
  mode: AdRuntimeMode;
  placeholderState: AdPlaceholderState;
  routeFamily: AdRouteFamily;
};

const AdRuntimeContext = createContext<AdRuntimeContextValue | null>(null);

export function AdRuntimeProvider({
  children,
  mode,
  placeholderState,
  routeFamily,
}: AdRuntimeContextValue & { children: React.ReactNode }) {
  return (
    <AdRuntimeContext.Provider value={{ mode, placeholderState, routeFamily }}>
      <AdSenseLoader />
      {children}
    </AdRuntimeContext.Provider>
  );
}

export function useAdRuntime() {
  const value = useContext(AdRuntimeContext);
  if (!value) throw new Error("Ad components must be rendered inside AdRuntimeProvider.");
  return value;
}

function AdSenseLoader() {
  const { mode, routeFamily } = useAdRuntime();

  useEffect(() => {
    if (mode !== "live" || !routeHasAdvertisements(routeFamily)) return;
    if (document.getElementById(ADSENSE_LOADER_ID)) return;

    const script = document.createElement("script");
    script.id = ADSENSE_LOADER_ID;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = ADSENSE_LOADER_URL;
    script.dataset.owner = "free-typing-camp";
    script.addEventListener("error", () => {
      script.dataset.loadState = "blocked";
    }, { once: true });
    script.addEventListener("load", () => {
      script.dataset.loadState = "loaded";
    }, { once: true });
    document.head.appendChild(script);
  }, [mode, routeFamily]);

  return null;
}

export function initializeAdUnit(element: HTMLElement, mode: AdRuntimeMode) {
  if (mode !== "live" || element.dataset.ftcAdInitialized === "true") return false;
  if (element.getClientRects().length === 0 || element.offsetWidth === 0 || element.offsetHeight === 0) return false;

  element.style.width = `${element.offsetWidth}px`;
  element.style.height = `${element.offsetHeight}px`;
  element.dataset.ftcAdInitialized = "true";

  try {
    const adWindow = window as AdsByGoogleWindow;
    adWindow.adsbygoogle = adWindow.adsbygoogle ?? [];
    adWindow.adsbygoogle.push({});
    return true;
  } catch {
    element.dataset.ftcAdInitialized = "failed";
    return false;
  }
}

