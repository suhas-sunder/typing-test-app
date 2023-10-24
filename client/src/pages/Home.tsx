import HeaderDashboard from "../components/layout/HeaderDashboard";
import MainMenu from "../components/layout/MainMenu";

function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Don't display header on mobile. Move textbox to the top of the screen. */}
      <HeaderDashboard />
      <MainMenu />
      <div className="flex w-full max-w-7xl justify-evenly items-center"></div>
    </div>
  );
}

export default Home;
