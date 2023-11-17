import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles/StartMenu.module.css";

interface PropType {
  index: number;
  setting: string;
  title: string;
  isSelectable: boolean;
}
//Display all difficulty options as a selectable checkbox to store new custom settings or display a summary of setting presets for current difficulty saved in drop-down menu..
function DifficultySettingInputs({
  setting,
  index,
  title,
  isSelectable,
}: PropType) {
  return (
    <Fragment key={uuidv4()}>
      {isSelectable ? (
        <>
          <input
            id={`${index}-test-settings`}
            name="text-setting"
            type="checkbox"
            className="hidden relative"
            defaultChecked={index < 0 ? true : false}
          />
          <label
            title={title}
            htmlFor={`${index}-test-settings`}
            className={`${styles["menu-label"]} flex relative justify-center m-auto border-2 border-slate-200 rounded-md p-2 px-5 w-full text-sm hover:text-default-sky-blue cursor-pointer hover:border-default-light-sky-blue hover:font-medium`}
          >
            {setting}
          </label>
        </>
      ) : (
        <div
          title={title}
          className={`${styles["menu-label"]} flex relative justify-center m-auto border-2  rounded-md p-2 px-5 w-full text-sm border-default-light-sky-blue hover:font-medium`}
        >
          {setting}
        </div>
      )}
    </Fragment>
  );
}

export default DifficultySettingInputs;
