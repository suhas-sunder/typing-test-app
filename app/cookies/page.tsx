import type { Metadata } from "next";
import { InfoPage } from "@/components/info/info-page";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Learn how Free Typing Camp may use cookies, localStorage, and similar browser technologies.",
};

export default function CookiesPage() {
  return (
    <InfoPage
      eyebrow="Free Typing Camp cookies"
      title="Cookie Policy"
      intro="Last updated July 16, 2026. This page explains how Free Typing Camp uses localStorage and may use other browser technologies."
      sections={[
        {
          title: "Cookies and similar technologies",
          body: [
            "Cookies are small files stored by your browser. Free Typing Camp currently uses localStorage for browser-local practice progress.",
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
            "Analytics, performance, advertising, or security services may use cookies or similar technologies to measure usage, improve reliability, prevent abuse, show ads, or limit repeated ads. Those providers may process information under their own policies.",
          ],
        },
        {
          title: "Managing cookies",
          body: [
            "You can manage or block cookies through your browser settings. Browser settings usually also let you clear localStorage and other site data. Local progress may not be saved if storage is disabled.",
          ],
        },
        {
          title: "Contact",
          body: ["Questions about this policy can be sent to support@freetypingcamp.com."],
        },
      ]}
    />
  );
}
