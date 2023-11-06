import { v4 as uuidv4 } from "uuid";

import Icon from "../utility/Icon";

interface Data {
  difficulty: string;
  customStyle: string;
  selected: boolean;
}
interface PropType {
  menuData: Data[];
  styles: CSSModuleClasses | null;
  setDefaultIndex: (value: number) => void;
  setSelectedValue: (value: string) => void;
}

function DropDownList({
  menuData,
  styles,
  setDefaultIndex,
  setSelectedValue,
}: PropType) {
  const handleMenuSelect = (index: number) => {
    const listElement = document.getElementById("drop-down-list");

    const resetHiddenMenu = () => {
      listElement &&
        styles &&
        listElement.classList.add(styles["difficulty-menu"]); //Add back class that handles menu-open
    };

    // Hide menu
    if (listElement !== null && styles !== null) {
      listElement.classList.remove(styles["difficulty-menu"]); //Remove class that handles menu-open
      setTimeout(resetHiddenMenu, 100);
    }
    setSelectedValue(menuData[index].difficulty);
    setDefaultIndex(index);
  };

  return (
    <ul
      id="drop-down-list"
      aria-label="custom select menu drop-down list"
      className={`${
        styles && styles["difficulty-menu"]
      } hidden flex-col w-full top-10 absolute z-10 bg-white border-2 rounded-md overflow-hidden text-base`}
    >
      {menuData.map((data, index) => (
        <li
          aria-label="custom select menu drop-down option"
          key={uuidv4()}
          onClick={() => handleMenuSelect(index)}
          className="flex gap-2 py-2 px-6 hover:bg-default-sky-blue hover:text-white"
        >
          <Icon
            icon="boxingGlove"
            title="boxing-glove-icon"
            customStyle="scale-110 text-yellow-600"
          />
          <span>{data.difficulty}</span>
        </li>
      ))}
    </ul>
  );
}

export default DropDownList;
