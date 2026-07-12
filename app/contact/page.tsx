import type { Metadata } from "next";
import { InfoPage } from "@/components/info/info-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Free Typing Camp for support, corrections, accessibility notes, and site questions.",
};

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Contact"
      title="Contact Free Typing Camp"
      intro="For support, corrections, accessibility issues, and site questions, email support@freetypingcamp.com."
      actions={[{ href: "mailto:support@freetypingcamp.com", label: "Email support" }]}
      sections={[
        {
          title: "What to send",
          bullets: [
            "Bug reports with the page URL, browser or device, and steps to reproduce.",
            "Typing lesson corrections or unclear instructions.",
            "Accessibility concerns, including keyboard navigation, contrast, screen reader issues, or motion concerns.",
            "Parent, teacher, or tutor feedback about progress reports, lesson pacing, and practice flow.",
            "General questions about Free Typing Camp pages and tools.",
          ],
        },
        {
          title: "What happens next",
          body: [
            "Email is the clearest way to reach the project right now. Include enough detail to make the first reply useful.",
            "Free Typing Camp does not currently provide phone support, live chat, emergency support, or district procurement support.",
          ],
        },
      ]}
    />
  );
}
