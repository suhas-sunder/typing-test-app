import GenerateRandNum from "./GenerateRandNum";

interface PropType {
  characters: string;
  totalCharsDisplayed: number;
}

export default function LessonTextGenerator({
  characters,
  totalCharsDisplayed,
}: PropType) {
  let text = "";
  const maxLengthOfWord = Math.ceil(characters.length * 3);

  for (let i = 0; i < totalCharsDisplayed; i++) {
    const randNum = GenerateRandNum({ max: maxLengthOfWord || 1 });

    for (let j = 0; j < randNum; j++) {
      const randIndex = GenerateRandNum({ max: characters.length || 1 });
      text += characters[randIndex];
    }

    text += " ";
  }

  return text;
}
