interface PropType {
  title: string;
  quotesData: string[];
}

function DisplayQuotes({ title, quotesData }: PropType) {
  return (
    <section className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
      <h2 className="mb-6 text-center font-lora text-2xl font-bold leading-loose">
        {title}
      </h2>
      <div className=" max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          {quotesData.map((quote, index) => (
            <blockquote
              key={quote}
              className="flex flex-col gap-2 text-center font-lato text-lg font-medium leading-loose text-slate-700"
            >
              <span className="font-lora">
                {index === 0
                  ? quote.slice(6).split(":")[0]
                  : quote.split(":")[0]}
              </span>
              <span>
                {index === 0
                  ? quote.slice(6).split(":")[1]
                  : quote.split(":")[1]}
                "
              </span>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DisplayQuotes;
