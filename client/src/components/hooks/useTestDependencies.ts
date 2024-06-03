import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//Provide same state and other dependencies for reuse as a template by various typing test components
export default function useTestDependencies({ defaultText }) {
  const [charIsValid, setCharIsValid] = useState<string[]>(
    new Array(defaultText.length).fill(""),
  ); //Tracks every user input as valid or invalid
  const [firstInputDetected, setFirstInputDetected] = useState<boolean>(false); //Used to track if test started
  const [showGameOverMenu, setShowGameOverMenu] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState(0); //Keeps track of cursor position while typing
  const [text, setText] = useState<string>(defaultText);
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
  const navigate = useNavigate();
  // Reset states when game is over
  const handleEndTest = useCallback(() => {
    setShowGameOverMenu(true);
    setStartTimer(false);
  }, []);

  // For clearing all data when test is restarted or ended
  const clearTestData = useCallback(() => {
    setCharIsValid(new Array(text.length).fill(""));
    setAccurateKeys({ ...defaultCharsObj });
    setTroubledKeys({ ...defaultCharsObj });
    setShowGameOverMenu(false);
    setCursorPosition(0);
    setFirstInputDetected(false);
    setStartTimer(false);
    setText(text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);
  return {
    firstInputDetected,
    charIsValid,
    showGameOverMenu,
    startTimer,
    setStartTimer,
    cursorPosition,
    setCursorPosition,
    text,
    setText,
    accurateKeys,
    troubledKeys,
    location,
    navigate,
    handleEndTest,
    clearTestData,
    setShowGameOverMenu,
    setFirstInputDetected,
    setTroubledKeys,
    setAccurateKeys,
    setCharIsValid,
  };
}
