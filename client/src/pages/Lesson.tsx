import { useState } from "react";
import UpdateCharStatus from "../utils/UpdateCharStatus";
import { useLocation } from "react-router-dom";
import loadable from "@loadable/component";

const Textbox = loadable(() => import("../components/layout/Textbox"));

function Lesson() {
  const lessonText =
    "Lessons are still under development so typing this won't do anything right now. This functionality will be made available soon. Sorry for the inconvenience!";

  const [charIsValid, setCharIsValid] = useState<string[]>(
    new Array(lessonText.length).fill(""),
  ); //Tracks every user input as valid or invalid
  const [firstInputDetected, setFirstInputDetected] = useState<boolean>(false); //Used to track if test started
  const [startTimer, setStartTimer] = useState<boolean>(false);
  // const [testTimeSeconds, setTestTimeSeconds] = useState(60);
  const [cursorPosition, setCursorPosition] = useState(0); //Keeps track of cursor position while typing
  const [text] = useState<string>(lessonText);
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
  // const handleEndTest = useCallback(() => {
  //   setShowGameOverMenu(true);
  //   setStartTimer(false);
  // }, []);

  // For clearing all data when test is restarted or ended
  // const clearTestData = () => {
  //   setCharIsValid(new Array(text.length).fill(""));
  //   setAccurateKeys({ ...defaultCharsObj });
  //   setTroubledKeys({ ...defaultCharsObj });
  //   setShowGameOverMenu(false);
  //   setCursorPosition(0);
  //   setFirstInputDetected(false);
  //   setStartTimer(false);
  //   setText(text);
  // };

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col pb-12 pt-3">
      <header>
        <h1 className="mb-20 flex w-full justify-center gap-6  font-nunito text-base text-defaultblue">
          Lesson {location.pathname.split("/")[3]} - Section:{" "}
          {location.pathname.split("/")[4].split("-")[1]} - Level:{" "}
          {location.pathname.split("/")[5].split("-")[1]}
        </h1>
      </header>
      <main className="relative mx-auto flex max-w-[900px] flex-col gap-10">
        {/* Create a new layout for lesson stats */}
        <div className="relative">
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
            <div className="absolute -top-5 z-30 flex rounded-xl bg-sky-700 bg-opacity-80 px-5 py-2 font-nunito text-white">
              Start Typing!
            </div>
          )}
          <label
            htmlFor="trigger-mobile-keyboard"
            className="resize-none outline-none "
          >
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
              lessonsPgText={true}
            />
          </label>
        </div>
      </main>
    </div>
  );
}

export default Lesson;
