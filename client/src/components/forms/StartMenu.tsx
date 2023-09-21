import styles from "./styles/StartMenu.module.css";

interface propTypes {
  startTest: (value: boolean) => void;
  setText: (value: string) => void;
  setTestTime: (value: number) => void;
  placeholderText: string;
}

function StartMenu({
  startTest,
  setText,
  setTestTime,
  placeholderText,
}: propTypes) {
  // Manipulate text based on test settings
  const applyTestSettings = () => {
    // Make sure to only fetch new data if text = ""
    // placeholderText - Use this text if fetch API fails to load text from database so that the test doesn't crash.
    // setText(placeholderText);
  };

  const radioOptions = ["1", "2", "3", "4", "5"];
  const checkboxOptions = [
    "lowercase",
    "Sentence case",
    "whitespace",
    ".",
    "PascalCase",
    "camelCase",
    "snake_case",
    "MiXeDcAsE",
    "Tricky words",
    "Digits 0 - 9",
    "&",
    ",",
    "'",
    "?",
    "!",
    "*",
    "_",
    "-",
    "+",
    "=",
    "#",
    "$",
    ";",
    "~",
    "|",
    ":",
    "( )",
    "[ ]",
    "%",
    "^",
  ];

  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let radioElement = null;
    const checkboxElements: Array<HTMLInputElement> = [];
    const checkboxElementNames: Array<string> = [];
    // let textToBeManipulated = placeholderText;

    Array.from(e.currentTarget).forEach((element) => {
      const targetElement = element as HTMLInputElement;
      if (targetElement.checked) {
        if (targetElement.name.includes("time-setting")) {
          radioElement = targetElement.value;
        } else {
          checkboxElements.push(targetElement);
          checkboxElementNames.push(targetElement.value);
        }
      }
    });

    radioElement && setTestTime(parseInt(radioElement) * 60); //Set test time based on user selection

    // const regExpFilters = [/a-z/, /regex2/, /regex3/];

    // if (!checkboxElementNames.includes("Sentence case")) {
    //   textToBeManipulated = textToBeManipulated.toLowerCase();
    //   // applyTestSettings(textToBeManipulated, handleSentenceCase)
    // }

    // //if(checkboxElements.name.includes(regExpfilters)) Apply filters
    // if (!checkboxElementNames.includes("lowercase")) {
    //   textToBeManipulated = textToBeManipulated.toUpperCase();
    // }

    // if (!checkboxElementNames.includes("whitespace")) {
    //   textToBeManipulated = textToBeManipulated.split(" ").join("");
    // }

    // if (checkboxElementNames.includes("& . , ' ' ? !")) {
    //   console.log("works");
    //   // textToBeManipulated = textToBeManipulated.split(" ").join("");
    // }

    // setText(textToBeManipulated);
    setText(placeholderText);
    startTest(true);
  };

  // Save settings or restore defaults
  const handleSettings = (shouldReset: boolean) => {
    shouldReset
      ? console.log("restore defaults")
      : console.log("save settings");
  };

  return (
    <form
      onSubmit={handleSubmission}
      className="flex flex-col justify-center gap-5 items-center w-10/12 text-lg m-24 rounded-md text-slate-500"
    >
      <h2 className="text-5xl leading-3 -m-8 pb-14">
        Test your typing skills!
      </h2>
      <ul className="grid grid-flow-col auto-cols-min justify-evenly w-full text-4xl mt-8 mb-6">
        {radioOptions.map((option, index) => (
          <li key={index}>
            <label
              htmlFor={`radio-${option}`}
              className="flex flex-col justify-center items-center h-32 w-32 border-2 border-slate-200 rounded-lg"
            >
              <span className="font-bold">{option}</span>
              <span className="text-2xl">min</span>
              <input
                id={`radio-${option}`}
                type="radio"
                name="time-setting"
                className={styles.radio}
                defaultChecked={index === 0 ? true : false}
                value={option}
              />
            </label>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-4 gap-6 w-10/12 mb-4">
        {checkboxOptions.map((option, index) => (
          <label
            key={index}
            className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 "
          >
            {option}
            <input
              name="text-setting"
              type="checkbox"
              className="hidden"
              defaultChecked={index <= 3 ? true : false}
              value={option}
            />
          </label>
        ))}
      </div>
      <div className="flex mt-4 -mb-5 w-3/4 justify-between items-center">
        <button
          type="button"
          onClick={() => handleSettings(false)}
          className="border p-2 pl-6 pr-6 rounded-full text-lg bg-slate-500 text-white hover:bg-slate-400"
        >
          Save Settings
        </button>
        <button
          type="submit"
          className="border p-4 pl-10 pr-10 rounded-full text-3xl bg-green-500 text-white hover:bg-green-400"
        >
          Start Test
        </button>
        <button
          type="button"
          onClick={() => handleSettings(true)}
          className="border p-2 pl-6 pr-6 rounded-full text-lg bg-slate-500 text-white hover:bg-slate-400"
        >
          Restore Defaults
        </button>
      </div>
    </form>
  );
}

export default StartMenu;
