import axios from "axios";
import GenerateRandNum from "./GenerateRandNum";

export default async function GenerateTextForTyping() {
  const allArticles = {
    folderName: "articles",
    folderData: [
      {
        imgSlugs: "kitten.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        imgSlugs: "bear-cub.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        imgSlugs: "cat.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        imgSlugs: "cow.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        imgSlugs: "crow.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        imgSlugs: "diplodocus",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        imgSlugs: "donkey.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        imgSlugs: "elephant.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        imgSlugs: "horse.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        imgSlugs: "lion-cub.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        imgSlugs: "panther-cub.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        imgSlugs: "pigeon.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        imgSlugs: "t-rex.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        imgSlugs: "tiger-cub.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        imgSlug: ["tiger.json"],
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        imgSlug: "unicorn.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        imgSlug: "velociraptor.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
    ],
  };

  const randNum = GenerateRandNum({ max: allArticles.folderData.length });

  console.log(randNum);

  const textForTyping = "";

  allArticles.folderData.forEach((_data, index) => {
    if (index === randNum) {
      // const baseURL =
      //   process.env.Node === "production"
      //     ? "https://www.freetypingcamp.com"
      //     : "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev";

      const baseURL = "https://pub-e4ad4d9970364e028c281a4d874c1cf0.r2.dev";
      const url = `${baseURL}/${allArticles.folderName}/cat.json`;
      axios
        .get(url)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  });

  return textForTyping;
}
