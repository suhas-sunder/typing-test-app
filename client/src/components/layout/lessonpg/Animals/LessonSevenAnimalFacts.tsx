

export default function LessonSevenAnimalFacts() {

  // useEffect(() => {
  //   const fetchLessonData = async () => {
  //     //Create a url that matches text url stored on cms based on lesson section and level index
  //     const url = `https://www.honeycombartist.com/animals-text%2F${animalLevels[levelIndex]}%2F${animalNames[sectionIndex]}.json`;

  //     const data = await GetLessonText({ url, setLessonText: () => {} });
  //     setArticleData(data);
  //   };

  //   fetchLessonData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [lessonIndex, levelIndex, sectionIndex]);

  return (
    <article className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
      {/* <h2 className="mb-4 text-center font-lora text-3xl font-bold capitalize leading-loose">
        {animalNames[sectionIndex]} Facts Part {levelIndex + 1}:{" "}
        {animalLevels[levelIndex].length > 1
          ? animalLevels[levelIndex].split("-").join(" & ")
          : animalLevels[levelIndex]}
        !
      </h2>
      {articleData.map((paragraph) => (
        <section key={uuidv4()} className="font-lato text-slate-600">
          <p className="mb-16 mt-6 text-xl leading-loose tracking-widest">
            {paragraph}
          </p>
        </section>
      ))} */}
    </article>
  );
}
