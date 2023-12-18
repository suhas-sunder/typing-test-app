import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import styles from "./styles/NavBar.module.css";
import loadable from "@loadable/component";

const LoginLinks = loadable(() => import("./LoginLinks"));
const LogoutBtn = loadable(() => import("./LogoutBtn"));
const Icon = loadable(() => import("../../utils/Icon"));

interface PropTypes {
  showMobileMenu: boolean;
  isLoggedIn: boolean;
  setShowMobileMenu: (value: boolean) => void;
}

// Main navigation links for nav bar
function MainLinks({
  showMobileMenu,
  isLoggedIn,
  setShowMobileMenu,
}: PropTypes) {
  useEffect(() => {
    LoginLinks.load()
    LogoutBtn.load()
    Icon.load();
  }, []);

  return (
    <ul
      id={showMobileMenu ? "mobile-links" : "main-links"}
      className={`bg-defaultblue  ${
        showMobileMenu ? styles["mobile-nav"] : styles["main-nav"]
      }`}
    >
      <li>
        <NavLink
          onClick={() => setShowMobileMenu(false)}
          to="/lessons"
          className="relative flex items-center justify-center gap-2 py-5 tracking-[0.1em]"
        >
          Lessons
          <Icon
            icon="graduationHat"
            title="lessons-icon"
            customStyle={`${styles.icon} text-white -translate-y-[0.07em] relative`}
          />
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setShowMobileMenu(false)}
          to="/games"
          className="relative flex items-center justify-center gap-2 py-5 tracking-[0.1em]"
        >
          Games
          <Icon
            icon="gamepad"
            title="games-icon"
            customStyle={` ${styles.icon} text-white -translate-y-[0.07em] relative`}
          />
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={() => setShowMobileMenu(false)}
          to="/faq"
          className="relative flex items-center justify-center gap-2 py-5 tracking-[0.1em]"
        >
          FAQ
          <Icon
            icon="questionMark"
            title="faq-icon"
            customStyle={` ${styles.icon} text-white -translate-y-[0.07em] relative`}
          />
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
        <li
          onClick={() => setShowMobileMenu(false)}
          className="relative m-auto flex"
        >
          <LogoutBtn iconStyle="" customStyle={"mt-5 mb-8"} />
        </li>
      )}
    </ul>
  );
}

export default MainLinks;
