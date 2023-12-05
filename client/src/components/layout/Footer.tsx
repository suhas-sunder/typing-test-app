// import { NavLink } from "react-router-dom";
import Logo from "../navigation/Logo";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className=" flex w-full flex-col items-center bg-slate-900 text-center text-white">
      <nav className="m-5 flex flex-col w-3/4 justify-evenly">
        <div>
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
        <div className="flex w-full justify-center items-center gap-5 ">
          <Link to="/privacypolicy" className="hover:text-defaultgreen">Privacy Policy</Link>
          <Link to="/cookiespolicy" className="hover:text-defaultgreen">Cookie Policy</Link>
          <Link to="/termsofservice" className="hover:text-defaultgreen">Terms Of Service</Link>
        </div>
      </nav>

      <div className="w-full bg-[#0d121e] py-5">
        <span >&copy;</span> 2023 | FreeTypingCamp - All Rights
        Reserved.
      </div>
    </footer>
  );
}

export default Footer;
