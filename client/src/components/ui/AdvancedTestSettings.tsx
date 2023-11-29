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
      <div className="grid relative grid-cols-3 gap-6 mb-4 mt-2">
        {checkboxOptions.map((option, index) => (
          <Fragment key={index}>
            <input
              id={`${index}-test-settings`}
              name="text-setting"
              type="checkbox"
              className="hidden relative"
              defaultChecked={index < 0 ? true : false}
              value={option}
            />
            <label
              key={index}
              htmlFor={`${index}-test-settings`}
              className={`${styles["menu-label"]} flex relative justify-center m-auto border-2 border-slate-200 rounded-md p-2 px-5 w-full text-sm hover:text-default-sky-blue hover:cursor-pointer hover:border-default-light-sky-blue hover:font-medium`}
            >
              {option}
            </label>
          </Fragment>
        ))}
      </div>
      {/* Button settings for custom test options */}
      <div className="flex relative w-3/4 justify-between items-center">
        <button
          type="button"
          onClick={() => handleSettings(false)}
          className="border relative p-[0.3em] px-6 rounded-md w-[9em] text-sm bg-slate-500 text-white hover:bg-slate-400 tracking-wider"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => handleSettings(false)}
          className="border relative p-[0.3em] px-6 rounded-md w-[9em] text-sm bg-slate-500 text-white hover:bg-slate-400 tracking-wider"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={() => handleSettings(true)}
          className="border relative p-[0.3em] px-6 rounded-md text-sm w-[9em] bg-slate-500 text-white hover:bg-slate-400 tracking-wider"
        >
          Restore
        </button>
      </div>
    </>
  );
}

export default AdvancedTestSettings;
