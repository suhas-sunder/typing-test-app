import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className="flex flex-col items-center w-full  bg-slate-700 text-white text-center">
      <div className="flex w-3/4 justify-evenly m-5">
        <ul>
          <li>
            <NavLink to="/" className="flex p-5">
              Tests
            </NavLink>
          </li>
          <li>
            <NavLink to="/lessons" className="flex p-5">
              Lessons
            </NavLink>
          </li>
          <li>
            <NavLink to="/games" className="flex p-5">
              Games
            </NavLink>
          </li>
          <li>
            <NavLink to="/summary" className="flex p-5">
              Summary
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/login" className="flex p-5">
              Sign Up Free!
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="flex p-5">
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className="flex p-5">
              Settings
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="bg-slate-800 w-full p-5">
        <span className="">&copy;</span> 2023 | FreeTypingCamp
      </div>
    </footer>
  );
}

export default Footer;
