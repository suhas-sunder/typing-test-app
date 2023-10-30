import { Fragment } from "react";
import styles from "./styles/StartMenu.module.css";

interface PropTypes {
  [key: string]: string[];
}

function AdvancedTestSettings({ checkboxOptions }: PropTypes) {
  // Save settings or restore defaults
  const handleSettings = (shouldReset: boolean) => {
    shouldReset
      ? console.log("restore defaults")
      : console.log("save settings");
  };

  return (
    <>
      <h2>Advanced Settings</h2>
      <div className="grid grid-cols-4 gap-6 mb-4">
        {checkboxOptions.map((option, index) => (
          <Fragment key={index}>
            <input
              id={`${index}-test-settings`}
              name="text-setting"
              type="checkbox"
              className="hidden"
              defaultChecked={index < 0 ? true : false}
              value={option}
            />
            <label
              key={index}
              htmlFor={`${index}-test-settings`}
              className={`${styles["menu-label"]} flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-full text-sm hover:text-default-sky-blue hover:cursor-pointer hover:border-default-light-sky-blue hover:font-medium`}
            >
              {option}
            </label>
          </Fragment>
        ))}
      </div>
      <div>
        <h2>Saved Settings</h2>
      </div>
      <div className="flex w-3/4 justify-between items-center">
        <button
          type="button"
          onClick={() => handleSettings(false)}
          className="border p-2 px-6 rounded-md text-sm bg-slate-500 text-white hover:bg-slate-400 tracking-wider"
        >
          Save Settings
        </button>

        <button
          type="button"
          onClick={() => handleSettings(true)}
          className="border p-2 px-6 rounded-md text-sm bg-slate-500 text-white hover:bg-slate-400 tracking-wider"
        >
          Restore Defaults
        </button>
      </div>
    </>
  );
}

export default AdvancedTestSettings;
