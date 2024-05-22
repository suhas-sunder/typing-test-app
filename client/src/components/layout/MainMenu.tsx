import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MenuProvider from "../../providers/MenuProvider";
import loadable from "@loadable/component";
import StartMenu from "../forms/StartMenu";
import Button from "../ui/Button";

const TextBox = loadable(() => import("./Textbox"));
const TypingStats = loadable(() => import("./TypingStats"));

//Used by Home.tsx component
export default function MainMenu() {
  const [charIsValid, setCharIsValid] = useState<string[]>([""]); //Tracks every user input as valid or invalid
  const [firstInputDetected, setFirstInputDetected] = useState<boolean>(false); //Used to track if test started
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

  // Updates character input validity **Need to rename this function**
  const handleCharStatus = (cursorIndex: number, newValue: string) => {
    setCharIsValid((prevState) =>
      prevState.map((charStatus, index) =>
        index === cursorIndex ? newValue : charStatus,
      ),
    );
  };

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
          showMainMenu={handleReturnToMenu}
          showGameOverMenu={showGameOverMenu}
          setShowGameOverMenu={setShowGameOverMenu}
        />
      )}
      {!showGameOverMenu && startTest && (
        <>
          <input
            tabIndex={0}
            type="textarea"
            id="trigger-mobile-keyboard"
            name="trigger-mobile-keyboard"
            className="bg-red absolute flex h-full w-full -translate-y-10 border-2 border-none bg-transparent caret-transparent outline-none"
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
              setCharStatus={handleCharStatus}
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
