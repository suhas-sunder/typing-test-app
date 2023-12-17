// import { NavLink } from "react-router-dom";
import Logo from "../navigation/Logo";
import styles from "../navigation/styles/NavBar.module.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <>
      <nav className={`${styles.nav} m-5 flex w-3/4 flex-col justify-evenly`}>
        <div className="flex pb-14 pt-3">
          <Logo setShowMobileMenu={() => {}} />
          {/* <ul>
          <li>
            <NavLink to="/" className="relative flex p-5">
              Tests
            </NavLink>
          </li>
          <li>
            <NavLink to="/lessons" className="relative flex p-5">
              Lessons
            </NavLink>
          </li>
          <li>
            <NavLink to="/games" className="relative flex p-5">
              Games
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/profile" className="relative flex p-5">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="relative flex p-5">
              Sign Up Free!
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="relative flex p-5">
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className="relative flex p-5">
              Settings
            </NavLink>
          </li>
        </ul> */}
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
