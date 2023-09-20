import { useEffect } from "react";
import styles from "./styles/StartMenu.module.css";

interface propTypes {
  startTest: (value: boolean) => void;
  setText: (value: string) => void;
  setTestTime: (value: number) => void;
}

function StartMenu({ startTest, setText, setTestTime }: propTypes) {
  // Manipulate text based on test settings
  const applyTestSettings = () => {};

  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let radioElement = null;
    const checkboxElements: Array<HTMLInputElement> = [];
    Array.from(e.currentTarget).forEach((element) => {
      const targetElement = element as HTMLInputElement;
      if (targetElement.checked) {
        if (targetElement.name.includes("time-setting")) {
          radioElement = targetElement;
        } else {
          checkboxElements.push(targetElement);
        }
      }
    });

    if (radioElement) setTestTime(parseInt(radioElement.value) * 60); //Set test time

    applyTestSettings();
    startTest(true);
  };

  // Save settings or restore defaults
  const handleSettings = (shouldReset: boolean) => {
    shouldReset
      ? console.log("restore defaults")
      : console.log("save settings");
  };

  return (
    <form
      onSubmit={handleSubmission}
      className="flex flex-col justify-center gap-5 items-center w-10/12 text-lg m-24 rounded-md text-slate-500"
    >
      <h2 className="text-5xl leading-3 -m-8 pb-14">
        Test your typing skills!
      </h2>
      <ul className="grid grid-flow-col auto-cols-min justify-evenly w-full text-4xl mt-8 mb-6">
        <li>
          <label
            htmlFor="radio-1"
            className="flex flex-col justify-center items-center h-32 w-32 border-2 border-slate-200 rounded-lg"
          >
            <span className="font-bold">1</span>
            <span className="text-2xl">min</span>
            <input
              id="radio-1"
              type="radio"
              name="time-setting"
              className={styles.radio}
              defaultChecked
              value="1"
            />
          </label>
        </li>
        <li>
          <label
            htmlFor="radio-2"
            className="flex flex-col justify-center items-center h-32 w-32 border-2 border-slate-200 rounded-lg"
          >
            <span className="font-bold">2</span>
            <span className="text-2xl">min</span>
            <input
              id="radio-2"
              type="radio"
              name="time-setting"
              className={styles.radio}
              value="2"
            />
          </label>
        </li>
        <li>
          <label
            htmlFor="radio-3"
            className="flex flex-col justify-center items-center h-32 w-32 border-2 border-slate-200 rounded-lg"
          >
            <span className="font-bold">3</span>
            <span className="text-2xl">min</span>
            <input
              id="radio-3"
              type="radio"
              name="time-setting"
              className={styles.radio}
              value="3"
            />
          </label>
        </li>
        <li>
          <label
            htmlFor="radio-4"
            className="flex flex-col justify-center items-center h-32 w-32 border-2 border-slate-200 rounded-lg"
          >
            <span className="font-bold">5</span>
            <span className="text-2xl">min</span>
            <input
              id="radio-4"
              type="radio"
              name="time-setting"
              className={styles.radio}
              value="5"
            />
          </label>
        </li>
        <li>
          <label
            htmlFor="radio-5"
            className="flex flex-col justify-center items-center h-32 w-32 border-2 border-slate-200 rounded-lg"
          >
            <span className="font-bold">10</span>
            <span className="text-2xl">min</span>
            <input
              id="radio-5"
              type="radio"
              name="time-setting"
              className={styles.radio}
              value="10"
            />
          </label>
        </li>
      </ul>

      <div className="grid grid-cols-4 gap-6 w-10/12 mb-4">
        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 ">
          lowercase
          <input
            name="text-setting"
            type="checkbox"
            className="hidden"
            defaultChecked
            value="lowercase"
          />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 ">
          Sentence case
          <input
            name="text-setting"
            type="checkbox"
            className="hidden"
            defaultChecked
            value="Sentence case"
          />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 ">
          whitespace
          <input
            name="text-setting"
            type="checkbox"
            className="hidden"
            defaultChecked
            value="whitespace"
          />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 ">
          & . , ' ' ? !
          <input
            name="text-setting"
            type="checkbox"
            className="hidden"
            defaultChecked
            value="& . , ' ' ? !"
          />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 ">
          PascalCase
          <input
            name="text-setting"
            type="checkbox"
            className="hidden"
            value="PascalCase"
          />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 ">
          camelCase
          <input
            name="text-setting"
            type="checkbox"
            className="hidden"
            value="camelCase"
          />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 ">
          snake_case
          <input
            name="text-setting"
            type="checkbox"
            className="hidden"
            value="snake_case"
          />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 ">
          MiXeDcAsE
          <input
            name="text-setting"
            type="checkbox"
            className="hidden"
            value="MiXeDcAsE"
          />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 ">
          Tricky words
          <input
            name="text-setting"
            type="checkbox"
            className="hidden"
            value="Tricky words"
          />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 ">
          Digits 0 - 9
          <input
            name="text-setting"
            type="checkbox"
            className="hidden"
            value="Digits 0 - 9"
          />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 ">
          * _ - + = # $
          <input
            name="text-setting"
            type="checkbox"
            className="hidden"
            value="* _ - + = # $"
          />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 ">
          ; ~ | : ( ) % ^
          <input
            name="text-setting"
            type="checkbox"
            className="hidden"
            value="; ~ | : ( ) % ^"
          />
        </label>
      </div>
      <div className="flex mt-4 -mb-5 w-3/4 justify-between items-center">
        <button
          type="button"
          onClick={() => handleSettings(false)}
          className="border p-2 pl-6 pr-6 rounded-full text-lg bg-slate-500 text-white hover:bg-slate-400"
        >
          Save Settings
        </button>
        <button
          type="submit"
          className="border p-4 pl-10 pr-10 rounded-full text-3xl bg-green-500 text-white hover:bg-green-400"
        >
          Start Test
        </button>
        <button
          type="button"
          onClick={() => handleSettings(true)}
          className="border p-2 pl-6 pr-6 rounded-full text-lg bg-slate-500 text-white hover:bg-slate-400"
        >
          Restore Defaults
        </button>
      </div>
    </form>
  );
}

export default StartMenu;
