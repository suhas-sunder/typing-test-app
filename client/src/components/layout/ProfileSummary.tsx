import { AuthContext } from "../../providers/AuthProvider";
import ProfileImg from "../../images/wolf_icon.jpg";
import { useContext } from "react";

function ProfileSummary() {
  const { userName } = useContext(AuthContext);

  return (
    <>
      <header className="flex flex-col items-center gap-6">
        <img
          src={ProfileImg}
          alt="Colourful wolf standing on a mountain top."
          className={`relative flex h-44 w-44 rounded-full border-8 border-defaultblue object-cover`}
        />
        <h2 className="text-3xl">
          Welcome <span className="text-defaultblue">{userName}</span>!
        </h2>
      </header>
      <main>Shortcuts</main>
    </>
  );
}

export default ProfileSummary;
