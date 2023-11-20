import { useState } from "react";
interface PropType {
  inputRef: React.RefObject<HTMLInputElement>;
}

function SettingNameInputs({ inputRef }: PropType) {
  const [blurActive, setBlurActive] = useState<boolean>(false);

  const handleInputError = () => {
    if (!inputRef.current?.value) {
      return (
        <span className="text-sm text-red-400 pt-2">
          **Input field cannot be empty**
        </span>
      );
    } else if (inputRef.current?.value.length > 9) {
      return (
        <span className="text-sm text-red-400 pt-2">
          **Setting name must be less than 9 characters**
        </span>
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="flex justify-center items-center gap-3">
        <label htmlFor="custom-difficulty" className="cursor-pointer">
          Setting Name:
        </label>
        <input
          ref={inputRef}
          id="custom-difficulty"
          autoFocus
          type="text"
          placeholder="Enter Setting Name"
          className={`${blurActive && (!inputRef.current?.value || inputRef.current?.value.length > 9) && "border-red-300"} border-2 rounded-md p-1 pl-4 text-base`}
          onBlur={() => setBlurActive(true)}
          onFocus={() => setBlurActive(false)}
        />
      </div>
      {blurActive && handleInputError()}
    </div>
  );
}

export default SettingNameInputs;
