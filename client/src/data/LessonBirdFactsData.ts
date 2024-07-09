import { LessonDataType } from "./LessonBeginnerData";

export default function LessonBirdFactsData() {
  const data: LessonDataType = {
    id: "bird-facts",
    title: "Birds",
    lessonData: [
      {
        sectionTitle: "albatross",
        sectionId: "albatross-lesson-id",
        sectionData: [
          {
            id: "albatross-history-origin-1",
            levelTitle: "History & Origin",
          },
          {
            id: "albatross-habitat-population-1",
            levelTitle: "Habitat & Population",
          },
          {
            id: "albatross-evolution-lifespan-1",
            levelTitle: "Evolution & Lifespan",
          },
          {
            id: "albatross-diet-1",
            levelTitle: "Diet",
          },
          {
            id: "albatross-conservation-1",
            levelTitle: "conservation",
          },
          {
            id: "albatross-behaviour-reproduction-1",
            levelTitle: "Behaviour & Reproduction",
          },
          {
            id: "albatross-threats-predators-1",
            levelTitle: "Threats & Predators",
          },
        ],
      },
    ],
  };

  return data;
}
