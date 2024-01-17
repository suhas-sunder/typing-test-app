import { useEffect, useMemo, useState } from "react";
import GenerateRandNum from "../../utils/GenerateRandNum";
import GenerateTextForTyping from "../../utils/GenerateTextForTyping";

export default function useNewText({ text }) {
  const [url, setUrl] = useState<string>("");
  const [newText, setNewText] = useState<string>("");
  const newCachedText = useMemo(() => GenerateTextForTyping({ url }), [url]);

  // Fetch new text when url is not empty
  useEffect(() => {
    const handleNewText = async () => {
      url && setNewText((await newCachedText) || "");
    };
    handleNewText();
    console.log(url);
  }, [newCachedText, url]);

  // Generate new url
  useEffect(() => {
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

    if (!text) {
      const randNum = GenerateRandNum({ max: allArticles.folderData.length });

      const data = allArticles.folderData[randNum];
      setUrl(`/${allArticles.folderName}/${data.articleSlug}`);
    }
  }, [text]);

  return newText;
}
