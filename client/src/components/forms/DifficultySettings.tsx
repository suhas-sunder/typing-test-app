import { useEffect, useState } from "react";
import Icon from "../utility/Icon";

// Depending on difficulty settings passed in, determine which test settings should be applied
const checkboxOptions = {
  "very-easy": ["all lower case", "no punctuation"],
  easy: ["all lower case", "Digits 0 - 9"],
  medium: [],
  hard: ["PascalCase", "camelCase", "complex words", "MiXeDcAsE"],
  "very-hard": ["complex words", "P.u?n!c't+u*a~t>e^d", "N3u4m5b6e7r1e3d"],
  custom: [
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
  ],
};

const difficultyPoints: { [key: string]: { [key: string]: string } } = {
  "all lower case": {
    point: "0",
    level: "Very Easy",
  },
  "no punctuation": {
    point: "0",
    level: "Very Easy",
  },
  "ALL UPPER CASE": {
    point: "0",
    level: "Very Easy",
  },
  PascalCase: {
    point: "4",
    level: "Medium",
  },
  camelCase: {
    point: "4",
    level: "Medium",
  },
  MiXeDcAsE: {
    point: "16",
    level: "Hard",
  },
  snake_case: {
    point: "4",
    level: "Medium",
  },
  "Digits 0 - 9": {
    point: "2",
    level: "Easy",
  },
  "complex words": {
    point: "16",
    level: "Hard",
  },
  "P.u?n!c't+u*a~t>e^d": {
    point: "32",
    level: "Very Hard",
  },
  N3u4m5b6e7r1e3d: {
    point: "32",
    level: "Very Hard",
  },
  "no whitespace": {
    point: "16",
    level: "Hard",
  },
};

// Extremely Hard difficulty <= 70 pts overlay glove icon with light opaque flame

// Insanely Hard difficulty > 70 pts overlay glove icon with more visible opaque flame

import Button from "../ui/Button";
import DropDownMenu from "../ui/DropDownMenu";
import DifficultySettingInputs from "./DifficultySettingInputs";
import SettingNameInputs from "./SettingNameInputs";

interface Data {
  difficulty: string;
  customStyle: string;
  selected: boolean;
}

interface PropType {
  difficultySetting: Data[];
  setShowDifficultyMenu: (value: boolean) => void;
  setDifficultySetting: (value: Data[]) => void;
}

function DifficultySettings({
  setShowDifficultyMenu,
  difficultySetting,
  setDifficultySetting,
}: PropType) {
  const [createCustomSetting, setCreateCustomSetting] =
    useState<boolean>(false);

  const currentDifficulty = difficultySetting
    .filter((data) => data.selected)[0]
    .difficulty.toLowerCase();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const handleToolTip = (option: string) => {
    return "Difficulty: " + difficultyPoints[option].level;
  };

  // Display all difficulty options as a selectable checkbox to store new custom settings.
  const handleDisplayOptions = () => {
    if (createCustomSetting)
      return (
        <div className="grid relative grid-cols-3 gap-6 mb-4 mt-2">
          {checkboxOptions.custom.map((option, index) => (
            <DifficultySettingInputs
              setting={option}
              index={index}
              title={`${handleToolTip(option)}`}
              isSelectable={true}
            />
          ))}
        </div>
      );

    // Display summary of setting presets for current difficulty saved in drop-down menu.
    for (const [key, value] of Object.entries(checkboxOptions)) {
      if (key.split("-").join(" ") === currentDifficulty && value.length !== 0)
        return (
          <div className="grid relative grid-cols-3 gap-6 mb-4 mt-2 cursor-default">
            {value.map((option, index) => (
              <DifficultySettingInputs
                setting={option}
                index={index}
                title={`${handleToolTip(option)}`}
                isSelectable={false}
              />
            ))}
          </div>
        );
    }
  };

  const handleBonusScore = () => {
    return (
      <div
        className="flex justify-center items-center gap-2 cursor-default"
        title="Bonus score is calculated based on the combined difficulty of all options selected above."
      >
        <span>Score Bonus:</span>
        <span className="flex justify-center items-center text-yellow-600 gap-1">
          +1000 <Icon icon={"trophy"} customStyle="" />
        </span>
      </div>
    );
  };

  return (
    <>
      <h2 className="text-xl">
        {createCustomSetting
          ? "Create Custom Difficulty"
          : "Difficulty Settings"}
      </h2>
      {createCustomSetting ? (
        <SettingNameInputs />
      ) : (
        <div className="flex justify-center items-center">
          <DropDownMenu
            menuData={difficultySetting}
            labelText={"Difficulty:"}
            iconName="boxingGlove"
            setMenuData={setDifficultySetting}
            setShowDifficultyMenu={setShowDifficultyMenu}
            showSettingsBtn={false}
          />
          <Button
            text="Add New"
            type="button"
            title="Create custom difficulty"
            handleOnClick={() => setCreateCustomSetting(true)}
            customStyle="bg-start-btn-green text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:brightness-105"
          />
        </div>
      )}
      {handleDisplayOptions()}
      {createCustomSetting ? (
        <>
          <p className="text-center text-sm max-w-[40em] leading-loose">
            If no options are selected, default text will be displayed (medium
            difficulty: sentence case with punctuation).
          </p>
          {handleBonusScore()}
          <div
            className="cursor-pointer"
            title="Custom difficulty setting is calculated based on the combined difficulty of all options selected above."
          >
            Difficulty Level: *****{" "}
          </div>
          <div className="flex w-full justify-evenly">
            <Button
              title=""
              text="Save"
              handleOnClick={() => setShowDifficultyMenu(false)}
              type="button"
              customStyle="px-6 py-2 text-white bg-start-btn-green hover:brightness-105"
            />

            <Button
              title=""
              text="Cancel"
              handleOnClick={() => setShowDifficultyMenu(false)}
              type="button"
              customStyle="px-6 py-2 text-white bg-slate-400 hover:bg-default-sky-blue"
            />
          </div>
        </>
      ) : (
        <>
          {handleBonusScore()}
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
