import { useContext, useState } from "react";
import { MenuContext } from "../../providers/MenuProvider";
interface PropType {
  inputRef: React.RefObject<HTMLInputElement>;
}

// Used by DifficultySettings.tsx component
function SettingNameInput({ inputRef }: PropType) {
  const [blurActive, setBlurActive] = useState<boolean>(false);
  const { difficultySettings } = useContext(MenuContext);

  const handleExistingName = () => {
    let namesMatch = false;
    Object.keys(difficultySettings).forEach((settingName) => {
      if (
        settingName.toLocaleLowerCase() ===
        inputRef.current?.value.toLowerCase()
      )
        namesMatch = true;
    });
    return namesMatch;
  };

  const handleInputError = () => {
    if (!inputRef.current?.value) {
      return (
        <span className="pt-2 text-sm text-red-400">
          **Setting name cannot be empty**
        </span>
      );
    } else if (inputRef.current?.value.length > 24) {
      return (
        <span className="pt-2 text-sm text-red-400">
          **Setting name must be less than 25 characters**
        </span>
      );
    } else if (handleExistingName()) {
      console.log("runs");
      return (
        <span className="pt-2 text-sm text-red-400">
          **Setting name already exists**
        </span>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex items-center justify-center gap-3">
        <label htmlFor="custom-difficulty" className="cursor-pointer">
          Setting Name:
        </label>
        <input
          ref={inputRef}
          id="custom-difficulty"
          autoFocus
          type="text"
          placeholder="Enter Setting Name"
          className={`${
            blurActive &&
            (!inputRef.current?.value ||
              inputRef.current?.value.length > 24 ||
              handleExistingName()) &&
            "border-red-300"
          } rounded-md border-2 p-1 pl-4 text-base`}
          onBlur={() => setBlurActive(true)}
          onFocus={() => setBlurActive(false)}
        />
      </div>
      {blurActive && handleInputError()}
    </div>
  );
}

export default SettingNameInput;
