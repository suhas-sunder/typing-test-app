import DropDownMenu from "./DropDownMenu";
import Icon from "../utility/Icon";

const menuData = [
  {
    difficulty: "Very Easy",
    customStyle: "text-back",
    selected: false,
  },
  {
    difficulty: "Easy",
    customStyle: "text-back",
    selected: false,
  },
  {
    difficulty: "Medium",
    customStyle: "text-back",
    selected: true,
  },
  {
    difficulty: "Very Easy",
    customStyle: "text-back",
    selected: false,
  },
  {
    difficulty: "Very Easy",
    customStyle: "text-back",
    selected: false,
  },
];

interface PropType {
  setDifficultySettings: (value: string) => void;
}

function DifficultySettings({ setDifficultySettings}: PropType) {
  return (
    <div className="flex justify-center items-center gap-2">
      <DropDownMenu
        menuData={menuData}
        labelText={"Difficulty:"}
        iconName="boxingGlove"
        setSelectedValue={setDifficultySettings}
      />
      <button
        type="button"
        className="flex relative py-[0.4em] px-3 outline-green-900 hover:text-start-btn-green hover:cursor-pointer rounded-md"
      >
        <Icon
          title="settings-icon"
          customStyle="flex relative justify-center items-center "
          icon="settingsSparkle"
        />
      </button>
    </div>
  );
}

export default DifficultySettings;
