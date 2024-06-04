import useLoadAnimation from "../../hooks/useLoadAnimation";

//Used by Profile.tsx component
export default function ProfileAchievements() {
  const { fadeAnim } = useLoadAnimation();

  return (
    <div id="profile-img" className={`${fadeAnim}`}>
      Profile Achievements
    </div>
  );
}
