import styles from "./styles/SideMenu.module.css";
import { v4 as uuidv4 } from "uuid";
import Icon from "../../utils/Icon";
import LogoutBtn from "./LogoutBtn";
import { Link } from "react-router-dom";

function SideMenu({ menuData }) {
  return (
    <ul className="ml-5 hidden w-full flex-col font-lora md:flex">
      {menuData.map((data) => (
        <li key={uuidv4()}>
          <Link to={data.link}>
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
              className={`${styles["profile-menu-tab"]} ${data.customLabelStyle} max-w-[14.5em] flex w-full cursor-pointer items-center gap-3 bg-white py-4 pl-6 pr-5 brightness-90 `}
            >
              <Icon
                icon={data.icon}
                title={data.icon + "-icon "}
                customStyle={`${styles["profile-menu-icon"]} flex justify-center items-center w-6 h-6`}
              />
              <span className="whitespace-pre w-36">{data.text}</span>
            </label>
          </Link>
        </li>
      ))}

      <LogoutBtn
        customStyle={`${styles["logout-btn"]} mt-8`}
        iconStyle={`${styles["logout-icon"]} flex -translate-y-[0.04em] text-white`}
      />
    </ul>
  );
}

export default SideMenu;
