import Icon from "../utility/Icon";

const optionsData = ["Very Easy", "Easy", "Medium", "Hard", "Very Hard"];

function DifficultySettings() {
  return (
    <div className="flex relative justify-center items-center  w-11/12 gap-5 ">
      {/* <div className="flex gap-5 justify-center items-center">
        
      </div> */}
      <label className="flex relative p-0 cursor-pointer" htmlFor="difficulty">
        <Icon
          icon="punchingGlove"
          title="difficulty-icon"
          customStyle="flex relative justify-center items-center pr-2 text-yellow-500"
        />{" "}
        Difficulty:
      </label>
      <div
        className={` flex relative gap-5 text-slate-500 hover:text-default-sky-blue`}
      >
        <Icon
          icon="chevron"
          title="chevron-icon"
          customStyle={` flex absolute right-0 top-[19%] pr-2`}
        />
        <select
          id="difficulty"
          className={` flex relative border-2 rounded-md text-sm bg-transparent border-slate-200 py-2 pr-10 pl-4 hover:cursor-pointer hover:border-default-sky-blue  outline-default-sky-blue appearance-none`}
          defaultValue={"medium"}
        >
          {optionsData.map((options) => (
            <option value="very easy" className="bg-white">
              {options}
            </option>
          ))}
        </select>

        {/* <div className="flex w-full gap-5">
          <select className="text-center text-default-sky-blue border-2 rounded-md  text-sm border-default-light-sky-blue py-2 hover:cursor-pointer">
            <option value="very easy">This is option 1</option>
            <option value="easy">This is option 2</option>
            <option value="easy" selected>
              -- Add New --
            </option>
          </select>

          <button className="border py-[0.5em] px-4 rounded-md text-sm bg-slate-500 text-white tracking-wider hover:bg-start-btn-green">
            Add
          </button>
        </div> */}
      </div>
      <button
        type="button"
        className="flex relative p-1 outline-green-900 hover:text-start-btn-green hover:cursor-pointer"
      >
        <Icon
          title="settings-icon"
          customStyle="flex relative justify-center items-center "
          icon="settingsSparkle"
        />
      </button>
    </div>
  );
}

export default DifficultySettings;
