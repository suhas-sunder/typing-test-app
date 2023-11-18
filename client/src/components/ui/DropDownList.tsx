import { v4 as uuidv4 } from "uuid";
import Icon from "../utility/Icon";
import styles from "./styles/DropDownMenu.module.css";

interface PropType {
  checkboxOptions: {
    [key: string]: { [key: string]: string[] | boolean };
  };
  setCheckboxOptions: (value: {
    [key: string]: { [key: string]: string[] | boolean };
  }) => void;
  currentDifficulty: string;
}

function DropDownList({
  checkboxOptions,
  setCheckboxOptions,
  currentDifficulty,
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
          className="flex gap-2 py-2 px-6 hover:bg-default-sky-blue hover:text-white"
        >
          <Icon
            icon="boxingGlove"
            title="boxing-glove-icon"
            customStyle={`scale-110`}
          />
          <span className="capitalize">{difficulty}</span>
        </li>
      ))}
    </ul>
  );
}

export default DropDownList;
