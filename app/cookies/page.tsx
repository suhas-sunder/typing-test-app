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
      intro="Last updated July 12, 2026. This page explains how Free Typing Camp may use cookies, localStorage, and similar browser technologies."
      sections={[
        {
          title: "Cookies and similar technologies",
          body: [
            "Cookies are small files stored by your browser. Free Typing Camp may also use localStorage, sessionStorage, IndexedDB, or similar technologies that store data in your browser.",
          ],
        },
        {
          title: "Preferences, sessions, and progress",
          body: [
            "The app may use browser storage to keep you signed in, remember local settings, preserve practice state, or support saved progress features.",
            "Clearing browser storage may sign you out or reset local preferences.",
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
            "You can manage or block cookies through your browser settings. Browser settings usually also let you clear localStorage and other site data. Some account or progress features may not work as expected if storage is disabled.",
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
