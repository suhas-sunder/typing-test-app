// import { NavLink } from "react-router-dom";

import styles from "./styles/Footer.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../ui/navigation/Logo";

//Used by App.tsx component
function Footer() {
  return (
    <>
      <nav className={`${styles.nav} m-5 flex w-3/4 flex-col justify-evenly`}>
        <div className="flex pb-14 pt-3">
          <Logo setShowMobileMenu={() => {}} />
        </div>
        <ul className="mx-auto flex w-full max-w-[500px] items-center justify-around ">
          <li>
            <NavLink to="/privacypolicy">
              <span className={`${styles.icon}`}>Privacy Policy</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/cookiespolicy">
              <span className={`${styles.icon}`}>Cookie Policy</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/termsofservice">
              <span className={`${styles.icon}`}>Terms Of Service</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="w-full bg-slate-800 py-5">
        <span>&copy;</span> 2023 | FreeTypingCamp - All Rights Reserved.
      </div>
    </>
  );
}

export default Footer;
