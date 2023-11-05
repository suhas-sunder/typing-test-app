import Icon from "../utility/Icon";
import DropDownList from "./DropDownList";
import DropDownLabel from "./styles/DropDownLabel";
import styles from "./styles/DropDownMenu.module.css";
import { useState } from "react";

interface PropType {
  menuData: string[];
  labelText: string;
  iconName: string | null;
}
function DropDownMenu({ menuData, labelText, iconName }: PropType) {
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
            <span>{menuData[defaultIndex]}</span>
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
          />
        </div>
      </label>

      {/* <select
        id="difficulty"
        className={` flex relative border-2 rounded-md text-sm bg-transparent border-slate-200 py-2 pr-10 pl-4 hover:cursor-pointer hover:border-default-sky-blue  outline-default-sky-blue appearance-none`}
        defaultValue={"medium"}
      >
        {menuData.map((options) => (
          <>
            <option key={uuidv4()} value={options} className="bg-white">
              {options}
            </option>
          </>
        ))}
      </select> */}
    </>
  );
}

export default DropDownMenu;
