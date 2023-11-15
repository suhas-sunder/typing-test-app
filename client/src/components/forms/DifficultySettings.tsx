import { Fragment, useEffect } from "react";
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

// const checkboxOptions = [
//   "all lower case", Very Easy 0
//   "no punctuation", Very Easy 0
//   "ALL UPPER CASE", Very Easy 0
//   "PascalCase", Medium 4
//   "camelCase", Medium 4
//   "MiXeDcAsE", Hard 16
//   "snake_case", Medium 4
//   "Digits 0 - 9", Easy 2
//   "complex words" Hard 16
//   "P.u?n!c't+u*a~t>e^d", Very Hard 32
//   "N3u4m5b6e7r1e3d", Very Hard 32
//   "no whitespace", Hard 16
// ];

const difficultyPoints = [
  {
    option: "all lower case",
    point: "0",
    level: "Very Easy",
  },
  {
    option: "no punctuation",
    point: "0",
    level: "Very Easy",
  },
  {
    option: "ALL UPPER CASE",
    point: "0",
    level: "Very Easy",
  },
  {
    option: "PascalCase",
    point: "4",
    level: "Medium",
  },
  {
    option: "camelCase",
    point: "4",
    level: "Medium",
  },
  {
    option: "MiXeDcAsE",
    point: "16",
    level: "Hard",
  },
  {
    option: "snake_case",
    point: "4",
    level: "Medium",
  },
  {
    option: "Digits 0 - 9",
    point: "2",
    level: "Easy",
  },
  {
    option: "complex words",
    point: "16",
    level: "Hard",
  },
  {
    option: "P.u?n!c't+u*a~t>e^d",
    point: "32",
    level: "Very Hard",
  },
  {
    option: "N3u4m5b6e7r1e3d",
    point: "32",
    level: "Very Hard",
  },
  {
    option: "no whitespace",
    point: "16",
    level: "Hard",
  },
];

// Easy
// const checkboxOptions = [
//   "Digits 0 - 9", Easy 3
// ];

// Medium
// const checkboxOptions = [
// ];

// Hard
// const checkboxOptions = [
//   "snake_case", Medium 4
//   "PascalCase", Medium 4
//   "camelCase", Medium 4
//   "MiXeDcAsE", Hard 12
// ];

//Very Hard
// const checkboxOptions = [
//   "complex words" Hard 12
//   "N3u4m5b6e7r1e3d", Very Hard 20
//   "P.u?n!c't+u*a~t>e^d", Very Hard 20
// ];

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
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const handleToolTip = (index: number) => {
    return "Difficulty: " + difficultyPoints[index].level;
  };

  const handleDisplayElement = (
    option: string,
    index: number,
    isCustom: boolean
  ) => {
    return isCustom ? (
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
          title={`${handleToolTip(index)}`}
          htmlFor={`${index}-test-settings`}
          className={`${styles["menu-label"]} flex relative justify-center m-auto border-2 border-slate-200 rounded-md p-2 px-5 w-full text-sm hover:text-default-sky-blue cursor-pointer hover:border-default-light-sky-blue hover:font-medium`}
        >
          {option}
        </label>
      </Fragment>
    ) : (
      <Fragment key={uuidv4()}>
        <div
          key={uuidv4()}
          title={`${handleToolTip(index)}`}
          className={`${styles["menu-label"]} flex relative justify-center m-auto border-2  rounded-md p-2 px-5 w-full text-sm border-default-light-sky-blue hover:font-medium`}
        >
          {option}
        </div>
      </Fragment>
    );
  };

  const handleDisplayOptions = () => {
    const currentDifficulty = difficultySetting.filter(
      (data) => data.selected
    )[0].difficulty;

    switch (true) {
      case currentDifficulty === "Very Easy":
        return checkboxOptions["very-easy"].map((option, index) =>
          handleDisplayElement(option, index, false)
        );
      case currentDifficulty === "Easy":
        return checkboxOptions.easy.map((option, index) =>
          handleDisplayElement(option, index, false)
        );
      case currentDifficulty === "Medium":
        return checkboxOptions.medium.map((option, index) =>
          handleDisplayElement(option, index, false)
        );
      case currentDifficulty === "Hard":
        return checkboxOptions.hard.map((option, index) =>
          handleDisplayElement(option, index, false)
        );
      case currentDifficulty === "Very Hard":
        return checkboxOptions["very-hard"].map((option, index) =>
          handleDisplayElement(option, index, false)
        );
      default:
        return checkboxOptions.custom.map((option, index) =>
          handleDisplayElement(option, index, true)
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

      <div className="flex justify-center items-center">
        <DropDownMenu
          menuData={difficultySetting}
          labelText={"Difficulty:"}
          iconName="boxingGlove"
          setMenuData={setDifficultySetting}
          setShowDifficultyMenu={setShowDifficultyMenu}
          showSettingsBtn={false}
        />
        <button className="bg-start-btn-green text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:brightness-105">
          Add New
        </button>
      </div>
      {/* <div>
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
        </div> */}
      <div className="grid relative grid-cols-3 gap-6 mb-4 mt-2">
        {handleDisplayOptions()}
      </div>
      {/* <div>Difficulty Level: *****</div> */}
      <div>Score Bonus: +1000</div>
      {/* <div className="flex w-full justify-evenly text-sm">
        <Button
          text="Save"
          handleOnClick={() => setShowDifficultyMenu(false)}
          type="button"
          customStyle="px-6 py-1 bg-slate-400 text-white hover:bg-start-btn-green"
        />
        <Button
          text="Delete"
          handleOnClick={() => setShowDifficultyMenu(false)}
          type="button"
          customStyle="px-6 py-1 bg-slate-400 text-white"
        />
      </div> */}
    </div>
  );
}

export default DifficultySettings;
