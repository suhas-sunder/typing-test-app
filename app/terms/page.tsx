import type { Metadata } from "next";
import { InfoPage } from "@/components/info/info-page";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read the Free Typing Camp terms of use for typing lessons, practice tools, local progress, and site content.",
};

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Free Typing Camp terms"
      title="Terms of Use"
      intro="Last updated July 16, 2026. These terms apply when you use Free Typing Camp pages, typing tools, lessons, games, local progress, and related content."
      sections={[
        {
          title: "Educational and practice purpose",
          body: [
            "Free Typing Camp is intended as an educational typing practice site. It provides lessons, tests, games, and progress feedback, but it does not guarantee a specific learning outcome.",
          ],
        },
        {
          title: "Acceptable use",
          body: [
            "Use the site lawfully and respectfully. Do not try to disrupt the service, misuse automated access, probe systems without permission, or use the tools in a way that harms others.",
          ],
        },
        {
          title: "Your local typing data",
          body: [
            "Progress is stored in the browser on the device you use and may be removed when browser data is cleared. Do not enter sensitive personal information into typing prompts.",
          ],
        },
        {
          title: "Accuracy of results",
          body: [
            "Typing metrics, lesson feedback, weak-key summaries, and progress labels are provided to support practice. They may contain mistakes and should be treated as learning guidance rather than formal assessment.",
          ],
        },
        {
          title: "No warranties",
          body: [
            "Free Typing Camp is provided as is and as available. The site may change, break, be unavailable, or contain mistakes. We do not promise that every feature will always be available or fit every classroom or learner.",
          ],
        },
        {
          title: "Limitation of liability",
          body: [
            "To the extent allowed by law, Free Typing Camp and its operators are not responsible for indirect, incidental, special, consequential, or punitive damages that may result from using or being unable to use the site.",
          ],
        },
        {
          title: "Contact",
          body: ["Concerns about these terms can be sent to support@freetypingcamp.com."],
        },
      ]}
    />
  );
}
