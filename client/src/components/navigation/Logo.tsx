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
      aria-label="freetypingcamp.com logo as navigation link with highlight when hovered or clicked"
      to="/"
      className={`${styles.logo} relative flex items-center py-8 font-overlock text-[1.25rem] font-black italic tracking-wider `}
    >
      <LogoText customStyle={styles["logo-long"]} />
      <span className={styles["logo-short"]}>FTC</span>
        <LogoTextEnd customStyle={styles["logo-com"]} />
    </NavLink>
  );
}

export default Logo;
