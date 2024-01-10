import { v4 as uuidv4 } from "uuid";

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
          imgSlugs: ["bear-cub"],
          subFolder: "bear-cub",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["bear-cub"],
          subFolder: "bear-cub",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["bear-cub"],
          subFolder: "bear-cub",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
        {
          imgSlugs: ["bear-cub"],
          subFolder: "bear-cub",
          keywords: ["animal", "baby", "mammal", "cute", "furry"],
        },
      ],
    },
  ];

  return (
    <div id="profile-img" className="grid grid-cols-6 gap-16">
      {allImages.map((folders) =>
        folders.folderData.map((data) =>
          data.imgSlugs.map((slug) => (
            <div className="flex flex-col items-center justify-center gap-3 text-sm">
              <h3 className="capitalize">{slug.split("-").join(" ")}</h3>
              <picture key={uuidv4()} className="flex max-w-[90px]">
                <source
                  srcSet={`https://www.freetypingcamp.com/${folders.folderName}/${data.subFolder}/${slug}.webp`}
                  type="image/webp"
                ></source>
                <img
                  src={`https://www.freetypingcamp.com/${folders.folderName}/${data.subFolder}/${slug}.png`}
                  alt="Profile card featuring an animal or object or colourful scenery that either matches the level unlocked by user or has been selected by user as profile"
                  className={`relative flex w-full rounded-lg border-slate-800 drop-shadow-lg`}
                  width={380}
                  height={489}
                  loading="lazy"
                />
              </picture>
              <button className="mt-1 rounded-md border-2 px-6 py-2">
                Unlock
              </button>
            </div>
          )),
        ),
      )}
    </div>
  );
}

export default AllProfileImages;
