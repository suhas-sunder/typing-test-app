import TestTimeOptions from "./TestTimeOptions";
import { useContext, useState, useEffect } from "react";
// import Icon from "../../utils/Icon";
import manipulateString from "../../utils/ManipulateString";
import { MenuContext } from "../../providers/MenuProvider";
import { AuthContext } from "../../providers/AuthProvider";
import LockScreenForModal from "../../utils/LockScreenForModal";
import DropDownMenu from "../ui/DropDownMenu";
import loadable from "@loadable/component";
import Title from "../svg/Title";
import StartBtnText from "../svg/StartBtnText";

const SettingsModal = loadable(() => import("../ui/SettingsModal"));

interface propTypes {
  startTest: (value: boolean) => void;
  text: string;
  setText: (value: string) => void;
  setTestTime: (value: number) => void;
  setCharIsValid: (value: Array<string>) => void;
}

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

  const timeOptions = ["1", "2", "3", "5", "10"];
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

    radioElement && setTestTime(parseInt(radioElement) * 60); //Set test time based on user selection

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
    setId(userId);
  }, [setAuth, isAuthenticated, setId, userId]);

  useEffect(() => {
    LockScreenForModal({ showMenu: showDifficultyMenu }); //Handle nav bar and background scroll for modal
  }, [showDifficultyMenu]);

  // Prelod all lazyloaded components after delay
  useEffect(() => {
    const handlePreload = () => {
      SettingsModal.preload();
    };

    const timer = setTimeout(handlePreload, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <form
      onSubmit={handleSubmission}
      className="mt-8 flex h-[30em] w-full flex-col items-center justify-center gap-4 font-nunito text-lg font-bold italic tracking-wider text-slate-500 sm:mb-5 sm:mt-14 sm:h-[22em] sm:w-10/12"
    >
      {/* Difficulty settings modal */}
      {showDifficultyMenu && (
        <SettingsModal setShowDifficultyMenu={setShowDifficultyMenu} />
      )}

      <Title />

      <TestTimeOptions timeOptions={timeOptions} />

      <DropDownMenu
        labelText={"Difficulty:"}
        iconName="boxingGlove"
        setShowDifficultyMenu={setShowDifficultyMenu}
        showSettingsBtn={true}
      />

      {/* <div className="flex items-center justify-center gap-3">
          <Icon icon="article" title="article-icon" customStyle="flex" />{" "}
          Textbox: Multiline | Single line
        </div> */}
      {/* <div className="flex items-center justify-center gap-3">
          <Icon icon="keyboard" title="keyboard-icon" customStyle="flex" />{" "}
          Keyboard:
        </div> */}

      {/* This is the modal for managing difficulty settings. */}

      <button
        type="submit"
        aria-label="Start typing speed test"
        className="text-md relative mt-6 flex h-[2.51em] w-[7.85em] items-center justify-center rounded-md border bg-sky-700 p-2 px-6 outline-green-900 hover:brightness-105 hover:scale-[1.03]"
      >
        <StartBtnText />
      </button>
    </form>
  );
}

export default StartMenu;
