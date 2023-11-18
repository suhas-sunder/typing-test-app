interface PropType {
  inputRef: React.RefObject<HTMLInputElement>;
}

function SettingNameInputs({ inputRef }: PropType) {
  return (
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
        className="border-2 rounded-md p-1 pl-4 text-base"
      />
    </div>
  );
}

export default SettingNameInputs;
