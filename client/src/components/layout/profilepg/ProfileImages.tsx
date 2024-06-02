import ProfileImageData from "../../../data/ProfileImageData";
import { ImageContext } from "../../../providers/ImageProvider";
import SaveImages from "../../../utils/requests/SaveImages";
import useAuth from "../../hooks/useAuth";
import styles from "./styles/ProfileImages.module.css";
import { useCallback, useContext, useState } from "react";

function AllProfileImages() {
  const [itemsPerPage] = useState<number>(18); //use this to add/manage pagination
  const { userId } = useAuth();
  const allImages = useCallback(() => ProfileImageData(), []); //Object of images to be fetched

  const { imageData, setImageData } = useContext(ImageContext);

  const handleProfilePic = async (pathname: string) => {
    // Store image pathname to db
    const imgSaveData = { profilePathname: pathname, userId };
    const result = await SaveImages({ imgSaveData });

    // update image pathname in context
    if (result) {
      setImageData({ ...imageData, profile_pathname: pathname });
    }
  };

  // Mark profile image as checked when profile image is changed/selected by user
  const handleCheckbox = (slug: string): boolean => {
    if (
      imageData.profile_pathname &&
      slug === imageData.profile_pathname.split("%2F")[2]
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      id="profile-img"
      className="grid grid-cols-2 gap-14 px-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-16"
    >
      {allImages().map((folders) => {
        let count = 0;
        return folders.folderData.map((data, dataIndex) => {
          return data.imgSlugs.map((slug, index) => {
            count++;
            if (count <= itemsPerPage) {
              return (
                <button
                  key={slug + index + dataIndex}
                  className={`${styles["unlockable-img-card"]} flex flex-col items-center justify-center gap-3 text-sm`}
                  onClick={() =>
                    handleProfilePic(
                      `/${folders.folderName}%2F${data.subFolder}%2F${slug}`,
                    )
                  }
                >
                  <h3 className="capitalize">{slug.split("-").join(" ")}</h3>
                  <picture className="flex h-[210px] w-[160px]">
                    <source
                      srcSet={`https://www.honeycombartist.com/${folders.folderName}%2F${data.subFolder}%2F${slug}.webp`}
                      type="image/webp"
                    ></source>
                    <img
                      src={`https://www.honeycombartist.com/${folders.folderName}%2F${data.subFolder}%2F${slug}.png`}
                      alt="Profile card featuring an animal or object or colourful scenery that either matches the level unlocked by user or has been selected by user as profile"
                      className={`${styles["unlockable-img"]} relative flex w-full rounded-lg border-slate-800 drop-shadow-lg`}
                      width={190}
                      height={245}
                      loading="lazy"
                    />
                  </picture>
                  <input
                    type="checkbox"
                    name="all-imgs"
                    className="mt-2"
                    checked={handleCheckbox(slug)}
                    readOnly
                  />
                </button>
              );
            }
          });
        });
      })}
    </div>
  );
}

//Used by Profile.tsx component
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
