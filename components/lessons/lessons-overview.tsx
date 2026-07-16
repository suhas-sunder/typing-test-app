"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { buildLessonId } from "@/lib/progress/ids";
import { readLocalProgress, subscribeToProgress } from "@/lib/progress/repository";
import { LESSON_CATEGORIES } from "@/lib/typing/lessons";

export function LessonsOverview() {
  const [lessonStars, setLessonStars] = useState<Record<string, number>>({});

  useEffect(() => {
    const syncLocalProgress = () => {
      const progress = readLocalProgress().data;
      setLessonStars(
        Object.fromEntries(
          Object.entries(progress.lessons).map(([lessonId, lesson]) => [lessonId, lesson.bestStars ?? 0]),
        ),
      );
    };

    syncLocalProgress();
    return subscribeToProgress(syncLocalProgress);
  }, []);

  return (
    <section className="section-pad">
      <div className="page-shell">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow">Lessons</p>
          <h1 className="heading-lg mt-2">Small drills, visible progress.</h1>
          <p className="body-lg mt-3">Follow short drills, build finger memory, and see performance at a glance.</p>
        </div>

        <div className="grid gap-12">
          {LESSON_CATEGORIES.map((category) => (
            <section key={category.id} className="grid gap-6 lg:grid-cols-[16rem_1fr]">
              <div>
                <h2 className="heading-md">{category.title}</h2>
                <p className="mt-3 leading-7 text-camp-muted">{category.summary}</p>
              </div>
              <div className="grid gap-8">
                {category.sections.map((section) => {
                  const completedCount = section.levels.filter(
                    (level) => lessonStars[buildLessonId(category.id, section.id, level.id)] > 0,
                  ).length;

                  return (
                    <div key={section.id}>
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 pb-3">
                        <h3 className="text-xl font-black text-camp-ink">{section.title}</h3>
                        <span className="rounded-pill bg-camp-tan px-3 py-1 text-sm font-black text-camp-muted">
                          {completedCount}/{section.levels.length}
                        </span>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {section.levels.map((level) => {
                          const testName = buildLessonId(category.id, section.id, level.id);
                          const stars = lessonStars[testName] ?? 0;

                          return (
                            <Link
                              key={level.id}
                              href={`/lessons/lesson/${category.id}/${section.id}/${level.id}`}
                              className="group rounded-2xl bg-camp-paper p-5 shadow-soft transition hover:-translate-y-0.5 hover:bg-camp-peach focus-visible:bg-camp-peach focus-visible:text-camp-coral focus-visible:outline-none"
                            >
                              <div className="text-sm font-black uppercase tracking-[0.08em] text-camp-coral">{level.label}</div>
                              <div className="mt-2 text-2xl font-black text-camp-ink">{level.id}</div>
                              <Stars value={stars} />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stars({ value }: { value: number }) {
  return (
    <div className="mt-4 flex gap-1 text-xl" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={value >= star ? "text-camp-orange" : value > star - 1 ? "text-camp-orange/55" : "text-camp-tan"}
        >
          {"\u2605"}
        </span>
      ))}
    </div>
  );
}
