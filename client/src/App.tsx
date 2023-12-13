import { useEffect, useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import NavBar from "./components/navigation/NavBar";
import ServerAPI from "./api/userAPI";
import { AuthContext } from "./providers/AuthProvider";
import ReactGA from "react-ga4";
import loadable from "@loadable/component";
import ProfileStatsProvider from "./providers/ProfileStatsProvider";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";

const CookiesPolicy = loadable(() => import("./pages/CookiesPolicy"));
const TermsOfService = loadable(() => import("./pages/TermsOfService"));
const PrivacyPolicy = loadable(() => import("./pages/PrivacyPolicy"));
const Games = loadable(() => import("./pages/Games"));
const PageNotFound = loadable(() => import("./pages/PageNotFound"));
const Lessons = loadable(() => import("./pages/Lessons"));
const Login = loadable(() => import("./pages/Login"));
const Register = loadable(() => import("./pages/Register"));
const Profile = loadable(() => import("./pages/Profile"));
const Faq = loadable(() => import("./pages/Faq"));

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
    // Verify user only if a token exists in local storage and userId doesn't exist
    localStorage.jwt_token && !userId && verifyAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]); //Add isAuthenticated as a dependency so that user id is fetched when user logs in/registers

  // Handle page transition/url change
  useEffect(() => {
    window.scrollTo(0, 0); //Scroll page to top on page transitions

    currentUrl.pathname.includes("profile")
      ? (document.body.style.backgroundColor = "#24548C")
      : (document.body.style.backgroundColor = "white");

    // Add delay to google analytics so it doesn't block resources during initial load
    // Drawback is that google analytics won't show data for users within the first 5 seconds
    const loadGoogleAnalytics = () => {
      ReactGA.initialize("G-2C4CE5E4CR"); //Initialize Google Analytics

      // Send page view with a custom path
      ReactGA.send({
        hitType: "pageview",
        page: currentUrl.pathname,
        title: "Custom Title",
      });
    };

    const timer = setTimeout(loadGoogleAnalytics, 5000);

    return () => clearTimeout(timer);
  }, [currentUrl]);

  // Prelod all lazyloaded components after delay
  useEffect(() => {
    //Handle load and preload based on url on first load
    if (currentUrl.pathname === "/games") {
      Games.load();
    } else if (currentUrl.pathname === "/lessons") {
      Lessons.load();
    } else if (currentUrl.pathname === "/login") {
      Login.load();
    } else if (currentUrl.pathname === "/register") {
      Register.load();
    } else if (currentUrl.pathname === "/profile") {
      Profile.load();
    } else if (currentUrl.pathname === "/faq") {
      Faq.load();
    } else if (currentUrl.pathname === "/cookiespolicy") {
      CookiesPolicy.load();
    } else if (currentUrl.pathname === "/privacypolicy") {
      PrivacyPolicy.load();
    } else if (currentUrl.pathname === "/termsofservice") {
      TermsOfService.load();
    } else if (currentUrl.pathname === "*") {
      PageNotFound.load();
    }

    const handlePreload = () => {
      Games.preload();
      PageNotFound.preload();
      Lessons.preload();
      Login.preload();
      Register.preload();
      Profile.preload();
      Faq.preload();
      CookiesPolicy.preload();
      TermsOfService.preload();
      PrivacyPolicy.preload();
    };
    const timer = setTimeout(handlePreload, 2000);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProfileStatsProvider>
      <NavBar />
      <div
        className={`block w-full ${
          currentUrl.pathname === "/" && !isAuthenticated
            ? "min-h-[306em]"
            : "min-h-[75em]"
        }`}
      >
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
          <Route path="/blog" element={<Faq />} />
          <Route path="/blog/" element={<Faq />} />
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
                <Register setAuth={handleAuth} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </ProfileStatsProvider>
  );
}

export default App;
