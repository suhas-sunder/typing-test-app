import type { Metadata } from "next";
import { InfoPage } from "@/components/info/info-page";
import { PageFrame } from "@/components/page-frame";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ path: "/accessibility", title: "Accessibility | Free Typing Camp", description: "Read the current keyboard, touch, focus, motion, and assistive-technology approach and how to report an accessibility barrier." });

export default function AccessibilityPage() {
  return <PageFrame routeFamily="trust"><InfoPage eyebrow="Accessibility" title="Typing practice should remain usable by keyboard, touch, and assistive technology." intro="Free Typing Camp is built around real keyboard input, visible focus, readable text, restrained motion, and feedback that does not rely on colour alone. This is a description of current work, not a claim of formal WCAG certification." sections={[{ title: "Current approach", bullets: ["Typing controls remain keyboard operable and the hidden typing target has an accessible label.", "Correct and incorrect input use position and text treatment as well as colour.", "Layouts are checked at narrow, tablet, desktop, and wide-screen widths.", "The compact keyboard provides content-specific symbol layers and contextual Shift controls with text labels and pressed states.", "Local progress works without personal profile data."] }, { title: "Known limits", body: ["The current lesson content is English-only, and composition input is protected from double counting rather than presented as complete multilingual support. Software-keyboard behavior can vary by mobile browser and device. Real screen-reader and mobile-device checks remain part of the launch checklist."] }, { title: "Report a barrier", body: ["Email support@freetypingcamp.com or use the Contact page. Include the page, browser, device, input method, and action that was difficult."] }]} /></PageFrame>;
}
