
interface propType {
  handleRestart: () => void;
  showMainMenu: () => void;
}

function GameOverMenu({ handleRestart, showMainMenu }: propType) {
  return (
    <div className="flex justify-evenly w-10/12 mb-24">
      <button onClick={handleRestart}>Try Again</button>
      <button onClick={showMainMenu}>Main Menu</button>
    </div>
  );
}

export default GameOverMenu;
