import { v4 as uuidv4 } from "uuid";
import styles from "./styles/DropDownMenu.module.css";
import calculateDifficulty from "../../utils/CalculateDifficulty";
import Icon from "../../utils/Icon";
import { MenuContext } from "../../providers/MenuProvider";
import { useContext } from "react";

function DropDownList() {
  const { difficultyPoints, checkboxOptions, currentDifficulty } =
    useContext(MenuContext);

  const handleMenuSelect = (difficulty: string) => {
    const listElement = document.getElementById("drop-down-list");

    const resetHiddenMenu = () => {
      listElement &&
        styles &&
        listElement.classList.add(styles["difficulty-menu"]); //Add back class that handles menu-open
    };

    // Hide menu
    if (listElement !== null && styles !== null) {
      listElement.classList.remove(styles["difficulty-menu"]); //Remove class that handles menu-open
      setTimeout(resetHiddenMenu, 100);
    }

    console.log(difficulty, currentDifficulty);

    // Update settings data to reflect current selection from drop-down
    // setCheckboxOptions({
    //   ...checkboxOptions,
    //   [currentDifficulty]: {
    //     settings: checkboxOptions[currentDifficulty].settings,
    //     selected: false,
    //   },
    //   [difficulty]: {
    //     settings: checkboxOptions[difficulty].settings,
    //     selected: true,
    //   },
    // });

    console.log(checkboxOptions);
  };

  const handleDisplayDifficulty = (difficulty: string) => {
    const result = calculateDifficulty({
      checkboxOptions,
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
      className={`${
        styles && styles["difficulty-menu"]
      } hidden flex-col w-full top-10 absolute z-10 bg-white border-2 rounded-md overflow-hidden text-base`}
    >
      {Object.keys(checkboxOptions).map((difficulty) => (
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
