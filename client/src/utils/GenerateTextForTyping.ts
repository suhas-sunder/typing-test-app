import GenerateRandNum from "./GenerateRandNum";
import cloudflareR2API from "../api/cloudflareR2API";
import defaultArticle from "../data/computer.json"

export default async function GenerateTextForTyping({ setText }) {
  const allArticles = {
    folderName: "articles",
    folderData: [
      {
        articleSlug: "kitten.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "bear-cub.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "cat.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "cow.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "crow.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "diplodocus",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "donkey.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "elephant.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "horse.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "lion-cub.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "panther-cub.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "pigeon.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "t-rex.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "tiger-cub.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "tiger.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "unicorn.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "velociraptor.json",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
    ],
  };

  const randNum = GenerateRandNum({ max: allArticles.folderData.length });

  const formatArticle = (article: { [key: string]: string | { [key: string]: string }[] }) => {
    const result = article.conclusion.toString();
    if (result) {
      console.log(result)
      setText(result)
    }
  }

  const handleGetText = async (slug: string) => {
    try {
      const response = await cloudflareR2API.get(`/${allArticles.folderName}/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      const parseRes = await response;

      if (parseRes) {
        formatArticle(parseRes) //If article was fetched use as text
      } else {
        formatArticle(defaultArticle) //Use default article if fetching text fails
        console.log("Failed to fetch typing text. Default text will be served.");
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
  }

  allArticles.folderData.forEach((data, index) => {
    if (index === randNum) {
      handleGetText(data.articleSlug)
    }
  });
}
