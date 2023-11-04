import styles from "./styles/StartMenu.module.css";

interface PropTypes {
  [key: string]: string[];
}

function TestTimeOptions({ timeOptions }: PropTypes) {
  return (
    <ul className="grid relative grid-cols-3 gap-y-8 justify-around w-11/12 text-xl my-8 sm:grid-cols-5 sm:gap-y-0 sm:justify-evenly sm:text-2xl">
      {timeOptions.map((time: string, index: number) => (
        <li key={index} className="flex justify-center items-center ">
          <input
            id={`radio-${time}`}
            type="radio"
            name="time-setting"
            className="opacity-1 absolute"
            defaultChecked={index === 0 ? true : false}
            value={time}
          />
          <label
            // tabIndex={0}
            htmlFor={`radio-${time}`}
            className={`${styles["menu-label"]} flex z-[1] bg-white flex-col justify-center items-center h-20 w-20 border-2 border-slate-200 rounded-lg hover:text-default-sky-blue hover:cursor-pointer hover:border-default-light-sky-blue hover:font-medium sm:w-24 sm:h-24 outline-default-sky-blue"`}
          >
            <span className="font-bold relative">{time}</span>
            <span className="text-xl relative sm:text-2xl">min</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

export default TestTimeOptions;
