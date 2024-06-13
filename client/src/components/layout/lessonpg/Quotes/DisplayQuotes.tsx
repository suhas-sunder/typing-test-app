interface PropType {
  title: string;
  quotesData: string[];
}

function DisplayQuotes({ title, quotesData }: PropType) {
  return (
    <section className="flex-col p-8 font-lora leading-loose tracking-wider text-sky-700">
      <h2 className="mb-4 text-center font-lora text-3xl font-bold leading-loose">
        {title}
      </h2>
      <div className=" max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          {quotesData.map((quote, index) => (
            <blockquote
              key={quote}
              className="flex gap-2 text-lg font-medium text-slate-800"
            >
              <h3 className="mb-2 text-xl font-semibold leading-loose">
                Quote
              </h3>
              <p className="mb-4 pl-3 font-lato text-lg leading-loose text-slate-700">
                {index === 0 ? quote.slice(6) : quote}"
              </p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DisplayQuotes;
