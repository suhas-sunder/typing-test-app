"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { StarRating } from "@/components/typing/typing-test";
import { CURRICULUM_UNITS, ENABLED_CURRICULUM_LESSONS, getLessonHref, getLessonsForUnit } from "@/lib/curriculum/registry";
import { createEmptyProgress, readLocalProgress, subscribeToProgress } from "@/lib/progress/repository";
import type { LocalProgress } from "@/lib/progress/types";

export function LessonsOverview() {
  const [progress, setProgress] = useState<LocalProgress>(createEmptyProgress);

  useEffect(() => {
    const sync = () => setProgress(readLocalProgress().data);
    sync();
    return subscribeToProgress(sync);
  }, []);

  const summary = useMemo(() => {
    const records = ENABLED_CURRICULUM_LESSONS.map((lesson) => progress.lessons[lesson.id]);
    return {
      completed: records.filter((record) => record?.completed).length,
      next: ENABLED_CURRICULUM_LESSONS.find((lesson) => !progress.lessons[lesson.id]?.completed) ?? null,
      stars: records.reduce((total, record) => total + (record?.bestStars ?? 0), 0),
    };
  }, [progress.lessons]);

  return (
    <section className="section-pad">
      <div className="page-shell">
        <div className="max-w-3xl">
          <p className="eyebrow">Free typing lessons</p>
          <h1 className="heading-lg mt-2">Build accuracy one short lesson at a time.</h1>
          <p className="body-lg mt-3">Thirty lessons introduce the keyboard in a controlled order. Accuracy comes first; speed targets become meaningful only after the keystrokes are clean.</p>
        </div>

        <div className="mt-9 flex flex-wrap gap-x-10 gap-y-4 bg-camp-tan/45 px-5 py-5 sm:px-7">
          <SummaryMetric label="Lessons complete" value={`${summary.completed}/30`} />
          <SummaryMetric label="Performance stars" value={`${summary.stars}/150`} />
          <div className="min-w-[14rem] flex-1">
            <div className="text-xs font-black uppercase tracking-[0.12em] text-camp-muted">Recommended next</div>
            {summary.next ? <Link className="mt-1 inline-block font-black text-camp-coral underline decoration-2 underline-offset-4 hover:text-camp-orange focus-visible:bg-camp-orange focus-visible:text-white" href={getLessonHref(summary.next)}>{summary.next.sequence}. {summary.next.title}</Link> : <p className="mt-1 font-black text-camp-sage">All lessons completed</p>}
          </div>
        </div>

        <div className="mt-14 grid gap-14">
          {CURRICULUM_UNITS.map((unit) => {
            const lessons = getLessonsForUnit(unit.id);
            const completed = lessons.filter((lesson) => progress.lessons[lesson.id]?.completed).length;
            const stars = lessons.reduce((total, lesson) => total + (progress.lessons[lesson.id]?.bestStars ?? 0), 0);
            return (
              <section key={unit.id} aria-labelledby={`${unit.id}-heading`} className="grid gap-6 lg:grid-cols-[16rem_1fr]">
                <div>
                  <p className="eyebrow">Unit {unit.sequence}</p>
                  <h2 id={`${unit.id}-heading`} className="heading-md mt-2"><Link className="hover:text-camp-orange focus-visible:bg-camp-orange focus-visible:text-white" href={unit.route}>{unit.title}</Link></h2>
                  <p className="mt-3 leading-7 text-camp-muted">{unit.summary}</p>
                  <p className="mt-3 text-sm font-black text-camp-muted">{completed}/{lessons.length} complete · {stars}/{lessons.length * 5} stars</p>
                  <Link className="mt-4 inline-block font-black text-camp-coral underline decoration-2 underline-offset-4 hover:text-camp-orange focus-visible:bg-camp-orange focus-visible:text-white" href={unit.route}>Open unit</Link>
                </div>
                <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {lessons.map((lesson) => {
                    const record = progress.lessons[lesson.id];
                    return (
                      <li key={lesson.id}>
                        <Link href={getLessonHref(lesson)} className="group block min-h-36 rounded-2xl bg-camp-paper px-5 py-5 transition hover:bg-camp-orange hover:text-white focus-visible:bg-camp-orange focus-visible:text-white">
                          <div className="text-xs font-black uppercase tracking-[0.1em] text-camp-coral group-hover:text-white group-focus-visible:text-white">Lesson {lesson.sequence}</div>
                          <div className="mt-2 text-lg font-black text-camp-ink group-hover:text-white group-focus-visible:text-white">{lesson.title}</div>
                          <div className="mt-4 group-hover:[&_*]:text-white group-focus-visible:[&_*]:text-white"><StarRating value={record?.bestStars ?? 0} /></div>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </section>
            );
          })}
        </div>

        <section className="mt-16 max-w-3xl" aria-labelledby="star-guide-heading">
          <p className="eyebrow">Performance, not reviews</p>
          <h2 id="star-guide-heading" className="heading-md mt-2">How the five lesson stars work</h2>
          <p className="mt-3 leading-7 text-camp-muted">One star marks completion at 85% accuracy. Two and three stars raise the accuracy target to 90% and 95%. Four stars require 97% accuracy plus the lesson's standard WPM; five require 99% accuracy plus its mastery WPM. Your best result never decreases.</p>
          <p className="mt-4 leading-7 text-camp-muted">Need more repetition without affecting lesson stars? Use <Link className="font-black text-camp-coral underline underline-offset-4" href="/typing-practice">focused typing practice</Link> for keyboard rows, hands, quotes, numbers, and common words.</p>
        </section>
      </div>
    </section>
  );
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return <div><div className="text-2xl font-black text-camp-ink">{value}</div><div className="text-xs font-black uppercase tracking-[0.12em] text-camp-muted">{label}</div></div>;
}
