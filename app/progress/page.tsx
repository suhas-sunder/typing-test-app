import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";
import { ProgressClient } from "@/components/progress/progress-client";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/progress",
  title: "Local Typing Progress | Free Typing Camp",
  description: "View typing progress stored locally in this browser.",
  index: false,
});

export default function ProgressPage() {
  return (
    <PageFrame routeFamily="progress">
      <ProgressClient />
    </PageFrame>
  );
}
