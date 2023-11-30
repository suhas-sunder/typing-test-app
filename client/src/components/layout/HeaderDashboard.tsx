import ProfileImg from "../../images/wolf_icon.jpg";
import Icon from "../../utils/Icon";

function HeaderDashboard() {
  return (
    <>
      <div className="flex w-full max-w-[980px] items-end pt-10 font-roboto capitalize text-sky-200">
        <div className="relative flex justify-center">
          <img
            src={ProfileImg}
            alt="Colourful wolf standing on a mountain top."
            className={`relative flex w-28 rounded-lg border-4 border-slate-800 object-cover pb-[0.5em] drop-shadow-lg`}
          />
          <p className="absolute bottom-0 w-full rounded-full bg-slate-800 px-3 py-[0.3em] text-center text-[0.75rem] tracking-wider">
            Level: 0
          </p>
        </div>
        <div className="flex w-full justify-between pl-8 tracking-wide">
          <div className="flex  min-w-[13.5em] flex-col justify-center gap-3">
            <div className="flex items-center gap-2 text-lg">
              <h2>Current Level:</h2>
              <p className="text-base text-sky-100">Seedling</p>
            </div>
            <div className="flex items-center text-[0.8rem]">
              <Icon
                icon="upgrade"
                title="Points to next milestone icon"
                customStyle="scale-75"
              />
              <p className="text-sky-200">Next Milestone: </p>
              <p className="flex items-center justify-center pl-1 tracking-wider text-sky-100">
                4,620
                <Icon icon="trophy" customStyle="flex scale-75" />
              </p>
            </div>
          </div>
          <table className="flex w-full max-w-[60%] flex-col gap-2">
            <thead className="flex w-full items-center justify-center text-[0.9rem]">
              <tr className="flex w-full gap-8 ">
                <th className="flex w-full flex-col items-center justify-center gap-1">
                  <span className="whitespace-pre">Time Spent</span>
                  <span>Typing</span>
                </th>
                <th className="flex w-full flex-col items-center justify-center gap-1">
                  <span className="whitespace-pre">Average Speed</span>
                  <span>(WPM)</span>
                </th>
                <th className="flex w-full flex-col items-center justify-center gap-1">
                  <span>Lessons</span>
                  <span>Mastered</span>
                </th>
                <th className="flex w-full flex-col items-center justify-center gap-1">
                  <span>Points</span>
                  <span>Earned</span>
                </th>
              </tr>
            </thead>
            <tbody className="flex w-full items-center justify-center text-sky-100">
              <tr className="flex w-full gap-8">
                <td className="flex w-full justify-center">00:00:00</td>
                <td className="flex w-full  justify-center ">0 </td>
                <td className="flex w-full justify-center">0/200</td>
                <td className="flex w-full  justify-center">10,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex w-full max-w-[980px] justify-between pb-[14em] pt-9 tracking-wider">
        <h1 className="relative mb-2 flex justify-center font-roboto text-3xl text-sky-200">
          My Weekly Summary
        </h1>

        <div className="flex items-center justify-center gap-8">
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              className="flex items-center justify-center rounded-md border-2 bg-white bg-opacity-30 hover:border-defaultgreen hover:bg-defaultgreen hover:bg-opacity-50 hover:text-defaultgreen"
            >
              <Icon
                icon="chevron"
                title="Left Arrow Button"
                customStyle="inline-flex rotate-90"
              />
            </button>
            <div className="flex items-center justify-center gap-1 text-sky-100">
              <p>Nov 25</p>
              <Icon
                icon="horizontalLine"
                title="horizontal line icon"
                customStyle="scale-75 text-sky-200"
              />
              <p>Dec 3</p>
            </div>
            <button
              type="button"
              className="flex items-center justify-center rounded-md border-2 bg-white bg-opacity-30 hover:border-defaultgreen hover:bg-defaultgreen hover:bg-opacity-50 hover:text-defaultgreen"
            >
              <Icon
                icon="chevron"
                title="Right Arrow Button"
                customStyle="inline-flex -rotate-90"
              />
            </button>
          </div>
          <button
            type="button"
            className="flex items-center justify-center p-1 hover:text-defaultgreen"
          >
            <Icon
              icon="settingsSparkle"
              customStyle="flex"
              title="stats settings icon"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default HeaderDashboard;
