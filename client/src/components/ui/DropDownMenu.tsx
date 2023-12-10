import { useContext, useEffect } from "react";
import { MenuContext } from "../../providers/MenuProvider";
import calculateDifficulty from "../../utils/CalculateDifficulty";
import Icon from "../../utils/Icon";
import styles from "./styles/DropDownMenu.module.css";
import { v4 as uuidv4 } from "uuid";
import loadable from "@loadable/component";
import DifficultyLabel from "../svg/DifficultyLabel";

const DropDownList = loadable(() => import("./DropDownList"));
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
        className="flex -translate-x-8 cursor-pointer items-center justify-center gap-2 sm:translate-x-0"
        title={`Difficulty: ${result.difficultyText}`}
      >
        <div className="flex items-center justify-center">
          <Icon
            icon="boxingGlove"
            customStyle={`flex ${result.iconColour} z-[1]`}
          />
          <Icon
            icon="flame"
            customStyle={`${result.iconTwoColour} flex absolute scale-[1.7] scale-x-[1.8] -translate-y-[0.3em] z-[0] text-red-600`}
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

  // Prelod all lazyloaded components after delay
  useEffect(() => {
    const handlePreload = () => {
      DropDownList.preload();
    };

    const timer = setTimeout(handlePreload, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id={"drop-down-wrapper"}
      className="relative z-10 flex translate-x-4 items-center justify-center sm:translate-x-0"
    >
      <input
        id={"custom-drop-down" + id}
        aria-label="hidden input toggle option to display custom drop-down menu"
        type="checkbox"
        className={`${styles["drop-down-input"]} absolute top-10 sm:top-0`}
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
              aria-label="selected option for custom drop-down menu"
              className={`${
                styles && styles.difficulty
              } difficulty flex w-full gap-2  rounded-md border-2 p-[0.35em] pl-4 text-base text-sky-700`}
            >
              <span className="capitalize">
                {currentDifficulty.length > 10
                  ? currentDifficulty.slice(0, 9) + "..."
                  : currentDifficulty}
              </span>
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
              className="relative flex rounded-md px-3 py-[0.4em] outline-green-900 hover:scale-105 hover:cursor-pointer  hover:text-sky-500"
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
    </div>
  );
}

export default DropDownMenu;
