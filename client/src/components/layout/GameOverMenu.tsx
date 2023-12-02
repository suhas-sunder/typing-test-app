import { useEffect } from "react";
import Button from "../ui/Button";
import TestResults from "./TestResults";
import TestScore from "./TestScore";

interface propType {
  handleRestart: () => void;
  showMainMenu: () => void;
  stats: { [prop: string]: number };
  testTime: number;
}

function GameOverMenu({
  handleRestart,
  showMainMenu,
  stats,
  testTime,
}: propType) {
  // Update database with player score and update data on context API.
  useEffect(() => {
    //
  }, []);

  return (
    // Display these stats ins a more presentable manner.
    <div
      data-testid="game-over-menu"
      className="text-l  mx-14 mb-4 mt-12 flex flex-col items-center gap-8 text-sky-600 sm:mx-5 sm:text-2xl"
    >
      <TestResults mistakes={stats.mistakes} correct={stats.correct} />

      <div>
        <h2 className="flex w-full items-center justify-center gap-5 text-center text-2xl leading-relaxed text-sky-700 sm:text-[1.72rem]">
          <span className="uppercase">
            Congratulations on completing the <span>{testTime / 60} min</span>{" "}
            test!
          </span>
        </h2>
      </div>

      <TestScore />

      <div className="max-w-3/4  text-md flex w-full justify-evenly sm:text-lg ">
        <Button
          title=""
          text="Try Again"
          handleOnClick={handleRestart}
          type="button"
          customStyle="px-6 py-2 rounded-md bg-sky-700 text-white "
        />
        <Button
          title=""
          text="Main Menu"
          handleOnClick={showMainMenu}
          type="button"
          customStyle="px-6 py-2 rounded-md bg-sky-700 text-white "
        />
      </div>
    </div>
  );
}

export default GameOverMenu;
