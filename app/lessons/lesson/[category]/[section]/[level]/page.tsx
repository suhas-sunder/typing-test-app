import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageFrame } from "@/components/page-frame";
import { LessonExperience } from "@/components/lessons/lesson-experience";
import { ENABLED_CURRICULUM_LESSONS, getCurriculumUnit, getLessonHref, getNextCurriculumLesson, resolveCurriculumLessonRoute } from "@/lib/curriculum/registry";

type LessonParams = { category: string; section: string; level: string };

export function generateStaticParams() {
  return ENABLED_CURRICULUM_LESSONS.map((lesson) => ({ category: lesson.unitId, section: "lesson", level: lesson.id }));
}

export async function generateMetadata({ params }: { params: Promise<LessonParams> }): Promise<Metadata> {
  const { category, section, level } = await params;
  const lesson = resolveCurriculumLessonRoute(category, section, level);
  if (!lesson) return { robots: { index: false, follow: true } };
  return { title: { absolute: `${lesson.title} typing lesson | Free Typing Camp` }, description: lesson.objective, alternates: { canonical: getLessonHref(lesson) }, robots: { index: false, follow: true } };
}

export default async function CurriculumLessonPage({ params }: { params: Promise<LessonParams> }) {
  const { category, section, level } = await params;
  const lesson = resolveCurriculumLessonRoute(category, section, level);
  if (!lesson) notFound();
  const unit = getCurriculumUnit(lesson.unitId);
  const previous = ENABLED_CURRICULUM_LESSONS[lesson.sequence - 2] ?? null;
  const next = getNextCurriculumLesson(lesson.id);
  const fingers = Object.entries(lesson.fingerAssignments).map(([key, finger]) => `${key === " " ? "Space" : key}: ${finger}`).join("; ");

  return (
    <PageFrame>
      <LessonExperience lesson={lesson} fingerGuide={fingers} />
      <section className="section-pad pt-6"><div className="page-shell max-w-4xl"><p className="eyebrow">Accuracy first</p><h2 className="heading-md mt-2">How this lesson is scored</h2><p className="mt-3 leading-7 text-camp-muted">One star marks the lesson complete at 85% accuracy. Four stars require at least {lesson.standardWpm} WPM with 97% accuracy, and five require at least {lesson.masteryWpm} WPM with 99% accuracy. A lower result is still saved as an attempt.</p><p className="mt-3 text-sm font-bold text-camp-muted">Unit: {unit?.title}. Direct practice is always available; prerequisites are guidance, not a lock.</p><nav className="mt-7 flex flex-wrap justify-between gap-5" aria-label="Lesson sequence">{previous ? <Link className="font-black text-camp-coral underline decoration-2 underline-offset-4 hover:text-camp-orange focus-visible:bg-camp-orange focus-visible:text-white" href={getLessonHref(previous)}>← {previous.title}</Link> : <Link className="font-black text-camp-coral underline decoration-2 underline-offset-4" href="/lessons">← All lessons</Link>}{next ? <Link className="font-black text-camp-coral underline decoration-2 underline-offset-4 hover:text-camp-orange focus-visible:bg-camp-orange focus-visible:text-white" href={getLessonHref(next)}>{next.title} →</Link> : <Link className="font-black text-camp-coral underline decoration-2 underline-offset-4" href="/typing-practice">Focused practice →</Link>}</nav></div></section>
    </PageFrame>
  );
}
