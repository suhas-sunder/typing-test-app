import GenerateRandNum from "./GenerateRandNum";
import cloudflareR2API from "../api/cloudflareR2API";
import defaultArticle from "../data/computer.json"

type ContenType = { subtitle?: string, paragraph: string }[]


type ArticleType =
  {
    title: string;
    content: ContenType;
    conclusion: string;
    keywords: string;
  }

interface PropType {
  setText?: (value: string) => void;
  setArticleData?: (value: ArticleType) => void;
}

//Used by StartMenu.tsx to generate a block of text
export default async function GenerateTextForTyping({ setText, setArticleData }: PropType) {
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

  //Format article depending on requirements
  const formatArticle = (article: ArticleType) => {
    if (setText) {
      // Merge all sections of the article into one giant paragraph.
      let paragraph = "";

      (article.content).forEach((text) => {
        if (text.subtitle) paragraph += `${text.subtitle[0]}${text.subtitle.split("").slice(1).join("").toLowerCase()}.`,
          paragraph += " " + text.paragraph
      });
      paragraph += " " + article.conclusion
      paragraph += " " + article.keywords

      setText(paragraph)

    }

    if (setArticleData) {
      setArticleData(article)
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
