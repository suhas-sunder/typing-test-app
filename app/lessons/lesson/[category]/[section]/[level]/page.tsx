import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdPlacement } from "@/components/ads/ad-placement";
import { LessonExperience } from "@/components/lessons/lesson-experience";
import { PageFrame } from "@/components/page-frame";
import {
  ENABLED_CURRICULUM_LESSONS,
  getCurriculumUnit,
  getLessonHref,
  getNextCurriculumLesson,
  resolveCurriculumLessonRoute,
} from "@/lib/curriculum/registry";

type LessonParams = { category: string; section: string; level: string };

export function generateStaticParams() {
  return ENABLED_CURRICULUM_LESSONS.map((lesson) => ({ category: lesson.unitId, section: "lesson", level: lesson.id }));
}

export async function generateMetadata({ params }: { params: Promise<LessonParams> }): Promise<Metadata> {
  const { category, section, level } = await params;
  const lesson = resolveCurriculumLessonRoute(category, section, level);
  if (!lesson) return { robots: { index: false, follow: true } };
  return {
    title: { absolute: `${lesson.title} typing lesson | Free Typing Camp` },
    description: lesson.objective,
    alternates: { canonical: getLessonHref(lesson) },
    robots: { index: false, follow: true },
  };
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
    <PageFrame routeFamily="lesson_runner">
      <LessonExperience
        lesson={lesson}
        fingerGuide={fingers}
        afterTypingSurface={<AdPlacement placement="below_header_or_tool" />}
      />
      <section className="bg-camp-tan/45 py-8">
        <div className="page-shell grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h2 className="sr-only">Lesson scoring and sequence</h2>
            <p className="text-sm font-black uppercase tracking-[0.12em] text-camp-coral">Lesson details</p>
            <p className="mt-3 max-w-5xl text-sm font-bold leading-7 text-camp-muted sm:text-base">
              Complete the lesson at 85% accuracy for one star. Four stars require {lesson.standardWpm} WPM with 97%
              accuracy, and five require {lesson.masteryWpm} WPM with 99% accuracy. Unit: {unit?.title}. Direct practice
              stays available; prerequisites are guidance, not a lock.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-7 gap-y-3" aria-label="Lesson sequence">
            {previous ? (
              <Link className="font-black text-camp-coral underline decoration-2 underline-offset-4 hover:text-camp-orange focus-visible:bg-camp-orange focus-visible:text-white" href={getLessonHref(previous)}>
                Previous: {previous.title}
              </Link>
            ) : (
              <Link className="font-black text-camp-coral underline decoration-2 underline-offset-4" href="/lessons">
                All lessons
              </Link>
            )}
            {next ? (
              <Link className="font-black text-camp-coral underline decoration-2 underline-offset-4 hover:text-camp-orange focus-visible:bg-camp-orange focus-visible:text-white" href={getLessonHref(next)}>
                Next: {next.title}
              </Link>
            ) : (
              <Link className="font-black text-camp-coral underline decoration-2 underline-offset-4" href="/typing-practice">
                Focused practice
              </Link>
            )}
          </nav>
        </div>
      </section>
    </PageFrame>
  );
}
