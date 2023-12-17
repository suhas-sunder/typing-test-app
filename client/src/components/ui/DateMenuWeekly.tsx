import Icon from "../../utils/Icon";
import SquareArrowBtn from "./SquareArrowBtn";

function DateMenuWeekly() {
  return (
    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-center gap-2 md:gap-5">
      <div className="flex items-center justify-center gap-3 md:gap-4">
        <SquareArrowBtn customStyle="" />
        <div className="flex items-center justify-center gap-1 text-sky-100 text-sm md:text-base">
          <p className="whitespace-pre">Nov 25</p>
          <Icon
            icon="horizontalLine"
            title="horizontal line icon"
            customStyle="scale-75 text-sky-200"
          />
          <p className="whitespace-pre">Dec 3</p>
        </div>

        <SquareArrowBtn customStyle="rotate-180" />
      </div>
      <button
        type="button"
        className="flex items-center justify-center p-1 hover:scale-105 hover:text-defaultgreen"
      >
        <Icon
          icon="settingsSparkle"
          customStyle="flex"
          title="stats settings icon"
        />
      </button>
    </div>
  );
}

export default DateMenuWeekly;
