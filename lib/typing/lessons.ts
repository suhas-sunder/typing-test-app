import type { LessonCategory } from "@/lib/typing/types";

export const LESSON_CATEGORIES: LessonCategory[] = [
  {
    id: "beginner",
    title: "Beginner",
    summary: "Build finger memory with home-row drills and short words.",
    sections: [
      {
        id: "home-row-left-hand",
        title: "Home Row Left Hand",
        levels: [
          level("as", "Level 1", "as as sad sass salad as sad"),
          level("ad", "Level 2", "ad dad add ad sad dad"),
          level("af", "Level 3", "af fad staff aft fast"),
          level("fd", "Level 4", "fd fad add staff draft"),
          level("asd", "Level 5", "asd sad dad salad asd"),
          level("fds", "Level 6", "fds sad fad staff"),
        ],
      },
      {
        id: "home-row-right-hand",
        title: "Home Row Right Hand",
        levels: [
          level("jk", "Level 1", "jk kick jill silk"),
          level("jl", "Level 2", "jl kill jill lake"),
          level("jkl", "Level 3", "jkl lake silk skill"),
          level("home-row", "Level 4", "ask fall lake skill salad"),
        ],
      },
    ],
  },
  {
    id: "words",
    title: "Words",
    summary: "Practice common words with realistic rhythm.",
    sections: [
      {
        id: "common-camp-words",
        title: "Common Camp Words",
        levels: [
          level("trail", "Trail Words", "trail camp pine lake tent fire warm path"),
          level("forest", "Forest Words", "forest branch river meadow stone cloud"),
          level("typing", "Typing Words", "typing focus accuracy speed practice result"),
        ],
      },
    ],
  },
  {
    id: "quotes",
    title: "Quotes",
    summary: "Short sentence practice with punctuation and cadence.",
    sections: [
      {
        id: "short-quotes",
        title: "Short Quotes",
        levels: [
          level("calm", "Calm Typing", "Good typing feels calm before it feels fast."),
          level("accuracy", "Accuracy First", "Accuracy is the trail speed learns to follow."),
        ],
      },
    ],
  },
];

export function getLesson(categoryId: string, sectionId: string, levelId: string) {
  const category = LESSON_CATEGORIES.find((item) => item.id === categoryId) ?? LESSON_CATEGORIES[0];
  const section = category.sections.find((item) => item.id === sectionId) ?? category.sections[0];
  const level = section.levels.find((item) => item.id === levelId) ?? section.levels[0];

  return { category, section, level };
}

function level(id: string, label: string, text: string) {
  return {
    id,
    label,
    text,
    href: `/lessons/lesson/beginner/home-row-left-hand/${id}`,
  };
}
