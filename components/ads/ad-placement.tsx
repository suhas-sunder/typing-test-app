"use client";

import { useEffect, useRef, useState } from "react";
import { useAdRuntime, initializeAdUnit } from "@/components/ads/ad-runtime";
import {
  AD_PLACEMENTS,
  ADSENSE_PUBLISHER_ID,
  type AdPlacementId,
  routeAllowsPlacement,
} from "@/lib/ads/config";

export function AdPlacement({ placement }: { placement: Exclude<AdPlacementId, "sidebar_left" | "sidebar_right"> }) {
  const runtime = useAdRuntime();
  if (runtime.mode === "off" || !routeAllowsPlacement(runtime.routeFamily, placement)) return null;

  const placementClass = `ad-placement ad-placement--${placement}`;
  return (
    <section className={placementClass} data-ad-placement={placement} aria-label="Advertisement area">
      <AdReservation placement={placement} />
    </section>
  );
}

export function AdSidebarPair() {
  const runtime = useAdRuntime();
  const allowed = routeAllowsPlacement(runtime.routeFamily, "sidebar_left") && routeAllowsPlacement(runtime.routeFamily, "sidebar_right");
  if (runtime.mode === "off" || !allowed) return null;

  return (
    <div className="ad-sidebar-pair" data-ad-sidebar-pair>
      <aside className="ad-sidebar ad-sidebar--left" aria-label="Left advertisement area">
        <AdReservation placement="sidebar_left" />
      </aside>
      <aside className="ad-sidebar ad-sidebar--right" aria-label="Right advertisement area">
        <AdReservation placement="sidebar_right" />
      </aside>
    </div>
  );
}

function AdReservation({ placement }: { placement: AdPlacementId }) {
  const { mode, placeholderState } = useAdRuntime();
  const definition = AD_PLACEMENTS[placement];
  const adRef = useRef<HTMLModElement>(null);
  const [filled, setFilled] = useState(mode === "placeholder" && placeholderState === "filled");

  useEffect(() => {
    const element = adRef.current;
    if (!element) return;

    if (mode === "placeholder") {
      const isFilled = placeholderState === "filled";
      element.dataset.adStatus = isFilled ? "filled" : placeholderState === "unfilled" ? "unfilled" : "";
      setFilled(isFilled);
      return;
    }

    initializeAdUnit(element, mode);
    const update = () => setFilled(element.dataset.adStatus === "filled");
    update();
    const observer = new MutationObserver(update);
    observer.observe(element, { attributes: true, attributeFilter: ["data-ad-status"] });
    return () => observer.disconnect();
  }, [mode, placeholderState]);

  return (
    <div className={`ad-reservation ad-reservation--${placement}`} data-ad-reservation={placement}>
      <span className="ad-placeholder" aria-hidden="true" data-hidden={filled ? "true" : "false"}>
        {definition.placeholderLabel}
      </span>
      <ins
        ref={adRef}
        className="adsbygoogle ad-unit"
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={definition.slotId}
        data-ad-format={definition.shape === "fixed" ? undefined : definition.shape}
        data-adtest={mode === "live" ? undefined : "on"}
        data-placeholder-state={mode === "placeholder" ? placeholderState : undefined}
      />
    </div>
  );
}
