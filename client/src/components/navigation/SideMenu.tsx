import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import styles from "./styles/SideMenu.module.css";

import Icon from "../../utils/Icon";
import LogoutBtn from "./LogoutBtn";

//Used by Profile.tsx component
function SideMenu({ menuData }) {
  return (
    <ul className="flex w-full justify-center font-lora md:flex-col">
      {menuData.map((data) => (
        <li key={uuidv4()} className="flex w-full">
          <Link to={data.link} className="flex w-full">
            <input
              id={data.id}
              name="profile-menu"
              type="radio"
              checked={data.checked}
              onChange={() => {}}
              className={`${styles["profile-menu-input"]} hidden`}
            />
            <label
              htmlFor={data.id}
              className={`${styles["profile-menu-tab"]} ${data.customLabelStyle} flex w-full cursor-pointer flex-col items-center gap-3 bg-white px-3 py-4 brightness-90 md:max-w-[14.5em] md:flex-row md:pl-6 md:pr-5`}
            >
              <Icon
                icon={data.icon}
                title={data.icon + "-icon "}
                customStyle={`${styles["profile-menu-icon"]} flex justify-center items-center sm:w-12 md:w-6 h-6`}
              />
              <span className="hidden text-center text-xs md:flex md:w-36 md:whitespace-pre md:text-left md:text-base">
                {data.text}
              </span>
            </label>
          </Link>
        </li>
      ))}

      <LogoutBtn
        customStyle={`${styles["logout-btn"]} mt-8 hidden md:flex`}
        iconStyle={`${styles["logout-icon"]} flex -translate-y-[0.04em] text-white`}
      />
    </ul>
  );
}

export default SideMenu;
