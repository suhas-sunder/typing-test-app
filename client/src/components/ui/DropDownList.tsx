import { v4 as uuidv4 } from "uuid";
import styles from "./styles/DropDownMenu.module.css";
import calculateDifficulty from "../../utils/CalculateDifficulty";
import Icon from "../../utils/Icon";
import { MenuContext } from "../../providers/MenuProvider";
import { useContext } from "react";

function DropDownList() {
  const {
    difficultyPoints,
    difficultySettings,
    currentDifficulty,
    setDifficultySettings,
  } = useContext(MenuContext);

  const handleMenuSelect = (difficulty: string) => {
    setDifficultySettings({
      ...difficultySettings,
      [currentDifficulty]: {
        ...difficultySettings[currentDifficulty],
        selected: false,
      },
      [difficulty]: {
        ...difficultySettings[difficulty],
        selected: true,
      },
    });
  };

  const handleDisplayDifficulty = (difficulty: string) => {
    const result = calculateDifficulty({
      difficultySettings,
      difficultyPoints,
      targetDifficulty: difficulty,
    });

    return (
      <div
        className="flex justify-center items-center gap-2 cursor-pointer"
        title={`Difficulty: ${result.difficultyText}`}
      >
        <div className="flex justify-center items-center relative">
          <Icon
            icon="boxingGlove"
            customStyle={`flex ${result.iconColour} z-[1]`}
          />
          <Icon
            icon="flame"
            customStyle={`${result.iconTwoColour} flex absolute scale-[1.7] scale-x-[1.8] -translate-y-[0.3em] z-[0] text-red-600`}
          />
        </div>
        <span className="capitalize">{difficulty}</span>
      </div>
    );
  };

  return (
    <ul
      role="listbox"
      id="drop-down-list"
      aria-label="custom select menu drop-down list"
      className={`${styles["difficulty-menu"]} flex-col min-w-[12.4em] top-10 absolute z-10 bg-white border-2 rounded-md text-base max-h-[25em] overflow-auto`}
    >
      {Object.keys(difficultySettings).map((difficulty) => (
        <li
          role="option"
          aria-label="custom select menu drop-down option"
          key={uuidv4()}
          onClick={() => handleMenuSelect(difficulty)}
          className="flex gap-2 py-[0.85em] px-3 hover:bg-default-sky-blue hover:text-white"
        >
          {handleDisplayDifficulty(difficulty)}
        </li>
      ))}
    </ul>
  );
}

export default DropDownList;
