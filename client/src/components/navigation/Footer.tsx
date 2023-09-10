import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="flex w-full justify-evenly p-5 bg-slate-700 text-white">
      <NavLink to="/" aria-label="footer nav">
        FreeTypingCamp
      </NavLink>
      <NavLink to="/" aria-label="footer nav">
        Tests
      </NavLink>
      <NavLink to="/lessons" aria-label="footer nav">
        Lessons
      </NavLink>
      <NavLink to="/games" aria-label="footer nav">
        Games
      </NavLink>
      <NavLink to="/summary" aria-label="footer nav">
        Summary
      </NavLink>
      <NavLink to="/login" aria-label="footer nav">
        Sign Up Free!
      </NavLink>
      <NavLink to="/login" aria-label="footer nav">
        Log In
      </NavLink>
      <NavLink to="/settings" aria-label="footer nav">
        Settings
      </NavLink>
    </div>
  );
}

export default Footer;
