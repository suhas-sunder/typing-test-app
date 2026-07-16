import { PageFrame } from "@/components/page-frame";
import { TypingTest } from "@/components/typing/typing-test";
import { buildLessonId } from "@/lib/progress/ids";
import { getLesson } from "@/lib/typing/lessons";

export default async function LessonDrillPage({
  params,
}: {
  params: Promise<{ category: string; section: string; level: string }>;
}) {
  const { category: categoryId, section: sectionId, level: levelId } = await params;
  const { category, level, section } = getLesson(categoryId, sectionId, levelId);

  return (
    <PageFrame>
      <TypingTest
        title={`${section.title}: ${level.label}`}
        subtitle={`${category.title} drill - ${level.id}`}
        initialText={level.text}
        testName={buildLessonId(category.id, section.id, level.id)}
        defaultDuration={60}
        defaultDifficulty="easy"
        lockText
      />
    </PageFrame>
  );
}
