import { Link } from "react-router-dom";
import calculator from "../assets/images/calculator.png";
import loadable from "@loadable/component";
import { useLayoutEffect } from "react";
import useLoadAnimation from "../components/hooks/useLoadAnimation";
import useStats from "../components/hooks/useStats";
import usePerformanceStats from "../components/hooks/usePerformanceStats";

const PerformanceStars = loadable(
  () => import("../components/ui/shared/PerformanceStars"),
);
const SpeedCalculatorGame = loadable(() => import("./CalculatorGame"));

function Games() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const gamesList = [
    {
      id: "game_1",
      thumbnail: "thumbnail",
      title: "Calculator",
      testName: "calculator-game",
      url: "/games/calculator",
      componentName: SpeedCalculatorGame,
    },
  ];

  const { performanceStats } = useStats(); //Gets performance score from context

  usePerformanceStats({ testNameList: gamesList }); //Handles fetching of performance scores and saves to context

  const { fadeAnim } = useLoadAnimation();

  //Preload game page when user hovers over link to a specific game
  const loadComponent = (name) => {
    name.preload();
  };

  useLayoutEffect(() => {
    PerformanceStars.load();
  }, []);

  return (
    <div
      className={` mx-auto flex max-w-[900px] flex-col gap-14 py-12  font-nunito tracking-wider text-sky-700`}
    >
      <header>
        <h1 className="flex w-full justify-center text-3xl text-defaultblue">
          Typing Games
        </h1>
      </header>
      <main
        className={`${fadeAnim} mx-5 grid w-full grid-cols-2 gap-5 md:mx-auto md:grid-cols-4`}
      >
        {gamesList.map((item) => (
          <Link
            key={item.id}
            to={item.url}
            onMouseEnter={() => loadComponent(item.componentName)}
            className="relative mx-auto flex min-h-[16em] w-[195px] flex-col items-center justify-center gap-4 rounded-md border-2 border-slate-300 p-6 text-slate-600 hover:cursor-pointer hover:border-default-light-sky-blue hover:text-sky-700 "
          >
            <PerformanceStars
              customStyle={"absolute -bottom-[1.25rem] flex "}
              testName={item.testName}
              testTime={performanceStats[item.testName]?.testTime}
              wpm={performanceStats[item.testName]?.bestWPM}
            />
            <img
              alt="Typing game link preview"
              width={100}
              height={100}
              src={calculator}
            />
            <h2>{item.title}</h2>
          </Link>
        ))}
      </main>
    </div>
  );
}

export default Games;
