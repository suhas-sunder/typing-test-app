import Icon from "../utility/Icon";
import DropDownList from "./DropDownList";
import DropDownLabel from "./DropDownLabel";
import styles from "./styles/DropDownMenu.module.css";
import DifficultySettings from "../forms/DifficultySettings";
import { useEffect, useState } from "react";
import LockScreenForModal from "../utility/LockScreenForModal";
interface Data {
  difficulty: string;
  customStyle: string;
  selected: boolean;
}

interface PropType {
  menuData: Data[];
  labelText: string;
  iconName: string;
  setMenuData: (value: Data[]) => void;
}

function DropDownMenu({
  menuData,
  labelText,
  iconName,
  setMenuData,
}: PropType) {
  const [showDifficultyMenu, setShowDifficultyMenu] = useState<boolean>(false);

  useEffect(() => {
    LockScreenForModal({ showMenu: showDifficultyMenu }); //Handle nav bar and background scroll for modal
  }, [showDifficultyMenu]);

  return (
    <div className="flex justify-center items-center gap-2">
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
        <DropDownLabel
          labelText={labelText}
          iconName={iconName}
          iconStyle={menuData.filter((data) => data.selected)[0].customStyle}
        />
        <div
          className={` flex relative w-[11em] gap-5 text-slate-500 cursor-pointer bg-white`}
        >
          <div
            aria-label="selected option for custom select menu"
            className={`${
              styles && styles.difficulty
            } difficulty flex w-full border-2 p-[0.35em] rounded-md pl-4 text-base gap-2`}
          >
            <span>
              {menuData.filter((data) => data.selected)[0].difficulty}
            </span>
          </div>
          <Icon
            icon="chevron"
            title="chevron-icon"
            customStyle={`flex absolute right-1 top-[20%] pr-2`}
          />
          <DropDownList menuData={menuData} setMenuData={setMenuData} />
        </div>
      </label>
      <button
        type="button"
        onClick={() => setShowDifficultyMenu(true)}
        className="flex relative py-[0.4em] px-3 outline-green-900 hover:text-start-btn-green hover:cursor-pointer rounded-md"
      >
        <Icon
          title="settings-icon"
          customStyle="flex relative justify-center items-center "
          icon="settingsSparkle"
        />
      </button>

      {showDifficultyMenu && (
        <DifficultySettings setShowDifficultyMenu={setShowDifficultyMenu} />
      )}
    </div>
  );
}

export default DropDownMenu;
