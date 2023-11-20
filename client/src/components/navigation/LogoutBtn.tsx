import styles from "./styles/NavBar.module.css";
import Icon from "../../utils/Icon";

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
      <Icon
        title="logout-icon"
        customStyle={`${styles.icon} text-white -translate-y-[0.07em]`}
        icon="lockClosed"
      />
    </button>
  );
}

export default LogoutBtn;
