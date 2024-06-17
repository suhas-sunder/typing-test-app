import { useMemo } from "react";
import useLoadAnimation from "../components/hooks/useLoadAnimation";
import Answers from "./Answers";
import LearnPgData from "../data/LearnPgData";

export default function Learn() {
  const learningData = useMemo(() => LearnPgData(), []);

  const { fadeAnim } = useLoadAnimation();

  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-14 py-12">
      <header>
        <h1 className="flex w-full justify-center font-nunito text-3xl text-defaultblue">
          Learn About Typing
        </h1>
      </header>
      <main
        className={`${fadeAnim} flex flex-col items-center justify-center gap-10 font-nunito`}
      >
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
        <Answers />
      </main>
    </div>
  );
}
