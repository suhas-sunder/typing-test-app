import styles from "./styles/NavBar.module.css";
import MainNav from "./MainNav";
import Logo from "./Logo";
import LoginLinks from "./LoginLinks";
import ProfileMenu from "./ProfileMenu";

interface PropTypes {
  isAuthenticated: boolean;
}

function NavBar({ isAuthenticated }: PropTypes) {
  return (
    <nav
      className={`${styles.nav} fixed left-0 right-0 bg-defaultblue text-white font-roboto tracking-wide text-base px-6`}
    >
      {/* Desktop */}
      <div
        className={`flex w-full justify-between max-w-[1025px] items-center m-auto`}
      >
        <Logo />
        <MainNav />
        {isAuthenticated ? <ProfileMenu /> : <LoginLinks />}
        <label>
          <span className={`flex p-5 ${styles["burger-open"]}`}>X</span>
          <span className={`p-5 ${styles["burger-close"]}`}>O</span>
          <input type="checkbox" />
        </label>
      </div>
      {/* Mobile */}
      <div
        className={`none w-full flex-col absolute left-0 right-0 top-19 bg-defaultblue z-10 ${styles["mobile-links"]}`}
      >
        <MainNav />
      </div>
    </nav>
  );
}

export default NavBar;
