//Home
import { useMemo } from "react";
import useAuth from "../components/hooks/useAuth";
import HomePgLinks from "../data/HomePgLinks";
import useLoadAnimation from "../components/hooks/useLoadAnimation";
import HeaderDashboard from "../components/layout/homepg/HeaderDashboard";
import ImgLinks from "../components/ui/navigation/ImgLinks";
import StartMenu from "../components/forms/homepg/StartMenu";
import LandingPage from "../components/layout/homepg/LandingPage";

function Home() {
  const { isAuthenticated } = useAuth();

  const pageData = useMemo(() => HomePgLinks(), []);

  const { fadeAnim } = useLoadAnimation();

  return (
    <>
      <header
        className={`${
          isAuthenticated ? "pb-64 pt-2" : "pb-56 lg:pb-[11em] lg:pt-5"
        } relative flex w-full flex-col items-center justify-center bg-defaultblue px-4  text-white brightness-105`}
      >
        <div
          className={`${
            !isAuthenticated ? "pb-24 md:min-h-[28em]" : "md:min-h-[23em]"
          } ${fadeAnim} flex w-full max-w-[1060px] pt-6 font-lora capitalize text-sky-200 `}
        >
          <HeaderDashboard />
        </div>
      </header>
      <main data-testid="home-pg" className="flex w-full flex-col items-center">
        <div
          id="main-menu"
          className="relative z-50 -mt-[13.5em] mb-12 flex min-h-[35.6em] w-full max-w-4xl flex-col items-center justify-center bg-white shadow-md sm:mb-0 sm:min-h-[29em] md:rounded-3xl"
        >
          <StartMenu />
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
