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
    <div className="flex flex-col items-center gap-5 text-2xl w-10/12 mb-24 mt-10">
      <h2> Congratulations on completing the {testTime} test!</h2>
      <p>
        Your speed was {stats.wpm} WPM and {stats.cpm} CPM with {stats.accuracy}
        % accuracy.
      </p>
      <p>
        Total chars typed: {stats.mistakes + stats.correct}, Correct chars:
        {stats.correct} correct and {stats.mistakes} mistakes.
      </p>
      <p>
        You typed {Math.floor((stats.mistakes + stats.correct) / 5)} words
        total!
      </p>

      <p>
        You spelled {Math.floor(stats.correct / 5)} words correctly, and spelled{" "}
        {Math.floor(stats.mistakes / 5)} words wrong.
      </p>

      <div className="flex w-full justify-evenly mt-10">
        <button
          type="button"
          onClick={handleRestart}
          className="border rounded-lg p-4 pl-8 pr-8"
        >
          Try Again
        </button>
        <button
          type="button"
          onClick={showMainMenu}
          className="border rounded-lg p-4 pl-8 pr-8"
        >
          Main Menu
        </button>
      </div>
    </div>
  );
}

export default GameOverMenu;
