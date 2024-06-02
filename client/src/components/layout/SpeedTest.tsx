import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

const SettingsModal = loadable(() => import("../ui/SettingsModal"));
const TextBox = loadable(() => import("./Textbox"));
const TypingStats = loadable(() => import("./TypingStats"));

interface propTypes {
  startTest: (value: boolean) => void;
  text: string;
  setText: (value: string) => void;
  setTestTime: (value: number) => void;
  setCharIsValid: (value: Array<string>) => void;
}

//Displays time options for test menu
function TestTimeOptions() {
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
  setTestTime,
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

    radioElement && setTestTime(parseInt(radioElement) * 60); //Set test time based on user selection & converts to seconds

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

  // Prelod all lazyloaded components after delay
  useEffect(() => {
    SettingsModal.preload();
  }, []);

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

      <TestTimeOptions />

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
  const [charIsValid, setCharIsValid] = useState<string[]>([""]); //Tracks every user input as valid or invalid
  const [firstInputDetected, setFirstInputDetected] = useState<boolean>(false); //Used to track if test started. See if I really need this since I have start timer already.
  const [showGameOverMenu, setShowGameOverMenu] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [startTest, setStartTest] = useState<boolean>(false);
  const [testTimeSeconds, setTestTimeSeconds] = useState(60);
  const [cursorPosition, setCursorPosition] = useState(0); //Keeps track of cursor position while typing
  const [text, setText] = useState<string>("");
  const defaultCharsObj = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0,
    n: 0,
    o: 0,
    p: 0,
    q: 0,
    r: 0,
    s: 0,
    t: 0,
    u: 0,
    v: 0,
    w: 0,
    x: 0,
    y: 0,
    z: 0,
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    "~": 0,
    "!": 0,
    "@": 0,
    "#": 0,
    $: 0,
    "%": 0,
    "^": 0,
    "&": 0,
    "*": 0,
    "(": 0,
    ")": 0,
    _: 0,
    "-": 0,
    "+": 0,
    "=": 0,
    "/": 0,
    "?": 0,
    ".": 0,
    ",": 0,
    " ": 0,
    "{": 0,
    "}": 0,
    "|": 0,
    ">": 0,
    "<": 0,
    "↵": 0,
  };
  const [accurateKeys, setAccurateKeys] = useState<{ [key: string]: number }>({
    ...defaultCharsObj,
  });
  const [troubledKeys, setTroubledKeys] = useState<{ [key: string]: number }>({
    ...defaultCharsObj,
  });

  const location = useLocation();

  // Reset states for end test
  const handleEndTest = useCallback(() => {
    setShowGameOverMenu(true);
    setStartTimer(false);
  }, []);

  // For clearing all data when test is restarted or ended
  const clearTestData = () => {
    setCharIsValid(new Array(text.length).fill(""));
    setAccurateKeys({ ...defaultCharsObj });
    setTroubledKeys({ ...defaultCharsObj });
    setShowGameOverMenu(false);
    setCursorPosition(0);
    setFirstInputDetected(false);
    setStartTimer(false);
    setText(text);
  };

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
    TextBox.load();
    TypingStats.load();
  }, []);

  return (
    <MenuProvider>
      {!startTest && (
        <StartMenu
          startTest={setStartTest}
          setText={setText}
          text={text}
          setTestTime={setTestTimeSeconds}
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
          testTime={testTimeSeconds}
          firstInputDetected={firstInputDetected}
          handleRestart={clearTestData}
          showSpeedTest={handleReturnToMenu}
          showGameOverMenu={showGameOverMenu}
          setShowGameOverMenu={setShowGameOverMenu}
          testName={"speed-test"}
        />
      )}
      {!showGameOverMenu && startTest && (
        <>
          <input
            tabIndex={0}
            type="text"
            id="trigger-mobile-keyboard"
            name="trigger-mobile-keyboard"
            className="absolute flex h-full w-full -translate-y-10 border-2 border-none bg-transparent caret-transparent outline-none"
            onClick={(e) => {
              e.preventDefault();
            }}
          />

          {!startTimer && (
            <div className="absolute left-1 top-11 z-30 flex rounded-xl bg-sky-700 px-5 py-2 font-nunito text-white lg:-left-6">
              Start Typing!
            </div>
          )}
          <label
            htmlFor="trigger-mobile-keyboard"
            className="resize-none outline-none "
          >
            <TextBox
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
          </label>
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
