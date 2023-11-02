function DifficultySettings() {
  return (
    <div className="flex  w-11/12 gap-5 ">
      {/* <div className="flex gap-5 justify-center items-center">
        
      </div> */}
      <label className="flex justify-center items-center   p-0">
        Difficulty:
      </label>
      <div className="grid grid-cols-4 w-full justify-center items-center gap-5">
        <select className="text-center text-default-sky-blue border-2 rounded-md text-sm border-default-light-sky-blue py-2 hover:cursor-pointer">
          <option value="very easy">Very Easy</option>
          <option value="easy">Easy</option>
          <option value="medium" selected>
            Medium
          </option>
          <option value="hard">Hard</option>
          <option value="veary hard">Very Hard</option>
          <option value="veary hard">Custom:</option>
        </select>
        <select className="text-center text-default-sky-blue border-2 rounded-md  text-sm border-default-light-sky-blue py-2 hover:cursor-pointer">
          <option value="very easy">This is option 1</option>
          <option value="easy">This is option 2</option>
          <option value="easy" selected>
            -- Add New --
          </option>
        </select>

        <button className="border py-[0.5em] rounded-md text-sm bg-slate-500 text-white tracking-wider hover:bg-start-btn-green">
          Add
          {/* Delete */}
        </button>
        <button className="border py-[0.5em] rounded-md text-sm bg-slate-500 text-white hover:brightness-105 tracking-wider">
          Set As Default
        </button>
      </div>
    </div>
  );
}

export default DifficultySettings;
