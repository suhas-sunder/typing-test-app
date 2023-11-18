import Icon from "../utility/Icon";
import DropDownList from "./DropDownList";
// import DropDownLabel from "./DropDownLabel";
import styles from "./styles/DropDownMenu.module.css";

interface PropType {
  labelText: string;
  iconName: string;
  checkboxOptions: {
    [key: string]: { [key: string]: string[] | boolean };
  };
  setCheckboxOptions: (value: {
    [key: string]: { [key: string]: string[] | boolean };
  }) => void;
  setShowDifficultyMenu: (value: boolean) => void;
  showSettingsBtn: boolean;
}

function DropDownMenu({
  checkboxOptions,
  setCheckboxOptions,
  // labelText,
  // iconName,
  setShowDifficultyMenu,
  showSettingsBtn,
}: PropType) {
  const currentDifficulty: string = Object.keys(checkboxOptions).filter(
    (option) => checkboxOptions[option].selected
  )[0];

  return (
    <div className="flex justify-center items-center gap-2">
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
        } flex relative justify-center items-center w-11/12 gap-5 cursor-pointer outline-default-sky-blue p-1 rounded-md`}
      >
        {/* <DropDownLabel
          labelText={labelText}
          iconName={iconName}
          iconStyle={menuData.filter((data) => data.selected)[0].customStyle}
        /> */}
        <div
          className={` flex relative w-[11em] gap-5 text-slate-500 cursor-pointer bg-white`}
        >
          <div
            aria-label="selected option for custom select menu"
            className={`${
              styles && styles.difficulty
            } difficulty flex w-full border-2 p-[0.35em] rounded-md pl-4 text-base gap-2`}
          >
            <span className="capitalize">{currentDifficulty.split("-").join(" ")}</span>
          </div>
          <Icon
            icon="chevron"
            title="chevron-icon"
            customStyle={`flex absolute right-1 top-[20%] pr-2`}
          />
          <DropDownList
            checkboxOptions={checkboxOptions}
            setCheckboxOptions={setCheckboxOptions}
            currentDifficulty={currentDifficulty}
          />
        </div>
      </label>
      {showSettingsBtn && (
        <button
          type="button"
          onClick={() => setShowDifficultyMenu(true)}
          className="flex relative py-[0.4em] px-3 outline-green-900 hover:text-start-btn-green hover:cursor-pointer rounded-md"
        >
          <Icon
            title="settings-icon"
            customStyle="flex relative justify-center items-center "
            icon="settingsSparkle"
          />
        </button>
      )}
    </div>
  );
}

export default DropDownMenu;
