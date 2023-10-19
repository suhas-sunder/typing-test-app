import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import NavLinks from "./NavLinks";

interface PropTypes {
  isAuthenticated: boolean;
}

function NavBar({ isAuthenticated }: PropTypes) {
  return (
    <nav className={`${styles.nav} bg-sky-700 text-white`}>
      {/* Desktop */}
      <div className="flex w-full max-w-7xl justify-around m-auto">
        <NavLink to="/" className="flex w-3/5 justify-evenly p-5">
          FreeTypingCamp
        </NavLink>
        <NavLinks
          addClass={"desktop-links"}
          isAuthenticated={isAuthenticated}
        />
        <label>
          <span className={`flex p-5 ${styles["burger-open"]}`}>X</span>
          <span className={`p-5 ${styles["burger-close"]}`}>O</span>
          <input type="checkbox" />
        </label>
      </div>
      {/* Mobile */}
      <div
        className={`none w-full flex-col absolute left-0 right-0 top-19 bg-sky-700 z-10 ${styles["mobile-links"]}`}
      >
        <NavLinks addClass={""} isAuthenticated={isAuthenticated} />
      </div>
    </nav>
  );
}

export default NavBar;
