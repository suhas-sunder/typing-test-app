import styles from "./styles/NavBar.module.css";
import MainLinks from "./MainLinks";
import Logo from "./Logo";
import LoginLinks from "./LoginLinks";
import ProfileMenu from "./ProfileMenu";
import { useState, useEffect, useContext } from "react";
import Icon from "../../utils/Icon";
import { AuthContext } from "../../providers/AuthProvider";

function NavBar() {
  const { isAuthenticated } = useContext(AuthContext);
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
      id="nav"
      className={`${styles.nav} fixed top-0 left-0 right-0 bg-defaultblue text-white font-roboto tracking-wide text-base pl-5 z-20`}
    >
      {/* Desktop */}
      <div
        className={`flex w-full justify-between max-w-[1025px] items-center m-auto`}
      >
        <Logo setShowMobileMenu={setShowMobileMenu} />
        <MainLinks
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
          <ul
            className={`${styles["login-menu"]} justify-center gap-3 pr-5 relative`}
          >
            <LoginLinks
              showMobileMenu={showMobileMenu}
              setShowMobileMenu={setShowMobileMenu}
            />
          </ul>
        )}
        <input
          id="burger"
          type="checkbox"
          onChange={() => {}}
          checked={showMobileMenu ? true : false}
          className="hidden relative"
        />
        <label
          data-testid="burger-icons"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          htmlFor="burger"
          className={`${styles["burger-label"]} hover:cursor-pointer relative`}
        >
          <Icon
            title="burger-closed-icon"
            customStyle={`flex relative justify-center items-center w-[3.324em] h-[3.324em] scale-125 mr-1 ${styles["burger-open"]}`}
            icon="burgerOpen"
          />
          <Icon
            title="burger-open-icon"
            customStyle={`hidden relative justify-center items-center w-[3.324em] h-[3.324em] scale-125 mr-1 ${styles["burger-close"]}`}
            icon="burgerClosed"
          />
        </label>
      </div>
    </nav>
  );
}

export default NavBar;
