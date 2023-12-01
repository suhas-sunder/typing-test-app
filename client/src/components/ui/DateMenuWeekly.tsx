import Icon from "../../utils/Icon"

function DateMenuWeekly() {
  return (
    <div className="flex items-center justify-center gap-5">
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
  )
}

export default DateMenuWeekly