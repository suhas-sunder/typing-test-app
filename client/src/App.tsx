import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./providers/AuthProvider";
import { useEffect, useContext } from "react";
import loadable from "@loadable/component";
import ReactGA from "react-ga4";
import VerifyAuth from "./utils/VerifyAuth";
import NavBar from "./components/navigation/NavBar";
import ProfileStatsProvider from "./providers/StatsProvider";
import Home from "./pages/Home";
import { MenuContext } from "./providers/MenuProvider";

const Footer = loadable(() => import("./components/layout/Footer"));
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

  const { setId } = useContext(MenuContext);

  // Set auth via login or registration page
  const handleAuth = (isAuth: boolean) => {
    setIsAuthenticated(isAuth);
  };

  const currentUrl = useLocation();

  useEffect(() => {
    // Verify user only if a token exists in local storage and userId doesn't exist
    const handleVerify = async () => {
      const result = await VerifyAuth();

      if (result) {
        setIsAuthenticated(result.verified);
        setUserId(result.userId);
        setId(result.userId);
        setUserName(result.userName);
      }
    };

    localStorage.jwt_token && !userId && handleVerify();

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
    const loadGoogleAnalytics = async () => {
      await ReactGA.initialize("G-2C4CE5E4CR"); //Initialize Google Analytics

      // Send page view with a custom path
      ReactGA.send({
        hitType: "pageview",
        page: currentUrl.pathname,
        title: "Custom Title",
      });
    };

    const delay = isAuthenticated ? 100 : 4000; //When user is logged in, load GA faster since it won't affect page insight info

    const timer = setTimeout(loadGoogleAnalytics, delay);

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUrl]);

  // Prelod all lazyloaded components after delay
  useEffect(() => {
    Footer.load();

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

    const timer = setTimeout(handlePreload, 6000);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProfileStatsProvider>
      <div
        id="nav"
        className="relative left-0 right-0 top-0 min-h-[5.5em] bg-defaultblue pl-5 font-lora text-base tracking-widest text-white"
      >
        <NavBar />
      </div>
      <div
        className={`block w-full  ${
          currentUrl.pathname === "/" && !isAuthenticated
            ? "min-h-[302em]"
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
            element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
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

      <footer className="flex min-h-[17.9em] w-full flex-col items-center bg-slate-700 text-center text-white">
        <Footer />
      </footer>
    </ProfileStatsProvider>
  );
}

export default App;
