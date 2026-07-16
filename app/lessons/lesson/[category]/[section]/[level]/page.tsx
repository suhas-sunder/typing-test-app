import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { robots: { index: false, follow: true } };

export default async function LessonDrillPage({
  params,
}: {
  params: Promise<{ category: string; section: string; level: string }>;
}) {
  await params;
  notFound();
}
