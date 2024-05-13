import ImageAPI from "../api/imageAPI";
interface PropType {
  imgSaveData: { [key: string]: string };
}
export default async function SaveImages({ imgSaveData }: PropType) {
  if (imgSaveData.profilePathname) {
    const profilePathname = imgSaveData.profilePathname;
    const userId = imgSaveData.userId;

    try {
      const response = await ImageAPI.post("/default-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          profilePathname,
          userId,
        },
      });

      if (response.status === 200) {
        return response;
      } else {
        console.log("Failed to save image data.");
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (imgSaveData.gameOverPathname) {
    console.log(imgSaveData.GameOverPathname);
  }

  return "";
}
