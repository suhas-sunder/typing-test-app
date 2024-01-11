import AllProfileImages from "./AllProfileImages";

export default function ProfileImages() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-8 text-2xl">
        <h2>All Images</h2>
        <AllProfileImages />
      </div>

      <h2 className="mt-5 flex px-20 leading-10">
        Hello there! This website is still in the early stages of development so
        all images are currently unlocked and can be saved as a profile pic.
        Eventually, when this section is complete, profile images will be
        unlocked by leveling up. Until then, have fun using your favourite
        images!
      </h2>
    </div>
  );
}
