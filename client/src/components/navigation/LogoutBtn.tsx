import Icon from "../../utils/Icon";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";

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
        customStyle={`${iconStyle} `}
        icon="lockClosed"
      />
    </button>
  );
}

export default LogoutBtn;
