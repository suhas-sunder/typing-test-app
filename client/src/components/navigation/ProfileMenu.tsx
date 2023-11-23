import ProfileImg from "../../images/wolf_icon.jpg";
import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import Icon from "../../utils/Icon";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

interface PropTypes {
  setShowMobileMenu: (value: boolean) => void;
}

function ProfileMenu({ setShowMobileMenu }: PropTypes) {
  const { userName } = useContext(AuthContext);

  return (
    <NavLink
      onClick={() => setShowMobileMenu(false)}
      data-testid="profile-menu"
      to={"/profile"}
      className={`${styles.profile} flex relative lex-col gap-4 items-center hover:cursor-pointer`}
    >
      <ul
        className={` ${styles["profile-stats"]} flex-col items-center gap-1 relative`}
      >
        <li data-testid="username" className="flex justify-end mb-1">
          {userName}
        </li>
        <li
          data-testid="profile-score"
          className="flex text-yellow-300 relative justify-end gap-1"
        >
          <span>999,999,999,999</span>
          <Icon title="trophy-icon" customStyle={styles.icon} icon="trophy" />
        </li>
      </ul>
      <img
        src={ProfileImg}
        alt="Colourful wolf standing on a mountain top."
        className={`${styles.img} object-cover w-16 h-16 border-[3px] rounded-full relative`}
      />
    </NavLink>
  );
}

export default ProfileMenu;
