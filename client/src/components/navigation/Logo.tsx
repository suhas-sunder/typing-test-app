import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
interface PropTypes {
  setShowMobileMenu: (value: boolean) => void;
}

function Logo({ setShowMobileMenu }: PropTypes) {
  return (
    <NavLink
      onClick={() => setShowMobileMenu(false)}
      to="/"
      className={`${styles.logo} flex relative py-8 font-overlock tracking-wider text-[1.25rem] `}
    >
      <span className={styles["logo-long"]}>FreeTypingCamp</span>
      <span className={styles["logo-short"]}>FTC</span>
      <span className={styles.icon}>.com</span>
    </NavLink>
  );
}

export default Logo;
