import type { Metadata } from "next";
import { InfoPage } from "@/components/info/info-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Free Typing Camp privacy policy for typing practice data and browser storage.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Free Typing Camp privacy"
      title="Privacy Policy"
      intro="Last updated July 16, 2026. This page describes the current Free Typing Camp app in plain language and may be updated as features change."
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
            "Typing practice data such as WPM, accuracy, mistake counts, lesson attempts, and completion results stored on this device.",
            "Messages you send by email for support, correction requests, or accessibility feedback.",
          ],
        },
        {
      title: "Browser storage and local progress",
          body: [
            "The app uses localStorage to keep completed practice results in this browser on this device. Clearing browser data may remove that progress.",
            "Local progress remains on the current device unless browser or third-party tools copy that browser data.",
          ],
        },
        {
          title: "Analytics, performance, and ads",
          body: [
            "Free Typing Camp may use analytics or performance tools to understand site usage, improve reliability, and detect issues. These tools should not be used to turn raw typing prompts or learner answers into a product.",
            "If ads or third-party services are added, those providers may use cookies or similar technologies under their own policies.",
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
    />
  );
}
