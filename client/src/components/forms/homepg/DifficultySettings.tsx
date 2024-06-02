import { useState, useRef, useContext, useEffect } from "react";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { MenuContext } from "../../../providers/MenuProvider";
import CalculateBonusScore from "../../../utils/calculations/CalculateBonusScore";
import CalculateDifficulty from "../../../utils/calculations/CalculateDifficulty";
import loadable from "@loadable/component";
import Button from "../../ui/shared/Button";
import styles from "../../layout/homepg/styles/SpeedTest.module.css";

const Icon = loadable(() => import("../../../utils/other/Icon"));

const DropDownMenu = loadable(() => import("../../ui/homepg/DropDownMenu"));

interface PropType {
  setShowDifficultyMenu: (value: boolean) => void;
}

type SettingInputsProps = {
  index: number;
  setting: string;
  title: string;
  isSelectable: boolean;
  customSettingsChecked: string[];
  setCustomSettingsChecked: (value: string[]) => void;
};

interface SettingNameProps {
  inputRef: React.RefObject<HTMLInputElement>;
}

// Used by DifficultySettings.tsx component
function SettingName({ inputRef }: SettingNameProps) {
  const [blurActive, setBlurActive] = useState<boolean>(false);
  const { difficultySettings } = useContext(MenuContext);

  const handleExistingName = () => {
    let namesMatch = false;
    Object.keys(difficultySettings).forEach((settingName) => {
      if (
        settingName.toLocaleLowerCase() ===
        inputRef.current?.value.toLowerCase()
      )
        namesMatch = true;
    });
    return namesMatch;
  };

  const handleInputError = () => {
    if (!inputRef.current?.value) {
      return (
        <span className="pt-2 text-sm text-red-400">
          **Setting name cannot be empty**
        </span>
      );
    } else if (inputRef.current?.value.length > 24) {
      return (
        <span className="pt-2 text-sm text-red-400">
          **Setting name must be less than 25 characters**
        </span>
      );
    } else if (handleExistingName()) {
      console.log("runs");
      return (
        <span className="pt-2 text-sm text-red-400">
          **Setting name already exists**
        </span>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex items-center justify-center gap-3">
        <label htmlFor="custom-difficulty" className="cursor-pointer">
          Setting Name:
        </label>
        <input
          ref={inputRef}
          id="custom-difficulty"
          autoFocus
          type="text"
          placeholder="Enter Setting Name"
          className={`${
            blurActive &&
            (!inputRef.current?.value ||
              inputRef.current?.value.length > 24 ||
              handleExistingName()) &&
            "border-red-300"
          } rounded-md border-2 p-1 pl-4 text-base`}
          onBlur={() => setBlurActive(true)}
          onFocus={() => setBlurActive(false)}
        />
      </div>
      {blurActive && handleInputError()}
    </div>
  );
}

//Display all difficulty options as a selectable checkbox to store new custom settings or display a summary of setting presets for current difficulty saved in drop-down menu..
function SettingInputs({
  setting,
  title,
  isSelectable,
  setCustomSettingsChecked,
  customSettingsChecked,
}: SettingInputsProps) {
  // Keep track of selected settings
  const handleSettingSelection = () => {
    customSettingsChecked.includes(setting)
      ? setCustomSettingsChecked(
          customSettingsChecked.filter(
            (checkedSetting) => checkedSetting !== setting,
          ),
        )
      : setCustomSettingsChecked([...customSettingsChecked, setting]);
  };

  return (
    <>
      {isSelectable ? (
        <div
          aria-label="Custom checkbox"
          title={title}
          onClick={() => handleSettingSelection()}
          className={`${
            customSettingsChecked.includes(setting)
              ? "border-default-light-sky-blue text-default-sky-blue"
              : "border-slate-200"
          } relative m-auto flex w-full cursor-pointer  justify-center rounded-md border-2 p-2 px-5 text-sm hover:border-default-light-sky-blue hover:font-medium hover:text-default-sky-blue`}
        >
          {setting}
        </div>
      ) : (
        <div
          title={title}
          className={`${styles["menu-label"]} relative m-auto flex w-full justify-center  rounded-md border-2 border-default-light-sky-blue p-2 px-5 text-sm hover:font-medium`}
        >
          {setting}
        </div>
      )}
    </>
  );
}
// Used by StartMenu.tsx and ProfileImageLink.tsx components
function DifficultySettings({ setShowDifficultyMenu }: PropType) {
  const {
    difficultyPoints,
    difficultySettings,
    currentDifficulty,
    setDifficultySettings,
    handleUpdateDatabase,
  } = useContext(MenuContext);

  const inputRef = useRef<HTMLInputElement>(null);
  const [customSettingsChecked, setCustomSettingsChecked] = useState<string[]>(
    [],
  );

  const [createCustomSetting, setCreateCustomSetting] =
    useState<boolean>(false);

  const [currentBonusScore, setCurrentBonusScore] = useState<number>();

  const customDifficultyOptions = [
    "all lower case",
    "no punctuation",
    "ALL UPPER CASE",
    "PascalCase",
    "camelCase",
    "MiXeDcAsE",
    "snake_case",
    "Digits 0 - 9",
    "complex words",
    "P.u?n!c't+u*a~t>e^d",
    "N3u4m5b6e7r1e3d",
    "no whitespace",
  ];

  // Add title to be displayed as tooltip
  const handleToolTip = (option: string) => {
    return `Difficulty: ${difficultyPoints[option].level}, Score Bonus: ${
      parseInt(difficultyPoints[option].point) * 20
    }`;
  };

  // Display all difficulty options as a selectable checkbox to store new custom settings.
  const handleDisplayOptions = () => {
    if (createCustomSetting)
      return (
        <div
          id="difficulty-checkboxes"
          className="relative mb-4 mt-2 grid grid-cols-3 gap-6"
        >
          {customDifficultyOptions.map((option, index) => (
            <Fragment key={uuidv4()}>
              <SettingInputs
                setting={option}
                index={index}
                title={`${handleToolTip(option)}`}
                isSelectable={true}
                customSettingsChecked={customSettingsChecked}
                setCustomSettingsChecked={setCustomSettingsChecked}
              />
            </Fragment>
          ))}
        </div>
      );

    // Display summary of setting presets for current difficulty saved in drop-down menu. (This is on the difficulty settings page, not custom difficulty (add new))
    for (const key of Object.keys(difficultySettings)) {
      const settings = difficultySettings[key].settings as string[];

      if (key === currentDifficulty && settings.length !== 0)
        return (
          <div
            className={`${
              (settings.length === 2 && "grid-cols-2") ||
              (settings.length > 2 && "grid-cols-3")
            } relative mb-4  mt-2 grid cursor-default gap-6`}
          >
            {settings.map((option, index) => (
              <Fragment key={uuidv4()}>
                <SettingInputs
                  setting={option}
                  index={index}
                  title={`${handleToolTip(option)}`}
                  isSelectable={false}
                  customSettingsChecked={customSettingsChecked}
                  setCustomSettingsChecked={setCustomSettingsChecked}
                />
              </Fragment>
            ))}
          </div>
        );
    }
  };

  // Update settings data with new custom settings and set it as the current setting (not default)
  const handleSaveSettings = () => {
    const difficultyName = inputRef.current?.value.toLowerCase().trim() || "";

    const difficultyLevel = CalculateDifficulty({
      targetDifficulty: "custom-settings",
      difficultySettings: {
        "custom-settings": {
          settings: customSettingsChecked,
          selected: false,
          default: true,
          scoreBonus: 1,
        },
      },
      difficultyPoints,
    }).difficultyText.toLowerCase();

    if (
      !Object.prototype.hasOwnProperty.call(difficultySettings, difficultyName)
    ) {
      // Update difficulty settings on context
      setDifficultySettings({
        ...difficultySettings,
        // Mark current difficulty as not selected
        [currentDifficulty]: {
          ...difficultySettings[currentDifficulty],
          selected: false,
        },
        [difficultyName]: {
          // Create new difficulty setting and mark it as the current selection
          settings: customSettingsChecked,
          difficultyLevel,
          selected: true,
          default: false,
          scoreBonus: currentBonusScore as number,
        },
      });

      // Create new difficulty settings on database
      handleUpdateDatabase(
        {
          [difficultyName]: {
            settings: customSettingsChecked,
            difficultyLevel,
            selected: false,
            default: false,
            scoreBonus: currentBonusScore as number,
          },
        },
        false,
      );
    }
  };

  // Delete custom difficulty setting
  const deleteCustomDifficulty = () => {
    //Delete difficulty setting on database
    handleUpdateDatabase(
      { [currentDifficulty]: difficultySettings[currentDifficulty] },
      true,
    );

    const newSettings = {};

    for (const [key, value] of Object.entries(difficultySettings)) {
      if (key === "medium") {
        newSettings[key] = { ...value, selected: true }; //Reset current selection to medium
      } else if (key !== currentDifficulty) {
        newSettings[key] = value; //Delete current item from difficulty settings
      }
    }
    // Update context
    setDifficultySettings(newSettings);
  };

  // Display delete button for custom difficulty settings
  const handleShowDeleteBtn = () => {
    let returnButton = false;
    Object.keys(difficultySettings).forEach((key) => {
      if (
        key === currentDifficulty &&
        !difficultySettings[currentDifficulty].default
      ) {
        returnButton = true;
      }
    });

    return returnButton ? (
      <Button
        title=""
        text="Delete"
        handleOnClick={() => deleteCustomDifficulty()}
        type="button"
        customStyle="bg-red-500 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:brightness-105"
      />
    ) : null;
  };

  const handleDisplayDifficulty = () => {
    // This is used to display the difficulty settings of all custom options selected in the create new custom-difficulty menu
    const result = CalculateDifficulty({
      targetDifficulty: "custom-settings",
      difficultySettings: {
        "custom-settings": {
          settings: customSettingsChecked,
          selected: false,
          default: true,
          scoreBonus: 1,
        },
      },
      difficultyPoints,
    });

    return (
      <div
        className="flex cursor-pointer items-center justify-center gap-2"
        title={`Difficulty: ${result.difficultyText}`}
      >
        <div className="relative flex items-center justify-center">
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
        <span>{result.difficultyText}</span>
      </div>
    );
  };

  const handleExistingName = () => {
    let namesMatch = false;
    Object.keys(difficultySettings).forEach((settingName) => {
      if (
        settingName.toLocaleLowerCase() ===
        inputRef.current?.value.toLowerCase()
      )
        namesMatch = true;
    });
    return namesMatch;
  };

  useEffect(() => {
    const result =
      1500 +
      CalculateBonusScore({
        currentDifficulty,
        createCustomSetting,
        difficultySettings,
        customSettingsChecked,
        difficultyPoints,
      }) *
        20;

    setCurrentBonusScore(result);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customSettingsChecked]);

  useEffect(() => {
    DropDownMenu.load();
    Icon.load();
  }, []);

  return (
    <>
      {createCustomSetting ? (
        <>
          <h2 className="text-xl">Create Custom Difficulty</h2>
          <SettingName inputRef={inputRef} />
          {handleDisplayOptions()}
          <p className="max-w-[40em] text-center text-sm leading-loose">
            If no options are selected, default text will be displayed (medium
            difficulty: sentence case with punctuation).
          </p>
          <div
            className="flex cursor-default items-center justify-center gap-2"
            title="Bonus score is calculated based on the combined difficulty of all options selected above."
          >
            <span>Score Bonus:</span>
            <span className="flex items-center justify-center gap-1 text-yellow-600">
              +{currentBonusScore} <Icon icon={"trophy"} customStyle="flex" />
            </span>
          </div>
          {handleDisplayDifficulty()}
          <div className="flex w-full justify-evenly">
            <Button
              title=""
              text="Save"
              handleOnClick={() => {
                if (
                  inputRef.current?.value &&
                  inputRef.current?.value.length <= 24 &&
                  !handleExistingName()
                ) {
                  setShowDifficultyMenu(false);
                  handleSaveSettings();
                }
              }}
              type="button"
              customStyle="px-6 py-2 text-white bg-sky-500 hover:brightness-105"
            />

            <Button
              title=""
              text="Cancel"
              handleOnClick={() => setCreateCustomSetting(false)}
              type="button"
              customStyle="px-6 py-2 text-white bg-sky-500"
            />
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl">Difficulty Settings</h2>
          <div
            id={"drop-down-wrapper"}
            className="relative z-10 flex min-h-[4em] translate-x-4 items-center justify-center sm:min-h-[2em] sm:translate-x-0"
          >
            <DropDownMenu
              labelText={"Difficulty:"}
              iconName="boxingGlove"
              setShowDifficultyMenu={setShowDifficultyMenu}
              showSettingsBtn={false}
            />
          </div>
          {handleDisplayOptions()}
          <div
            className="flex cursor-default items-center justify-center gap-2"
            title="Bonus score is calculated based on the combined difficulty of all options selected above."
          >
            <span>Score Bonus:</span>
            <span className="flex items-center justify-center gap-1 text-yellow-600">
              +
              {1500 +
                CalculateBonusScore({
                  currentDifficulty,
                  createCustomSetting,
                  difficultySettings,
                  customSettingsChecked,
                  difficultyPoints,
                }) *
                  20}
              <Icon icon={"trophy"} customStyle="flex" />
            </span>
          </div>
          <div className="flex gap-3">
            <Button
              text="Add New"
              type="button"
              title="Create custom difficulty"
              handleOnClick={() => setCreateCustomSetting(true)}
              customStyle="bg-sky-500 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:brightness-105"
            />
            {handleShowDeleteBtn()}
          </div>
        </>
      )}
    </>
  );
}

export default DifficultySettings;
