import { useEffect, useState } from "react";
import useLessonText from "../../hooks/useLessonText";
import { v4 as uuidv4 } from "uuid";

export default function LessonsArticleSection() {
  const { lessonText, sectionName } = useLessonText();

  const [displayParagraphs, setDisplayParagraphs] = useState<string[]>([]);

  //Take long paragraphs and split them into smaller 4 sentence paragraphs.
  useEffect(() => {
    const newLessonText: string[] = [];

    lessonText.split(".").forEach((sentence, index) => {
      const targetIndex = Math.ceil((index + 1) / 4) - 1;

      if (newLessonText[targetIndex] && sentence) {
        newLessonText[targetIndex] =
          newLessonText[targetIndex] + sentence + ".";
      } else if (sentence) {
        newLessonText.push(sentence + ".");
      }
    });

    console.log(
      `https://www.honeycombartist.com/origami%2F${sectionName}%2F${sectionName}.webp`,
    );

    setDisplayParagraphs(newLessonText);
  }, [lessonText]);

  return (
    <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
      <section>
        <h2 className="mb-4 text-center font-lora text-3xl font-bold capitalize leading-loose">
          This lesson is about: {sectionName}!
        </h2>
        {displayParagraphs.map((paragraph, index) =>
          index === 0 ? (
            <div
              key={uuidv4()}
              className="mb-12 mt-7 pl-3 font-lato text-lg leading-loose text-slate-700"
            >
              <picture className="float-left mr-9  min-h-[190px] min-w-[144px]">
                <source
                  srcSet={`https://www.honeycombartist.com/origami%2F${sectionName
                    .split(" ")
                    .join("-")}%2F${sectionName.split(" ").join("-")}.webp`}
                  type="image/webp"
                ></source>
                <img
                  loading="eager"
                  rel="preload"
                  srcSet={`https://www.honeycombartist.com/origami%2F${sectionName
                    .split(" ")
                    .join("-")}%2F${sectionName.split(" ").join("-")}.jpg`}
                  alt={`Origami style image of ${sectionName} to be displayed with related typing lesson text.`}
                  className={`rounded-lg border-slate-800 drop-shadow-lg`}
                  width={144}
                  height={190}
                />
              </picture>
              <p>{paragraph}</p>
            </div>
          ) : (
            <p
              key={uuidv4()}
              className="mb-12 pl-3 font-lato text-lg leading-loose text-slate-700"
            >
              {paragraph}
            </p>
          ),
        )}
      </section>
      {/* <section>
        <h2 className="mb-2 text-xl font-semibold leading-loose">
          List of all related unlockables:
        </h2>
      </section> */}
    </article>
  );
}
