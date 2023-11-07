import { NavLink } from "react-router-dom";
import Logo from "../navigation/Logo";

function Footer() {
  return (
    <footer className="flex flex-col items-center w-full  bg-slate-700 text-white text-center">
      <nav role="footer" className="flex relative w-3/4 justify-evenly m-5">
        <Logo setShowMobileMenu={() => {}} />
        <ul>
          <li>
            <NavLink to="/" className="flex relative p-5">
              Tests
            </NavLink>
          </li>
          <li>
            <NavLink to="/lessons" className="flex relative p-5">
              Lessons
            </NavLink>
          </li>
          <li>
            <NavLink to="/games" className="flex relative p-5">
              Games
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink to="/profile" className="flex relative p-5">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="flex relative p-5">
              Sign Up Free!
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="flex relative p-5">
              Log In
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className="flex relative p-5">
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="bg-slate-800 w-full py-5">
        <span className="">&copy;</span> 2023 | FreeTypingCamp - All Rights
        Reserved.
      </div>
    </footer>
  );
}

export default Footer;
