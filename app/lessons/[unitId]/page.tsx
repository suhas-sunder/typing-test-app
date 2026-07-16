import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CurriculumUnitPage } from "@/components/lessons/curriculum-unit-page";
import { PageFrame } from "@/components/page-frame";
import { CURRICULUM_UNITS, getCurriculumUnit } from "@/lib/curriculum/registry";

export function generateStaticParams() { return CURRICULUM_UNITS.map((unit) => ({ unitId: unit.id })); }

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> }): Promise<Metadata> {
  const unit = getCurriculumUnit((await params).unitId);
  if (!unit) return {};
  const title = `${unit.title} typing lessons | Free Typing Camp`;
  return { title: { absolute: title }, description: unit.summary, alternates: { canonical: unit.route }, openGraph: { title, description: unit.summary, url: unit.route, type: "website" } };
}

export default async function UnitPage({ params }: { params: Promise<{ unitId: string }> }) {
  const unit = getCurriculumUnit((await params).unitId);
  if (!unit) notFound();
  return <PageFrame><CurriculumUnitPage unitId={unit.id} /></PageFrame>;
}
