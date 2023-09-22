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
  const radioOptions = ["1", "2", "3", "4", "5"];
  const checkboxOptions = [
    "lowercase",
    "Sentence case",
    "whitespace",
    ". ? ! ,",
    "PascalCase",
    "camelCase",
    "MiXeDcAsE",
    "snake_case",
    "Digits 0 - 9",
    "&",
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
    "%",
    "^",
  ];

  // If default options are removed, modify text accordingly
  const handleRemoveDefaults = (
    checkboxElementNames: Array<string>,
    textToBeManipulated: string
  ) => {
    if (!checkboxElementNames.includes("Sentence case")) {
      textToBeManipulated = textToBeManipulated.toLowerCase(); //Remove all Sentence case
    }

    //if(checkboxElements.name.includes(regExpfilters)) Apply filters
    if (!checkboxElementNames.includes("lowercase")) {
      textToBeManipulated = textToBeManipulated.toUpperCase(); //Remove all lowercase
    }

    if (!checkboxElementNames.includes(".")) {
      textToBeManipulated = textToBeManipulated.split(".").join(""); //Remove all periods
    }

    return textToBeManipulated;
  };

  // Returns capital case or mixed case string
  const capitalizeOddChars = (word: string, lengthToCapatilize: number) => {
    const charArr = word.split("");

    return charArr
      .map((char, index) =>
        index % 2 === 0 && index <= lengthToCapatilize
          ? char.toUpperCase()
          : char
      )
      .join("");
  };

  // Returns a random number
  const generateRandomNum = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  // Modify text based on checkbox options
  const handleModifyText = (
    textToBeManipulated: string,
    targetOption: string,
    checkboxElementNames: Array<string>
  ) => {
    const wordsArr = textToBeManipulated.split(" ");
    const tenPercentOfLength = Math.ceil(wordsArr.length / 10);

    let count = 0;

    // Apply all settings to 10% of text randomly.
    while (count <= tenPercentOfLength) {
      if (targetOption === "PascalCase") {
        // Apply PascalCase to 10% of text
        const randIndexOne = generateRandomNum(wordsArr.length); //Create random number
        const randIndexTwo = generateRandomNum(wordsArr.length); //Create another random number

        wordsArr[randIndexOne] =
          capitalizeOddChars(wordsArr[randIndexOne], 1) +
          capitalizeOddChars(wordsArr[randIndexTwo], 1);
      }

      if (targetOption === "camelCase") {
        const randIndexOne = generateRandomNum(wordsArr.length); //Create random number
        const randIndexTwo = generateRandomNum(wordsArr.length); //Create another random number

        wordsArr[randIndexOne] =
          wordsArr[randIndexOne] +
          capitalizeOddChars(wordsArr[randIndexTwo], 1);
      }

      if (targetOption === "MiXeDcAsE") {
        // Apply camelCase to 10% of text
        const randIndex = generateRandomNum(wordsArr.length); //Create random number

        wordsArr[randIndex] = capitalizeOddChars(
          wordsArr[randIndex],
          wordsArr[randIndex].length
        );

        // Char manipulation
      }

      if (targetOption === "snake_case") {
        textToBeManipulated = "";
        const randIndexOne = generateRandomNum(wordsArr.length); //Create random number
        const randIndexTwo = generateRandomNum(wordsArr.length); //Create another random number

        wordsArr[
          randIndexOne
        ] = `${wordsArr[randIndexOne]}_${wordsArr[randIndexTwo]}`;
      }

      if (targetOption.startsWith("Digits")) {
        const randIndex = generateRandomNum(wordsArr.length);
        const randomNumber = generateRandomNum(999);

        wordsArr[randIndex] = randomNumber.toString();
      }

      if (checkboxElementNames.includes(targetOption)) {
        const randIndex = generateRandomNum(wordsArr.length);

        // wordsArr[randIndex].push(targetOption);
      }

      count++;
    }

    return wordsArr.join(" ");
  };

  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let radioElement = null;
    const checkboxElements: Array<HTMLInputElement> = [];
    const checkboxElementNames: Array<string> = [];
    let textToBeManipulated = placeholderText;

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

    // If user removes any of the default options, remove them from original text.
    textToBeManipulated = handleRemoveDefaults(
      checkboxElementNames,
      textToBeManipulated
    );

    if (checkboxElements.length > 0) {
      // Apply selected checkbox options to text
      checkboxOptions.forEach((option, index) => {
        if (index > 3 && checkboxElementNames.includes(option)) {
          textToBeManipulated = handleModifyText(
            textToBeManipulated,
            option,
            checkboxElementNames
          );
        }
      });

      // This is not includes in handleRemoveDefaults because it needs to be handled last to preserve all other changes.
      if (!checkboxElementNames.includes("whitespace")) {
        textToBeManipulated = textToBeManipulated.split(" ").join(""); //Removes whitespace
      }
    }

    setText(textToBeManipulated);
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
