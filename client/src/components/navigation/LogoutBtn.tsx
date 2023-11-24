import styles from "./styles/NavBar.module.css";
import Icon from "../../utils/Icon";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

interface PropType {
  customStyle: string;
  iconStyle: string;
}

function LogoutBtn({ customStyle, iconStyle }: PropType) {
  const { setIsAuthenticated } = useContext(AuthContext);
  // Clear local storage
  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    localStorage.removeItem("jwt_token");
    setIsAuthenticated(false);
  };

  return (
    <button className={customStyle} onClick={handleLogout}>
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
