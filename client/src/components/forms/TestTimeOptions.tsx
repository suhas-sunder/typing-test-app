import styles from "./styles/StartMenu.module.css";

interface PropTypes {
  [key: string]: string[];
}

function TestTimeOptions({ timeOptions }: PropTypes) {
  return (
    <ul className="relative my-8 grid w-full max-w-[450px] grid-cols-3 gap-x-2 gap-y-8 text-xl sm:w-11/12 sm:max-w-none sm:grid-cols-5 sm:justify-evenly sm:gap-y-0 sm:text-2xl">
      {timeOptions.map((time: string, index: number) => (
        <li key={index} className={`flex items-center justify-center `}>
          <input
            id={`radio-${time}`}
            type="radio"
            name="time-setting"
            className="opacity-1 absolute"
            defaultChecked={index === 0 ? true : false}
            value={time}
          />
          <label
            htmlFor={`radio-${time}`}
            className={`${styles["menu-label"]} outline-default-sky-blue" z-[1] flex h-20 w-20 flex-col items-center justify-center rounded-lg border-2 border-slate-200 bg-white hover:cursor-pointer hover:border-sky-600 hover:font-medium hover:text-sky-700 sm:h-24 sm:w-24`}
          >
            <span className="relative font-bold">{time}</span>
            <span className="relative text-xl sm:text-2xl">min</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

export default TestTimeOptions;
