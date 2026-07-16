import type { Metadata } from "next";
import { InfoPage } from "@/components/info/info-page";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = { title: "Accessibility", description: "Read the current accessibility approach and how to report a barrier in Free Typing Camp.", alternates: { canonical: "/accessibility" } };

export default function AccessibilityPage() {
  return <PageFrame><InfoPage eyebrow="Accessibility" title="Typing practice should remain usable by keyboard, touch, and assistive technology." intro="Free Typing Camp is built around real keyboard input, visible focus, readable text, restrained motion, and feedback that does not rely on colour alone." sections={[{ title: "Current approach", bullets: ["Typing controls remain keyboard operable and the hidden typing target has an accessible label.", "Correct and incorrect input use position and text treatment as well as colour.", "Layouts are checked at narrow, tablet, desktop, and wide-screen widths.", "Local progress works without personal profile data."] }, { title: "Known limits", body: ["The current lesson content is English-only, and composition input is protected from double counting rather than presented as complete multilingual support. Software-keyboard behavior can vary by mobile browser and device."] }, { title: "Report a barrier", body: ["Use the Contact page to describe the page, browser, device, input method, and the action that was difficult. Accessibility reports are useful product feedback."] }]} /></PageFrame>;
}
