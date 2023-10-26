import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import styles from "./navigation/styles/NavBar.module.css";

interface PropType {
  customStyle: string;
  setAuth: (value: boolean) => void;
}

function LogoutBtn({ setAuth, customStyle }: PropType) {
  // Clear local storage
  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    localStorage.removeItem("jwt_token");
    setAuth(false);
  };

  return (
    <button className={customStyle} onClick={handleLogout}>
      Logout{" "}
      <i className={`${styles.icon} text-white -translate-y-[0.07em]`}>
        <LockTwoToneIcon />
      </i>
    </button>
  );
}

export default LogoutBtn;
