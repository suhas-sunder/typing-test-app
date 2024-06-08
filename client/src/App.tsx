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

const LtwoSeconeLone = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLone"),
);
const LtwoSeconeLtwo = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLtwo"),
);
const LtwoSeconeLthree = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLthree"),
);
const LtwoSeconeLfour = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLfour"),
);
const LtwoSeconeLfive = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLfive"),
);
const LtwoSeconeLsix = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLsix"),
);
const LtwoSeconeLseven = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLseven"),
);
const LtwoSeconeLeight = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLeight"),
);
const LtwoSeconeLnine = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLnine"),
);
const LtwoSectwoLone = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLone"),
);
const LtwoSectwoLtwo = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLtwo"),
);
const LtwoSectwoLthree = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLthree"),
);
const LtwoSectwoLfour = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLfour"),
);
const LtwoSectwoLfive = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLfive"),
);
const LtwoSectwoLsix = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLsix"),
);
const LtwoSectwoLseven = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLseven"),
);
const LtwoSectwoLeight = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLeight"),
);
const LtwoSectwoLnine = loadable(
  () => import("./components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLnine"),
);
const LtwoSecthreeLone = loadable(
  () =>
    import("./components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLone"),
);
const LtwoSecthreeLtwo = loadable(
  () =>
    import("./components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLtwo"),
);
const LtwoSecthreeLthree = loadable(
  () =>
    import("./components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLthree"),
);
const LtwoSecthreeLfour = loadable(
  () =>
    import("./components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLfour"),
);
const LtwoSecthreeLfive = loadable(
  () =>
    import("./components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLfive"),
);
const LtwoSecthreeLsix = loadable(
  () =>
    import("./components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLsix"),
);
const LtwoSecthreeLseven = loadable(
  () =>
    import("./components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLseven"),
);
const LtwoSecthreeLeight = loadable(
  () =>
    import("./components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLeight"),
);
const LtwoSecthreeLnine = loadable(
  () =>
    import("./components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLnine"),
);
const LtwoSecthreeLten = loadable(
  () =>
    import("./components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeten"),
);
const LthreeSeconeLone = loadable(
  () =>
    import("./components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLone"),
);
const LthreeSeconeLtwo = loadable(
  () =>
    import("./components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLtwo"),
);
const LthreeSeconeLthree = loadable(
  () =>
    import("./components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLthree"),
);
const LthreeSeconeLfour = loadable(
  () =>
    import("./components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLfour"),
);
const LthreeSeconeLfive = loadable(
  () =>
    import("./components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLfive"),
);
const LthreeSeconeLsix = loadable(
  () =>
    import("./components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLsix"),
);
const LthreeSeconeLseven = loadable(
  () =>
    import("./components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLseven"),
);
const LthreeSeconeLeight = loadable(
  () =>
    import("./components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLeight"),
);
const LthreeSectwoLone = loadable(
  () =>
    import("./components/layout/lessonpg/LessonThreeSecTwo/LthreeSectwoLone"),
);

const LthreeSectwoLtwo = loadable(
  () =>
    import("./components/layout/lessonpg/LessonThreeSecTwo/LthreeSectwoLtwo"),
);
const LthreeSectwoLthree = loadable(
  () =>
    import("./components/layout/lessonpg/LessonThreeSecTwo/LthreeSectwoLthree"),
);
const LthreeSectwoLfour = loadable(
  () =>
    import("./components/layout/lessonpg/LessonThreeSecTwo/LthreeSectwoLfour"),
);
const LthreeSectwoLfive = loadable(
  () =>
    import("./components/layout/lessonpg/LessonThreeSecTwo/LthreeSectwoLfive"),
);
const LthreeSecthreeLone = loadable(
  () =>
    import(
      "./components/layout/lessonpg/LessonThreeSecThree/LthreeSecthreeLone"
    ),
);
const LthreeSecthreeLtwo = loadable(
  () =>
    import(
      "./components/layout/lessonpg/LessonThreeSecThree/LthreeSecthreeLtwo"
    ),
);
const LthreeSecthreeLthree = loadable(
  () =>
    import(
      "./components/layout/lessonpg/LessonThreeSecThree/LthreeSecthreeLthree"
    ),
);
const LthreeSecthreeLfour = loadable(
  () =>
    import(
      "./components/layout/lessonpg/LessonThreeSecThree/LthreeSecthreeLfour"
    ),
);
const LthreeSecthreeLfive = loadable(
  () =>
    import(
      "./components/layout/lessonpg/LessonThreeSecThree/LthreeSecthreeLfive"
    ),
);

const LoneSoneLone = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecOne/LoneSoneLone"),
);
const LoneSoneLtwo = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecOne/LoneSoneLtwo"),
);
const LoneSoneLthree = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecOne/LoneSoneLthree"),
);
const LoneSoneLfour = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecOne/LoneSoneLfour"),
);
const LoneSoneLfive = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecOne/LoneSoneLfive"),
);

const LoneSoneLsix = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecOne/LoneSoneLsix"),
);

const LoneSoneLseven = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecOne/LoneSoneLseven"),
);
const LoneSoneLeight = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecOne/LoneSoneLeight"),
);
const LoneSoneLnine = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecOne/LoneSoneLnine"),
);
const LoneSoneLten = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecOne/LoneSoneLten"),
);
const LoneStwoLone = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecTwo/LoneStwoLone"),
);
const LoneStwoLtwo = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecTwo/LoneStwoLtwo"),
);
const LoneStwoLthree = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecTwo/LoneStwoLthree"),
);
const LoneStwoLfour = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecTwo/LoneStwoLfour"),
);
const LoneStwoLfive = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecTwo/LoneStwoLfive"),
);
const LoneStwoLsix = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecTwo/LoneStwoLsix"),
);
const LoneStwoLseven = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecTwo/LoneStwoLseven"),
);

const LoneStwoLeight = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecTwo/LoneStwoLeight"),
);
const LoneStwoLnine = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecTwo/LoneStwoLnine"),
);
const LoneSthreeLone = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecThree/LoneSthreeLone"),
);
const LoneSthreeLtwo = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecThree/LoneSthreeLtwo"),
);
const LoneSthreeLthree = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecThree/LoneSthreeLthree"),
);
const LoneSthreeLfour = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecThree/LoneSthreeLfour"),
);
const LoneSthreeLfive = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecThree/LoneSthreeLfive"),
);
const LoneSthreeLsix = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecThree/LoneSthreeLsix"),
);
const LoneSthreeLseven = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecThree/LoneSthreeLseven"),
);
const LoneSthreeLeight = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecThree/LoneSthreeLeight"),
);
const LoneSthreeLnine = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecThree/LoneSthreeLnine"),
);
const LoneSecfourLone = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecFour/LoneSecfourLone"),
);
const LoneSecfourLtwo = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecFour/LoneSecfourLtwo"),
);
const LoneSecfourLthree = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecFour/LoneSecfourLthree"),
);
const LoneSecfourLfour = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecFour/LoneSecfourLfour"),
);
const LoneSecfourLfive = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecFour/LoneSecfourLfive"),
);
const LoneSecfourLsix = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecFour/LoneSecfourLsix"),
);
const LoneSecfourLseven = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecFour/LoneSecfourLseven"),
);
const LoneSecfourLeight = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecFour/LoneSecfourLeight"),
);
const LoneSecfourLnine = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecFour/LoneSecfourLnine"),
);
const LoneSecfiveLone = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLone"),
);
const LoneSecfiveLtwo = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLtwo"),
);
const LoneSecfiveLthree = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLthree"),
);
const LoneSecfiveLfour = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLfour"),
);
const LoneSecfiveLfive = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLfive"),
);
const LoneSecfiveLsix = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLsix"),
);
const LoneSecfiveLseven = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLseven"),
);

const LoneSecfiveLeight = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLeight"),
);
const LoneSecfiveLnine = loadable(
  () =>
    import("./components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLnine"),
);
const LoneSecsixLone = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecSix/LoneSecsixLone"),
);
const LoneSecsixLtwo = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecSix/LoneSecsixLtwo"),
);
const LoneSecsixLthree = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecSix/LoneSecsixLthree"),
);
const LoneSecsixLfour = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecSix/LoneSecsixLfour"),
);
const LoneSecsixLfive = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecSix/LoneSecsixLfive"),
);
const LoneSecsixLsix = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecSix/LoneSecsixLsix"),
);
const LoneSecsixLseven = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecSix/LoneSecsixLseven"),
);
const LoneSecsixLeight = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecSix/LoneSecsixLeight"),
);
const LoneSecsixLnine = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecSix/LoneSecsixLnine"),
);
const LoneSecsixLten = loadable(
  () => import("./components/layout/lessonpg/LessonOneSecSix/LoneSecsixLten"),
);

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
                <Route path="lesson/*" element={<Lesson />}>
                  {/* Lesson 1 */}
                  <>
                    {/* Section 1 */}
                    <>
                      <Route path="1/sec-1/lvl-1" element={<LoneSoneLone />} />
                      <Route path="1/sec-1/lvl-2" element={<LoneSoneLtwo />} />
                      <Route
                        path="1/sec-1/lvl-3"
                        element={<LoneSoneLthree />}
                      />
                      <Route path="1/sec-1/lvl-4" element={<LoneSoneLfour />} />
                      <Route path="1/sec-1/lvl-5" element={<LoneSoneLfive />} />
                      <Route path="1/sec-1/lvl-6" element={<LoneSoneLsix />} />
                      <Route
                        path="1/sec-1/lvl-7"
                        element={<LoneSoneLseven />}
                      />
                      <Route
                        path="1/sec-1/lvl-8"
                        element={<LoneSoneLeight />}
                      />
                      <Route path="1/sec-1/lvl-9" element={<LoneSoneLnine />} />
                      <Route path="1/sec-1/lvl-10" element={<LoneSoneLten />} />
                    </>
                    {/* Section 2 */}
                    <>
                      <Route path="1/sec-2/lvl-1" element={<LoneStwoLone />} />
                      <Route path="1/sec-2/lvl-2" element={<LoneStwoLtwo />} />
                      <Route
                        path="1/sec-2/lvl-3"
                        element={<LoneStwoLthree />}
                      />
                      <Route path="1/sec-2/lvl-4" element={<LoneStwoLfour />} />
                      <Route path="1/sec-2/lvl-5" element={<LoneStwoLfive />} />
                      <Route path="1/sec-2/lvl-6" element={<LoneStwoLsix />} />
                      <Route
                        path="1/sec-2/lvl-7"
                        element={<LoneStwoLseven />}
                      />
                      <Route
                        path="1/sec-2/lvl-8"
                        element={<LoneStwoLeight />}
                      />
                      <Route path="1/sec-2/lvl-9" element={<LoneStwoLnine />} />
                    </>
                    {/* Section 3 */}
                    <>
                      <Route
                        path="1/sec-3/lvl-1"
                        element={<LoneSthreeLone />}
                      />
                      <Route
                        path="1/sec-3/lvl-2"
                        element={<LoneSthreeLtwo />}
                      />
                      <Route
                        path="1/sec-3/lvl-3"
                        element={<LoneSthreeLthree />}
                      />
                      <Route
                        path="1/sec-3/lvl-4"
                        element={<LoneSthreeLfour />}
                      />
                      <Route
                        path="1/sec-3/lvl-5"
                        element={<LoneSthreeLfive />}
                      />
                      <Route
                        path="1/sec-3/lvl-6"
                        element={<LoneSthreeLsix />}
                      />
                      <Route
                        path="1/sec-3/lvl-7"
                        element={<LoneSthreeLseven />}
                      />
                      <Route
                        path="1/sec-3/lvl-8"
                        element={<LoneSthreeLeight />}
                      />
                      <Route
                        path="1/sec-3/lvl-9"
                        element={<LoneSthreeLnine />}
                      />
                    </>
                    {/* Section 4 */}
                    <>
                      <Route
                        path="1/sec-4/lvl-1"
                        element={<LoneSecfourLone />}
                      />
                      <Route
                        path="1/sec-4/lvl-2"
                        element={<LoneSecfourLtwo />}
                      />
                      <Route
                        path="1/sec-4/lvl-3"
                        element={<LoneSecfourLthree />}
                      />
                      <Route
                        path="1/sec-4/lvl-4"
                        element={<LoneSecfourLfour />}
                      />
                      <Route
                        path="1/sec-4/lvl-5"
                        element={<LoneSecfourLfive />}
                      />
                      <Route
                        path="1/sec-4/lvl-6"
                        element={<LoneSecfourLsix />}
                      />
                      <Route
                        path="1/sec-4/lvl-7"
                        element={<LoneSecfourLseven />}
                      />
                      <Route
                        path="1/sec-4/lvl-8"
                        element={<LoneSecfourLeight />}
                      />
                      <Route
                        path="1/sec-4/lvl-9"
                        element={<LoneSecfourLnine />}
                      />
                    </>
                    {/* Section 5 */}
                    <>
                      <Route
                        path="1/sec-5/lvl-1"
                        element={<LoneSecfiveLone />}
                      />
                      <Route
                        path="1/sec-5/lvl-2"
                        element={<LoneSecfiveLtwo />}
                      />
                      <Route
                        path="1/sec-5/lvl-3"
                        element={<LoneSecfiveLthree />}
                      />
                      <Route
                        path="1/sec-5/lvl-4"
                        element={<LoneSecfiveLfour />}
                      />
                      <Route
                        path="1/sec-5/lvl-5"
                        element={<LoneSecfiveLfive />}
                      />
                      <Route
                        path="1/sec-5/lvl-6"
                        element={<LoneSecfiveLsix />}
                      />
                      <Route
                        path="1/sec-5/lvl-7"
                        element={<LoneSecfiveLseven />}
                      />
                      <Route
                        path="1/sec-5/lvl-8"
                        element={<LoneSecfiveLeight />}
                      />
                      <Route
                        path="1/sec-5/lvl-9"
                        element={<LoneSecfiveLnine />}
                      />
                    </>
                    {/* Section 6 */}
                    <>
                      <Route
                        path="1/sec-6/lvl-1"
                        element={<LoneSecsixLone />}
                      />
                      <Route
                        path="1/sec-6/lvl-2"
                        element={<LoneSecsixLtwo />}
                      />
                      <Route
                        path="1/sec-6/lvl-3"
                        element={<LoneSecsixLthree />}
                      />
                      <Route
                        path="1/sec-6/lvl-4"
                        element={<LoneSecsixLfour />}
                      />
                      <Route
                        path="1/sec-6/lvl-5"
                        element={<LoneSecsixLfive />}
                      />
                      <Route
                        path="1/sec-6/lvl-6"
                        element={<LoneSecsixLsix />}
                      />{" "}
                      <Route
                        path="1/sec-6/lvl-7"
                        element={<LoneSecsixLseven />}
                      />
                      <Route
                        path="1/sec-6/lvl-8"
                        element={<LoneSecsixLeight />}
                      />
                      <Route
                        path="1/sec-6/lvl-9"
                        element={<LoneSecsixLnine />}
                      />
                      <Route
                        path="1/sec-6/lvl-10"
                        element={<LoneSecsixLten />}
                      />
                    </>
                  </>
                  {/* Lesson 2 */}
                  <>
                    {/* Section 1 */}
                    <>
                      <Route
                        path="2/sec-1/lvl-1"
                        element={<LtwoSeconeLone />}
                      />
                      <Route
                        path="2/sec-1/lvl-2"
                        element={<LtwoSeconeLtwo />}
                      />
                      <Route
                        path="2/sec-1/lvl-3"
                        element={<LtwoSeconeLthree />}
                      />
                      <Route
                        path="2/sec-1/lvl-4"
                        element={<LtwoSeconeLfour />}
                      />
                      <Route
                        path="2/sec-1/lvl-5"
                        element={<LtwoSeconeLfive />}
                      />
                      <Route
                        path="2/sec-1/lvl-6"
                        element={<LtwoSeconeLsix />}
                      />
                      <Route
                        path="2/sec-1/lvl-7"
                        element={<LtwoSeconeLseven />}
                      />
                      <Route
                        path="2/sec-1/lvl-8"
                        element={<LtwoSeconeLeight />}
                      />
                      <Route
                        path="2/sec-1/lvl-9"
                        element={<LtwoSeconeLnine />}
                      />
                    </>
                    {/* Section 2 */}
                    <>
                      <Route
                        path="2/sec-2/lvl-1"
                        element={<LtwoSectwoLone />}
                      />
                      <Route
                        path="2/sec-2/lvl-2"
                        element={<LtwoSectwoLtwo />}
                      />
                      <Route
                        path="2/sec-2/lvl-3"
                        element={<LtwoSectwoLthree />}
                      />
                      <Route
                        path="2/sec-2/lvl-4"
                        element={<LtwoSectwoLfour />}
                      />
                      <Route
                        path="2/sec-2/lvl-5"
                        element={<LtwoSectwoLfive />}
                      />
                      <Route
                        path="2/sec-2/lvl-6"
                        element={<LtwoSectwoLsix />}
                      />
                      <Route
                        path="2/sec-2/lvl-7"
                        element={<LtwoSectwoLseven />}
                      />
                      <Route
                        path="2/sec-2/lvl-8"
                        element={<LtwoSectwoLeight />}
                      />
                      <Route
                        path="2/sec-2/lvl-9"
                        element={<LtwoSectwoLnine />}
                      />
                    </>
                    {/* Section 3 */}
                    <>
                      <Route
                        path="2/sec-3/lvl-1"
                        element={<LtwoSecthreeLone />}
                      />
                      <Route
                        path="2/sec-3/lvl-2"
                        element={<LtwoSecthreeLtwo />}
                      />
                      <Route
                        path="2/sec-3/lvl-3"
                        element={<LtwoSecthreeLthree />}
                      />
                      <Route
                        path="2/sec-3/lvl-4"
                        element={<LtwoSecthreeLfour />}
                      />
                      <Route
                        path="2/sec-3/lvl-5"
                        element={<LtwoSecthreeLfive />}
                      />
                      <Route
                        path="2/sec-3/lvl-6"
                        element={<LtwoSecthreeLsix />}
                      />
                      <Route
                        path="2/sec-3/lvl-7"
                        element={<LtwoSecthreeLseven />}
                      />
                      <Route
                        path="2/sec-3/lvl-8"
                        element={<LtwoSecthreeLeight />}
                      />
                      <Route
                        path="2/sec-3/lvl-9"
                        element={<LtwoSecthreeLnine />}
                      />
                      <Route
                        path="2/sec-3/lvl-10"
                        element={<LtwoSecthreeLten />}
                      />
                    </>
                  </>
                  {/* Lesson 3 */}
                  <>
                    {/* Section 1 */}
                    <>
                      <Route
                        path="3/sec-1/lvl-1"
                        element={<LthreeSeconeLone />}
                      />
                      <Route
                        path="3/sec-1/lvl-2"
                        element={<LthreeSeconeLtwo />}
                      />
                      <Route
                        path="3/sec-1/lvl-3"
                        element={<LthreeSeconeLthree />}
                      />
                      <Route
                        path="3/sec-1/lvl-4"
                        element={<LthreeSeconeLfour />}
                      />
                      <Route
                        path="3/sec-1/lvl-5"
                        element={<LthreeSeconeLfive />}
                      />
                      <Route
                        path="3/sec-1/lvl-6"
                        element={<LthreeSeconeLsix />}
                      />
                      <Route
                        path="3/sec-1/lvl-7"
                        element={<LthreeSeconeLseven />}
                      />
                      <Route
                        path="3/sec-1/lvl-8"
                        element={<LthreeSeconeLeight />}
                      />
                    </>
                    {/* Section 2 */}
                    <>
                      <Route
                        path="3/sec-2/lvl-1"
                        element={<LthreeSectwoLone />}
                      />
                      <Route
                        path="3/sec-2/lvl-2"
                        element={<LthreeSectwoLtwo />}
                      />
                      <Route
                        path="3/sec-2/lvl-3"
                        element={<LthreeSectwoLthree />}
                      />
                      <Route
                        path="3/sec-2/lvl-4"
                        element={<LthreeSectwoLfour />}
                      />
                      <Route
                        path="3/sec-2/lvl-5"
                        element={<LthreeSectwoLfive />}
                      />
                    </>
                    {/* Section 3 */}
                    <>
                      <Route
                        path="3/sec-3/lvl-1"
                        element={<LthreeSecthreeLone />}
                      />
                      <Route
                        path="3/sec-3/lvl-2"
                        element={<LthreeSecthreeLtwo />}
                      />
                      <Route
                        path="3/sec-3/lvl-3"
                        element={<LthreeSecthreeLthree />}
                      />
                      <Route
                        path="3/sec-3/lvl-4"
                        element={<LthreeSecthreeLfour />}
                      />
                      <Route
                        path="3/sec-3/lvl-5"
                        element={<LthreeSecthreeLfive />}
                      />
                    </>
                  </>
                </Route>
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
            <section className="sm:py-18 flex w-full flex-col items-center gap-12 bg-defaultblue pb-[4.5em] pt-24 ">
              {" "}
              <CallToActionBanner />
            </section>
          )}
          <footer
            className={`${fadeAnim} flex min-h-[17.9em] w-full flex-col items-center bg-slate-700 text-center text-white`}
          >
            <Footer isAuthenticated={isAuthenticated} />
            {delayedLoadAdsenseScript && (
              <>
                {/* This is to activate google adsense auto ads */}
                <script
                  async
                  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4810616735714570"
                  crossOrigin="anonymous"
                ></script>
              </>
            )}
          </footer>
        </ImageProvider>
      </ProfileStatsProvider>
    </>
  );
}

export default App;
