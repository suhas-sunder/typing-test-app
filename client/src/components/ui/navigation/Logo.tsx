import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import LogoTextEnd from "../../svg/LogoTextEnd";
import LogoText from "../../svg/LogoText";


interface PropTypes {
  setShowMobileMenu: (value: boolean) => void;
}

//Used by NavBar.tsx component
function Logo({ setShowMobileMenu }: PropTypes) {

  return (
    <NavLink
      data-testid="logo-naviation-link"
      onClick={() => setShowMobileMenu(false)}
      aria-label="freetypingcamp.com logo as navigation link with highlight when hovered or clicked"
      to="/"
      className={`${styles.logo} relative flex items-center py-5 font-overlock text-[1.25rem] font-black italic tracking-wider `}
    >
      <LogoText customStyle={styles["logo-long"]} />
      <LogoTextEnd customStyle={styles["logo-com"]} />
    </NavLink>
  );
}

export default Logo;
