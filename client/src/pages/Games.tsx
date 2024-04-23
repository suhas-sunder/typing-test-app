import { Link } from "react-router-dom";
import calculator from "../assets/images/calculator.png";

function Games() {
  const gamesList = [
    {
      thumbnail: "thumbnail",
      title: "Speed Calculator",
      url: "/speed-calculator",
    },
  ];

  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-14 py-16">
      <header>
        <h1 className="flex w-full justify-center font-nunito text-4xl text-defaultblue">
          Typing Games
        </h1>
      </header>
      <main>
        {gamesList.map((item) => (
          <Link
            to={item.url}
            className="flex w-[185px] flex-col items-center justify-center gap-5 rounded-md border-2 p-5 hover:cursor-pointer hover:border-default-light-sky-blue"
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
