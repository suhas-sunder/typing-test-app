import { Navigate, Route, Routes } from "react-router-dom";
import LessonsMenu from "../../components/ui/lessonspg/LessonsMenu";

import LessonsArticleSection from "../../components/layout/lessonpg/LessonsArticleSection";
import LessonSixEnglishWords from "../../components/layout/lessonpg/EnglishWords/LessonSixEnglishWords";
import TypingTest from "../../components/layout/homepg/TypingTest";
import ForgotPassword from "../../pages/ForgotPassword";
import VerifyEmail from "../../pages/VerifyEmail";
import LtwoSecfourLone from "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLone";
import LtwoSecfourLtwo from "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLtwo";
import LtwoSecfourLthree from "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLthree";
import LtwoSecfourLfour from "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLfour";
import LtwoSecfourLfive from "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLfive";
import LtwoSecfourLsix from "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLsix";
import LtwoSecfourLseven from "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLseven";
import LtwoSecfourLeight from "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLeight";
import LtwoSecfourLnine from "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLnine";
import LtwoSecfourLtwelve from "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLtwelve";
import LtwoSecfourLten from "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLten";
import LtwoSecfourLeleven from "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLeleven";
import LthreeSecfourLone from "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLone";
import LthreeSecfourLtwo from "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLtwo";
import LthreeSecfourLthree from "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLthree";
import LthreeSecfourLfour from "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLfour";
import LthreeSecfourLfive from "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLfive";
import LthreeSecfourLsix from "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLsix";
import LthreeSecfourLseven from "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLseven";
import LthreeSecfourLeight from "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLeight";
import LthreeSecfourLnine from "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLnine";
import LthreeSecfiveLone from "../../components/layout/lessonpg/LessonThreeSecFive/LthreeSecfiveLone";
import LthreeSecfiveLtwo from "../../components/layout/lessonpg/LessonThreeSecFive/LthreeSecfiveLtwo";
import LthreeSecfiveLthree from "../../components/layout/lessonpg/LessonThreeSecFive/LthreeSecfiveLthree";
import LthreeSecfiveLfour from "../../components/layout/lessonpg/LessonThreeSecFive/LthreeSecfiveLfour";
import LthreeSecfiveLfive from "../../components/layout/lessonpg/LessonThreeSecFive/LthreeSecfiveLfive";
import LfourSeconeLone from "../../components/layout/lessonpg/LessonFourSecOne/LfourSeconeLone";
import InspirationalQuotes from "../../components/layout/lessonpg/Quotes/InspirationalQuotes";
import FunnyQuotes from "../../components/layout/lessonpg/Quotes/FunnyQuotes";
import LeadershipQuotes from "../../components/layout/lessonpg/Quotes/LeadershipQuotes";
import VideoGameQuotes from "../../components/layout/lessonpg/Quotes/VideoGameQuotes";
import MovieQuotes from "../../components/layout/lessonpg/Quotes/MovieQuotes";
import TvShowQuotes from "../../components/layout/lessonpg/Quotes/TvShowQuotes";
import AnimeQuotes from "../../components/layout/lessonpg/Quotes/AnimeQuotes";
import AnimatedFilmQuotes from "../../components/layout/lessonpg/Quotes/AnimatedFilmQuotes";
import MotivationalQuotes from "../../components/layout/lessonpg/Quotes/MotivationalQuotes";
import LtwoSeconeLone from "../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLone";
import LtwoSeconeLtwo from "../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLtwo";
import LtwoSeconeLthree from "../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLthree";
import LtwoSeconeLfour from "../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLfour";
import LtwoSeconeLfive from "../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLfive";
import LtwoSeconeLsix from "../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLsix";
import LtwoSeconeLseven from "../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLseven";
import LtwoSeconeLeight from "../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLeight";
import LtwoSeconeLnine from "../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLnine";
import LtwoSectwoLone from "../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLone";
import LtwoSectwoLtwo from "../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLtwo";
import LtwoSectwoLthree from "../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLthree";
import LtwoSectwoLfour from "../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLfour";
import LtwoSectwoLfive from "../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLfive";
import LtwoSectwoLsix from "../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLsix";
import LtwoSectwoLseven from "../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLseven";
import LtwoSectwoLeight from "../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLeight";
import LtwoSectwoLnine from "../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLnine";
import LtwoSecthreeLone from "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLone";
import LtwoSecthreeLtwo from "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLtwo";
import LtwoSecthreeLthree from "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLthree";
import LtwoSecthreeLfour from "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLfour";
import LtwoSecthreeLfive from "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLfive";
import LtwoSecthreeLsix from "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLsix";
import LtwoSecthreeLseven from "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLseven";
import LtwoSecthreeLeight from "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLeight";
import LtwoSecthreeLnine from "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLnine";
import LtwoSecthreeLten from "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeten";
import LthreeSeconeLone from "../../components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLone";
import LthreeSeconeLtwo from "../../components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLtwo";
import LthreeSeconeLthree from "../../components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLthree";
import LthreeSeconeLfour from "../../components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLfour";
import LthreeSeconeLfive from "../../components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLfive";
import LthreeSeconeLsix from "../../components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLsix";
import LthreeSeconeLseven from "../../components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLseven";
import LthreeSeconeLeight from "../../components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLeight";
import LthreeSectwoLone from "../../components/layout/lessonpg/LessonThreeSecTwo/LthreeSectwoLone";
import LthreeSectwoLtwo from "../../components/layout/lessonpg/LessonThreeSecTwo/LthreeSectwoLtwo";
import LthreeSectwoLthree from "../../components/layout/lessonpg/LessonThreeSecTwo/LthreeSectwoLthree";
import LthreeSectwoLfour from "../../components/layout/lessonpg/LessonThreeSecTwo/LthreeSectwoLfour";
import LthreeSectwoLfive from "../../components/layout/lessonpg/LessonThreeSecTwo/LthreeSectwoLfive";
import LthreeSecthreeLtwo from "../../components/layout/lessonpg/LessonThreeSecThree/LthreeSecthreeLtwo";
import LthreeSecthreeLthree from "../../components/layout/lessonpg/LessonThreeSecThree/LthreeSecthreeLthree";
import LthreeSecthreeLfour from "../../components/layout/lessonpg/LessonThreeSecThree/LthreeSecthreeLfour";
import LthreeSecthreeLfive from "../../components/layout/lessonpg/LessonThreeSecThree/LthreeSecthreeLfive";
import CalculatorGame from "../../pages/CalculatorGame";
import Games from "../../pages/Games";
import PrivacyPolicy from "../../pages/PrivacyPolicy";
import CookiesPolicy from "../../pages/CookiesPolicy";
import TermsOfService from "../../pages/TermsOfService";
import Sitemap from "../../pages/Sitemap";
import Learn from "../../pages/Learn";
import ProtectedRoutes from "./ProtectedRoutes";
import Profile from "../../pages/Profile";
import ProfileSummary from "../../components/layout/profilepg/ProfileSummary";
import ProfileImages from "../../components/layout/profilepg/ProfileImages";
import ProfileStats from "../../components/layout/profilepg/ProfileStats";
import ProfileAchievements from "../../components/layout/profilepg/ProfileAchievements";
import ProfileThemes from "../../components/layout/profilepg/ProfileThemes";
import ProfileAccount from "../../components/layout/profilepg/ProfileAccount";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import PageNotFound from "../../pages/PageNotFound";
import LthreeSecthreeLone from "../../components/layout/lessonpg/LessonThreeSecThree/LthreeSecthreeLone";
import LoneSoneLone from "../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLone";
import Home from "../../pages/Home";
import Lessons from "../../pages/Lessons";
import LoneSoneLtwo from "../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLtwo";
import LoneSoneLthree from "../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLthree";
import LoneSoneLfour from "../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLfour";
import LoneSoneLfive from "../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLfive";
import LoneSoneLsix from "../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLsix";
import LoneSoneLseven from "../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLseven";
import LoneSoneLeight from "../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLeight";
import LoneSoneLnine from "../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLnine";
import LoneSoneLten from "../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLten";
import LoneStwoLone from "../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLone";
import LoneStwoLtwo from "../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLtwo";
import LoneStwoLthree from "../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLthree";
import LoneStwoLfour from "../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLfour";
import LoneStwoLfive from "../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLfive";
import LoneStwoLsix from "../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLsix";
import LoneStwoLseven from "../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLseven";
import LoneStwoLeight from "../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLeight";
import LoneStwoLnine from "../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLnine";

import LoneSthreeLone from "../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLone";
import LoneSthreeLtwo from "../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLtwo";
import LoneSthreeLthree from "../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLthree";
import LoneSthreeLfour from "../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLfour";
import LoneSthreeLfive from "../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLfive";
import LoneSthreeLsix from "../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLsix";
import LoneSthreeLseven from "../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLseven";
import LoneSthreeLeight from "../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLeight";
import LoneSthreeLnine from "../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLnine";

import LoneSecfourLone from "../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLone";
import LoneSecfourLtwo from "../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLtwo";
import LoneSecfourLthree from "../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLthree";
import LoneSecfourLfour from "../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLfour";
import LoneSecfourLfive from "../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLfive";
import LoneSecfourLsix from "../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLsix";
import LoneSecfourLseven from "../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLseven";
import LoneSecfourLeight from "../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLeight";
import LoneSecfourLnine from "../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLnine";

import LoneSecfiveLone from "../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLone";
import LoneSecfiveLtwo from "../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLtwo";
import LoneSecfiveLthree from "../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLthree";
import LoneSecfiveLfour from "../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLfour";
import LoneSecfiveLfive from "../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLfive";
import LoneSecfiveLsix from "../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLsix";
import LoneSecfiveLseven from "../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLseven";
import LoneSecfiveLeight from "../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLeight";
import LoneSecfiveLnine from "../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLnine";

import LoneSecsixLone from "../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLone";
import LoneSecsixLtwo from "../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLtwo";
import LoneSecsixLthree from "../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLthree";
import LoneSecsixLfour from "../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLfour";
import LoneSecsixLfive from "../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLfive";
import LoneSecsixLsix from "../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLsix";
import LoneSecsixLseven from "../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLseven";
import LoneSecsixLeight from "../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLeight";
import LoneSecsixLnine from "../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLnine";
import LoneSecsixLten from "../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLten";
import Lesson from "../../pages/Lesson";

//I have too many routes for dnd it's cluttering App.tsx so I'm loading it here.
export default function AllRoutes({ isAuthenticated, from }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/typing-test" element={<TypingTest />} />
      <Route path="/lessons" element={<Lessons />}>
        <Route path="*" element={<LessonsMenu />} />
        <Route path="lesson/*" element={<Lesson />}>
          <Route path="*" element={<LessonsArticleSection />} />
          <Route path="6/*" element={<LessonSixEnglishWords />} />
          {/* Lesson 1 */}
          <>
            {/* Section 1 */}
            <>
              <Route path="1/sec-1/lvl-1" element={<LoneSoneLone />} />
              <Route path="1/sec-1/lvl-2" element={<LoneSoneLtwo />} />
              <Route path="1/sec-1/lvl-3" element={<LoneSoneLthree />} />
              <Route path="1/sec-1/lvl-4" element={<LoneSoneLfour />} />
              <Route path="1/sec-1/lvl-5" element={<LoneSoneLfive />} />
              <Route path="1/sec-1/lvl-6" element={<LoneSoneLsix />} />
              <Route path="1/sec-1/lvl-7" element={<LoneSoneLseven />} />
              <Route path="1/sec-1/lvl-8" element={<LoneSoneLeight />} />
              <Route path="1/sec-1/lvl-9" element={<LoneSoneLnine />} />
              <Route path="1/sec-1/lvl-10" element={<LoneSoneLten />} />
            </>
            {/* Section 2 */}
            <>
              <Route path="1/sec-2/lvl-1" element={<LoneStwoLone />} />
              <Route path="1/sec-2/lvl-2" element={<LoneStwoLtwo />} />
              <Route path="1/sec-2/lvl-3" element={<LoneStwoLthree />} />
              <Route path="1/sec-2/lvl-4" element={<LoneStwoLfour />} />
              <Route path="1/sec-2/lvl-5" element={<LoneStwoLfive />} />
              <Route path="1/sec-2/lvl-6" element={<LoneStwoLsix />} />
              <Route path="1/sec-2/lvl-7" element={<LoneStwoLseven />} />
              <Route path="1/sec-2/lvl-8" element={<LoneStwoLeight />} />
              <Route path="1/sec-2/lvl-9" element={<LoneStwoLnine />} />
            </>
            {/* Section 3 */}
            <>
              <Route path="1/sec-3/lvl-1" element={<LoneSthreeLone />} />
              <Route path="1/sec-3/lvl-2" element={<LoneSthreeLtwo />} />
              <Route path="1/sec-3/lvl-3" element={<LoneSthreeLthree />} />
              <Route path="1/sec-3/lvl-4" element={<LoneSthreeLfour />} />
              <Route path="1/sec-3/lvl-5" element={<LoneSthreeLfive />} />
              <Route path="1/sec-3/lvl-6" element={<LoneSthreeLsix />} />
              <Route path="1/sec-3/lvl-7" element={<LoneSthreeLseven />} />
              <Route path="1/sec-3/lvl-8" element={<LoneSthreeLeight />} />
              <Route path="1/sec-3/lvl-9" element={<LoneSthreeLnine />} />
            </>
            {/* Section 4 */}
            <>
              <Route path="1/sec-4/lvl-1" element={<LoneSecfourLone />} />
              <Route path="1/sec-4/lvl-2" element={<LoneSecfourLtwo />} />
              <Route path="1/sec-4/lvl-3" element={<LoneSecfourLthree />} />
              <Route path="1/sec-4/lvl-4" element={<LoneSecfourLfour />} />
              <Route path="1/sec-4/lvl-5" element={<LoneSecfourLfive />} />
              <Route path="1/sec-4/lvl-6" element={<LoneSecfourLsix />} />
              <Route path="1/sec-4/lvl-7" element={<LoneSecfourLseven />} />
              <Route path="1/sec-4/lvl-8" element={<LoneSecfourLeight />} />
              <Route path="1/sec-4/lvl-9" element={<LoneSecfourLnine />} />
            </>
            {/* Section 5 */}
            <>
              <Route path="1/sec-5/lvl-1" element={<LoneSecfiveLone />} />
              <Route path="1/sec-5/lvl-2" element={<LoneSecfiveLtwo />} />
              <Route path="1/sec-5/lvl-3" element={<LoneSecfiveLthree />} />
              <Route path="1/sec-5/lvl-4" element={<LoneSecfiveLfour />} />
              <Route path="1/sec-5/lvl-5" element={<LoneSecfiveLfive />} />
              <Route path="1/sec-5/lvl-6" element={<LoneSecfiveLsix />} />
              <Route path="1/sec-5/lvl-7" element={<LoneSecfiveLseven />} />
              <Route path="1/sec-5/lvl-8" element={<LoneSecfiveLeight />} />
              <Route path="1/sec-5/lvl-9" element={<LoneSecfiveLnine />} />
            </>
            {/* Section 6 */}
            <>
              <Route path="1/sec-6/lvl-1" element={<LoneSecsixLone />} />
              <Route path="1/sec-6/lvl-2" element={<LoneSecsixLtwo />} />
              <Route path="1/sec-6/lvl-3" element={<LoneSecsixLthree />} />
              <Route path="1/sec-6/lvl-4" element={<LoneSecsixLfour />} />
              <Route path="1/sec-6/lvl-5" element={<LoneSecsixLfive />} />
              <Route path="1/sec-6/lvl-6" element={<LoneSecsixLsix />} />{" "}
              <Route path="1/sec-6/lvl-7" element={<LoneSecsixLseven />} />
              <Route path="1/sec-6/lvl-8" element={<LoneSecsixLeight />} />
              <Route path="1/sec-6/lvl-9" element={<LoneSecsixLnine />} />
              <Route path="1/sec-6/lvl-10" element={<LoneSecsixLten />} />
            </>
          </>
          {/* Lesson 2 */}
          <>
            {/* Section 1 */}
            <>
              <Route path="2/sec-1/lvl-1" element={<LtwoSeconeLone />} />
              <Route path="2/sec-1/lvl-2" element={<LtwoSeconeLtwo />} />
              <Route path="2/sec-1/lvl-3" element={<LtwoSeconeLthree />} />
              <Route path="2/sec-1/lvl-4" element={<LtwoSeconeLfour />} />
              <Route path="2/sec-1/lvl-5" element={<LtwoSeconeLfive />} />
              <Route path="2/sec-1/lvl-6" element={<LtwoSeconeLsix />} />
              <Route path="2/sec-1/lvl-7" element={<LtwoSeconeLseven />} />
              <Route path="2/sec-1/lvl-8" element={<LtwoSeconeLeight />} />
              <Route path="2/sec-1/lvl-9" element={<LtwoSeconeLnine />} />
            </>
            {/* Section 2 */}
            <>
              <Route path="2/sec-2/lvl-1" element={<LtwoSectwoLone />} />
              <Route path="2/sec-2/lvl-2" element={<LtwoSectwoLtwo />} />
              <Route path="2/sec-2/lvl-3" element={<LtwoSectwoLthree />} />
              <Route path="2/sec-2/lvl-4" element={<LtwoSectwoLfour />} />
              <Route path="2/sec-2/lvl-5" element={<LtwoSectwoLfive />} />
              <Route path="2/sec-2/lvl-6" element={<LtwoSectwoLsix />} />
              <Route path="2/sec-2/lvl-7" element={<LtwoSectwoLseven />} />
              <Route path="2/sec-2/lvl-8" element={<LtwoSectwoLeight />} />
              <Route path="2/sec-2/lvl-9" element={<LtwoSectwoLnine />} />
            </>
            {/* Section 3 */}
            <>
              <Route path="2/sec-3/lvl-1" element={<LtwoSecthreeLone />} />
              <Route path="2/sec-3/lvl-2" element={<LtwoSecthreeLtwo />} />
              <Route path="2/sec-3/lvl-3" element={<LtwoSecthreeLthree />} />
              <Route path="2/sec-3/lvl-4" element={<LtwoSecthreeLfour />} />
              <Route path="2/sec-3/lvl-5" element={<LtwoSecthreeLfive />} />
              <Route path="2/sec-3/lvl-6" element={<LtwoSecthreeLsix />} />
              <Route path="2/sec-3/lvl-7" element={<LtwoSecthreeLseven />} />
              <Route path="2/sec-3/lvl-8" element={<LtwoSecthreeLeight />} />
              <Route path="2/sec-3/lvl-9" element={<LtwoSecthreeLnine />} />
              <Route path="2/sec-3/lvl-10" element={<LtwoSecthreeLten />} />
            </>
            {/* Section 4 */}
            <>
              <Route path="2/sec-4/lvl-1" element={<LtwoSecfourLone />} />
              <Route path="2/sec-4/lvl-2" element={<LtwoSecfourLtwo />} />
              <Route path="2/sec-4/lvl-3" element={<LtwoSecfourLthree />} />
              <Route path="2/sec-4/lvl-4" element={<LtwoSecfourLfour />} />
              <Route path="2/sec-4/lvl-5" element={<LtwoSecfourLfive />} />
              <Route path="2/sec-4/lvl-6" element={<LtwoSecfourLsix />} />
              <Route path="2/sec-4/lvl-7" element={<LtwoSecfourLseven />} />
              <Route path="2/sec-4/lvl-8" element={<LtwoSecfourLeight />} />
              <Route path="2/sec-4/lvl-9" element={<LtwoSecfourLnine />} />
              <Route path="2/sec-4/lvl-10" element={<LtwoSecfourLeleven />} />
              <Route path="2/sec-4/lvl-11" element={<LtwoSecfourLten />} />
              <Route path="2/sec-4/lvl-12" element={<LtwoSecfourLtwelve />} />
            </>
          </>
          {/* Lesson 3 */}
          <>
            {/* Section 1 */}
            <>
              <Route path="3/sec-1/lvl-1" element={<LthreeSeconeLone />} />
              <Route path="3/sec-1/lvl-2" element={<LthreeSeconeLtwo />} />
              <Route path="3/sec-1/lvl-3" element={<LthreeSeconeLthree />} />
              <Route path="3/sec-1/lvl-4" element={<LthreeSeconeLfour />} />
              <Route path="3/sec-1/lvl-5" element={<LthreeSeconeLfive />} />
              <Route path="3/sec-1/lvl-6" element={<LthreeSeconeLsix />} />
              <Route path="3/sec-1/lvl-7" element={<LthreeSeconeLseven />} />
              <Route path="3/sec-1/lvl-8" element={<LthreeSeconeLeight />} />
            </>
            {/* Section 2 */}
            <>
              <Route path="3/sec-2/lvl-1" element={<LthreeSectwoLone />} />
              <Route path="3/sec-2/lvl-2" element={<LthreeSectwoLtwo />} />
              <Route path="3/sec-2/lvl-3" element={<LthreeSectwoLthree />} />
              <Route path="3/sec-2/lvl-4" element={<LthreeSectwoLfour />} />
              <Route path="3/sec-2/lvl-5" element={<LthreeSectwoLfive />} />
            </>
            {/* Section 3 */}
            <>
              <Route path="3/sec-3/lvl-1" element={<LthreeSecthreeLone />} />
              <Route path="3/sec-3/lvl-2" element={<LthreeSecthreeLtwo />} />
              <Route path="3/sec-3/lvl-3" element={<LthreeSecthreeLthree />} />
              <Route path="3/sec-3/lvl-4" element={<LthreeSecthreeLfour />} />
              <Route path="3/sec-3/lvl-5" element={<LthreeSecthreeLfive />} />
            </>
            {/* Section 4 */}
            <>
              {" "}
              <Route path="3/sec-4/lvl-1" element={<LthreeSecfourLone />} />
              <Route path="3/sec-4/lvl-2" element={<LthreeSecfourLtwo />} />
              <Route path="3/sec-4/lvl-3" element={<LthreeSecfourLthree />} />
              <Route path="3/sec-4/lvl-4" element={<LthreeSecfourLfour />} />
              <Route path="3/sec-4/lvl-5" element={<LthreeSecfourLfive />} />
              <Route path="3/sec-4/lvl-6" element={<LthreeSecfourLsix />} />
              <Route path="3/sec-4/lvl-7" element={<LthreeSecfourLseven />} />
              <Route path="3/sec-4/lvl-8" element={<LthreeSecfourLeight />} />
              <Route path="3/sec-4/lvl-9" element={<LthreeSecfourLnine />} />
            </>
            {/* Section 5 */}
            <>
              <Route path="3/sec-5/lvl-1" element={<LthreeSecfiveLone />} />
              <Route path="3/sec-5/lvl-2" element={<LthreeSecfiveLtwo />} />
              <Route path="3/sec-5/lvl-3" element={<LthreeSecfiveLthree />} />
              <Route path="3/sec-5/lvl-4" element={<LthreeSecfiveLfour />} />
              <Route path="3/sec-5/lvl-5" element={<LthreeSecfiveLfive />} />
            </>
          </>
          {/* Lesson 4 */}
          <>
            {/* Section 1 */}
            <>
              <Route path="4/sec-1/lvl-1" element={<LfourSeconeLone />} />
            </>
          </>
          {/* Lesson 5 Quotes */}
          <>
            {/* Section 1 Inspirational Quotes */}
            <>
              <Route path="5/sec-1/lvl-1" element={<InspirationalQuotes />} />
              <Route path="5/sec-1/lvl-2" element={<InspirationalQuotes />} />
              <Route path="5/sec-1/lvl-3" element={<InspirationalQuotes />} />
              <Route path="5/sec-1/lvl-4" element={<InspirationalQuotes />} />
              <Route path="5/sec-1/lvl-5" element={<InspirationalQuotes />} />
              <Route path="5/sec-1/lvl-6" element={<InspirationalQuotes />} />
              <Route path="5/sec-1/lvl-7" element={<InspirationalQuotes />} />
              <Route path="5/sec-1/lvl-8" element={<InspirationalQuotes />} />
            </>
            {/* Section 2 Funny Quotes */}
            <>
              <Route path="5/sec-2/lvl-1" element={<FunnyQuotes />} />
              <Route path="5/sec-2/lvl-2" element={<FunnyQuotes />} />
              <Route path="5/sec-2/lvl-3" element={<FunnyQuotes />} />
              <Route path="5/sec-2/lvl-4" element={<FunnyQuotes />} />
              <Route path="5/sec-2/lvl-5" element={<FunnyQuotes />} />
              <Route path="5/sec-2/lvl-6" element={<FunnyQuotes />} />
              <Route path="5/sec-2/lvl-7" element={<FunnyQuotes />} />
              <Route path="5/sec-2/lvl-8" element={<FunnyQuotes />} />
            </>
            {/* Section 3 Leadership Quotes */}
            <>
              <Route path="5/sec-3/lvl-1" element={<LeadershipQuotes />} />
              <Route path="5/sec-3/lvl-2" element={<LeadershipQuotes />} />
              <Route path="5/sec-3/lvl-3" element={<LeadershipQuotes />} />
              <Route path="5/sec-3/lvl-4" element={<LeadershipQuotes />} />
              <Route path="5/sec-3/lvl-5" element={<LeadershipQuotes />} />
              <Route path="5/sec-3/lvl-6" element={<LeadershipQuotes />} />
              <Route path="5/sec-3/lvl-7" element={<LeadershipQuotes />} />
              <Route path="5/sec-3/lvl-8" element={<LeadershipQuotes />} />
            </>
            {/* Section 4 Video Game Quotes */}
            <>
              <Route path="5/sec-4/lvl-1" element={<VideoGameQuotes />} />
              <Route path="5/sec-4/lvl-2" element={<VideoGameQuotes />} />
              <Route path="5/sec-4/lvl-3" element={<VideoGameQuotes />} />
              <Route path="5/sec-4/lvl-4" element={<VideoGameQuotes />} />
              <Route path="5/sec-4/lvl-5" element={<VideoGameQuotes />} />
              <Route path="5/sec-4/lvl-6" element={<VideoGameQuotes />} />
              <Route path="5/sec-4/lvl-7" element={<VideoGameQuotes />} />
              <Route path="5/sec-4/lvl-8" element={<VideoGameQuotes />} />
            </>
            {/* Section 5 Movie Quotes */}
            <>
              <Route path="5/sec-5/lvl-1" element={<MovieQuotes />} />
              <Route path="5/sec-5/lvl-2" element={<MovieQuotes />} />
              <Route path="5/sec-5/lvl-3" element={<MovieQuotes />} />
              <Route path="5/sec-5/lvl-4" element={<MovieQuotes />} />
              <Route path="5/sec-5/lvl-5" element={<MovieQuotes />} />
              <Route path="5/sec-5/lvl-6" element={<MovieQuotes />} />
              <Route path="5/sec-5/lvl-7" element={<MovieQuotes />} />
              <Route path="5/sec-5/lvl-8" element={<MovieQuotes />} />
            </>
            {/* Section 6 Tv Show Quotes */}
            <>
              <Route path="5/sec-6/lvl-1" element={<TvShowQuotes />} />
              <Route path="5/sec-6/lvl-2" element={<TvShowQuotes />} />
              <Route path="5/sec-6/lvl-3" element={<TvShowQuotes />} />
              <Route path="5/sec-6/lvl-4" element={<TvShowQuotes />} />
              <Route path="5/sec-6/lvl-5" element={<TvShowQuotes />} />
              <Route path="5/sec-6/lvl-6" element={<TvShowQuotes />} />
              <Route path="5/sec-6/lvl-7" element={<TvShowQuotes />} />
              <Route path="5/sec-6/lvl-8" element={<TvShowQuotes />} />
            </>
            {/* Section 7 Anime Quotes */}
            <>
              <Route path="5/sec-7/lvl-1" element={<AnimeQuotes />} />
              <Route path="5/sec-7/lvl-2" element={<AnimeQuotes />} />
              <Route path="5/sec-7/lvl-3" element={<AnimeQuotes />} />
              <Route path="5/sec-7/lvl-4" element={<AnimeQuotes />} />
              <Route path="5/sec-7/lvl-5" element={<AnimeQuotes />} />
              <Route path="5/sec-7/lvl-6" element={<AnimeQuotes />} />
              <Route path="5/sec-7/lvl-7" element={<AnimeQuotes />} />
              <Route path="5/sec-7/lvl-8" element={<AnimeQuotes />} />
            </>
            {/* Section 8 Animated Show Quotes */}
            <>
              <Route path="5/sec-8/lvl-1" element={<AnimatedFilmQuotes />} />
              <Route path="5/sec-8/lvl-2" element={<AnimatedFilmQuotes />} />
              <Route path="5/sec-8/lvl-3" element={<AnimatedFilmQuotes />} />
              <Route path="5/sec-8/lvl-4" element={<AnimatedFilmQuotes />} />
              <Route path="5/sec-8/lvl-5" element={<AnimatedFilmQuotes />} />
              <Route path="5/sec-8/lvl-6" element={<AnimatedFilmQuotes />} />
              <Route path="5/sec-8/lvl-7" element={<AnimatedFilmQuotes />} />
              <Route path="5/sec-8/lvl-8" element={<AnimatedFilmQuotes />} />
            </>
            {/* Section 9 Motivational Quotes */}
            <>
              <Route path="5/sec-9/lvl-1" element={<MotivationalQuotes />} />
              <Route path="5/sec-9/lvl-2" element={<MotivationalQuotes />} />
              <Route path="5/sec-9/lvl-3" element={<MotivationalQuotes />} />
              <Route path="5/sec-9/lvl-4" element={<MotivationalQuotes />} />
              <Route path="5/sec-9/lvl-5" element={<MotivationalQuotes />} />
              <Route path="5/sec-9/lvl-6" element={<MotivationalQuotes />} />
              <Route path="5/sec-9/lvl-7" element={<MotivationalQuotes />} />
              <Route path="5/sec-9/lvl-8" element={<MotivationalQuotes />} />
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
          <Route path="achievements" element={<ProfileAchievements />} />
          <Route path="themes" element={<ProfileThemes />} />
          <Route path="account" element={<ProfileAccount />} />
        </Route>
      </Route>
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to={from} replace />}
      />
      <Route
        path="/register"
        element={
          !isAuthenticated ? <Register /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
