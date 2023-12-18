import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import loadable from "@loadable/component";
import { useEffect } from "react";

const Icon = loadable(() => import("../../utils/Icon"));

interface PropTypes {
  showMobileMenu: boolean;
  setShowMobileMenu: (value: boolean) => void;
}

function LoginLinks({ showMobileMenu, setShowMobileMenu }: PropTypes) {

  useEffect(() => {
    Icon.load()
  }, [])

  return (
    <>
      <li className={`relative flex`}>
        <NavLink
          onClick={() => setShowMobileMenu(false)}
          to="/login"
          className={`relative inline-flex items-center justify-center gap-2 p-5 ${
            showMobileMenu && "w-full items-center justify-center"
          }`}
        >
          Login
          <Icon
            title="login-icon"
            customStyle={`${styles.icon} text-white -translate-y-[0.07em] relative`}
            icon="lockOpen"
          />
        </NavLink>
      </li>

      <li className={`flex `}>
        <NavLink
          onClick={() => setShowMobileMenu(false)}
          to="/register"
          className={`relative inline-flex  py-3 ${
            showMobileMenu && "w-full items-center justify-center pb-6 "
          }`}
        >
          <span
            className={`${styles.btn} relative rounded-[0.3em] bg-white px-3 py-2 font-[500] border-[2.5px] border-white text-defaultblue`}
          >
            Sign Up Free!
          </span>
        </NavLink>
      </li>
    </>
  );
}

export default LoginLinks;
