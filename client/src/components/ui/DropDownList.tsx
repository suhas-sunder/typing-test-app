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
  setMenuData: (value: Data[]) => void;
}

function DropDownList({
  menuData,
  styles,
  setMenuData,
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

    // Update settings data to reflect current selection from drop-down
    setMenuData(
      menuData.map((data, i) => {
        if (i === index) {
          return {
            difficulty: data.difficulty,
            customStyle: data.customStyle,
            selected: true,
          };
        } else if (data.selected === true) {
          return {
            difficulty: data.difficulty,
            customStyle: data.customStyle,
            selected: false,
          };
        } else {
          return data;
        }
      })
    );
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
            customStyle={`scale-110 ${data.customStyle}`}
          />
          <span>{data.difficulty}</span>
        </li>
      ))}
    </ul>
  );
}

export default DropDownList;
