import type { Metadata } from "next";
import { InfoPage } from "@/components/info/info-page";
import { PageFrame } from "@/components/page-frame";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/cookies",
  title: "Cookie Policy | Free Typing Camp",
  description: "Learn how Free Typing Camp uses localStorage and how AdSense may use cookies or similar storage under configured consent choices.",
});

export default function CookiesPage() {
  return (
    <PageFrame routeFamily="trust"><InfoPage
      eyebrow="Free Typing Camp cookies"
      title="Cookie Policy"
      intro="Last updated July 18, 2026. This page explains browser-local progress and advertising storage. It requires human legal review before launch."
      sections={[
        {
          title: "Cookies and similar technologies",
          body: [
            "Cookies are small files stored by your browser. Free Typing Camp uses localStorage for browser-local practice progress, achievements, themes, and settings.",
            "When production advertising is enabled, Google AdSense may use cookies or similar browser storage according to consent choices, publisher configuration, Google's policies, and applicable requirements.",
          ],
        },
        {
          title: "Local progress",
          body: [
            "The app uses browser storage after meaningful completed activities so tests, lessons, and Calculator Sprint progress can appear on the local progress page.",
            "Clearing browser storage may remove local progress. Other devices do not automatically receive a copy.",
          ],
        },
        {
          title: "Analytics and third-party services",
          body: [
            "Advertising or security services may use cookies or similar technologies to prevent abuse, show ads, measure delivery, or limit repeated ads. Those providers may process information under their own policies.",
            "Advertising storage is separate from local typing performance. The application does not send typed passages or local progress to AdSense for custom targeting.",
          ],
        },
        {
          title: "Managing cookies",
          body: [
            "You can manage or block cookies through your browser settings. Browser settings usually also let you clear localStorage and other site data. Local progress may not be saved if storage is disabled.",
            "Where applicable, the configured consent management platform must provide a way to make and revisit advertising or privacy choices. That external production setup must be verified before live ads are enabled.",
          ],
        },
        {
          title: "Contact",
          body: ["Questions about this policy can be sent to support@freetypingcamp.com."],
        },
      ]}
    /></PageFrame>
  );
}
