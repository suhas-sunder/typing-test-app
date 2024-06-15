interface PropType {
  title: string;
  quotesData: string[];
}

function DisplayQuotes({ title, quotesData }: PropType) {
  function shuffleQuotes() {
    console.log(quotesData)
    return quotesData.sort(() => Math.random() - 0.5);
  }

  return (
    <section className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
      <h2 className="mb-6 text-center font-lora text-2xl font-bold leading-loose">
        {title}
      </h2>
      <div className=" max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          {shuffleQuotes().map((quote, index) => (
            <blockquote
              key={quote}
              className="flex flex-col gap-2 text-center font-lato text-lg font-medium leading-loose text-slate-700"
            >
              {/* I want the quote re-foramtted so that it doesn't  start with the words Quote followed by #number so that I can randomize the order of the quote */}
              <span className="font-lora">
               #{index + 1} By ~ {quote.split(":")[0].split("By")[1]} 
              </span>
              <span>{quote.split(":")[1]}"</span>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DisplayQuotes;
