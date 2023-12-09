import styles from "./styles/SideMenu.module.css";
import { v4 as uuidv4 } from "uuid";
import Icon from "../../utils/Icon";
import LogoutBtn from "./LogoutBtn";
import { Link } from "react-router-dom";

function SideMenu({ menuData }) {
  return (
    <section role="navigation" aria-label="Side menu">
      <ul className="ml-5 hidden lg:flex w-full max-w-[14.42em] flex-col font-lora">
        {menuData.map((data) => (
          <li key={uuidv4()}>
            <Link to={data.link}>
              <input
                id={data.id}
                name="profile-menu"
                type="radio"
                defaultChecked={data.checked}
                className={`${styles["profile-menu-input"]} hidden`}
              />
              <label
                htmlFor={data.id}
                className={`${styles["profile-menu-tab"]} ${data.customLabelStyle} flex w-full cursor-pointer items-center gap-3 bg-white pl-6 pr-5 py-4 brightness-90 `}
              >
                <Icon
                  icon={data.icon}
                  title={data.icon + "-icon "}
                  customStyle={`${styles["profile-menu-icon"]} flex justify-center items-center`}
                />
                <span className="whitespace-pre">{data.text}</span>
              </label>
            </Link>
          </li>
        ))}

        <LogoutBtn
          customStyle={`${styles["logout-btn"]} mt-8`}
          iconStyle={`${styles["logout-icon"]} flex -translate-y-[0.04em] text-white`}
        />
      </ul>
    </section>
  );
}

export default SideMenu;
