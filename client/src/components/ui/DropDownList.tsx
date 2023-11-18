import { v4 as uuidv4 } from "uuid";
import styles from "./styles/DropDownMenu.module.css";
import CalculateDifficulty from "../utility/CalculateDifficulty";

interface PropType {
  checkboxOptions: {
    [key: string]: { [key: string]: string[] | boolean };
  };
  setCheckboxOptions: (value: {
    [key: string]: { [key: string]: string[] | boolean };
  }) => void;
  currentDifficulty: string;
  difficultyPoints: { [key: string]: { [key: string]: string } };
}

function DropDownList({
  checkboxOptions,
  setCheckboxOptions,
  currentDifficulty,
  difficultyPoints,
}: PropType) {
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

    // Update settings data to reflect current selection from drop-down
    setCheckboxOptions({
      ...checkboxOptions,
      [currentDifficulty]: {
        settings: checkboxOptions[currentDifficulty].settings,
        selected: false,
      },
      [difficulty]: {
        settings: checkboxOptions[difficulty].settings,
        selected: true,
      },
    });

    console.log(checkboxOptions);
  };

  return (
    <ul
      id="drop-down-list"
      aria-label="custom select menu drop-down list"
      className={`${
        styles && styles["difficulty-menu"]
      } hidden flex-col w-full top-10 absolute z-10 bg-white border-2 rounded-md overflow-hidden text-base`}
    >
      {Object.keys(checkboxOptions).map((difficulty) => (
        <li
          aria-label="custom select menu drop-down option"
          key={uuidv4()}
          onClick={() => handleMenuSelect(difficulty)}
          className="flex gap-2 py-[0.85em] px-3 hover:bg-default-sky-blue hover:text-white"
        >
          <CalculateDifficulty
            targetDifficulty={difficulty}
            checkboxOptions={checkboxOptions}
            difficultyPoints={difficultyPoints}
            displayLabel={false}
            customText={difficulty.split("-").join(" ")}
          />
        </li>
      ))}
    </ul>
  );
}

export default DropDownList;
