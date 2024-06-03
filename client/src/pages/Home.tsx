import { useLayoutEffect, useMemo } from "react";
import styles from "../styles/global.module.css";
import loadable from "@loadable/component";
import useAuth from "../components/hooks/useAuth";
import HomePgLinks from "../data/HomePgLinks";

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
          isAuthenticated && styles["home-pg"]
        }  relative flex w-full flex-col items-center justify-center bg-defaultblue px-4 pb-64 pt-2 text-white brightness-105`}
      >
        <div
          className={`${styles["header-dashboard"]} flex w-full max-w-[1060px] pt-6 font-lora capitalize text-sky-200 md:min-h-[23em]`}
        >
          {isAuthenticated ? (
            <HeaderDashboard />
          ) : (
            <div className="hidden w-full translate-y-2 md:flex">
              <CallToActionBanner />
            </div>
          )}
        </div>
      </header>
      <main className="flex w-full flex-col items-center">
        <div
          id="main-menu"
          className="relative z-50 -mt-[13.5em] mb-6 flex min-h-[35.6em] w-full max-w-4xl flex-col items-center justify-center bg-white shadow-md sm:min-h-[29em] md:rounded-3xl"
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
          <div className="flex min-h-[249em] w-full flex-col items-center justify-center gap-24 text-base leading-7 tracking-wider text-sky-700 md:min-h-[231em]">
            <LandingPage />
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
