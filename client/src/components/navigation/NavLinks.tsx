import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavLinks({ addClass }) {
  return (
    <>
      <ul className={`w-full justify-evenly ${addClass && styles[addClass]}`}>
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
      <ul className={`w-full justify-evenly ${addClass && styles[addClass]}`}>
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
    </>
  );
}

export default NavLinks;
