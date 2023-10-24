import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";

function Logo() {
  return (
    <NavLink
      to="/"
      className={`${styles.logo} flex py-8 font-overlock tracking-wider text-[1.25rem] `}
    >
      FreeTypingCamp
      <span className={styles.icon}>.com</span>
    </NavLink>
  );
}

export default Logo;
