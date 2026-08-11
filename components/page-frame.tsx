import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { AdPlacement, AdSidebarPair } from "@/components/ads/ad-placement";
import { AdRuntimeProvider } from "@/components/ads/ad-runtime";
import type { AdRouteFamily } from "@/lib/ads/config";

export function PageFrame({ children, routeFamily }: { children: React.ReactNode; routeFamily: AdRouteFamily }) {
  const integratesFrameAds = routeFamily === "home";

  return (
    <AdRuntimeProvider placeholderState="placeholder" routeFamily={routeFamily}>
      <SiteNav />
      {integratesFrameAds ? null : <AdPlacement placement="above_header" />}
      <div className="relative">
        <AdSidebarPair />
        <main className="relative z-10">
          {children}
          {integratesFrameAds ? null : <AdPlacement placement="bottom_page" />}
        </main>
      </div>
      <SiteFooter />
    </AdRuntimeProvider>
  );
}
