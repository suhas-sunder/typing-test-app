import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import LogoText from "../svg/LogoText";
import LogoTextEnd from "../svg/LogoTextEnd";
interface PropTypes {
  setShowMobileMenu: (value: boolean) => void;
}

function Logo({ setShowMobileMenu }: PropTypes) {
  return (
    <NavLink
      onClick={() => setShowMobileMenu(false)}
      to="/"
      className={`${styles.logo} relative flex py-8 font-overlock items-center text-[1.25rem] font-black italic tracking-wider `}
    >
      <span className={styles["logo-long"]}><LogoText /></span>
      <span className={styles["logo-short"]}>FTC</span>
      <span className={styles["logo-com"]}><LogoTextEnd /></span>
    </NavLink>
  );
}

export default Logo;
