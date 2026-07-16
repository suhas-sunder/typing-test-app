import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FocusedPracticePage } from "@/components/practice/focused-practice-page";
import { PageFrame } from "@/components/page-frame";
import { getPracticeDefinition, PRACTICE_DEFINITIONS } from "@/lib/practice/registry";

export function generateStaticParams() { return PRACTICE_DEFINITIONS.map((practice) => ({ practiceId: practice.id })); }

export async function generateMetadata({ params }: { params: Promise<{ practiceId: string }> }): Promise<Metadata> {
  const practice = getPracticeDefinition((await params).practiceId);
  if (!practice) return {};
  const url = `/typing-practice/${practice.id}`;
  return { title: { absolute: practice.title }, description: practice.description, alternates: { canonical: url }, openGraph: { title: practice.title, description: practice.description, url, type: "website" } };
}

export default async function PracticePage({ params }: { params: Promise<{ practiceId: string }> }) {
  const practice = getPracticeDefinition((await params).practiceId);
  if (!practice) notFound();
  return <PageFrame><FocusedPracticePage practice={practice} /></PageFrame>;
}
