import HeaderDashboard from "../components/layout/HeaderDashboard";
import TypingLogic from "../components/layout/MainMenu";

function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Don't display header on mobile. Move textbox to the top of the screen. */}
      <h1>Did this header update?</h1>
      <HeaderDashboard />
      {/* <MainMenu /> */}
      <TypingLogic />
      <div className="flex w-full max-w-7xl justify-evenly items-center">
        {/* Buttons for Train your skills and Games. Also use grid instead of flex to align items.*/}
        {/* <div>
          <Button />
          <Button />
        </div> */}

        {/* <AchievementSummary /> */}
        {/* <Leaderboard /> */}
      </div>
    </div>
  );
}

export default Home;
