import { useContext, useEffect } from "react";
import { MenuContext } from "../../providers/MenuProvider";
import calculateDifficulty from "../../utils/CalculateDifficulty";
import Icon from "../../utils/Icon";
import DropDownList from "./DropDownList";
import styles from "./styles/DropDownMenu.module.css";
import { v4 as uuidv4 } from "uuid";

interface PropType {
  labelText: string;
  iconName: string;
  setShowDifficultyMenu: (value: boolean) => void;
  showSettingsBtn: boolean;
}

function DropDownMenu({ setShowDifficultyMenu, showSettingsBtn }: PropType) {
  const { difficultyPoints, difficultySettings, currentDifficulty } =
    useContext(MenuContext);

  const id = uuidv4();

  const handleDisplayDifficulty = () => {
    const result = calculateDifficulty({
      targetDifficulty: currentDifficulty,
      difficultySettings,
      difficultyPoints,
    });

    return (
      <div
        className="flex justify-center items-center gap-2 cursor-pointer"
        title={`Difficulty: ${result.difficultyText}`}
      >
        <div className="flex justify-center items-center">
          <Icon
            icon="boxingGlove"
            customStyle={`flex ${result.iconColour} z-[1]`}
          />
          <Icon
            icon="flame"
            customStyle={`${result.iconTwoColour} flex absolute scale-[1.7] scale-x-[1.8] -translate-y-[0.3em] z-[0] text-red-600`}
          />
        </div>
        <span>Difficulty:</span>
      </div>
    );
  };

  useEffect(() => {
    function handleClick(event) {
      const element = document.getElementById("drop-down-wrapper"); //Did not use ref here because when I re-use the component, the wrapper ref doesn't update.

      // Close drop-down menu user clicks outside this component
      if (element && !element.contains(event.target)) {
        const inputElement = document.getElementById(
          `custom-drop-down${id}`
        ) as HTMLInputElement;

        inputElement.checked = false;
      }
    }

    // Bind the click event listener
    document.addEventListener("mousedown", handleClick);

    // Unbind the click event listener on clean up
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [id]);

  return (
    <div className="flex justify-center items-center gap-1">
      <div
        id={"drop-down-wrapper"}
        className="flex justify-center items-center"
      >
        <input
          id={"custom-drop-down" + id}
          aria-label="hidden input toggle option to display custom drop-down menu"
          type="checkbox"
          className={`${styles["drop-down-input"]} absolute`}
        />
        <label
          aria-label="label for custom drop-down menu"
          htmlFor={"custom-drop-down" + id}
          className={`${styles["drop-down-menu"]} flex justify-center items-center  gap-3 cursor-pointer outline-default-sky-blue rounded-md`}
        >
          {handleDisplayDifficulty()}
          <div
            className={` flex relative w-[11em] gap-5 text-slate-500 cursor-pointer bg-white`}
          >
            <div
              role="label"
              aria-label="selected option for custom select menu"
              className={`${
                styles && styles.difficulty
              } difficulty flex w-full border-2 p-[0.35em] rounded-md pl-4 text-base gap-2`}
            >
              <span className="capitalize">{currentDifficulty.length > 10 ? currentDifficulty.slice(0, 9) + "..." : currentDifficulty}</span>
            </div>
            <Icon
              icon="chevron"
              title="chevron-icon"
              customStyle={`flex absolute right-1 top-[20%] pr-2`}
            />
            <DropDownList />
          </div>
        </label>
      </div>
      {showSettingsBtn && (
        <button
          type="button"
          onClick={() => setShowDifficultyMenu(true)}
          className="flex relative py-[0.4em] px-3 outline-green-900 hover:text-start-btn-green hover:cursor-pointer rounded-md"
        >
          <Icon
            title="Difficulty Settings"
            customStyle="flex justify-center items-center "
            icon="settingsSparkle"
          />
        </button>
      )}
    </div>
  );
}

export default DropDownMenu;
