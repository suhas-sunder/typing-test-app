import type { Metadata } from "next";
import { InfoPage } from "@/components/info/info-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Free Typing Camp privacy policy for accounts, typing practice data, cookies, and browser storage.",
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Free Typing Camp privacy"
      title="Privacy Policy"
      intro="Last updated July 12, 2026. This page describes the current Free Typing Camp app in plain language and may be updated as features change."
      sections={[
        {
          title: "What Free Typing Camp does",
          body: [
            "Free Typing Camp provides typing tests, lessons, games, account sign-in, and progress-related features. Typing input may be processed in the browser and, when account features are used, sent to the app so progress can be saved.",
          ],
        },
        {
          title: "Information you provide",
          bullets: [
            "Account information such as name, email address, and password when you create an account.",
            "Typing practice data such as WPM, accuracy, mistake counts, lesson attempts, weak keys, and completion results.",
            "Messages you send by email for support, correction requests, or accessibility feedback.",
          ],
        },
        {
          title: "Browser storage and sessions",
          body: [
            "The app may store an authentication token in localStorage after sign-in so your browser can keep you signed in. Clearing browser storage or signing out removes that local session.",
            "Some practice settings or interface preferences may also be stored in the browser so the app feels consistent when you return.",
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
            "Free Typing Camp is intended to be simple enough for student practice, but parents, teachers, and tutors should decide whether account features are appropriate for their learners.",
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
