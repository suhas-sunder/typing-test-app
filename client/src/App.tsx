import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import PageNotFound from "./pages/PageNotFound";
import Games from "./pages/Games";
import Login from "./pages/Login";
import NavBar from "./components/navigation/NavBar";
import Settings from "./pages/Settings";
import Leaderboard from "./pages/Leaderboard";
import Footer from "./components/navigation/Footer";
import Registration from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ServerAPI from "./api/userAPI";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleAuth = (isAuth: boolean) => {
    setIsAuthenticated(isAuth);
  };

  // Check if user is verified
  const verifyAuth = async () => {
    try {
      console.log(isAuthenticated, localStorage.jwt_token, "app");

      const response = await ServerAPI.get("/is-verify", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          jwt_token: localStorage.jwt_token,
        },
      })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      const parseRes = await response;

      if (parseRes) {
        setIsAuthenticated(parseRes.verified);
      }
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
    // Verify user only if a token exists in local storage
    localStorage.jwt_token && verifyAuth();
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/games" element={<Games />} />
        <Route path="/summary" element={<Dashboard setAuth={handleAuth} />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setAuth={handleAuth} />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <Registration setAuth={handleAuth} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/settings" element={<Settings />} />
        {isAuthenticated && (
          <Route
            path="/dashboard"
            element={<Dashboard setAuth={handleAuth} />}
          />
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
