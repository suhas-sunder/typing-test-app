import { useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import PageNotFound from "./pages/PageNotFound";
import Games from "./pages/Games";
import Login from "./pages/Login";
import NavBar from "./components/navigation/NavBar";
import Faq from "./pages/Faq";
import Footer from "./components/layout/Footer";
import Registration from "./pages/Register";
import ServerAPI from "./api/userAPI";
import Profile from "./pages/Profile";
import { AuthContext } from "./providers/AuthProvider";

function App() {
  const { isAuthenticated, setIsAuthenticated, setUserId } =
    useContext(AuthContext);

  // Set auth via login or registration page
  const handleAuth = (isAuth: boolean) => {
    setIsAuthenticated(isAuth);
  };

  // Check if user is verified
  const verifyAuth = async () => {
    try {
      const response = await ServerAPI.get("/is-verify", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt_token"),
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
        console.log(parseRes);
        setIsAuthenticated(parseRes.verified);
        setUserId(parseRes.userId);
      }
    } catch (err) {
      let message: string;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]); //Add isAuthenticated as a dependency so that user id is fetched when user logs in/registers

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/games" element={<Games />} />
        <Route
          path="/profile"
          element={
            isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/faq" element={<Faq />} />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <Login /> : <Navigate to="/profile" replace />
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
        {/* {isAuthenticated && (
          <Route
            path="/dashboard"
            element={<Dashboard setAuth={handleAuth} />}
          />
        )} */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
