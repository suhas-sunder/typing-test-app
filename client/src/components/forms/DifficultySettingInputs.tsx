import styles from "./styles/StartMenu.module.css";

interface PropType {
  index: number;
  setting: string;
  title: string;
  isSelectable: boolean;
  customSettingsChecked: string[];
  setCustomSettingsChecked: (value: string[]) => void;
}
//Display all difficulty options as a selectable checkbox to store new custom settings or display a summary of setting presets for current difficulty saved in drop-down menu..
function DifficultySettingInputs({
  setting,
  title,
  isSelectable,
  setCustomSettingsChecked,
  customSettingsChecked,
}: PropType) {
  // Keep track of selected settings
  const handleSettingSelection = () => {
    customSettingsChecked.includes(setting)
      ? setCustomSettingsChecked(
          customSettingsChecked.filter(
            (checkedSetting) => checkedSetting !== setting
          )
        )
      : setCustomSettingsChecked([...customSettingsChecked, setting]);
  };

  return (
    <>
      {isSelectable ? (
        <div
          aria-label="Custom checkbox"
          title={title}
          onClick={() => handleSettingSelection()}
          className={`${
            customSettingsChecked.includes(setting)
              ? "border-default-light-sky-blue text-default-sky-blue"
              : "border-slate-200"
          } flex relative justify-center m-auto border-2  rounded-md p-2 px-5 w-full text-sm hover:text-default-sky-blue cursor-pointer hover:border-default-light-sky-blue hover:font-medium`}
        >
          {setting}
        </div>
      ) : (
        <div
          title={title}
          className={`${styles["menu-label"]} flex relative justify-center m-auto border-2  rounded-md p-2 px-5 w-full text-sm border-default-light-sky-blue hover:font-medium`}
        >
          {setting}
        </div>
      )}
    </>
  );
}

export default DifficultySettingInputs;
