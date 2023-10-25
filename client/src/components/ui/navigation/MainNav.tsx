import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import GamepadTwoToneIcon from "@mui/icons-material/GamepadTwoTone";
import LiveHelpTwoToneIcon from "@mui/icons-material/LiveHelpTwoTone";

interface PropTypes {
  showMobileMenu: boolean;
  setShowMobileMenu: (value: boolean) => void;
}

// Main navigation links for nav bar
function MainNav({ showMobileMenu, setShowMobileMenu }: PropTypes) {
  return (
    <ul
      className={`bg-defaultblue z-10 ${
        showMobileMenu ? styles["mobile-nav"] : styles["main-nav"]
      }`}
    >
      <li>
        <NavLink
          onClick={() => setShowMobileMenu(false)}
          to="/lessons"
          className="flex justify-center items-center gap-2 py-5 tracking-[0.1em]"
        >
          Lessons
          <span className={`${styles.icon} text-white -translate-y-[0.07em]`}>
            <SchoolTwoToneIcon />
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setShowMobileMenu(false)}
          to="/games"
          className="flex justify-center items-center gap-2 py-5 tracking-[0.1em]"
        >
          Games
          <span className={` ${styles.icon} text-white -translate-y-[0.07em]`}>
            <GamepadTwoToneIcon />
          </span>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setShowMobileMenu(false)}
          to="/faq"
          className="flex justify-center items-center gap-2 py-5 tracking-[0.1em]"
        >
          FAQ
          <span className={` ${styles.icon} text-white -translate-y-[0.07em]`}>
            <LiveHelpTwoToneIcon />
          </span>
        </NavLink>
      </li>
    </ul>
  );
}

export default MainNav;
