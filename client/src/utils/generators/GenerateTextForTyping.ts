import GenerateRandNum from "./../generators/GenerateRandNum";
import cloudflareR2API from "../../api/cloudflareR2API";
import defaultArticle from "../../data/cat.json";
import AllLessonsData from "../../data/AllLessonsData";

//Used by StartMenu.tsx to generate a block of text
export default async function GenerateTextForTyping() {
  const allArticles = AllLessonsData();

  // const allArticles = [
  //   {
  //     articleSlug: "goldfish",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "eagle",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "aligator",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "whale",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "dolphin",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "hen",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "porcupine",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "rabbit",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "heron",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "stork",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "hummingbird",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "robin",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "blue_jay",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "pigeon",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "crow",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "elephant",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "bear",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "panther",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "lion",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "tiger",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "donkey",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "cow",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "cat",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "kitten",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "horse",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "unicorn",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "diplodocus",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "velociraptor",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "triceratops",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "trex",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  //   {
  //     articleSlug: "velociraptor",
  //     keywords: ["animal", "baby", "mammal", "cute", "furry"],
  //   },
  // ];

  //Format article depending on requirements
  const formatText = (article: string) => {
    const text = article.split(/\s+/).join(" ");
    return text;
  };

  const handleGetText = async ({
    randLessonIndex,
    randSectionIndex,
    randLevelIndex,
  }) => {
    try {
      const response = await cloudflareR2API
        .get(
          `/lesson-text/lesson_${randLessonIndex + 1}_sec_${
            randSectionIndex + 1
          }_lvl_${randLevelIndex + 1}.json`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      const parseRes = await response;
      console.log(parseRes);

      if (parseRes) {
        return formatText(parseRes[0]); //If article was fetched use as text
      } else {
        console.log(
          "Failed to fetch typing text. Default text will be served.",
        );
      }
    } catch (err) {
      let message: string;

      if (err instanceof Error) {
        message = err.message;
      } else {
        message = String(err);
      }

      console.error(message);
    }

    return formatText(defaultArticle);
  };

  //Only need to pull from lesson 7 to 13
  let randLessonIndex = GenerateRandNum({ max: 13 });

  if (randLessonIndex < 6 || randLessonIndex === 7 || randLessonIndex === 11)
    randLessonIndex = 6;

  const randSectionIndex = GenerateRandNum({
    max: allArticles[randLessonIndex].lessonData.length - 1,
  });

  const randLevelIndex = GenerateRandNum({
    max:
      allArticles[randLessonIndex].lessonData[randSectionIndex].sectionData
        .length - 1,
  });

  return handleGetText({ randLessonIndex, randSectionIndex, randLevelIndex });
}
