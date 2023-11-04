import { useEffect } from "react";
import Icon from "../utility/Icon";

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
      className="flex flex-col items-center gap-10 mx-14 mt-12 mb-4 sm:mx-5 text-l sm:text-2xl text-defaultblue"
    >
      <h2 className="flex gap-5 justify-center items-center w-full text-2xl text-center sm:text-[1.72rem] leading-relaxed">
        <Icon
          title="confetti-icon-1"
          customStyle="inline-flex scale-y-150 -scale-x-150 text-defaultgreen brightness-75"
          icon="confetti"
        />
        <span className="max-w-[40rem]">
          Congratulations on completing the{" "}
          <span className="text-defaultgreen brightness-50">
            {testTime / 60} min test
          </span>{" "}
          on{" "}
          <span className="text-defaultgreen brightness-50">
            medium difficulty!
          </span>
        </span>
        <Icon
          title="confetti-icon-2"
          customStyle="inline-flex scale-150 text-defaultgreen brightness-75"
          icon="confetti"
        />
      </h2>
      <p className="text-center leading-relaxed text-xl sm:text-2xl max-w-[40rem] ">
        Your speed was{" "}
        <span className="text-defaultgreen brightness-50 leading-relaxed ">
          {stats.wpm} words per min
        </span>{" "}
        and{" "}
        <span className="text-defaultgreen brightness-50 leading-relaxed ">
          {stats.cpm} characters per min
        </span>{" "}
        with{" "}
        <span className="text-defaultgreen brightness-50 leading-relaxed ">
          {stats.accuracy}%
        </span>{" "}
        accuracy.
      </p>

      <p className="flex w-full justify-evenly text-defaultgreen brightness-50 text-center text-lg sm:text-[1.4rem] ">
        <span className="w-full">Chars Misspelled: {stats.mistakes}</span>
        <span className="text-defaultblue">|</span>
        <span className="w-full">
          Words Misspelled: {Math.ceil(stats.mistakes / 5)}
        </span>
      </p>
      <p className="flex w-full justify-evenly text-defaultgreen brightness-50 text-center text-lg sm:text-[1.4rem]">
        <span className="w-full">Correct Chars: {stats.correct} </span>
        <span className="text-defaultblue">|</span>
        <span className="w-full">
          Correct Words: {Math.floor(stats.correct / 5)}
        </span>
      </p>
      <p className="flex w-full justify-evenly text-defaultgreen brightness-50 text-center text-lg sm:text-[1.4rem]">
        <span className="w-full">
          Total Chars: {stats.mistakes + stats.correct}
        </span>
        <span className="text-defaultblue">|</span>
        <span className="w-full">
          Total Words: {Math.ceil((stats.mistakes + stats.correct) / 5)}
        </span>
      </p>

      <div>
        <span className="flex gap-1 justify-center items-center">
          <span className="inline-flex">Performance:</span>
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-600"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-600"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-600"
            icon="starFull"
          />
          <Icon title="star-icon" customStyle="inline-flex " icon="starEmpty" />
          <Icon title="star-icon" customStyle="inline-flex " icon="starEmpty" />
        </span>
        <span className="flex gap-1 justify-center items-center opacity-60 scale-75">
          <span className="inline-flex">Best:</span>
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-600"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-600"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-600"
            icon="starFull"
          />
          <Icon title="star-icon" customStyle="inline-flex " icon="starEmpty" />
          <Icon title="star-icon" customStyle="inline-flex " icon="starEmpty" />
        </span>
      </div>

      <div>
        <div className="flex gap-1 justify-center items-center">
          <span>Score:</span>
          <span className="inline-flex text-[1.7rem]  text-yellow-600">
            1,000
          </span>
          <Icon
            title="trophy-icon"
            customStyle="inline-flex scale-125 text-yellow-600"
            icon="trophy"
          />
        </div>
        <div className="flex gap-1 justify-center items-center opacity-60 scale-75">
          <span>Best:</span>
          <span className="inline-flex text-[1.7rem]  text-yellow-600">
            1,000
          </span>
          <Icon
            title="trophy-icon"
            customStyle="inline-flex scale-125 text-yellow-600"
            icon="trophy"
          />
        </div>
      </div>

      <div className="flex justify-evenly max-w-3/4 text-md sm:text-lg w-full">
        <button
          type="button"
          onClick={() => {
            handleRestart();
          }}
          className="px-6 py-2 rounded-md bg-start-btn-green text-white tracking-wider hover:brightness-105 "
        >
          Try Again
        </button>
        <button
          type="button"
          onClick={showMainMenu}
          className="px-6 py-2 rounded-md bg-start-btn-green text-white tracking-wider hover:brightness-105"
        >
          Main Menu
        </button>
      </div>
    </div>
  );
}

export default GameOverMenu;
