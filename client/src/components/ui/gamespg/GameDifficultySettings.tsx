import { ChangeEvent } from "react";
import { HashLink } from "react-router-hash-link";
import Icon from "../../../utils/other/Icon";


interface PropType {
  handleDifficulty: (e: ChangeEvent<HTMLSelectElement>) => void;
  startGame: boolean;
  anchorURL: string;
  difficultyLevel: string;
}

function GameDifficultySettings({
  handleDifficulty,
  startGame,
  anchorURL,
  difficultyLevel,
}: PropType) {

  return (
    <div
      className={` ${
        startGame ? "text-slate-500" : "text-defaultblue"
      } left-4 flex items-center justify-center gap-3`}
    >
      <HashLink
        to={anchorURL}
        className={`hidden -translate-y-[0.5px] scale-75 text-slate-400 hover:text-sky-500  sm:flex`}
      >
        <Icon  icon="info" customStyle="" title="info-icon" />
      </HashLink>
      <label htmlFor="calculator-difficulty" className={` text-lg`}>
        Difficulty:
      </label>
      <select
        id="calculator-difficulty"
        name="calculator_difficulty"
        onChange={(e) => handleDifficulty(e)}
        className={`rounded-lg border-2 px-3 py-1 ${
          startGame ? "text-slate-500" : "text-sky-700"
        } ${!startGame && "hover:border-sky-500"}`}
        defaultValue={difficultyLevel}
        disabled={startGame}
      >
        <option value="very easy">Very Easy</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
        <option value="very hard">Very Hard</option>
        <option value="extremely hard">Extremely Hard</option>
      </select>
    </div>
  );
}

export default GameDifficultySettings;
