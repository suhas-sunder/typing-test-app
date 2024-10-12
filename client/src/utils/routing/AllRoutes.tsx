import { Navigate, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import LessonsMenu from "../../components/ui/lessonspg/LessonsMenu";

const LessonsArticleSection = loadable(
  () => import("../../components/layout/lessonpg/LessonsArticleSection"),
);
const LessonSixEnglishWords = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/EnglishWords/LessonSixEnglishWords"
    ),
);

const TypingTest = loadable(
  () => import("../../components/layout/homepg/TypingTest"),
);

const ForgotPassword = loadable(() => import("../../pages/ForgotPassword"));

const VerifyEmail = loadable(() => import("../../pages/VerifyEmail"));

const LtwoSecfourLone = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLone"),
);
const LtwoSecfourLtwo = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLtwo"),
);
const LtwoSecfourLthree = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLthree"
    ),
);
const LtwoSecfourLfour = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLfour"
    ),
);
const LtwoSecfourLfive = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLfive"
    ),
);
const LtwoSecfourLsix = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLsix"),
);
const LtwoSecfourLseven = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLseven"
    ),
);
const LtwoSecfourLeight = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLeight"
    ),
);
const LtwoSecfourLnine = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLnine"
    ),
);
const LtwoSecfourLtwelve = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLtwelve"
    ),
);
const LtwoSecfourLten = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLten"),
);
const LtwoSecfourLeleven = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecFour/LtwoSecfourLeleven"
    ),
);

const LthreeSecfourLone = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLone"
    ),
);
const LthreeSecfourLtwo = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLtwo"
    ),
);
const LthreeSecfourLthree = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLthree"
    ),
);
const LthreeSecfourLfour = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLfour"
    ),
);
const LthreeSecfourLfive = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLfive"
    ),
);
const LthreeSecfourLsix = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLsix"
    ),
);
const LthreeSecfourLseven = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLseven"
    ),
);
const LthreeSecfourLeight = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLeight"
    ),
);
const LthreeSecfourLnine = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecFour/LthreeSecfourLnine"
    ),
);

const LthreeSecfiveLone = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecFive/LthreeSecfiveLone"
    ),
);
const LthreeSecfiveLtwo = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecFive/LthreeSecfiveLtwo"
    ),
);
const LthreeSecfiveLthree = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecFive/LthreeSecfiveLthree"
    ),
);
const LthreeSecfiveLfour = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecFive/LthreeSecfiveLfour"
    ),
);
const LthreeSecfiveLfive = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecFive/LthreeSecfiveLfive"
    ),
);

const LfourSeconeLone = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonFourSecOne/LfourSeconeLone"),
);

const InspirationalQuotes = loadable(
  () => import("../../components/layout/lessonpg/Quotes/InspirationalQuotes"),
);
const FunnyQuotes = loadable(
  () => import("../../components/layout/lessonpg/Quotes/FunnyQuotes"),
);
const LeadershipQuotes = loadable(
  () => import("../../components/layout/lessonpg/Quotes/LeadershipQuotes"),
);
const VideoGameQuotes = loadable(
  () => import("../../components/layout/lessonpg/Quotes/VideoGameQuotes"),
);
const MovieQuotes = loadable(
  () => import("../../components/layout/lessonpg/Quotes/MovieQuotes"),
);
const TvShowQuotes = loadable(
  () => import("../../components/layout/lessonpg/Quotes/TvShowQuotes"),
);
const AnimeQuotes = loadable(
  () => import("../../components/layout/lessonpg/Quotes/AnimeQuotes"),
);
const AnimatedFilmQuotes = loadable(
  () => import("../../components/layout/lessonpg/Quotes/AnimatedFilmQuotes"),
);
const MotivationalQuotes = loadable(
  () => import("../../components/layout/lessonpg/Quotes/MotivationalQuotes"),
);

const LtwoSeconeLone = loadable(
  () => import("../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLone"),
);
const LtwoSeconeLtwo = loadable(
  () => import("../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLtwo"),
);
const LtwoSeconeLthree = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLthree"),
);
const LtwoSeconeLfour = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLfour"),
);
const LtwoSeconeLfive = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLfive"),
);
const LtwoSeconeLsix = loadable(
  () => import("../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLsix"),
);
const LtwoSeconeLseven = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLseven"),
);
const LtwoSeconeLeight = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLeight"),
);
const LtwoSeconeLnine = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecOne/LtwoSoneLnine"),
);
const LtwoSectwoLone = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLone"),
);
const LtwoSectwoLtwo = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLtwo"),
);
const LtwoSectwoLthree = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLthree"),
);
const LtwoSectwoLfour = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLfour"),
);
const LtwoSectwoLfive = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLfive"),
);
const LtwoSectwoLsix = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLsix"),
);
const LtwoSectwoLseven = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLseven"),
);
const LtwoSectwoLeight = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLeight"),
);
const LtwoSectwoLnine = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonTwoSecTwo/LtwoSectwoLnine"),
);
const LtwoSecthreeLone = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLone"
    ),
);
const LtwoSecthreeLtwo = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLtwo"
    ),
);
const LtwoSecthreeLthree = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLthree"
    ),
);
const LtwoSecthreeLfour = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLfour"
    ),
);
const LtwoSecthreeLfive = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLfive"
    ),
);
const LtwoSecthreeLsix = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLsix"
    ),
);
const LtwoSecthreeLseven = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLseven"
    ),
);
const LtwoSecthreeLeight = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLeight"
    ),
);
const LtwoSecthreeLnine = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeLnine"
    ),
);
const LtwoSecthreeLten = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonTwoSecThree/LtwoSecthreeten"
    ),
);
const LthreeSeconeLone = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLone"
    ),
);
const LthreeSeconeLtwo = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLtwo"
    ),
);
const LthreeSeconeLthree = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLthree"
    ),
);
const LthreeSeconeLfour = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLfour"
    ),
);
const LthreeSeconeLfive = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLfive"
    ),
);
const LthreeSeconeLsix = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLsix"
    ),
);
const LthreeSeconeLseven = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLseven"
    ),
);
const LthreeSeconeLeight = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecOne/LthreeSeconeLeight"
    ),
);
const LthreeSectwoLone = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecTwo/LthreeSectwoLone"
    ),
);

const LthreeSectwoLtwo = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecTwo/LthreeSectwoLtwo"
    ),
);
const LthreeSectwoLthree = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecTwo/LthreeSectwoLthree"
    ),
);
const LthreeSectwoLfour = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecTwo/LthreeSectwoLfour"
    ),
);
const LthreeSectwoLfive = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecTwo/LthreeSectwoLfive"
    ),
);
const LthreeSecthreeLone = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecThree/LthreeSecthreeLone"
    ),
);
const LthreeSecthreeLtwo = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecThree/LthreeSecthreeLtwo"
    ),
);
const LthreeSecthreeLthree = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecThree/LthreeSecthreeLthree"
    ),
);
const LthreeSecthreeLfour = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecThree/LthreeSecthreeLfour"
    ),
);
const LthreeSecthreeLfive = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonThreeSecThree/LthreeSecthreeLfive"
    ),
);

const LoneSoneLone = loadable(
  () => import("../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLone"),
);
const LoneSoneLtwo = loadable(
  () => import("../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLtwo"),
);
const LoneSoneLthree = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLthree"),
);
const LoneSoneLfour = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLfour"),
);
const LoneSoneLfive = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLfive"),
);

const LoneSoneLsix = loadable(
  () => import("../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLsix"),
);

const LoneSoneLseven = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLseven"),
);
const LoneSoneLeight = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLeight"),
);
const LoneSoneLnine = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLnine"),
);
const LoneSoneLten = loadable(
  () => import("../../components/layout/lessonpg/LessonOneSecOne/LoneSoneLten"),
);
const LoneStwoLone = loadable(
  () => import("../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLone"),
);
const LoneStwoLtwo = loadable(
  () => import("../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLtwo"),
);
const LoneStwoLthree = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLthree"),
);
const LoneStwoLfour = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLfour"),
);
const LoneStwoLfive = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLfive"),
);
const LoneStwoLsix = loadable(
  () => import("../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLsix"),
);
const LoneStwoLseven = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLseven"),
);

const LoneStwoLeight = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLeight"),
);
const LoneStwoLnine = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecTwo/LoneStwoLnine"),
);
const LoneSthreeLone = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLone"),
);
const LoneSthreeLtwo = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLtwo"),
);
const LoneSthreeLthree = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLthree"
    ),
);
const LoneSthreeLfour = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLfour"
    ),
);
const LoneSthreeLfive = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLfive"
    ),
);
const LoneSthreeLsix = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLsix"),
);
const LoneSthreeLseven = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLseven"
    ),
);
const LoneSthreeLeight = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLeight"
    ),
);
const LoneSthreeLnine = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecThree/LoneSthreeLnine"
    ),
);
const LoneSecfourLone = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLone"),
);
const LoneSecfourLtwo = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLtwo"),
);
const LoneSecfourLthree = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLthree"
    ),
);
const LoneSecfourLfour = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLfour"
    ),
);
const LoneSecfourLfive = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLfive"
    ),
);
const LoneSecfourLsix = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLsix"),
);
const LoneSecfourLseven = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLseven"
    ),
);
const LoneSecfourLeight = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLeight"
    ),
);
const LoneSecfourLnine = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecFour/LoneSecfourLnine"
    ),
);
const LoneSecfiveLone = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLone"),
);
const LoneSecfiveLtwo = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLtwo"),
);
const LoneSecfiveLthree = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLthree"
    ),
);
const LoneSecfiveLfour = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLfour"
    ),
);
const LoneSecfiveLfive = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLfive"
    ),
);
const LoneSecfiveLsix = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLsix"),
);
const LoneSecfiveLseven = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLseven"
    ),
);

const LoneSecfiveLeight = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLeight"
    ),
);
const LoneSecfiveLnine = loadable(
  () =>
    import(
      "../../components/layout/lessonpg/LessonOneSecFive/LoneSecfiveLnine"
    ),
);
const LoneSecsixLone = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLone"),
);
const LoneSecsixLtwo = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLtwo"),
);
const LoneSecsixLthree = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLthree"),
);
const LoneSecsixLfour = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLfour"),
);
const LoneSecsixLfive = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLfive"),
);
const LoneSecsixLsix = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLsix"),
);
const LoneSecsixLseven = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLseven"),
);
const LoneSecsixLeight = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLeight"),
);
const LoneSecsixLnine = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLnine"),
);
const LoneSecsixLten = loadable(
  () =>
    import("../../components/layout/lessonpg/LessonOneSecSix/LoneSecsixLten"),
);
const Lesson = loadable(() => import("../../pages/Lesson"));

const CalculatorGame = loadable(() => import("../../pages/CalculatorGame"));

const ProfileStats = loadable(
  () => import("../../components/layout/profilepg/ProfileStats"),
);
const ProfileImages = loadable(
  () => import("../../components/layout/profilepg/ProfileImages"),
);
const ProfileAchievements = loadable(
  () => import("../../components/layout/profilepg/ProfileAchievements"),
);
const ProfileThemes = loadable(
  () => import("../../components/layout/profilepg/ProfileThemes"),
);
const ProfileAccount = loadable(
  () => import("../../components/layout/profilepg/ProfileAccount"),
);

const ProtectedRoutes = loadable(
  () => import("../../utils/routing/ProtectedRoutes"),
);
const Home = loadable(() => import("../../pages/Home"));
const Lessons = loadable(() => import("../../pages/Lessons"));
const Register = loadable(() => import("../../pages/Register"));
const PageNotFound = loadable(() => import("../../pages/PageNotFound"));
const ProfileSummary = loadable(
  () => import("../../components/layout/profilepg/ProfileSummary"),
);
const Profile = loadable(() => import("../../pages/Profile"));
const Sitemap = loadable(() => import("../../pages/Sitemap"));
const TermsOfService = loadable(() => import("../../pages/TermsOfService"));
const CookiesPolicy = loadable(() => import("../../pages/CookiesPolicy"));
const PrivacyPolicy = loadable(() => import("../../pages/PrivacyPolicy"));
const Learn = loadable(() => import("../../pages/Learn"));
const Login = loadable(() => import("../../pages/Login"));
const Games = loadable(() => import("../../pages/Games"));

//I have too many routes for dnd it's cluttering App.tsx so I'm loading it here.
export default function AllRoutes({ isAuthenticated, from, handleAuth }) {
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
          !isAuthenticated ? (
            <Register setAuth={handleAuth} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
