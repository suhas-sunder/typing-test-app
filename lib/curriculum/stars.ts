export const LESSON_ACCURACY_THRESHOLDS = [85, 90, 95, 97, 99] as const;

/** Stars reward accuracy first: 85/90/95%, then 97% plus standard WPM, and 99% plus mastery WPM. */
export function calculateLessonStars({
  accuracy,
  masteryWpm,
  standardWpm,
  wpm,
}: {
  accuracy: number;
  masteryWpm: number;
  standardWpm: number;
  wpm: number;
}) {
  if (accuracy >= 99 && wpm >= masteryWpm) return 5;
  if (accuracy >= 97 && wpm >= standardWpm) return 4;
  if (accuracy >= 95) return 3;
  if (accuracy >= 90) return 2;
  if (accuracy >= 85) return 1;
  return 0;
}
