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
      className={`${styles.profile} lex-col relative flex items-center gap-4 hover:cursor-pointer`}
    >
      <ul
        className={` ${styles["profile-stats"]} relative flex-col items-center gap-1`}
      >
        <li data-testid="username" className="mb-1 flex justify-end">
          {userName}
        </li>
        <li
          data-testid="profile-score"
          className="relative flex justify-end gap-1 text-yellow-300"
        >
          <span className="flex text-base tracking-widest">{"0"}</span>
          <Icon title="trophy-icon" customStyle={styles.icon} icon="trophy" />
        </li>
      </ul>
      <img
        src={ProfileImg}
        alt="Colourful wolf standing on a mountain top."
        className={`${styles.img} relative flex h-16 w-16 rounded-full border-[3px] object-cover`}
      />
    </NavLink>
  );
}

export default ProfileMenu;
