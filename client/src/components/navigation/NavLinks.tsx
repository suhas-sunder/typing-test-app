import { NavLink } from "react-router-dom";
import styles from "./styles/NavBar.module.css";

interface propTypes {
  addClass: string;
  isAuthenticated: boolean;
}

function NavLinks({ addClass, isAuthenticated }: propTypes) {
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
          <NavLink to="/leaderboard" className="flex p-5">
            Leaderboard
          </NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <NavLink to="/profile" className="flex p-5">
              Profile
            </NavLink>
          </li>
        )}
      </ul>
      <ul className={`w-full justify-evenly ${addClass && styles[addClass]}`}>
        {!isAuthenticated && (
          <>
            <li>
              <NavLink to="/register" className="flex p-5">
                Sign Up Free!
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="flex p-5">
                Log In
              </NavLink>
            </li>
          </>
        )}
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
