import GenerateRandNum from "./GenerateRandNum";
import cloudflareR2API from "../api/cloudflareR2API";
import defaultArticle from "../data/computer.json";

type ContenType = { subtitle?: string; paragraph: string }[];

type ArticleType = {
  title: string;
  content: ContenType;
  conclusion: string;
  keywords: string;
};

interface PropType {
  setText: (value: string) => void;
  setArticleData?: (value: ArticleType) => void;
}

//Used by StartMenu.tsx to generate a block of text
export default async function GenerateTextForTyping({
  setText,
  setArticleData,
}: PropType) {
  const allArticles = {
    folderName: "typing-text",
    folderData: [
      {
        articleSlug: "kitten",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "bear",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "cat",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "cow",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "crow",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "diplodocus",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "donkey",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "elephant",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "horse",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "lion",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "panther",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "pigeon",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "trex",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "tiger",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "stork",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "unicorn",
        subFolder: "",
        keywords: ["animal", "baby", "mammal", "cute", "furry"],
      },
      {
        articleSlug: "velociraptor",
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
      const blankSpace = " ";

      article.content.forEach((text) => {
        paragraph += text.paragraph + blankSpace;
      });
      paragraph += blankSpace + article.conclusion;
      paragraph += blankSpace + article.keywords;

      setText(paragraph);
    }

    if (setArticleData) {
      setArticleData(article);
    }
  };

  const handleGetText = async (slug: string) => {
    try {
      const response = await cloudflareR2API
        .get(`/${allArticles.folderName}%2F${slug}.json`, {
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
        setText(parseRes.split(/\s+/).join(" ")); //If article was fetched use as text
      } else {
        formatArticle(defaultArticle); //Use default article if fetching text fails
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
  };

  allArticles.folderData.forEach((data, index) => {
    if (index === randNum) {
      handleGetText(data.articleSlug);
    }
  });
}
