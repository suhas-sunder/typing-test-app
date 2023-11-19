import capitalizeOddChars from "./CapitalizeOddChars";
import generateRandNum from "./GenerateRandNum";

interface PropTypes {
  textToBeManipulated: string;
  option: string;
}

function ManipulateString({
  textToBeManipulated,
  option: targetOption,
}: PropTypes) {
  if (targetOption === "no whitespace") {
    return textToBeManipulated.replace(/\s/g, ""); //Remove all lowercase
  }

  if (targetOption === "all lower case") {
    return textToBeManipulated.toLowerCase(); //Remove all Sentence case
  }

  //if(checkboxElements.name.includes(regExpfilters)) Apply filters
  if (targetOption === "ALL UPPER CASE") {
    return textToBeManipulated.toUpperCase(); //Remove all lowercase
  }

  // Removes all character except alphanumeric and whitespace.
  if (targetOption === "no punctuation") {
    return textToBeManipulated.replace(/[^\w\s']|_/g, "").replace(/\s+/g, " "); //Remove all lowercase
  }

  if (targetOption === "P.u?n!c't+u*a~t>e^d") {
    return textToBeManipulated.toUpperCase(); //Remove all lowercase
  }

  const wordsArr = textToBeManipulated.split(" ");
  const wordsLength = wordsArr.length;
  const tenPercentOfLength = Math.ceil(wordsLength / 10);
  let count = 0;

  // Apply all settings to 10% of text randomly.
  while (count <= tenPercentOfLength) {
    if (targetOption === "PascalCase") {
      const randIndexOne = generateRandNum({ max: wordsLength }); //Create random number
      const randIndexTwo = generateRandNum({ max: wordsLength }); //Create another random number

      // Refactor this later to pull a word from words list for both words. Right now, it can generate strings that are way too long.
      wordsArr[randIndexOne] =
        capitalizeOddChars({
          word: wordsArr[randIndexOne],
          lengthToCapatilize: 1,
        }) +
        capitalizeOddChars({
          word: wordsArr[randIndexTwo],
          lengthToCapatilize: 1,
        });
    }

    if (targetOption === "camelCase") {
      const randIndexOne = generateRandNum({ max: wordsLength }); //Create random number
      const randIndexTwo = generateRandNum({ max: wordsLength }); //Create another random number

      // Refactor this later to pull a word from words list for both words. Right now, it can generate strings that are way too long.
      wordsArr[randIndexOne] =
        wordsArr[randIndexOne] +
        capitalizeOddChars({
          word: wordsArr[randIndexTwo],
          lengthToCapatilize: 1,
        });
    }

    if (targetOption === "MiXeDcAsE") {
      const randIndex = generateRandNum({ max: wordsLength }); //Create random number

      // Refactor this later to pull a word from words list for both words. Right now, it can generate strings that are way too long.
      wordsArr[randIndex] = capitalizeOddChars({
        word: wordsArr[randIndex],
        lengthToCapatilize: wordsArr[randIndex].length,
      });
    }

    if (targetOption === "snake_case") {
      const randIndexOne = generateRandNum({ max: wordsLength }); //Create random number
      const randIndexTwo = generateRandNum({ max: wordsLength }); //Create another random number

      // Refactor this later to pull a word from words list for both words. Right now, it can generate strings that are way too long.
      wordsArr[
        randIndexOne
      ] = `${wordsArr[randIndexOne]}_${wordsArr[randIndexTwo]}`;
    }

    if (targetOption.startsWith("Digits")) {
      const randIndex = generateRandNum({ max: wordsLength });
      const randomNumber = generateRandNum({ max: 999 });

      wordsArr.splice(randIndex, 0, randomNumber.toString());
    }

    count++;
  }

  return wordsArr.join(" ");
}

export default ManipulateString;
