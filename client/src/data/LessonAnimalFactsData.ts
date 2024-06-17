import type { LessonDataType } from "./LessonBeginnerData";

export default function LessonAnimalFactsData() {
  const data: LessonDataType = {
    id: "animals-id",
    title: "Animal Facts",
    lessonData: [
      {
        sectionTitle: "Animal 1",
        sectionId: "Animal-1-id",
        sectionData: [
          {
            id: "first-animal",
            levelTitle: "🦑 First Animal",
          },
        ],
      },
    ],
  };

  return data;
}
