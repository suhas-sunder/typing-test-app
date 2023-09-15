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
      className="flex flex-col justify-center gap-5 items-center w-10/12 text-lg m-24 rounded-md  text-slate-500"
    >
      <h2 className="text-5xl leading-3 -m-8 pb-14">
        Test your typing skills!
      </h2>
      <ul className="grid grid-flow-col auto-cols-min justify-evenly w-full text-4xl mt-8 mb-6">
        <li>
          <label className="flex flex-col items-center hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer p-10 pb-6 pt-6 border-2 border-slate-200 rounded-lg">
            <span className="font-bold">1</span>
            <span className="text-2xl">min</span>
            <input type="checkbox" className="hidden" />
          </label>
        </li>
        <li>
          <label className="flex flex-col items-center hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer p-10 pb-6 pt-6 border-2 border-slate-200 rounded-lg">
            <span className="font-bold">2</span>
            <span className="text-2xl">min</span>
            <input type="checkbox" className="hidden" />
          </label>
        </li>
        <li>
          <label className="flex flex-col items-center hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer p-10 pb-6 pt-6 border-2 border-slate-200 rounded-lg">
            <span className="font-bold">3</span>
            <span className="text-2xl">min</span>
            <input type="checkbox" className="hidden" />
          </label>
        </li>
        <li>
          <label className="flex flex-col items-center hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer p-10 pb-6 pt-6 border-2 border-slate-200 rounded-lg">
            <span className="font-bold">5</span>
            <span className="text-2xl">min</span>
            <input type="checkbox" className="hidden" />
          </label>
        </li>
        <li>
          <label className="flex flex-col items-center hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer p-10 pb-6 pt-6 border-2 border-slate-200 rounded-lg">
            <span className="font-bold">10</span>
            <span className="text-2xl">min</span>
            <input type="checkbox" className="hidden" />
          </label>
        </li>
      </ul>

      <div className="grid grid-cols-4 gap-6 w-10/12 mb-4">
        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer ">
          lowercase
          <input type="checkbox" className="hidden" />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer ">
          Sentence case
          <input type="checkbox" className="hidden" />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer ">
          whitespace
          <input type="checkbox" className="hidden" />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer">
          & . , ' ' ? !
          <input type="checkbox" className="hidden" />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer ">
          PascalCase
          <input type="checkbox" className="hidden" />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer ">
          camelCase
          <input type="checkbox" className="hidden" />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer ">
          snake_case
          <input type="checkbox" className="hidden" />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer ">
          MiXeDcAsE
          <input type="checkbox" className="hidden" />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer ">
          Tricky words
          <input type="checkbox" className="hidden" />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer ">
          Digits 0 - 9
          <input type="checkbox" className="hidden" />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer">
          * _ - + = # $
          <input type="checkbox" className="hidden" />
        </label>

        <label className="flex justify-center m-auto border-2 border-slate-200 rounded-md p-2 w-40 hover:text-green-500 hover:border-green-300 hover:border-1 cursor-pointer">
          ; ~ | : ( ) % ^
          <input type="checkbox" className="hidden" />
        </label>
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
          className="border p-4 pl-10 pr-10  rounded-full text-3xl bg-green-500 text-white hover:bg-green-400"
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
