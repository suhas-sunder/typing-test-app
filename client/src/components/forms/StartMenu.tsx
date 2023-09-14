interface propTypes {
  startTest: (value: boolean) => void;
}

function StartMenu({ startTest }: propTypes) {
  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted", e);
    startTest(true);
  };

  const handleSettings = (shouldReset: boolean) => {
    shouldReset
      ? console.log("restore defaults")
      : console.log("save settings");
  };

  return (
    <form
      onSubmit={handleSubmission}
      className="flex flex-col justify-center gap-5 items-center w-10/12 text-lg m-24 rounded-md"
    >
      <h2 className="text-3xl leading-3 -m-6 pb-12">
        Test your typing skills!
      </h2>
      <ul className="grid grid-flow-col auto-cols-min justify-evenly w-full text-4xl mt-8 mb-6 text-slate-400">
        <li>
          <label className="flex flex-col items-center hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer p-10 pb-6 pt-6 border-2 border-slate-200 rounded-lg">
            <span>1</span>
            <span className="text-2xl">min</span>
            <input type="checkbox" className="hidden" />
          </label>
        </li>
        <li>
          <label className="flex flex-col items-center hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer p-10 pb-6 pt-6 border-2 border-slate-200 rounded-lg">
            <span>2</span>
            <span className="text-2xl">min</span>
            <input type="checkbox" className="hidden" />
          </label>
        </li>
        <li>
          <label className="flex flex-col items-center hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer p-10 pb-6 pt-6 border-2 border-slate-200 rounded-lg">
            <span>3</span>
            <span className="text-2xl">min</span>
            <input type="checkbox" className="hidden" />
          </label>
        </li>
        <li>
          <label className="flex flex-col items-center hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer p-10 pb-6 pt-6 border-2 border-slate-200 rounded-lg">
            <span>5</span>
            <span className="text-2xl">min</span>
            <input type="checkbox" className="hidden" />
          </label>
        </li>
        <li>
          <label className="flex flex-col items-center hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer p-10 pb-6 pt-6 border-2 border-slate-200 rounded-lg">
            <span>10</span>
            <span className="text-2xl">min</span>
            <input type="checkbox" className="hidden" />
          </label>
        </li>
      </ul>

      <div className="w-10/12 gap-5 grid grid-cols-2 mb-2">
        <div className="flex gap-3">
          <input type="checkbox" className="flex w-6 " />
          <label className="flex">all lowercase</label>
        </div>

        <div className="flex place-self-end gap-3">
          <label className="flex">ALL UPPERCASE</label>
          <input type="checkbox" className="flex w-6" />
        </div>

        <div className="flex gap-3">
          <input type="checkbox" className="flex w-6" />
          <label className="flex">Chars: @ # $ % ^ &</label>
        </div>

        <div className="flex place-self-end gap-3">
          <label className="flex">Chars: * _ - + = </label>
          <input type="checkbox" className="flex w-6" />
        </div>

        <div className="flex gap-3">
          <input type="checkbox" className="flex w-6" />
          <label className="flex">Chars: ; ~ | : ( )</label>
        </div>

        <div className="flex place-self-end gap-3">
          <label className="flex">Chars: . , ? ! ' '</label>
          <input type="checkbox" className="flex w-6" />
        </div>

        <div className="flex gap-3">
          <input type="checkbox" className="flex w-6" />
          <label className="flex">PascalCase</label>
        </div>

        <div className="flex place-self-end gap-3">
          <label className="flex">camelCase</label>
          <input type="checkbox" className="flex w-6" />
        </div>

        <div className="flex gap-3">
          <input type="checkbox" className="flex w-6" />
          <label className="flex">snake_case </label>
        </div>

        <div className="flex place-self-end gap-3">
          <label className="flex">UPPERCASE</label>
          <input type="checkbox" className="flex w-6" />
        </div>

        <div className="flex gap-3">
          <input type="checkbox" className="flex w-6" />
          <label className="flex">MiXeDcAsE</label>
        </div>

        <div className="flex place-self-end gap-3">
          <label className="flex">Digits: 0 to 9</label>
          <input type="checkbox" className="flex w-6" />
        </div>

        <div className="flex gap-3">
          <input type="checkbox" className="flex w-6" />
          <label className="flex">Tricky words</label>
        </div>

        <div className="flex place-self-end  gap-3">
          <label className="flex">No spaces</label>
          <input type="checkbox" className="flex w-6" />
        </div>
      </div>
      <div className="flex mt-3 mb-8 w-3/4 justify-between">
        <button
          type="button"
          onClick={() => handleSettings(false)}
          className="border p-2 pl-6 pr-6 rounded-lg text-lg bg-slate-500 text-white hover:bg-slate-400"
        >
          Save Settings
        </button>
        <label className="flex flex-col items-center hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer p-2 pl-6 pr-6 text-slate-500 border-2 border-slate-200 rounded-lg">
          <span>
            <span className="hidden">Show</span>
            <span>Hide</span> Keyboard
          </span>
          <input type="checkbox" className="hidden" />
        </label>
        <button
          type="button"
          onClick={() => handleSettings(true)}
          className="border p-2 pl-6 pr-6 rounded-lg text-lg bg-slate-500 text-white hover:bg-slate-400"
        >
          Restore Defaults
        </button>
      </div>

      <button
        type="submit"
        className="border p-5 pl-10 pr-10 -mb-8 rounded-lg text-3xl bg-green-500 text-white hover:bg-green-400"
      >
        Start Test
      </button>
    </form>
  );
}

export default StartMenu;
