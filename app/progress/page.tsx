import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";
import { ProgressClient } from "@/components/progress/progress-client";

export const metadata: Metadata = {
  title: "Progress",
  description: "View typing progress stored locally in this browser.",
  robots: { follow: true, index: false },
};

export default function ProgressPage() {
  return (
    <PageFrame>
      <ProgressClient />
    </PageFrame>
  );
}

