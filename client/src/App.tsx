import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext, useLayoutEffect, useState } from "react";
import loadable from "@loadable/component";
import ReactGA from "react-ga4";
import VerifyAuth from "./utils/requests/GetVerifyAuth";
import ProfileStatsProvider from "./providers/StatsProvider";
import ImageProvider from "./providers/ImageProvider";
import Home from "./pages/Home";
import { MenuContext } from "./providers/MenuProvider";
import useAuth from "./components/hooks/useAuth";
import ProtectedRoutes from "./utils/routing/ProtectedRoutes";
import CallToActionBanner from "./components/layout/shared/CallToActionBanner";
import { Helmet } from "react-helmet-async";
import useMetaData from "./components/hooks/useMetaData";
import useLoadAnimation from "./components/hooks/useLoadAnimation";

const Sitemap = loadable(() => import("./pages/Sitemap"));
const NavBar = loadable(() => import("./components/ui/navigation/NavBar"));
const Footer = loadable(() => import("./components/ui/navigation/Footer"));
const CookiesPolicy = loadable(() => import("./pages/CookiesPolicy"));
const TermsOfService = loadable(() => import("./pages/TermsOfService"));
const PrivacyPolicy = loadable(() => import("./pages/PrivacyPolicy"));
const Games = loadable(() => import("./pages/Games"));
const PageNotFound = loadable(() => import("./pages/PageNotFound"));
const Lessons = loadable(() => import("./pages/Lessons"));
const Lesson = loadable(() => import("./pages/Lesson"));
const Login = loadable(() => import("./pages/Login"));
const Register = loadable(() => import("./pages/Register"));
const Profile = loadable(() => import("./pages/Profile"));
const Learn = loadable(() => import("./pages/Learn"));
const CalculatorGame = loadable(() => import("./pages/CalculatorGame"));
const ProfileSummary = loadable(
  () => import("./components/layout/profilepg/ProfileSummary"),
);
const ProfileStats = loadable(
  () => import("./components/layout/profilepg/ProfileStats"),
);
const ProfileImages = loadable(
  () => import("./components/layout/profilepg/ProfileImages"),
);
const ProfileAchievements = loadable(
  () => import("./components/layout/profilepg/ProfileAchievements"),
);
const ProfileThemes = loadable(
  () => import("./components/layout/profilepg/ProfileThemes"),
);
const ProfileAccount = loadable(
  () => import("./components/layout/profilepg/ProfileAccount"),
);

function App() {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setUserId,
    userId,
    setUserName,
    setEmail,
  } = useAuth();

  const { setId } = useContext(MenuContext);

  // Set auth via login or registration page
  const handleAuth = (isAuth: boolean) => {
    setIsAuthenticated(isAuth);
  };

  const [delayedLoadAdsenseScript, setDelayedLoadAdsenseScript] =
    useState<boolean>(false);

  const { fadeAnim } = useLoadAnimation();

  const { metaData } = useMetaData();

  const location = useLocation();
  const pathname = location.pathname;

  const pathName = location.state?.from?.pathname + location.state?.from?.hash; //This stores the previous pathname and hash so that upon login it goes back to previous page or home page. Without this, protected pages won't redirect properly after login
  const from = pathName || "/";

  useLayoutEffect(() => {
    // Verify user only if a token exists in local storage and userId doesn't exist
    const handleVerify = async () => {
      const result = await VerifyAuth();

      if (result) {
        setIsAuthenticated(result.verified);
        setUserId(result.userId);
        setId(result.userId);
        setUserName(result.userName);
        setEmail(result.email);
      }
    };

    localStorage.jwt_token && !userId && handleVerify();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]); //Add isAuthenticated as a dependency so that user id is fetched when user logs in/registers

  // Handle page transition/url change
  useLayoutEffect(() => {
    //Scroll page to top on page transitions
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    scrollToTop();

    pathname.includes("profile") || pathname === "/lessons"
      ? (document.body.style.backgroundColor = "#24548C")
      : (document.body.style.backgroundColor = "white");

    // Add delay to google analytics so it doesn't block resources during initial load
    // Drawback is that google analytics won't show data for users within the first 5 seconds
    const loadGoogleAnalyticsAdsense = async () => {
      await ReactGA.initialize("G-2C4CE5E4CR"); //Initialize Google Analytics

      // Send page view with a custom path
      ReactGA.send({
        hitType: "pageview",
        page: pathname,
        title: "Custom Title",
      });

      //Trigger load adsense script
      setDelayedLoadAdsenseScript(true);
    };

    const delay = isAuthenticated ? 100 : 4000; //When user is logged in, load GA faster since it won't affect page insight info

    const timer = setTimeout(loadGoogleAnalyticsAdsense, delay);

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Prelod all lazyloaded components after delay
  useLayoutEffect(() => {
    NavBar.load();
    Footer.load();

    //Handle load and preload based on url on first load
    if (pathname.includes("/games")) {
      Games.load();
    } else if (pathname === "/lessons") {
      Lessons.load();
    } else if (pathname === "/login") {
      Login.load();
    } else if (pathname === "/register") {
      Register.load();
    } else if (pathname === "/profile") {
      Profile.load();
    } else if (pathname === "/learn") {
      Learn.load();
    } else if (pathname === "/cookiespolicy") {
      CookiesPolicy.load();
    } else if (pathname === "/privacypolicy") {
      PrivacyPolicy.load();
    } else if (pathname === "/termsofservice") {
      TermsOfService.load();
    } else {
      PageNotFound.load();
    }

    const handlePreload = () => {
      Games.preload();
      PageNotFound.preload();
      Lessons.preload();
      Login.preload();
      Register.preload();
      Profile.preload();
      ProfileSummary.preload();
      Learn.preload();
      CookiesPolicy.preload();
      TermsOfService.preload();
      PrivacyPolicy.preload();
    };

    const timer = setTimeout(handlePreload, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  const handlePageHeight = () => {
    const path = pathname;
    let styling = "min-h-[75em]";

    if (path === "/" && !isAuthenticated) {
      styling = "min-h-[296.5em]";
    } else if (path === "/login" || path === "/register") {
      styling = "min-h-[60em]";
    } else if (path.includes("calculator")) {
      styling = "min-h-[200em]";
    } else if (path.includes("learn")) {
      styling = "min-h-[180em]";
    } else if (path === "/lessons") {
      styling = "min-h-[75em]";
    }

    return styling;
  };

  return (
    <>
      <Helmet>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <link href={window.location.href} />
        {pathname.includes("profile") && (
          <meta name={pathname.split("/").join(" ")} content="noindex"></meta>
        )}
      </Helmet>
      <ProfileStatsProvider>
        <ImageProvider>
          <div
            id="nav"
            className={`${fadeAnim} relative left-0 right-0 top-0 min-h-[5.5em] bg-defaultblue pl-5 font-lora text-base tracking-widest text-white`}
          >
            <NavBar />
          </div>
          <div className={`${fadeAnim} block w-full  ${handlePageHeight()}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lessons">
                <Route index element={<Lessons />} />
                <Route path="lesson/*" element={<Lesson />} />
              </Route>
              <Route path="/games">
                <Route index element={<Games />} />
                <Route path="calculator" element={<CalculatorGame />} />
              </Route>

              <Route path="/Learn" element={<Learn />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/cookiespolicy" element={<CookiesPolicy />} />
              <Route path="/termsofservice" element={<TermsOfService />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/profile" element={<Profile />}>
                  <Route path="summary" element={<ProfileSummary />} />
                  <Route path="img" element={<ProfileImages />} />
                  <Route path="stats" element={<ProfileStats />} />
                  <Route
                    path="achievements"
                    element={<ProfileAchievements />}
                  />
                  <Route path="themes" element={<ProfileThemes />} />
                  <Route path="account" element={<ProfileAccount />} />
                </Route>
              </Route>
              <Route
                path="/login"
                element={
                  !isAuthenticated ? <Login /> : <Navigate to={from} replace />
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

          {!isAuthenticated && pathname !== "/" && pathname !== "/register" && (
            <section className="flex w-full flex-col items-center gap-12 bg-defaultblue pt-24 pb-[4.5em] sm:py-18 ">
              {" "}
              <CallToActionBanner />
            </section>
          )}
          <footer
            className={`${fadeAnim} flex min-h-[17.9em] w-full flex-col items-center bg-slate-700 text-center text-white`}
          >
            <Footer isAuthenticated={isAuthenticated} />
            {delayedLoadAdsenseScript && (
              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4810616735714570"
                crossOrigin="anonymous"
              ></script>
            )}
          </footer>
        </ImageProvider>
      </ProfileStatsProvider>
    </>
  );
}

export default App;
