import useLessonText from "../../hooks/useLessonText";

export default function LessonsArticleSection() {
  const { lessonText, sectionName } = useLessonText();

  return (
    <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
      <section>
        <h2 className="mb-4 text-center font-lora text-3xl font-bold capitalize leading-loose">
          This lesson is about: {sectionName}!
        </h2>
        <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
          {lessonText}
        </p>
      </section>
      {/* <section>
        <h2 className="mb-2 text-xl font-semibold leading-loose">
          List of all related unlockables:
        </h2>
      </section> */}
    </article>
  );
}
