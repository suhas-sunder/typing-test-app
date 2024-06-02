import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../providers/MenuProvider";
import { AuthContext } from "../../providers/AuthProvider";
import MenuProvider from "../../providers/MenuProvider";
import UpdateCharStatus from "../../utils/UpdateCharStatus";
import Button from "../ui/Button";
import manipulateString from "../../utils/ManipulateString";
import LockScreenForModal from "../../utils/LockScreenForModal";
import loadable from "@loadable/component";
import Title from "../svg/Title";
import StartBtnText from "../svg/StartBtnText";
import DropDownMenu from "../ui/DropDownMenu";
import styles from "./styles/SpeedTest.module.css";
import globalStyles from "../../styles/global.module.css";
import GenerateTextForTyping from "../../utils/GenerateTextForTyping";
import Min from "../svg/Min";
import TestDependencies from "../hooks/useTestDependencies";
import TriggerMobileKeyboard from "../ui/TriggerMobileKeyboard";

const SettingsModal = loadable(() => import("../ui/SettingsModal"));
const Textbox = loadable(() => import("./Textbox"));
const TypingStats = loadable(() => import("./TypingStats"));

interface propTypes {
  startTest: (value: boolean) => void;
  text: string;
  setText: (value: string) => void;
  setcountdownTime: (value: number) => void;
  setCharIsValid: (value: Array<string>) => void;
}

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

// Start menu for main speed test
function StartMenu({
  startTest,
  setText,
  text,
  setcountdownTime,
  setCharIsValid,
}: propTypes) {
  const { difficultySettings, currentDifficulty, setAuth, setId } =
    useContext(MenuContext);
  const { isAuthenticated, userId } = useContext(AuthContext);

  const [showDifficultyMenu, setShowDifficultyMenu] = useState<boolean>(false);
  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
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

    radioElement && setcountdownTime(parseInt(radioElement) * 60); //Set test time based on user selection & converts to seconds

    let updatedText = "";

    // Apply selected options (In a specific order) from current difficulty setting selected and mutate default text accordingly.
    customDifficultyOptions.forEach((option) => {
      if (
        (difficultySettings[currentDifficulty].settings as string[]).includes(
          option,
        )
      ) {
        // Manipulate text based on current difficulty setting selection.
        updatedText = manipulateString({
          textToBeManipulated: updatedText || text,
          option,
        });

        // Modify text based on checkbox options
        updatedText && setText(updatedText);
      }
    });

    setCharIsValid(new Array(text.length).fill("")); //Set  char validity array based on length of text generated.
    startTest(true); //Signals start of test
  };

  useEffect(() => {
    setAuth(isAuthenticated);
    setId(parseInt(userId));
  }, [setAuth, isAuthenticated, setId, userId]);

  useEffect(() => {
    LockScreenForModal({ showMenu: showDifficultyMenu }); //Handle nav bar and background scroll for modal
  }, [showDifficultyMenu]);

  useEffect(() => {
    !text && GenerateTextForTyping({ setText });
  }, [setText, text]);

  return (
    <form
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
        type={text ? "submit" : "button"}
        data-testid="start test"
        aria-label="Start typing speed test"
        onClick={() => !text && GenerateTextForTyping({ setText })}
        className="text-md relative mt-6 flex h-[2.51em] w-[7.85em] items-center justify-center rounded-md border bg-sky-700 p-2 px-6 outline-green-900 hover:scale-[1.03] hover:brightness-105"
      >
        <StartBtnText />
      </button>
    </form>
  );
}

//Used by Home.tsx component for speed typing test
export default function SpeedTest() {
  const [startTest, setStartTest] = useState<boolean>(false);
  const [countdownTime, setcountdownTime] = useState(60);

  //Dependencies common to all typing tests
  const {
    firstInputDetected,
    charIsValid,
    showGameOverMenu,
    startTimer,
    setStartTimer,
    cursorPosition,
    setCursorPosition,
    text,
    accurateKeys,
    troubledKeys,
    handleEndTest,
    clearTestData,
    setShowGameOverMenu,
    setFirstInputDetected,
    setTroubledKeys,
    setAccurateKeys,
    setCharIsValid,
    setText,
  } = TestDependencies({ defaultText: "" });

  // Reset states for main menu
  const handleReturnToMenu = () => {
    setStartTest(false);
    clearTestData();
    setText("");
  };

  // If home page route (logo) is clicked, reset the test.
  useEffect(() => {
    if (location.pathname === "/") {
      handleReturnToMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Prelod all lazyloaded components after delay
  useEffect(() => {
    Textbox.load();
    TypingStats.load();
    SettingsModal.preload();
  }, []);

  return (
    <MenuProvider>
      {!startTest && (
        <StartMenu
          startTest={setStartTest}
          setText={setText}
          text={text}
          setcountdownTime={setcountdownTime}
          setCharIsValid={setCharIsValid}
        />
      )}
      {startTest && (
        <TypingStats
          accurateKeys={accurateKeys}
          troubledKeys={troubledKeys}
          charStats={charIsValid}
          charIsValid={charIsValid}
          startTimer={startTimer}
          endTest={handleEndTest}
          countdownTime={countdownTime}
          firstInputDetected={firstInputDetected}
          handleRestart={clearTestData}
          showMainMenu={handleReturnToMenu}
          showGameOverMenu={showGameOverMenu}
          setShowGameOverMenu={setShowGameOverMenu}
          testName={"speed-test"}
          testLength={text.length}
        />
      )}
      {!showGameOverMenu && startTest && (
        <>
          {!startTimer && (
            <div className="absolute left-1 top-20 z-30 flex rounded-xl bg-sky-700 px-5 py-2 font-nunito text-white lg:-left-6">
              Start Typing!
            </div>
          )}
          <TriggerMobileKeyboard showGameOverMenu={showGameOverMenu}>
            {" "}
            <Textbox
              charStatus={charIsValid}
              setCharStatus={(cursorIndex, newValue) =>
                UpdateCharStatus({ setCharIsValid, cursorIndex, newValue })
              }
              updateStartTimer={setStartTimer}
              dummyText={text}
              cursorPosition={cursorPosition}
              setCursorPosition={setCursorPosition}
              firstInputDetected={firstInputDetected}
              setFirstInputDetected={setFirstInputDetected}
              troubledKeys={troubledKeys}
              setTroubledKeys={setTroubledKeys}
              accurateKeys={accurateKeys}
              setAccurateKeys={setAccurateKeys}
              lessonsPgText={false}
            />
          </TriggerMobileKeyboard>
        </>
      )}

      {!showGameOverMenu && startTest && (
        <div className="z-10 flex w-3/4 justify-evenly font-nunito">
          <Button
            title=""
            text="Main Menu"
            handleOnClick={handleReturnToMenu}
            type="button"
            customStyle="px-6 py-2 my-6 bg-sky-700 text-white"
          />
          <Button
            title=""
            text="Restart"
            handleOnClick={clearTestData}
            type="button"
            customStyle="px-6 py-2 my-6 bg-sky-700 text-white"
          />
        </div>
      )}
    </MenuProvider>
  );
}
