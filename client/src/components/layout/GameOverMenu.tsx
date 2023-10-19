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
    <div className="flex flex-col items-center gap-5 text-2xl w-10/12 mb-24 mt-10">
      <h2> Congratulations on completing the {testTime} test!</h2>
      <p>
        Your speed was {stats.wpm} WPM and {stats.cpm} CPM with {stats.accuracy}
        % accuracy.
      </p>
      <p>
        You typed {stats.mistakes + stats.correct} characters with{" "}
        {stats.correct} correct and {stats.mistakes} mistakes.
      </p>
      <p>You typed x words with x correct and x mistakes.</p>
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
