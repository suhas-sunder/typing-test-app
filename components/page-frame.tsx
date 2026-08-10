import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { AdPlacement, AdSidebarPair } from "@/components/ads/ad-placement";
import { AdRuntimeProvider } from "@/components/ads/ad-runtime";
import { resolveAdRuntimeMode, resolvePlaceholderState, type AdRouteFamily } from "@/lib/ads/config";

export function PageFrame({ children, routeFamily }: { children: React.ReactNode; routeFamily: AdRouteFamily }) {
  const mode = resolveAdRuntimeMode({
    configuredMode: process.env.FTC_ADSENSE_MODE,
    deploymentContext: process.env.CONTEXT ?? process.env.FTC_DEPLOYMENT_CONTEXT,
    nodeEnv: process.env.NODE_ENV,
  });
  const placeholderState = resolvePlaceholderState(process.env.FTC_AD_PLACEHOLDER_STATE);

  return (
    <AdRuntimeProvider mode={mode} placeholderState={placeholderState} routeFamily={routeFamily}>
      <SiteNav />
      <AdPlacement placement="above_header" />
      <div className="relative">
        <AdSidebarPair />
        <main className="relative z-10">
          {children}
          <AdPlacement placement="bottom_page" />
        </main>
      </div>
      <SiteFooter />
    </AdRuntimeProvider>
  );
}
