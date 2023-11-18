import { useState, useRef } from "react";
import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "../ui/Button";
import DropDownMenu from "../ui/DropDownMenu";
import DifficultySettingInputs from "./DifficultySettingInputs";
import SettingNameInputs from "./SettingNameInputs";
import CalculateDifficulty from "../utility/CalculateDifficulty";
import CalculateBonusScore from "../utility/CalculateBonusScore";

interface Data {
  difficulty: string;
  customStyle: string;
  selected: boolean;
}

interface PropType {
  difficultySetting: Data[];
  setShowDifficultyMenu: (value: boolean) => void;
  setDifficultySetting: (value: Data[]) => void;
  checkboxOptions: { [key: string]: string[] };
  difficultyPoints: { [key: string]: { [key: string]: string } };
  setCheckboxOptions: (value: { [key: string]: string[] }) => void;
}

function DifficultySettings({
  setShowDifficultyMenu,
  difficultySetting,
  setDifficultySetting,
  checkboxOptions,
  difficultyPoints,
  setCheckboxOptions
}: PropType) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [customSettingsChecked, setCustomSettingsChecked] = useState<string[]>(
    []
  );

  const [createCustomSetting, setCreateCustomSetting] =
    useState<boolean>(false);

  const currentDifficulty: string = difficultySetting
    .filter((data) => data.selected)[0]
    .difficulty.toLowerCase();

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

  // Extremely Hard difficulty <= 70 pts overlay glove icon with light opaque flame

  // Insanely Hard difficulty > 70 pts overlay glove icon with more visible opaque flame

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
    for (const [key, value] of Object.entries(checkboxOptions)) {
      if (key.split("-").join(" ") === currentDifficulty && value.length !== 0)
        return (
          <div className="grid relative grid-cols-3 gap-6 mb-4 mt-2 cursor-default">
            {value.map((option, index) => (
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

  const handleUpdateSettings = () => {
    const difficultyName = inputRef.current?.value.toLowerCase().trim() || "";
    console.log(checkboxOptions, customSettingsChecked);

    if (!Object.prototype.hasOwnProperty.call(checkboxOptions, difficultyName)) setCheckboxOptions({...checkboxOptions, [difficultyName]: customSettingsChecked})
      checkboxOptions[difficultyName] = customSettingsChecked;
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
            difficultySettings={customSettingsChecked}
            difficultyPoints={difficultyPoints}
            displayLabel={true}
            displayDifficulty={true}
          />
          <div className="flex w-full justify-evenly">
            <Button
              title=""
              text="Save"
              handleOnClick={() => {
                setShowDifficultyMenu(false);
                handleUpdateSettings();
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
            <div className="flex gap-2">
              <CalculateDifficulty
                difficultySettings={
                  checkboxOptions[
                    difficultySetting
                      .filter((difficulty) => difficulty.selected)[0]
                      .difficulty.toLowerCase()
                      .split(" ")
                      .join("-")
                  ]
                }
                difficultyPoints={difficultyPoints}
                displayLabel={true}
                displayDifficulty={false}
              />
              <DropDownMenu
                menuData={difficultySetting}
                labelText={"Difficulty:"}
                iconName="boxingGlove"
                setMenuData={setDifficultySetting}
                setShowDifficultyMenu={setShowDifficultyMenu}
                showSettingsBtn={false}
              />
            </div>
            <Button
              text="Add New"
              type="button"
              title="Create custom difficulty"
              handleOnClick={() => setCreateCustomSetting(true)}
              customStyle="bg-start-btn-green text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:brightness-105"
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
          <div className="flex w-full justify-evenly text-sm">
            {difficultySetting.map((setting, index) => {
              if (
                setting.difficulty.toLowerCase() === currentDifficulty &&
                index > 4
              )
                return (
                  <Button
                    title=""
                    text="Delete Custom Difficulty"
                    handleOnClick={() => setShowDifficultyMenu(false)}
                    type="button"
                    customStyle="px-6 py-2 bg-slate-400 text-white bg-red-500 hover:brightness-105"
                  />
                );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default DifficultySettings;
