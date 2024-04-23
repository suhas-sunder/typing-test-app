import { Link } from "react-router-dom";
import calculator from "../assets/images/calculator.png";
import loadable from "@loadable/component";

const SpeedCalculatorGame = loadable(() => import("./SpeedCalculatorGame"));

function Games() {
  const gamesList = [
    {
      id: "game_1",
      thumbnail: "thumbnail",
      title: "Speed Calculator",
      url: "/speed-calculator",
      componentName: SpeedCalculatorGame,
    },
  ];

  const loadComponent = (name) => {
    name.preload();
  };

  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-14 py-12">
      <header>
        <h1 className="flex w-full justify-center font-nunito text-3xl text-defaultblue">
          Typing Games
        </h1>
      </header>
      <main>
        {gamesList.map((item) => (
          <Link
            key={item.id}
            to={item.url}
            onMouseEnter={() => loadComponent(item.componentName)}
            className="flex w-[185px] flex-col items-center justify-center gap-4 rounded-md border-2 p-6 hover:cursor-pointer hover:border-default-light-sky-blue"
          >
            <img width={100} height={100} src={calculator} />
            <h2>{item.title}</h2>
          </Link>
        ))}
      </main>
    </div>
  );
}

export default Games;
