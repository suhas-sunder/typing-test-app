import type { Metadata } from "next";
import { InfoPage } from "@/components/info/info-page";
import { PageFrame } from "@/components/page-frame";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: "About Free Typing Camp",
  description: "Learn about Free Typing Camp, a calm accuracy-first typing program for students, parents, teachers, and tutors.",
});

export default function AboutPage() {
  return (
    <PageFrame routeFamily="about"><InfoPage
      eyebrow="About Free Typing Camp"
      title="Calm typing practice students can actually stick with."
      intro="Free Typing Camp is built for short, focused practice sessions that reward accuracy, consistency, and steady progress before raw speed."
      actions={[
        { href: "/typing-test", label: "Start typing" },
        { href: "/lessons", label: "Browse lessons", variant: "secondary" },
      ]}
      sections={[
        {
          title: "What the site is for",
          body: [
            "Free Typing Camp is a typing practice site for homeschool families, teachers, tutors, small learning pods, and beginners who want a clean place to practice.",
            "The current program includes 45 staged lessons, eight focused-practice topics, a configurable typing test, Calculator Sprint, and a local progress page. No account is required.",
          ],
        },
        {
          title: "Progress stays in this browser",
          body: [
            "Completed tests, lesson results, focused-practice attempts, Calculator Sprint runs, achievements, the selected Camp emblem, and theme settings are stored locally on this device.",
            "There is no cloud profile or public leaderboard. Clearing browser data may remove local progress.",
          ],
        },
        {
          title: "Accuracy comes first",
          body: [
            "Typing speed matters, but only when it is built on clean keystrokes. Free Typing Camp treats WPM as useful context, not the whole score.",
            "A student who gets a little faster while staying accurate is making better progress than a student who rushes and adds many more mistakes.",
          ],
        },
        {
          title: "Who it helps",
          bullets: [
            "Students who need simple, repeatable typing practice.",
            "Homeschool parents who want a low-clutter keyboarding routine.",
            "Elementary and middle-school teachers who need quick practice without heavy administration.",
            "Tutors and small groups that need progress to be easy to understand.",
            "Older beginners who want a clean practice space that does not feel childish.",
          ],
        },
        {
          title: "What it does not claim to be",
          bullets: [
            "It is not a district-scale learning management system.",
            "It does not promise instant typing mastery.",
            "It does not treat raw WPM as the main definition of success.",
            "It does not need noisy games or classroom clutter to make practice useful.",
          ],
        },
      ]}
    /></PageFrame>
  );
}
