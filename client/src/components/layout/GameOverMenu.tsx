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
  return (
    // Display these stats ins a more presentable manner.
    <div className="flex flex-col items-center gap-12 text-2xl w-11/12 mt-12 mb-4">
      <h2 className="text-defaultblue text-3xl text-center">
        {" "}
        Congratulations on completing the {testTime / 60} min test!
      </h2>
      <p className="text-center">
        Your speed was{" "}
        <span className="text-defaultblue">{stats.wpm} Word Per Min</span> and{" "}
        <span className="text-defaultblue">{stats.cpm} Character Per Min</span>{" "}
        with <span className="text-defaultblue">{stats.accuracy}%</span>{" "}
        accuracy.
      </p>
      <p className="flex w-full justify-evenly text-defaultblue">
        <span className="w-full">
          Total Chars: {stats.mistakes + stats.correct}
        </span>
        <span>|</span>
        <span className="w-full text-right">
          Total Words: {Math.ceil((stats.mistakes + stats.correct) / 5)}
        </span>
      </p>
      <p className="flex w-full justify-evenly text-defaultblue">
        <span className="w-full">Chars Misspelled: {stats.mistakes}</span>
        <span>|</span>
        <span className="w-full text-right">
          Words Misspelled: {Math.ceil(stats.mistakes / 5)}
        </span>
      </p>
      <p className="flex w-full justify-evenly text-defaultblue">
        <span className="w-full">Correct Chars: {stats.correct} </span>
        <span>|</span>
        <span className="w-full text-right">
          Correct Words: {Math.ceil(stats.correct / 5)}
        </span>
      </p>

      <div className="flex justify-evenly w-3/4">
        <button
          type="button"
          onClick={handleRestart}
          className="px-6 py-2 rounded-md bg-start-btn-green text-white tracking-wider hover:brightness-105 text-lg"
        >
          Try Again
        </button>
        <button
          type="button"
          onClick={showMainMenu}
          className="px-6 py-2 rounded-md bg-start-btn-green text-white tracking-wider hover:brightness-105 text-lg"
        >
          Main Menu
        </button>
      </div>
    </div>
  );
}

export default GameOverMenu;
