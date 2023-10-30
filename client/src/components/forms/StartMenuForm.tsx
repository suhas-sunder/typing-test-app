import styles from "./styles/StartMenu.module.css";
import TestSettings from "./TestSettings";
import manipulateString from "../utility/ManipulateString";

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
  // const [showAdvancedSettings, setShowAdvancedSettings] =
  //   useState<boolean>(false);
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
            checkboxElementNames,
            checkboxOptions,
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
        className="flex flex-col justify-center gap-6 items-center w-10/12 text-lg m-24 mb-14 rounded-md text-slate-500 font-nunito tracking-wider"
      >
        <h2 className="text-4xl leading-3 -m-8 pb-14 font-nunito text-default-sky-blue">
          Test your typing skills!
        </h2>
        <ul className="grid grid-flow-col auto-cols-min justify-evenly w-full text-2xl mt-4 mb-6">
          {radioOptions.map((option, index) => (
            <li key={index}>
              <input
                id={`radio-${option}`}
                type="radio"
                name="time-setting"
                className={styles.radio}
                defaultChecked={index === 0 ? true : false}
                value={option}
              />
              <label
                htmlFor={`radio-${option}`}
                className={`${styles["menu-label"]} flex flex-col justify-center items-center h-24 w-24 border-2 border-slate-200 rounded-lg hover:text-default-sky-blue hover:cursor-pointer hover:border-default-light-sky-blue hover:font-medium`}
              >
                <span className="font-bold">{option}</span>
                <span className="text-2xl">min</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="flex gap-5">
          <label>Difficulty:</label>
          <select className="text-default-sky-blue">
            <option value="very easy">Very Easy</option>
            <option value="easy">Easy</option>
            <option value="medium" selected>
              Medium
            </option>
            <option value="hard">Hard</option>
            <option value="veary hard">Very Hard</option>
            <option value="veary hard">Custom:</option>
          </select>
          {/* <select className="text-default-sky-blue">
            <option value="very easy">Very Easy</option>
            <option value="easy">Easy</option>
            <option value="medium" selected>
              Medium
            </option>
            <option value="hard">Hard</option>
            <option value="veary hard">Very Hard</option>
            <option value="veary hard">Custom</option>
          </select> */}
          {/* <button className="border p-[0.3em] px-6 rounded-md w-[9em] text-sm bg-slate-500 text-white tracking-wider hover:bg-start-btn-green">
            Add New
          </button> */}
          {/* <button className="border p-[0.3em] px-6 rounded-md w-[9em] text-sm bg-slate-500 text-white hover:bg-red-600 tracking-wider">
            Delete
          </button> */}
        </div>
        <div>Keyboard Animation:</div>
        <div>Dark Mode:</div>

        {/* <TestSettings checkboxOptions={checkboxOptions} /> */}

        <button
          type="submit"
          className="flex border mt-6 p-2 px-6 rounded-md text-md  text-white bg-start-btn-green  hover:brightness-105 tracking-wider"
        >
          Start Test
        </button>
      </form>
    </>
  );
}

export default StartMenu;
