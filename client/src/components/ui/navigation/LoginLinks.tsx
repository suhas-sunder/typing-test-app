import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
interface PropTypes {
  showMobileMenu: boolean;
  setShowMobileMenu: (value: boolean) => void;
}

function LoginLinks({ showMobileMenu, setShowMobileMenu }: PropTypes) {
  return (
    <>
      <li className={`flex `}>
        <NavLink
          onClick={() => setShowMobileMenu(false)}
          to="/login"
          className={`inline-flex justify-center items-center gap-2 p-5 ${
            showMobileMenu && "w-full justify-center items-center"
          }`}
        >
          Login
          <span className={`${styles.icon} text-white -translate-y-[0.07em] `}>
            <LockOpenTwoToneIcon />
          </span>
        </NavLink>
      </li>

      <li className={`flex `}>
        <NavLink
          onClick={() => setShowMobileMenu(false)}
          to="/register"
          className={` inline-flex  my-3 ${
            showMobileMenu && "w-full justify-center items-center mb-6 "
          }`}
        >
          <span
            className={`${styles.btn} px-3 py-2 text-white rounded-[0.3em] font-[500]`}
          >
            Sign Up Free!
          </span>
        </NavLink>
      </li>
    </>
  );
}

export default LoginLinks;
