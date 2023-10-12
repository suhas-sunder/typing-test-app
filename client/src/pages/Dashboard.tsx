import { useState, useEffect } from "react";

interface PropType {
  setAuth: (value: boolean) => void;
}

function Dashboard({ setAuth }: PropType) {
  const [username, setUsername] = useState("");

  const getName = async () => {
    try {
      const response = await fetch(
        "http://localhost:3500/v1/api/account/dashboard",
        {
          method: "GET",
          headers: {
            jwt_token: localStorage.jwt_token,
          },
        }
      );

      const parseRes = await response.json();

      console.log(parseRes.user_name);

      parseRes.user_name && setUsername(parseRes.user_name);
    } catch (err) {
      let message;

      if (err instanceof Error) {
        message = err.message;
      } else {
        message = String(err);
      }

      console.error(message);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  // Clear local storage
  const handleLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    localStorage.removeItem("jwt_token");
    setAuth(false);
  };

  return (
    <>
      <div>Welcome {username}!</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Dashboard;
