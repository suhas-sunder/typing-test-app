import type { Metadata } from "next";
import { InfoPage } from "@/components/info/info-page";
import { PageFrame } from "@/components/page-frame";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/privacy",
  title: "Privacy Policy | Free Typing Camp",
  description: "Read how Free Typing Camp handles browser-local progress, support email, advertising technology, and consent choices.",
});

export default function PrivacyPage() {
  return (
    <PageFrame routeFamily="trust"><InfoPage
      eyebrow="Free Typing Camp privacy"
      title="Privacy Policy"
      intro="Last updated July 18, 2026. This page describes the current Free Typing Camp app in plain language. It requires human legal review before launch."
      sections={[
        {
          title: "What Free Typing Camp does",
          body: [
            "Free Typing Camp provides typing tests, lessons, focused practice, Calculator Sprint, and progress stored locally in the browser on the current device.",
          ],
        },
        {
          title: "Information you provide",
          bullets: [
            "Typing performance such as WPM, accuracy, aggregate mistake counts, lesson attempts, and completion results stored on this device.",
            "Messages you send by email for support, correction requests, or accessibility feedback.",
          ],
        },
        {
      title: "Browser storage and local progress",
          body: [
            "No account is required. The app uses localStorage to keep completed practice results, achievements, selected themes, and settings in this browser on this device. Clearing browser data may remove that progress.",
            "Local progress remains on the current device unless browser or third-party tools copy that browser data.",
            "Typed passages and chronological key histories are not sent to the Free Typing Camp application server or stored in local progress.",
          ],
        },
        {
          title: "Advertising technology and consent",
          body: [
            "Eligible public content pages may load Google AdSense when advertising is explicitly enabled for production. AdSense may use cookies or other browser storage according to the site owner's consent configuration, Google's policies, and applicable requirements.",
            "Advertising technology is separate from local typing progress. Free Typing Camp does not use local WPM, accuracy, lesson results, typed passages, or problem-key summaries for custom ad targeting.",
            "Where required, visitors must be able to make and revisit advertising or privacy choices through the Google-certified consent management platform configured by the site owner.",
          ],
        },
        {
          title: "Children and classroom use",
          body: [
            "Free Typing Camp is intended to be simple enough for student practice. Parents, teachers, and tutors should decide how browser-local progress is managed on shared devices.",
            "Students should avoid entering sensitive personal information into typing prompts or support messages.",
          ],
        },
        {
          title: "Contact",
          body: ["Privacy questions can be sent to support@freetypingcamp.com."],
        },
      ]}
    /></PageFrame>
  );
}
