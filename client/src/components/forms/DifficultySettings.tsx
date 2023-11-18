import { useState, useRef } from "react";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../ui/Button";
import DropDownMenu from "../ui/DropDownMenu";
import DifficultySettingInputs from "./DifficultySettingInputs";
import SettingNameInputs from "./SettingNameInputs";
import CalculateDifficulty from "../utility/CalculateDifficulty";
import CalculateBonusScore from "../utility/CalculateBonusScore";

interface PropType {
  checkboxOptions: {
    [key: string]: { [key: string]: string[] | boolean };
  };
  setCheckboxOptions: (value: {
    [key: string]: { [key: string]: string[] | boolean };
  }) => void;
  difficultyPoints: { [key: string]: { [key: string]: string } };
  setShowDifficultyMenu: (value: boolean) => void;
}

function DifficultySettings({
  checkboxOptions,
  setCheckboxOptions,
  difficultyPoints,
  setShowDifficultyMenu,
}: PropType) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [customSettingsChecked, setCustomSettingsChecked] = useState<string[]>(
    []
  );

  const [createCustomSetting, setCreateCustomSetting] =
    useState<boolean>(false);

  const currentDifficulty: string = Object.keys(checkboxOptions).filter(
    (option) => checkboxOptions[option].selected
  )[0];

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
          className="grid relative grid-cols-3 gap-6 mb-4 mt-2"
        >
          {customDifficultyOptions.map((option, index) => (
            <Fragment key={uuidv4()}>
              <DifficultySettingInputs
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

    // Display summary of setting presets for current difficulty saved in drop-down menu.
    for (const key of Object.keys(checkboxOptions)) {
      const settings = checkboxOptions[key].settings as string[];

      if (key === currentDifficulty && settings.length !== 0)
        return (
          <div
            className={`${
              (settings.length === 2 && "grid-cols-2") ||
              (settings.length > 2 && "grid-cols-3")
            } grid relative  gap-6 mb-4 mt-2 cursor-default`}
          >
            {settings.map((option, index) => (
              <Fragment key={uuidv4()}>
                <DifficultySettingInputs
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
  const handleUpdateSettings = () => {
    const difficultyName = inputRef.current?.value.toLowerCase().trim() || "";
    console.log(checkboxOptions, customSettingsChecked);

    if (!Object.prototype.hasOwnProperty.call(checkboxOptions, difficultyName))
      setCheckboxOptions({
        ...checkboxOptions,
        [currentDifficulty]: {
          settings: checkboxOptions[currentDifficulty].settings,
          selected: false,
        },
        [difficultyName]: { settings: customSettingsChecked, selected: true },
      });
  };

  // Delete custom difficulty setting
  const deleteCustomDifficulty = () => {
    delete checkboxOptions[currentDifficulty];
    setCheckboxOptions({
      ...checkboxOptions,
      medium: { settings: [], selected: true },
    });
  };

  // Display delete button for custom difficulty settings
  const handleShowDeleteBtn = () => {
    let returnButton = false;
    Object.keys(checkboxOptions).forEach((option, index) => {
      console.log(option, currentDifficulty, index);
      if (option === currentDifficulty && index > 4) {
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

  return (
    <>
      {createCustomSetting ? (
        <>
          <h2 className="text-xl">Create Custom Difficulty</h2>
          <SettingNameInputs inputRef={inputRef} />
          {handleDisplayOptions()}
          <p className="text-center text-sm max-w-[40em] leading-loose">
            If no options are selected, default text will be displayed (medium
            difficulty: sentence case with punctuation).
          </p>
          <CalculateBonusScore
            currentDifficulty={currentDifficulty}
            createCustomSetting={createCustomSetting}
            checkboxOptions={checkboxOptions}
            customSettingsChecked={customSettingsChecked}
            difficultyPoints={difficultyPoints}
          />
          <CalculateDifficulty
            targetDifficulty={"custom-settings"}
            checkboxOptions={{
              "custom-settings": {
                settings: customSettingsChecked,
                selected: false,
              },
            }}
            difficultyPoints={difficultyPoints}
            displayLabel={true}
            customText=""
          />
          <div className="flex w-full justify-evenly">
            <Button
              title=""
              text="Save"
              handleOnClick={() => {
                if (
                  inputRef.current?.value &&
                  inputRef.current?.value.length <= 9
                ) {
                  setShowDifficultyMenu(false);
                  handleUpdateSettings();
                }
              }}
              type="button"
              customStyle="px-6 py-2 text-white bg-start-btn-green hover:brightness-105"
            />

            <Button
              title=""
              text="Cancel"
              handleOnClick={() => setCreateCustomSetting(false)}
              type="button"
              customStyle="px-6 py-2 text-white bg-slate-400 hover:bg-default-sky-blue"
            />
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl">Difficulty Settings</h2>
          <div className="flex justify-center items-center">
            <DropDownMenu
              difficultyPoints={difficultyPoints}
              checkboxOptions={checkboxOptions}
              setCheckboxOptions={setCheckboxOptions}
              labelText={"Difficulty:"}
              iconName="boxingGlove"
              setShowDifficultyMenu={setShowDifficultyMenu}
              showSettingsBtn={false}
            />
          </div>
          {handleDisplayOptions()}
          <CalculateBonusScore
            currentDifficulty={currentDifficulty}
            createCustomSetting={createCustomSetting}
            checkboxOptions={checkboxOptions}
            customSettingsChecked={customSettingsChecked}
            difficultyPoints={difficultyPoints}
          />
          <div className="flex gap-3">
            <Button
              text="Add New"
              type="button"
              title="Create custom difficulty"
              handleOnClick={() => setCreateCustomSetting(true)}
              customStyle="bg-start-btn-green text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:brightness-105"
            />
            {/* {handleShowSetDefaultBtn()} ADD THIS SETTING WHEN YOU HAVE A SET AS DEFAULT SETTING STORED ON DB. WHEN SETTINGS ARE FIRST LOADED or if the page is reloaded, USE THIS SETTING TO BE THE DEFAULT. */}
            {/* <Button
              text="Save As Default"
              type="button"
              title="Create custom difficulty"
              handleOnClick={() => setCreateCustomSetting(true)}
              customStyle="bg-default-sky-blue text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:brightness-105"
            /> */}
            {handleShowDeleteBtn()}
          </div>
        </>
      )}
    </>
  );
}

export default DifficultySettings;
