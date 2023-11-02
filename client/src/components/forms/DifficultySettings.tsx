import SettingsSuggestTwoToneIcon from "@mui/icons-material/SettingsSuggestTwoTone";

function DifficultySettings() {
  return (
    <div className="flex justify-center items-center  w-11/12 gap-5 ">
      {/* <div className="flex gap-5 justify-center items-center">
        
      </div> */}
      <label className="flex p-0" htmlFor="difficulty">
        Difficulty:
      </label>
      <div className="flex gap-5">
        <select
          id="difficulty"
          className="text-center text-slate-500 border-2 rounded-md text-sm border-slate-200 py-2 hover:cursor-pointer hover:border-default-sky-blue hover:text-default-sky-blue outline-default-sky-blue "
          defaultValue={"medium"}
        >
          <option value="very easy">Very Easy</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="veary hard">Very Hard</option>
          <option value="custom">Custom:</option>
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
      <button className="flex p-1 outline-green-900 hover:text-start-btn-green hover:cursor-pointer">
        <i className="flex relative justify-center items-center ">
          <SettingsSuggestTwoToneIcon />
        </i>
      </button>
    </div>
  );
}

export default DifficultySettings;
