import { useContext } from "react";
import { MenuContext } from "../../providers/MenuProvider";
import calculateDifficulty from "../../utils/CalculateDifficulty";
import Icon from "../../utils/Icon";
import DropDownList from "./DropDownList";
import styles from "./styles/DropDownMenu.module.css";

interface PropType {
  labelText: string;
  iconName: string;
  setShowDifficultyMenu: (value: boolean) => void;
  showSettingsBtn: boolean;
}

function DropDownMenu({ setShowDifficultyMenu, showSettingsBtn }: PropType) {  
  const { difficultyPoints, checkboxOptions, currentDifficulty } =
    useContext(MenuContext);

  const handleDisplayDifficulty = () => {
    const result = calculateDifficulty({
      targetDifficulty: currentDifficulty,
      checkboxOptions,
      difficultyPoints,
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
        <span>Difficulty:</span>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center gap-1">
      <input
        id="custom-drop-down"
        aria-label="hidden toggle option to display custom drop-down menu"
        type="checkbox"
        className="absolute"
      />
      <label
        aria-label="label for custom drop-down menu"
        htmlFor={"custom-drop-down"}
        className={`${
          styles && styles["drop-down-menu"]
        } flex relative justify-center items-center w-11/12 gap-2 cursor-pointer outline-default-sky-blue p-1 rounded-md`}
      >
        {handleDisplayDifficulty()}
        <div
          className={` flex relative w-[11em] gap-5 text-slate-500 cursor-pointer bg-white`}
        >
          <div
            tabIndex={0}
            role="label"
            aria-label="selected option for custom select menu"
            className={`${
              styles && styles.difficulty
            } difficulty flex w-full border-2 p-[0.35em] rounded-md pl-4 text-base gap-2`}
          >
            <span className="capitalize">{currentDifficulty}</span>
          </div>
          <Icon
            icon="chevron"
            title="chevron-icon"
            customStyle={`flex absolute right-1 top-[20%] pr-2`}
          />
          <DropDownList />
        </div>
      </label>
      {showSettingsBtn && (
        <button
          type="button"
          onClick={() => setShowDifficultyMenu(true)}
          className="flex relative py-[0.4em] px-3 outline-green-900 hover:text-start-btn-green hover:cursor-pointer rounded-md"
        >
          <Icon
            title="Difficulty Settings"
            customStyle="flex relative justify-center items-center "
            icon="settingsSparkle"
          />
        </button>
      )}
    </div>
  );
}

export default DropDownMenu;
