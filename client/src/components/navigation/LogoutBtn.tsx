import styles from "./styles/NavBar.module.css";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Icon from "../../utils/Icon";
interface PropType {
  customStyle: string;
  iconStyle: string;
}

function LogoutBtn({ customStyle, iconStyle }: PropType) {
  const { setIsAuthenticated, setUserId } = useContext(AuthContext);
  // Clear local storage
  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    localStorage.removeItem("jwt_token");
    setIsAuthenticated(false);
    setUserId("");
  };

  return (
    <button
      className={`${customStyle} relative m-auto inline-flex max-w-[9em] items-center justify-center gap-2 rounded-[0.3em] border-2 border-white px-8 py-[0.7em] text-white`}
      onClick={handleLogout}
    >
      Logout{" "}
      <Icon
        title="logout-icon"
        customStyle={`${styles.icon} ${iconStyle} `}
        icon="lockClosed"
      />
    </button>
  );
}

export default LogoutBtn;
