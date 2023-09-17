interface propType {
  handleRestart: () => void;
  showMainMenu: () => void;
}

function GameOverMenu({ handleRestart, showMainMenu }: propType) {
  // I can display stats once I get useContext data in place.
  const handleText = () => {
    return "1 Minute";
  };

  return (
    <div className="flex flex-col items-center gap-5 text-2xl w-10/12 mb-24 mt-10">
      <h2>{handleText()} Typing Test Completed!</h2>
      <p>Your speed was wpm and wpm with % accuracy.</p>
      <p>You typed x characters with x correct and x mistakes.</p>
      <p>You typed x words with x correct and x mistakes.</p>
      <div className="flex w-full justify-evenly mt-10">
        <button
          onClick={handleRestart}
          className="border rounded-lg p-4 pl-8 pr-8"
        >
          Try Again
        </button>
        <button
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
