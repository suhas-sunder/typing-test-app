import DropDownMenu from "../ui/DropDownMenu";
import Icon from "../utility/Icon";

const menuData = ["Very Easy", "Easy", "Medium", "Hard", "Very Hard"];

function DifficultySettings() {
  return (
    <div className="flex justify-center items-center gap-2">
      <DropDownMenu menuData={menuData} labelText={"Difficulty:"} iconName="boxingGlove" />
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
