import { useEffect, useState } from "react";
import useLessonText from "../../../hooks/useLessonText";
import GetLessonText from "../../../../utils/requests/GetLessonText";
import { v4 as uuidv4 } from "uuid";
type LessonDataType = {
  articleTitle: string;
  keywords: string;
  conclusion: string;
  sectionData: { title: string; paragraph: string }[];
};

export default function LessonSixEnglishWords() {
  const [lessonData, setLessonData] = useState<LessonDataType>({
    articleTitle: "",
    keywords: "",
    conclusion: "",
    sectionData: [],
  });

  const { lessonIndex, levelIndex, sectionIndex } = useLessonText(); //gets lesson text and data obtained from pathname

  useEffect(() => {
    const fetchLessonData = async () => {
      //Create a url that matches text url stored on cms based on lesson section and level index
      const url = `https://www.honeycombartist.com/lesson-text%2Flesson_${
        lessonIndex + 1
      }_sec_${sectionIndex + 1}_lvl_${levelIndex + 1}.json`;

      const data = await GetLessonText({ url, setLessonText: () => {} });
      setLessonData(data);
    };

    fetchLessonData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonIndex, levelIndex, sectionIndex]);

  return (
    <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
      <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
        {lessonData?.articleTitle}
      </h2>
      <section className="text-slate-600">
        <h3 className="mt-8 text-center text-xl text-slate-950">
          List of all words you will type in this typing lesson:
        </h3>

        <p className="mb-16 mt-6 text-center text-lg leading-loose tracking-widest">
          {lessonData?.keywords.split(",").join(", ")}
        </p>
      </section>
      {lessonData?.sectionData?.map((section) => (
        <section key={uuidv4()} className="mb-6">
          <h3 className="mb-2 text-xl font-semibold leading-loose">
            {section?.title}
          </h3>
          <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
            {section?.paragraph}{" "}
          </p>
        </section>
      ))}

      <h3 className="mb-2 text-xl font-semibold leading-loose">Conclusion</h3>
      <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
        {lessonData?.conclusion}
      </p>
    </article>
  );
}
