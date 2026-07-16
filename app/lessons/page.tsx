import { PageFrame } from "@/components/page-frame";
import { LessonsOverview } from "@/components/lessons/lessons-overview";

export const metadata: Metadata = {
  title: { absolute: "Free Typing Lessons for Beginners | FreeTypingCamp" },
  description: "Follow 30 accuracy-first typing lessons across home row, top row, bottom row, the full keyboard, punctuation, numbers, and symbols.",
  alternates: { canonical: "/lessons" },
  openGraph: { title: "Free Typing Lessons for Beginners | FreeTypingCamp", description: "A controlled 30-lesson typing curriculum that introduces keys in a clear order.", url: "/lessons", type: "website" },
};

export default function LessonsPage() {
  return (
    <PageFrame>
      <LessonsOverview />
    </PageFrame>
  );
}
import type { Metadata } from "next";
