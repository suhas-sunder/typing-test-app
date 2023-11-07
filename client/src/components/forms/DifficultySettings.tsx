// Depending on difficulty settings passed in, determine which test settings should be applied
// const checkboxOptions = [
//   "all lower case",
//   "no punctuation",
//   "ALL UPPER CASE",
//   "PascalCase",
//   "camelCase",
//   "MiXeDcAsE",
//   "snake_case",
//   "Digits 0 - 9",
//   "complex words",
//   "P.u?n!c't+u*a~t>e^d",
//   "N3u4m5b6e7r1e3d",
//   "no whitespace",
// ];

import Button from "../ui/Button";

interface PropType {
  setShowDifficultyMenu: (value: boolean) => void;
}

function DifficultySettings({ setShowDifficultyMenu }: PropType) {
  return (
    <>
      <div
        data-testid="modal backdrop"
        aria-label="close settings menu button as background underlay"
        className="absolute top-0 left-0  w-full h-full bg-black opacity-40 items-center justify-center z-30"
        onClick={() => setShowDifficultyMenu(false)}
      ></div>
      <div className="flex flex-col absolute w-1/2 h-1/2 justify-center items-center p-10 rounded-xl bg-white z-30">
        <div className="flex justify-evenly font-nunito">
          <Button
            text="Main Menu"
            handleOnClick={() => setShowDifficultyMenu(false)}
            type="button"
            customStyle="px-6 py-2 my-6 bg-start-btn-green text-white"
          />
        </div>
      </div>
    </>
  );
}

export default DifficultySettings;
