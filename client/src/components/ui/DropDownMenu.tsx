import Icon from "../utility/Icon";
import DropDownList from "./DropDownList";
import DropDownLabel from "./DropDownLabel";
import styles from "./styles/DropDownMenu.module.css";
import { useState } from "react";

interface Data {
  difficulty: string;
  customStyle: string;
  selected: boolean;
}

interface PropType {
  menuData: Data[];
  labelText: string;
  iconName: string | null;
  setSelectedValue: (value: string) => void;
}
function DropDownMenu({
  menuData,
  labelText,
  iconName,
  setSelectedValue,
}: PropType) {
  const [defaultIndex, setDefaultIndex] = useState<number>(2); //Keeps track of default menu option

  return (
    <>
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
        <DropDownLabel labelText={labelText} iconName={iconName} />
        <div
          className={` flex relative w-[11em] gap-5 text-slate-500 cursor-pointer bg-white`}
        >
          <div
            aria-label="selected option for custom select menu"
            className={`${
              styles && styles.difficulty
            } difficulty flex w-full border-2 p-[0.35em] rounded-md pl-4 text-base gap-2`}
          >
            <span>{menuData[defaultIndex].difficulty}</span>
          </div>
          <Icon
            icon="chevron"
            title="chevron-icon"
            customStyle={`flex absolute right-1 top-[20%] pr-2`}
          />
          <DropDownList
            menuData={menuData}
            styles={styles}
            setDefaultIndex={setDefaultIndex}
            setSelectedValue={setSelectedValue}
          />
        </div>
      </label>
    </>
  );
}

export default DropDownMenu;
