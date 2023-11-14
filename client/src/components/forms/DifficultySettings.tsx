import { Fragment } from "react";
import styles from "./styles/StartMenu.module.css";

// Depending on difficulty settings passed in, determine which test settings should be applied
const checkboxOptions = [
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

import Button from "../ui/Button";
import Icon from "../utility/Icon";

interface PropType {
  setShowDifficultyMenu: (value: boolean) => void;
}

function DifficultySettings({ setShowDifficultyMenu }: PropType) {
  return (
    <>
      <div
        id="modal-backdrop"
        data-testid="modal backdrop"
        aria-label="close settings menu button as background underlay"
        className="absolute top-0 left-0 w-full h-full bg-black opacity-40 items-center justify-center z-30"
        onClick={() => setShowDifficultyMenu(false)}
      ></div>
      <div className="flex flex-col absolute justify-center items-center gap-6 px-10 py-10 rounded-xl bg-white z-30">
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
        <div>
          <input
            autoFocus
            type="text"
            placeholder="Setting Name"
            className="border-2 rounded-md p-1 pl-4 text-base"
          />
        </div>
        <div className="grid relative grid-cols-3 gap-6 mb-4 mt-2">
          {checkboxOptions.map((option, index) => (
            <Fragment key={index}>
              <input
                id={`${index}-test-settings`}
                name="text-setting"
                type="checkbox"
                className="hidden relative"
                defaultChecked={index < 0 ? true : false}
                value={option}
              />
              <label
                key={index}
                htmlFor={`${index}-test-settings`}
                className={`${styles["menu-label"]} flex relative justify-center m-auto border-2 border-slate-200 rounded-md p-2 px-5 w-full text-sm hover:text-default-sky-blue cursor-pointer hover:border-default-light-sky-blue hover:font-medium`}
              >
                {option}
              </label>
            </Fragment>
          ))}
        </div>
        <div>Difficulty Level: *****</div>
        <div>Score Bonus: +1000</div>
        <div className="flex w-full justify-evenly text-sm">
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
        </div>
      </div>
    </>
  );
}

export default DifficultySettings;
