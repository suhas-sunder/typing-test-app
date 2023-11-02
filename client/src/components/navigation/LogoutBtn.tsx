import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import styles from "./styles/NavBar.module.css";

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
      <i title="logout lock icon" className={`${styles.icon} text-black -translate-y-[0.07em]`}>
        <LockTwoToneIcon />
      </i>
    </button>
  );
}

export default LogoutBtn;
