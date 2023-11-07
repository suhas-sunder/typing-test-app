import DropDownMenu from "./DropDownMenu";
import Icon from "../utility/Icon";
import { useState } from "react";
import DifficultySettings from "../forms/DifficultySettings";
interface Data {
  difficulty: string;
  customStyle: string;
  selected: boolean;
}

interface PropType {
  menuData: Data[];
  setMenuData: (value: Data[]) => void;
}

function DifficultyMenu({ setMenuData, menuData }: PropType) {
  const [showDifficultyMenu, setShowDifficultyMenu] = useState<boolean>(false);

  return (
    <div className="flex justify-center items-center gap-2">
      <DropDownMenu
        menuData={menuData}
        labelText={"Difficulty:"}
        iconName="boxingGlove"
        setMenuData={setMenuData}
      />
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

export default DifficultyMenu;
