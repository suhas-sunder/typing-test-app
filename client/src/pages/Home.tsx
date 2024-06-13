//Home
import { useLayoutEffect, useMemo } from "react";
import loadable from "@loadable/component";
import useAuth from "../components/hooks/useAuth";
import HomePgLinks from "../data/HomePgLinks";
import useLoadAnimation from "../components/hooks/useLoadAnimation";

const SpeedTest = loadable(
  () => import("../components/layout/homepg/SpeedTest"),
);
const HeaderDashboard = loadable(
  () => import("../components/layout/homepg/HeaderDashboard"),
);
const CallToActionBanner = loadable(
  () => import("../components/layout/shared/CallToActionBanner"),
);
const LandingPage = loadable(
  () => import("../components/layout/homepg/LandingPage"),
);
const ImgLinks = loadable(() => import("../components/ui/navigation/ImgLinks"));
const SparkleAnim = loadable(
  () => import("../components/ui/shared/SparkleAnim"),
);

function Home() {
  const { isAuthenticated } = useAuth();

  const pageData = useMemo(() => HomePgLinks(), []);

  const { fadeAnim } = useLoadAnimation();

  useLayoutEffect(() => {
    LandingPage.load();
    ImgLinks.load();
    SpeedTest.load();

    if (isAuthenticated) {
      SparkleAnim.load();
      HeaderDashboard.load();
    } else {
      CallToActionBanner.load();
    }
  }, [isAuthenticated]);

  return (
    <>
      <header
        className={`${
          isAuthenticated ? "pb-64 pt-2" : "pb-56 lg:pb-[11em] lg:pt-5"
        } relative flex w-full flex-col items-center justify-center bg-defaultblue px-4  text-white brightness-105`}
      >
        <div
          className={`${fadeAnim} flex w-full max-w-[1060px] pt-6 font-lora capitalize text-sky-200 md:min-h-[23em]`}
        >
          {isAuthenticated ? (
            <HeaderDashboard />
          ) : (
            <section className="hidden min-h-[20em] w-full scale-[0.85] flex-col items-center gap-[3.6em] py-24 sm:py-16 md:flex lg:py-0">
              <CallToActionBanner />
            </section>
          )}
        </div>
      </header>
      <main className="flex w-full flex-col items-center">
        <div
          id="main-menu"
          className="relative z-50 -mt-[13.5em] mb-12 flex min-h-[35.6em] w-full max-w-4xl flex-col items-center justify-center bg-white shadow-md sm:mb-0 sm:min-h-[29em] md:rounded-3xl"
        >
          <SpeedTest />
        </div>

        {isAuthenticated ? (
          <>
            <section className="mb-44 mt-24 flex">
              <ImgLinks linkData={pageData} customStyle="lg:grid-cols-4" />
            </section>
          </>
        ) : (
          <div className="mt-4 flex w-full flex-col items-center justify-center gap-32  text-base leading-7 tracking-wider text-sky-700 sm:mt-20 ">
            <LandingPage />
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
