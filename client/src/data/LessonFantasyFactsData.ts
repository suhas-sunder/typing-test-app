import { LessonDataType } from "./LessonBeginnerData";

export default function LessonFantasyFactsData() {
  const data: LessonDataType = {
    id: "fantasy-facts",
    title: "Fantasy",
    lessonData: [
      {
        sectionTitle: "basilisk",
        sectionId: "basilisk-lesson-id",
        sectionData: [
          {
            id: "basilisk-lore-1",
            levelTitle: "lore",
          },
          {
            id: "basilisk-appearance-characteristics-1",
            levelTitle: "appearance & characteristics",
          },
          {
            id: "basilisk-book-appearances-1",
            levelTitle: "book appearances",
          },
          {
            id: "basilisk-movie-show-appearances-1",
            levelTitle: "movie & show appearances",
          },
          {
            id: "basilisk-anime-cartoon-appearances-1",
            levelTitle: "anime & cartoon appearances",
          },
          {
            id: "basilisk-short-story-1",
            levelTitle: "short story",
          },
          {
            id: "basilisk-fun-facts-1",
            levelTitle: "fun facts",
          },
        ],
      },
    ],
  };

  return data;
}
