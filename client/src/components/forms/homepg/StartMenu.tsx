import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useMenu from "../../hooks/useMenu";
import ManipulateString from "../../../utils/formatters/ManipulateString";
import useLockScreenForModal from "../../hooks/useLockScreenForModal";
import GenerateTextForTyping from "../../../utils/generators/GenerateTextForTyping";
import SettingsModal from "../../ui/homepg/SettingsModal";
import DropDownMenu from "../../ui/homepg/DropDownMenu";
import StartBtnText from "../../svg/StartBtnText";
import Title from "../../svg/Title";
import globalStyles from "../../../styles/global.module.css";
import Min from "../../svg/Min";
import styles from "../../layout/homepg/styles/SpeedTest.module.css";
import { useNavigate } from "react-router-dom";

//Displays time options for test menu
function CountdownTimeOptions() {
  const timeOptions = ["1", "2", "3", "5", "10"];

  return (
    <ul className="relative my-8 grid min-h-[10em] w-full max-w-[450px] grid-cols-3 gap-x-2 gap-y-8 text-xl sm:min-h-[4em] sm:w-11/12 sm:max-w-none sm:grid-cols-5 sm:justify-evenly sm:gap-y-0 sm:text-2xl">
      {timeOptions.map((time: string, index: number) => (
        <li key={index} className={`flex items-center justify-center `}>
          <input
            id={`radio-${time}`}
            type="radio"
            name="time-setting"
            className="opacity-1 absolute"
            defaultChecked={index === 0 ? true : false}
            value={time}
          />
          <label
            htmlFor={`radio-${time}`}
            className={`${styles["menu-label"]} z-[1] flex h-[4.1em] w-[4.1em] flex-col items-center justify-center rounded-lg border-2 border-slate-200 bg-white fill-slate-500 text-slate-500 outline-default-sky-blue hover:cursor-pointer hover:border-sky-600 hover:fill-sky-700 hover:font-medium hover:text-sky-700 sm:h-24 sm:w-24`}
          >
            <span className="relative font-bold">{time}</span>
            <span
              className={`${styles["svg-text"]} relative text-xl sm:text-2xl`}
            >
              <Min />
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}

export default function StartMenu() {
  const {
    difficultySettings,
    currentDifficulty,
    setAuth,
    setId,
    setCountDownTime,
    setTypingText,
  } = useMenu();
  const { isAuthenticated, userId } = useAuth();

  const navigate = useNavigate();

  const [showDifficultyMenu, setShowDifficultyMenu] = useState<boolean>(false);
  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let radioElement: string | null = null;
    const customDifficultyOptions: string[] = [
      "ALL UPPER CASE",
      "all lower case",
      "no punctuation",
      "PascalCase",
      "camelCase",
      "MiXeDcAsE",
      "snake_case",
      "Digits 0 - 9",
      "complex words",
      "P.u?n!c't+u*a~t>e^d",
      "N3u4m5b6e7r1e3d",
      "no whitespace",
    ];

    // Manage menu inputs
    Array.from(e.currentTarget).forEach((element) => {
      const targetElement = element as HTMLInputElement;

      if (
        targetElement &&
        targetElement.checked &&
        targetElement.name.includes("time-setting")
      ) {
        radioElement = targetElement.value; //Keep track of test time input options
      }
    });

    radioElement && setCountDownTime(parseInt(radioElement) * 60); //Set test time based on user selection & converts to seconds

    const fetchedText = await GenerateTextForTyping();

    let textToBeManipulated = "";

    //Generate random text 2 times the amount of the test time selected to ensure enough characters are present.
    for (let i = 0; i <= (radioElement ? parseInt(radioElement) : 1) * 3; i++) {
      if (i > 0) textToBeManipulated += " ";
      textToBeManipulated += fetchedText;
    }

    console.log(textToBeManipulated);
    console.log(textToBeManipulated.length);

    // Apply selected options (In a specific order) from current difficulty setting selected and mutate default text accordingly.
    customDifficultyOptions.forEach((option) => {
      if (
        (difficultySettings[currentDifficulty].settings as string[]).includes(
          option,
        )
      ) {
        // Manipulate text based on current difficulty setting selection.
        textToBeManipulated = ManipulateString({
          textToBeManipulated: textToBeManipulated,
          option,
        });
      }
    });

    setTypingText(textToBeManipulated);

    navigate("/typing-test");
  };

  useEffect(() => {
    setAuth(isAuthenticated);
    setId(userId);
  }, [setAuth, isAuthenticated, setId, userId]);

  useLockScreenForModal({ lockScreen: showDifficultyMenu }); //Prevents scroll when modal is active

  return (
    <form
      name="typing-test"
      onSubmit={handleSubmission}
      className={`${globalStyles["fade-in"]} mt-8 flex h-[30em] w-full flex-col items-center justify-center gap-4 font-nunito text-lg font-bold italic tracking-wider text-slate-500 sm:mb-5 sm:mt-14 sm:h-[22em] sm:w-10/12`}
    >
      {/* Difficulty settings modal */}
      {showDifficultyMenu && (
        <SettingsModal setShowDifficultyMenu={setShowDifficultyMenu} />
      )}

      <Title />

      <CountdownTimeOptions />

      <div
        id={"drop-down-wrapper"}
        className="relative z-10 flex min-h-[4em] translate-x-4 items-center justify-center sm:min-h-[2em] sm:translate-x-0"
      >
        <DropDownMenu
          labelText={"Difficulty:"}
          iconName="boxingGlove"
          setShowDifficultyMenu={setShowDifficultyMenu}
          showSettingsBtn={true}
        />
      </div>

      <button
        type="submit"
        name="typing-test"
        data-testid="start test"
        aria-label="Start typing speed test"
        className="text-md relative mt-6 flex h-[2.51em] w-[7.85em] items-center justify-center rounded-md border bg-sky-700 p-2 px-6 outline-green-900 hover:scale-[1.03] hover:brightness-105"
      >
        <StartBtnText />
      </button>
    </form>
  );
}
