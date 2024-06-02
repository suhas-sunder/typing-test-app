import FAQ from "./FAQ";

export default function Learn() {
  const learningData = [
    {
      id: "what-is-touch-typing",
      title: "What is touch typing?",
      details: [""],
    },
    {
      id: "all-about-positioning",
      title: "All about positioning",
      details: [""],
    },
    {
      id: "type-without-looking",
      title: "How do I type without looking?",
      details: [""],
    },
    {
      id: "improve-my-speed",
      title: "How do I improve my typing speed?",
      details: [""],
    },
    {
      id: "make-less-mistakes",
      title: "How can I make less mistakes?",
      details: [""],
    },
    {
      id: "typing-on-phone",
      title: "What about typing on my phone?",
      details: [""],
    },
    {
      id: "take-a-break",
      title: "Practice in moderation & take breaks!",
      details: [""],
    },
  ];

  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-14 py-12">
      <header>
        <h1 className="flex w-full justify-center font-nunito text-3xl text-defaultblue">
          Learn About Typing
        </h1>
      </header>
      <main className="flex flex-col items-center justify-center gap-10 font-nunito">
        {learningData.map((data, index) => (
          <div
            id={data.id}
            key={data.id}
            className="flex flex-col items-center justify-center gap-5"
          >
            <h2 className="font-lora text-2xl text-slate-800">{data.title}</h2>
            {data.details.map((detail) => (
              <p
                key={`${data.id}-description=${index}`}
                className="font-lato text-xl"
              >
                {detail}
              </p>
            ))}
          </div>
        ))}
        <FAQ />
      </main>
    </div>
  );
}
