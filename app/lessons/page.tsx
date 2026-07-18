import { PageFrame } from "@/components/page-frame";
import { LessonsOverview } from "@/components/lessons/lessons-overview";
import { AdPlacement } from "@/components/ads/ad-placement";

export const metadata: Metadata = {
  title: { absolute: "Free Typing Lessons for Beginners | FreeTypingCamp" },
  description: "Follow 45 accuracy-first typing lessons from beginner foundations through intermediate fluency and advanced application.",
  alternates: { canonical: "/lessons" },
  openGraph: { title: "Free Typing Lessons for Beginners | FreeTypingCamp", description: "A controlled 45-lesson typing curriculum with short, multi-stage lessons.", url: "/lessons", type: "website" },
};

export default function LessonsPage() {
  return (
    <PageFrame routeFamily="lessons_hub">
      <LessonsOverview />
      <AdPlacement placement="below_header_or_tool" />
    </PageFrame>
  );
}
import type { Metadata } from "next";
