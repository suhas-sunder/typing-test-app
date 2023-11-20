import Button from "../ui/Button";
import TestTimeOptions from "./TestTimeOptions";
import { useContext, useState, useEffect } from "react";
import DropDownMenu from "../ui/DropDownMenu";
import SettingsModal from "../ui/SettingsModal";
import Icon from "../../utils/Icon";
import manipulateString from "../../utils/ManipulateString";
import { MenuContext } from "../../providers/MenuProvider";
import { AuthContext } from "../../providers/AuthProvider";

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
  const { checkboxOptions, currentDifficulty, setAuth } =
    useContext(MenuContext);
  const { isAuthenticated } = useContext(AuthContext);

  const timeOptions = ["1", "2", "3", "5", "10"];
  const [showDifficultyMenu, setShowDifficultyMenu] = useState<boolean>(false);
  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let radioElement = null;

    // Manage menu inputs
    Array.from(e.currentTarget).forEach((element) => {
      const targetElement = element as HTMLInputElement;

      if (
        targetElement.checked &&
        targetElement.name.includes("time-setting")
      ) {
        radioElement = targetElement.value; //Keep track of test time input options
      }
    });

    radioElement && setTestTime(parseInt(radioElement) * 60); //Set test time based on user selection

    let updatedText = "";

    // Apply selected options from current difficulty setting selected and mutate default text accordingly.
    (checkboxOptions[currentDifficulty].settings as string[]).forEach(
      (option) => {
        updatedText = manipulateString({
          textToBeManipulated: updatedText || text,
          option,
        });

        // Modify text based on checkbox options
        updatedText && setText(updatedText);
      }
    );

    setCharIsValid(new Array(text.length).fill("")); //Set  char validity array based on length of text generated.
    startTest(true); //Signals start of test
  };

  useEffect(() => {
    setAuth(isAuthenticated);
  }, [setAuth, isAuthenticated]);

  return (
    <>
      <form
        onSubmit={handleSubmission}
        className="flex flex-col justify-center gap-4 items-center w-full text-lg m-24 mb-14 text-slate-500 font-nunito tracking-wider sm:w-10/12"
      >
        {/* Difficulty settings modal */}
        {showDifficultyMenu && (
          <SettingsModal setShowDifficultyMenu={setShowDifficultyMenu} />
        )}

        <h2 className="text-2xl leading-3 -m-8 pb-8 font-nunito text-default-sky-blue sm:text-4xl">
          Test your typing skills!
        </h2>

        <TestTimeOptions timeOptions={timeOptions} />

        <DropDownMenu
          labelText={"Difficulty:"}
          iconName="boxingGlove"
          setShowDifficultyMenu={setShowDifficultyMenu}
          showSettingsBtn={true}
        />

        <div className="flex justify-center items-center gap-3">
          <Icon icon="article" title="article-icon" customStyle="flex" />{" "}
          Textbox: Multiline | Single line
        </div>
        <div className="flex justify-center items-center gap-3">
          <Icon icon="keyboard" title="keyboard-icon" customStyle="flex" />{" "}
          Keyboard:
        </div>

        {/* This is the modal for managing difficulty settings. */}

        <Button
          title=""
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
