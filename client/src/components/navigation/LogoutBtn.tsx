import styles from "./styles/NavBar.module.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import loadable from "@loadable/component";

const Icon = loadable(() => import("../../utils/Icon"));
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

  useEffect(() => {
    Icon.load();
  }, []);

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
