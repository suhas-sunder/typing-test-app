import { ChangeEvent, useEffect } from "react";
import loadable from "@loadable/component";

const Icon = loadable(() => import("../../utils/Icon"));

interface PropType {
  handleDifficulty: (e: ChangeEvent<HTMLSelectElement>) => void;
  startGame: boolean;
}

function GameDifficultySettings({ handleDifficulty, startGame }: PropType) {
  //Preload/load all components on component mount
  useEffect(() => {
    Icon.load();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute -top-[6.5em] left-4 flex items-center justify-center gap-2">
      <label htmlFor="calculator-difficulty" className="text-lg">
        Difficulty:
      </label>
      <select
        id="calculator-difficulty"
        name="calculator_difficulty"
        onChange={(e) => handleDifficulty(e)}
        className={`rounded-lg border-2 px-2 py-0.5 text-sky-700 ${
          !startGame && "hover:border-sky-500"
        }`}
        disabled={startGame}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
        <option value="very hard">Very Hard</option>
        <option value="extremely hard">Extremely Hard</option>
        <option value="impossibly hard">Impossibly Hard</option>
      </select>
      <button
        disabled={startGame}
        title="Save As Default"
        className={`flex scale-75 text-slate-500 ${
          !startGame && "hover:text-sky-500"
        }`}
      >
        <Icon icon="save" customStyle="" title="save-icon" />
      </button>
    </div>
  );
}

export default GameDifficultySettings;
