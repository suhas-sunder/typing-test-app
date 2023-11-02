import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import GamepadTwoToneIcon from "@mui/icons-material/GamepadTwoTone";
import LiveHelpTwoToneIcon from "@mui/icons-material/LiveHelpTwoTone";
import LoginLinks from "./LoginLinks";
import LogoutBtn from "./LogoutBtn";

interface PropTypes {
  showMobileMenu: boolean;
  isLoggedIn: boolean;
  setShowMobileMenu: (value: boolean) => void;
  setAuth: (value: boolean) => void;
}

// Main navigation links for nav bar
function MainLinks({
  showMobileMenu,
  isLoggedIn,
  setShowMobileMenu,
  setAuth,
}: PropTypes) {
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
          <i
            title="lessons-icon"
            className={`${styles.icon} text-white -translate-y-[0.07em]`}
          >
            <SchoolTwoToneIcon />
          </i>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setShowMobileMenu(false)}
          to="/games"
          className="flex justify-center items-center gap-2 py-5 tracking-[0.1em]"
        >
          Games
          <i
            title="games-icon"
            className={` ${styles.icon} text-white -translate-y-[0.07em]`}
          >
            <GamepadTwoToneIcon />
          </i>
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setShowMobileMenu(false)}
          to="/faq"
          className="flex justify-center items-center gap-2 py-5 tracking-[0.1em]"
        >
          FAQ
          <i
            title="faq-icon"
            className={` ${styles.icon} text-white -translate-y-[0.07em]`}
          >
            <LiveHelpTwoToneIcon />
          </i>
        </NavLink>
      </li>
      {showMobileMenu && !isLoggedIn && (
        <>
          <LoginLinks
            showMobileMenu={showMobileMenu}
            setShowMobileMenu={setShowMobileMenu}
          />{" "}
        </>
      )}
      {showMobileMenu && isLoggedIn && (
        <li onClick={() => setShowMobileMenu(false)} className="flex">
          <LogoutBtn
            setAuth={setAuth}
            customStyle={"inline-flex justify-center w-full gap-2 p-5"}
          />
        </li>
      )}
    </ul>
  );
}

export default MainLinks;
