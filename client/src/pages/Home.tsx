import HeaderDashboard from "../components/layout/HeaderDashboard";
import TypingLogic from "../components/layout/MainMenu";
const text =
  "It seemed like it should have been so simple. There was nothing inherently difficult with getting the project done. It was simple and straightforward enough that even a child should have been able to complete it on time, but that wasn't the case. The deadline had arrived and the project remained unfinished.                                                                                                                                                                                                                                                                                                                                                                        ";

function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Don't display header on mobile. Move textbox to the top of the screen. */}
      <HeaderDashboard />
      {/* <MainMenu /> */}
      <TypingLogic dummyText={text} />
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
