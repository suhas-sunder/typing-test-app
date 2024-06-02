import styles from "../layout/homepg/styles/SpeedTest.module.css";

interface PropType {
  index: number;
  setting: string;
  title: string;
  isSelectable: boolean;
  customSettingsChecked: string[];
  setCustomSettingsChecked: (value: string[]) => void;
}

//Used by DifficultySettings.tsx Component
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
            (checkedSetting) => checkedSetting !== setting,
          ),
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
          } relative m-auto flex w-full cursor-pointer  justify-center rounded-md border-2 p-2 px-5 text-sm hover:border-default-light-sky-blue hover:font-medium hover:text-default-sky-blue`}
        >
          {setting}
        </div>
      ) : (
        <div
          title={title}
          className={`${styles["menu-label"]} relative m-auto flex w-full justify-center  rounded-md border-2 border-default-light-sky-blue p-2 px-5 text-sm hover:font-medium`}
        >
          {setting}
        </div>
      )}
    </>
  );
}

export default DifficultySettingInputs;
