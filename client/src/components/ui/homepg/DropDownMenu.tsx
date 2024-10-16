import { useContext, useEffect, useMemo } from "react";
import { MenuContext } from "../../../providers/MenuProvider";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles/DropDownMenu.module.css";
import CalculateDifficulty from "../../../utils/calculations/CalculateDifficulty";
import Icon from "../../../utils/other/Icon";
import DifficultyLabel from "../../svg/DifficultyLabel";
import Medium from "../../svg/Medium";
import DropDownList from "./DropDownList";

interface PropType {
  labelText: string;
  iconName: string;
  setShowDifficultyMenu: (value: boolean) => void;
  showSettingsBtn: boolean;
}

//Used by StartMenu.tsx component
function DropDownMenu({ setShowDifficultyMenu, showSettingsBtn }: PropType) {
  const { difficultyPoints, difficultySettings, currentDifficulty } =
    useContext(MenuContext);

  const difficultyCalculations = useMemo(
    () =>
      CalculateDifficulty({
        targetDifficulty: currentDifficulty,
        difficultySettings,
        difficultyPoints,
      }),
    [currentDifficulty, difficultyPoints, difficultySettings],
  );

  const id = uuidv4();

  const handleDisplayDifficulty = () => {
    return (
      <div
        className="flex -translate-x-8 cursor-pointer items-center justify-center gap-2 sm:translate-x-0"
        title={`Difficulty: ${difficultyCalculations.difficultyText}`}
      >
        <div className="flex min-h-[2em] min-w-[2em] items-center justify-center">
          <Icon
            title="boxing-glove-icon"
            icon="boxingGlove"
            customStyle={`flex ${difficultyCalculations.iconColour} z-[1]`}
          />
          <Icon
            title="flame-icon"
            icon="flame"
            customStyle={`${difficultyCalculations.iconTwoColour} flex absolute scale-[1.7] scale-x-[1.8] -translate-y-[0.3em] z-[0] text-red-600`}
          />
        </div>
        <DifficultyLabel />
      </div>
    );
  };

  useEffect(() => {
    function handleClick(event) {
      const element = document.getElementById("drop-down-wrapper"); //Did not use ref here because when I re-use the component, the wrapper ref doesn't update.

      // Close drop-down menu user clicks outside this component
      if (element && !element.contains(event.target)) {
        const inputElement = document.getElementById(
          `custom-drop-down${id}`,
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
    <>
      <input
        id={"custom-drop-down" + id}
        aria-label="hidden input toggle option to display custom drop-down menu"
        type="checkbox"
        className={`${styles["drop-down-input"]} absolute top-3/4 opacity-0 sm:top-1/2`}
      />
      <label
        aria-label="label for custom drop-down menu"
        htmlFor={"custom-drop-down" + id}
        className={`${styles["drop-down-menu"]} flex cursor-pointer flex-col items-start justify-center gap-3 rounded-md outline-default-sky-blue sm:flex-row sm:items-center`}
      >
        {handleDisplayDifficulty()}
        <div className="flex items-center justify-center">
          <div
            className={` relative flex w-[11em] cursor-pointer gap-5 bg-white text-slate-500`}
          >
            <div
              className={`${
                styles && styles.difficulty
              } difficulty flex h-[2.4em] w-[12.1em] gap-2 rounded-md border-2 p-[0.35em] pl-4 text-base text-sky-700`}
            >
              {currentDifficulty.toLowerCase() === "medium" ? (
                <Medium />
              ) : (
                <span className="capitalize">
                  {currentDifficulty.length > 10
                    ? currentDifficulty.slice(0, 9) + "..."
                    : currentDifficulty}
                </span>
              )}
            </div>
            <Icon
              icon="chevron"
              title="chevron-icon"
              customStyle={`flex absolute right-1 top-[20%] pr-2`}
            />
            <DropDownList />
          </div>
          {showSettingsBtn && (
            <button
              type="button"
              onClick={() => setShowDifficultyMenu(true)}
              className="relative flex min-h-[2.3em] min-w-[2.3em] items-center justify-center  rounded-md outline-green-900 hover:scale-105 hover:cursor-pointer hover:text-sky-500"
            >
              <Icon
                title="Difficulty Settings"
                customStyle="flex justify-center items-center "
                icon="settingsSparkle"
              />
            </button>
          )}
        </div>
      </label>
    </>
  );
}

export default DropDownMenu;
