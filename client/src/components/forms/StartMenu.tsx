import TestTimeOptions from "./TestTimeOptions";
import { useContext, useState, useEffect } from "react";
// import Icon from "../../utils/Icon";
import manipulateString from "../../utils/ManipulateString";
import { MenuContext } from "../../providers/MenuProvider";
import { AuthContext } from "../../providers/AuthProvider";
import LockScreenForModal from "../../utils/LockScreenForModal";
import DropDownMenu from "../ui/DropDownMenu";
import loadable from "@loadable/component";
import Button from "../ui/Button";
import styles from "./styles/StartMenu.module.css";

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
      className="mt-24 flex w-full flex-col items-center justify-center gap-4 pb-[4em] font-nunito text-lg font-bold italic tracking-wider text-slate-500 sm:w-10/12"
    >
      {/* Difficulty settings modal */}
      {showDifficultyMenu && (
        <SettingsModal setShowDifficultyMenu={setShowDifficultyMenu} />
      )}

      <h2
        className={`${styles["main-heading"]} -m-9 flex pb-10 text-3xl leading-3 text-default-sky-blue opacity-0 sm:text-4xl sm:opacity-100`}
      >
        Test your typing skills!
      </h2>

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

      <Button
        title=""
        text="Start Test"
        handleOnClick={() => {}}
        type="submit"
        customStyle="flex relative border mt-6 p-2 px-6 rounded-md text-md text-white bg-sky-700 outline-green-900"
      />
    </form>
  );
}

export default StartMenu;
