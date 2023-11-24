import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import Icon from "../../utils/Icon";
interface PropTypes {
  showMobileMenu: boolean;
  setShowMobileMenu: (value: boolean) => void;
}

function LoginLinks({ showMobileMenu, setShowMobileMenu }: PropTypes) {
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
          className={`relative my-3  inline-flex ${
            showMobileMenu && "mb-6 w-full items-center justify-center "
          }`}
        >
          <span
            className={`${styles.btn} relative rounded-[0.3em] px-3 py-2 font-[500] text-white`}
          >
            Sign Up Free!
          </span>
        </NavLink>
      </li>
    </>
  );
}

export default LoginLinks;
