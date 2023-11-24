import { Fragment } from "react";
import styles from "./styles/SideMenu.module.css";
import { v4 as uuidv4 } from "uuid";
import Icon from "../../utils/Icon";
import LogoutBtn from "./LogoutBtn";

function SideMenu({ menuData }) {
  return (
    <section
      role="navigation"
      aria-label="Side menu"
      className="ml-5 flex w-full max-w-[15em] flex-col font-roboto"
    >
      {menuData.map((data) => (
        <Fragment key={uuidv4()}>
          <input
            id={data.id}
            name="profile-menu"
            type="radio"
            defaultChecked={data.checked}
            className={`${styles["profile-menu-input"]} hidden`}
          />
          <label
            htmlFor={data.id}
            className={`${styles["profile-menu-tab"]} ${data.customLabelStyle} flex w-full cursor-pointer items-center gap-3 bg-white px-6 py-4 brightness-90`}
          >
            <span>{data.text}</span>
            <Icon
              icon={data.icon}
              title={data.icon + "-icon"}
              customStyle={styles["profile-menu-icon"]}
            />
          </label>
        </Fragment>
      ))}

      <LogoutBtn
        customStyle={`${styles["logout-btn"]} flex relative m-auto gap-2 justify-center items-center max-w-[9em] px-8 py-[0.7em] mt-8 rounded-[0.3em] text-white border-2 border-white`}
        iconStyle={`${styles["logout-icon"]} flex -translate-y-[0.04em] text-white`}
      />
    </section>
  );
}

export default SideMenu;
