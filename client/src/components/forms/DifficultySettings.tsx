import { Fragment, useEffect, useState } from "react";
import styles from "./styles/StartMenu.module.css";
import { v4 as uuidv4 } from "uuid";

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
import Icon from "../utility/Icon";
import DropDownMenu from "../ui/DropDownMenu";

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
            <Fragment key={uuidv4()}>
              <input
                id={`${index}-test-settings`}
                name="text-setting"
                type="checkbox"
                className="hidden relative"
                defaultChecked={index < 0 ? true : false}
                value={option}
              />
              <label
                key={uuidv4()}
                title={`${handleToolTip(option)}`}
                htmlFor={`${index}-test-settings`}
                className={`${styles["menu-label"]} flex relative justify-center m-auto border-2 border-slate-200 rounded-md p-2 px-5 w-full text-sm hover:text-default-sky-blue cursor-pointer hover:border-default-light-sky-blue hover:font-medium`}
              >
                {option}
              </label>
            </Fragment>
          ))}
        </div>
      );

    // Display difficulty settings for each difficulty stored in drop-down menu
    for (const [key, value] of Object.entries(checkboxOptions)) {
      if (key.split("-").join(" ") === currentDifficulty && value.length !== 0)
        return (
          <div className="grid relative grid-cols-3 gap-6 mb-4 mt-2">
            {value.map((option) => (
              <div
                key={uuidv4()}
                title={`${handleToolTip(option)}`}
                className={`${styles["menu-label"]} flex relative justify-center m-auto border-2  rounded-md p-2 px-5 w-full text-sm border-default-light-sky-blue hover:font-medium`}
              >
                {option}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="flex relative flex-col justify-center items-center gap-6 px-10 py-10 rounded-xl bg-white z-30">
      <button
        className="absolute top-0 right-0 mx-3 my-2"
        onClick={() => setShowDifficultyMenu(false)}
      >
        <Icon
          icon="closeBtn"
          customStyle=" cursor-pointer hover:text-default-sky-blue"
          title="close-btn-icon"
        />
      </button>
      <h2>Difficulty Settings</h2>
      {createCustomSetting ? (
        <div>
          <label htmlFor="custom-difficulty" className="cursor-pointer">
            Setting Name:
          </label>
          <input
            id="custom-difficulty"
            autoFocus
            type="text"
            placeholder="Enter Setting Name"
            className="border-2 rounded-md p-1 pl-4 text-base"
          />
        </div>
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
          <button
            type="button"
            onClick={() => setCreateCustomSetting(true)}
            className="bg-start-btn-green text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:brightness-105"
          >
            Add New
          </button>
        </div>
      )}

      {handleDisplayOptions()}
      {createCustomSetting && (
        <p>
          If no options are selected, default text will be displayed (medium
          difficulty).
        </p>
      )}
      <div
        className="cursor-pointer"
        title="Maximum possible bonus score is calculated based on the combined difficulty of all options selected above."
      >
        Score Bonus: +1000
      </div>
      {createCustomSetting && (
        <div
          className="cursor-pointer"
          title="Custom difficulty setting is calculated based on the combined difficulty of all options selected above."
        >
          Difficulty Level: *****{" "}
        </div>
      )}
      <div className="flex w-full justify-evenly text-sm">
        {difficultySetting.map((setting, index) => {
          if (
            setting.difficulty.toLowerCase() === currentDifficulty &&
            index > 4
          )
            return (
              <Button
                text="Delete Custom Difficulty"
                handleOnClick={() => setShowDifficultyMenu(false)}
                type="button"
                customStyle="px-6 py-2 bg-slate-400 text-white bg-red-500 hover:brightness-105"
              />
            );
        })}
        {createCustomSetting && (
          <Button
            text="Save Custom Difficulty"
            handleOnClick={() => setShowDifficultyMenu(false)}
            type="button"
            customStyle="px-6 py-2 bg-slate-400 text-white bg-start-btn-green hover:brightness-105"
          />
        )}
      </div>
    </div>
  );
}

export default DifficultySettings;
