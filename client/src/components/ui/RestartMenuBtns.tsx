import { Link } from "react-router-dom";
import Button from "./Button";

interface PropType {
  handleRestart: () => void;
  gameOver: boolean;
  url?: string;
  showMainMenu?: () => void;
}

export default function RestartMenuBtns({
  handleRestart,
  gameOver,
  url,
  showMainMenu,
}: PropType) {
  return (
    <div className="mt-2 flex w-full items-center justify-center gap-10">
      {showMainMenu && (
        <Button
          title=""
          text="Main Menu"
          handleOnClick={showMainMenu}
          type="button"
          customStyle="px-6 py-2 rounded-md bg-sky-700 text-white "
        />
      )}
      {url && (
        <Link
          to={url}
          className="min-w-12 flex min-w-[8em] items-center justify-center rounded-lg bg-sky-700 px-4 py-2 text-white hover:scale-105"
        >
          Games Menu
        </Link>
      )}
      <button
        className="flex min-w-[8em] items-center  justify-center rounded-lg bg-sky-700 px-4 py-2 text-white hover:scale-105"
        onClick={handleRestart}
      >
        {gameOver ? "Try Again" : "Restart"}
      </button>
    </div>
  );
}
