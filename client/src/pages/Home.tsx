import TypingInterface from "../components/layout/TextBox";
import HeaderDashboard from "../components/layout/HeaderDashboard";
import Leaderboard from "./Leaderboard";
import AchievementSummary from "../components/layout/AchievementSummary";
import Button from "../components/ui/Button";

function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Don't display header on mobile. Move textbox to the top of the screen. */}
      <HeaderDashboard />
      <TypingInterface />
      <div className="flex w-full max-w-7xl justify-evenly items-center">
        {/* Buttons for Train your skills and Games. Also use grid instead of flex to align items.*/}
        <div>
          <Button />
          <Button />
        </div>

        <AchievementSummary />
        <Leaderboard />
      </div>
    </div>
  );
}

export default Home;
