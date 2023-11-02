import styles from "./styles/StartMenu.module.css";

interface PropTypes {
  [key: string]: string[];
}

function TestTimeOptions({ timeOptions }: PropTypes) {
  return (
    <ul className="grid grid-cols-3 gap-y-8 justify-around w-11/12 text-xl mt-4 mb-6 sm:grid-cols-5 sm:gap-y-0 sm:justify-evenly sm:text-2xl">
      {timeOptions.map((time: string, index: number) => (
        <li key={index} className="flex justify-center">
          <input
            id={`radio-${time}`}
            type="radio"
            name="time-setting"
            className={styles.radio}
            defaultChecked={index === 0 ? true : false}
            value={time}
          />
          <label
            htmlFor={`radio-${time}`}
            className={`${styles["menu-label"]} flex flex-col justify-center items-center h-20 w-20 border-2 border-slate-200 rounded-lg hover:text-default-sky-blue hover:cursor-pointer hover:border-default-light-sky-blue hover:font-medium sm:w-24 sm:h-24`}
          >
            <span className="font-bold">{time}</span>
            <span className="text-xl sm:text-2xl">min</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

export default TestTimeOptions;
