import { v4 as uuidv4 } from "uuid";

import Icon from "../utility/Icon";
interface PropType {
  menuData: string[];
  styles: CSSModuleClasses | null;
  setDefaultIndex: (value: number) => void;
}
function DropDownList({ menuData, styles, setDefaultIndex }: PropType) {
  return (
    <ul
      aria-label="custom select menu drop-down list"
      className={`${
        styles && styles["difficulty-menu"]
      } hidden flex-col w-full top-10 absolute z-10 bg-white border-2 rounded-md overflow-hidden text-base`}
    >
      {menuData.map((options, index) => (
        <li
          aria-label="custom select menu drop-down option"
          key={uuidv4()}
          onClick={() => setDefaultIndex(index)}
          className="flex gap-2 py-2 px-6 hover:bg-default-sky-blue hover:text-white"
        >
          <Icon
            icon="boxingGlove"
            title="boxing-glove-icon"
            customStyle="scale-110 text-yellow-600"
          />
          <span>{options}</span>
        </li>
      ))}
    </ul>
  );
}

export default DropDownList;
