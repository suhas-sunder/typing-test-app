import { useEffect, useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import ReactGA from "react-ga4";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import TermsOfService from "./pages/termsofservice";

ReactGA.initialize("G-2C4CE5E4CR"); //Initialize Google Analytics

function App() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setUserId,
    userId,
    setUserName,
  } = useContext(AuthContext);

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
        setIsAuthenticated(parseRes.verified);
        setUserId(parseRes.userId);
        setUserName(parseRes.userName);
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
  const currentUrl = useLocation();

  useEffect(() => {
    // Verify user only if a token exists in local storage
    localStorage.jwt_token && !userId && verifyAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]); //Add isAuthenticated as a dependency so that user id is fetched when user logs in/registers

  useEffect(() => {
    currentUrl.pathname.includes("profile")
      ? (document.body.style.backgroundColor = "#24548C")
      : (document.body.style.backgroundColor = "white");

    // Send pageview with a custom path
    ReactGA.send({
      hitType: "pageview",
      page: currentUrl.pathname,
      title: "Custom Title",
    });
  }, [currentUrl]);

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
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/cookiespolicy" element={<CookiesPolicy />} />
        <Route path="/termsofservice" element={<TermsOfService />} />
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
