import Button from "../ui/Button";
import manipulateString from "../utility/ManipulateString";
import TestTimeOptions from "./TestTimeOptions";
import { useState, useEffect } from "react";
import DropDownMenu from "../ui/DropDownMenu";
import LockScreenForModal from "../utility/LockScreenForModal";
import SettingsModal from "../ui/SettingsModal";
// import Icon from "../utility/Icon";

interface propTypes {
  startTest: (value: boolean) => void;
  text: string;
  setText: (value: string) => void;
  setTestTime: (value: number) => void;
  setCharIsValid: (value: Array<string>) => void;
}

interface Data {
  difficulty: string;
  customStyle: string;
  selected: boolean;
}

function StartMenu({
  startTest,
  setText,
  text,
  setTestTime,
  setCharIsValid,
}: propTypes) {
  const [showDifficultyMenu, setShowDifficultyMenu] = useState<boolean>(false);
  const [difficultySetting, setDifficultySetting] = useState<Data[]>([
    {
      difficulty: "Very Easy",
      customStyle: "text-green-200",
      selected: false,
    },
    {
      difficulty: "Easy",
      customStyle: "text-green-400",
      selected: false,
    },
    {
      difficulty: "Medium",
      customStyle: "text-green-600",
      selected: true,
    },
    {
      difficulty: "Hard",
      customStyle: "text-red-400",
      selected: false,
    },
    {
      difficulty: "Very Hard",
      customStyle: "text-red-600",
      selected: false,
    },
  ]);

  const timeOptions = ["0.1", "2", "3", "5", "10"];
  const checkboxOptions = [
    "all lower case",
    "no punctuation",
    "ALL UPPER CASE",
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

  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let radioElement = null;
    const checkboxElements: Array<HTMLInputElement> = [];
    const checkboxElementNames: Array<string> = [];

    Array.from(e.currentTarget).forEach((element) => {
      const targetElement = element as HTMLInputElement;

      if (targetElement && targetElement.checked) {
        // Manage time option settings
        if (targetElement.name.includes("time-setting")) {
          radioElement = targetElement.value;
        } else {
          checkboxElements.push(targetElement);
          checkboxElementNames.push(targetElement.value);
        }
      }
    });

    radioElement && setTestTime(parseInt(radioElement) * 60); //Set test time based on user selection

    if (checkboxElements.length > 0) {
      let updatedText = "";
      // Apply selected checkbox options to text
      checkboxOptions.forEach((option) => {
        if (checkboxElementNames.includes(option)) {
          updatedText = manipulateString({
            textToBeManipulated: updatedText || text,
            option,
          });

          // Modify text based on checkbox options
          updatedText && setText(updatedText);
        }
      });
    }

    setCharIsValid(new Array(text.length).fill("")); //Set char validity array based on length of text generated.
    startTest(true);
  };

  useEffect(() => {
    LockScreenForModal({ showMenu: showDifficultyMenu }); //Handle nav bar and background scroll for modal
  }, [showDifficultyMenu]);

  return (
    <>
      <form
        onSubmit={handleSubmission}
        className="flex flex-col justify-center gap-4 items-center w-full text-lg m-24 mb-14 text-slate-500 font-nunito tracking-wider sm:w-10/12"
      >
        {/* Difficulty settings modal */}
        {showDifficultyMenu && (
          <SettingsModal
            setShowDifficultyMenu={setShowDifficultyMenu}
            difficultySetting={difficultySetting}
            setDifficultySetting={setDifficultySetting}
          />
        )}

        <h2 className="text-2xl leading-3 -m-8 pb-8 font-nunito text-default-sky-blue sm:text-4xl">
          Test your typing skills!
        </h2>

        <TestTimeOptions timeOptions={timeOptions} />

        <DropDownMenu
          menuData={difficultySetting}
          labelText={"Difficulty:"}
          iconName="boxingGlove"
          setMenuData={setDifficultySetting}
          setShowDifficultyMenu={setShowDifficultyMenu}
          showSettingsBtn={true}
        />

        {/* <div className="flex justify-center items-center gap-3">
          <Icon icon="article" title="article-icon" customStyle="flex" />{" "}
          Textbox: Multiline | Single line
        </div>
        <div className="flex justify-center items-center gap-3">
          <Icon icon="keyboard" title="keyboard-icon" customStyle="flex" />{" "}
          Keyboard:
        </div>

        <div className="flex justify-center items-center gap-3">
          <Icon icon="lightMode" title="light-mode-icon" customStyle="flex" />
          Theme:
        </div> */}

        {/* This is the modal for managing difficulty settings. */}

        <Button
          text="Start Test"
          handleOnClick={() => {}}
          type="submit"
          customStyle="flex relative border mt-6 p-2 px-6 rounded-md text-md text-white bg-start-btn-green outline-green-900"
        />
      </form>
    </>
  );
}

export default StartMenu;
