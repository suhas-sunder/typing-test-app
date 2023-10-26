import styles from "./styles/NavBar.module.css";
import MainNav from "./MainNav";
import Logo from "./Logo";
import LoginLinks from "./LoginLinks";
import ProfileMenu from "./ProfileMenu";
import { useState, useEffect } from "react";

interface PropTypes {
  isAuthenticated: boolean;
  setAuth: (value: boolean) => void;
}

function NavBar({ isAuthenticated, setAuth }: PropTypes) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  // Close burger menu whenever screen is resized
  useEffect(() => {
    const handleResize = () => {
      setShowMobileMenu(false);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={`${styles.nav} fixed left-0 right-0 bg-defaultblue text-white font-roboto tracking-wide text-base pl-5 z-10`}
    >
      {/* Desktop */}
      <div
        className={`flex w-full justify-between max-w-[1025px] items-center m-auto`}
      >
        <Logo setShowMobileMenu={setShowMobileMenu} />
        <MainNav
          setAuth={setAuth}
          isLoggedIn={isAuthenticated}
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
        />
        {showMobileMenu && (
          <div
            onClick={() => setShowMobileMenu(false)}
            className="absolute top-24 left-0 h-[100vh] w-[100vw] bg-sky-950 bg-opacity-30"
          />
        )}
        {isAuthenticated ? (
          <ProfileMenu setShowMobileMenu={setShowMobileMenu} />
        ) : (
          <ul className={`${styles["login-menu"]} justify-center gap-3 pr-5`}>
            <LoginLinks
              showMobileMenu={showMobileMenu}
              setShowMobileMenu={setShowMobileMenu}
            />
          </ul>
        )}
        <input
          id="burger"
          type="checkbox"
          defaultChecked={showMobileMenu ? true : false}
          className="hidden"
        />
        <label
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          htmlFor="burger"
          className={`${styles["burger-label"]} hover:cursor-pointer`}
        >
          <span
            className={`flex justify-center items-center w-[3.324em] h-[3.324em]   ${styles["burger-open"]}`}
          >
            X
          </span>
          <span
            className={`hidden justify-center items-center w-[3.324em] h-[3.324em]    ${styles["burger-close"]}`}
          >
            O
          </span>
        </label>
      </div>
    </nav>
  );
}

export default NavBar;
