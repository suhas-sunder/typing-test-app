import { AuthContext } from "../../providers/AuthProvider";
import SaveImages from "../../utils/SaveImages";
import styles from "./styles/AllProfileImages.module.css";
import { useContext, useState } from "react";

function AllProfileImages() {
  const allImages = [
    {
      folderName: "origami-style",
      folderData: [
        {
          imgSlugs: ["kitten"],
          subFolder: "kitten",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["bear-cub"],
          subFolder: "bear-cub",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["cat"],
          subFolder: "cat",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["cow"],
          subFolder: "cow",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["crow"],
          subFolder: "crow",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["diplodocus"],
          subFolder: "diplodocus",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["donkey"],
          subFolder: "donkey",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["elephant"],
          subFolder: "elephant",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["horse"],
          subFolder: "horse",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["lion-cub"],
          subFolder: "lion-cub",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["panther-cub"],
          subFolder: "panther-cub",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["pigeon"],
          subFolder: "pigeon",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["t-rex"],
          subFolder: "t-rex",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["tiger-cub"],
          subFolder: "tiger-cub",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["tiger"],
          subFolder: "tiger",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["unicorn"],
          subFolder: "unicorn",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["velociraptor"],
          subFolder: "velociraptor",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["tiger-cub"],
          subFolder: "tiger-cub",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["tiger"],
          subFolder: "tiger",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["unicorn"],
          subFolder: "unicorn",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["velociraptor"],
          subFolder: "velociraptor",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
      ],
    },
  ];
  const [profilePic, setProfilePic] = useState<string>("kitten");
  const [itemsPerPage] = useState<number>(18); //use this to add/manage pagination
  const { userId } = useContext(AuthContext);

  const handleProfilePic = (pathname: string) => {
    setProfilePic(pathname);
    const imgData = { profilePathname: pathname, userId };
    SaveImages({ imgData });
  };

  return (
    <div id="profile-img" className={` grid grid-cols-6 gap-16`}>
      {allImages.map((folders) => {
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
                      `/${folders.folderName}/${data.subFolder}/${slug}`,
                    )
                  }
                >
                  <h3 className="capitalize">{slug.split("-").join(" ")}</h3>
                  <picture className={`flex max-w-[90px]`}>
                    <source
                      srcSet={`https://www.freetypingcamp.com/${folders.folderName}/${data.subFolder}/${slug}.webp`}
                      type="image/webp"
                    ></source>
                    <img
                      src={`https://www.freetypingcamp.com/${folders.folderName}/${data.subFolder}/${slug}.png`}
                      alt="Profile card featuring an animal or object or colourful scenery that either matches the level unlocked by user or has been selected by user as profile"
                      className={`${styles["unlockable-img"]} relative flex w-full rounded-lg border-slate-800 drop-shadow-lg`}
                      width={380}
                      height={489}
                      loading="lazy"
                    />
                  </picture>
                  <input
                    type="checkbox"
                    name="all-imgs"
                    className="mt-2"
                    checked={slug === profilePic}
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

export default AllProfileImages;
