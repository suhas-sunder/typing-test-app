// import TestSettings from "./TestSettings";
import Button from "../ui/Button";
import manipulateString from "../utility/ManipulateString";
import DifficultySettings from "./DifficultySettings";
import TestTimeOptions from "./TestTimeOptions";

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
  const radioOptions = ["1", "2", "3", "5", "10"];
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

  return (
    <>
      <form
        onSubmit={handleSubmission}
        className="flex flex-col justify-center gap-6 items-center w-full text-lg m-24 mb-14 text-slate-500 font-nunito tracking-wider sm:w-10/12"
      >
        <h2 className="text-2xl leading-3 -m-8 pb-14 font-nunito text-default-sky-blue sm:text-4xl">
          Test your typing skills!
        </h2>

        <TestTimeOptions timeOptions={radioOptions} />
        <DifficultySettings />
        {/* <div>Dark Mode:</div>
        <div>Keyboard Animation:</div>
        <div>Textbox: Multiline | Single line</div> */}

        {/* <TestSettings checkboxOptions={checkboxOptions} /> */}

        <Button
          text="Start Test"
          handleOnClick={() => {}}
          type="submit"
          customStyle="flex border mt-6 p-2 px-6 rounded-md text-md text-white bg-start-btn-green outline-green-900"
        />
      </form>
    </>
  );
}

export default StartMenu;
