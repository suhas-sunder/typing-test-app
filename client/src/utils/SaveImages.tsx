import ImageAPI from "../api/imageAPI";
interface PropType {
  imgData: { [key: string]: string };
}
export default async function SaveImages({ imgData }: PropType) {
  if (imgData.profilePathname) {
    const profilePathname = imgData.profilePathname;
    const userId = imgData.userId;

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

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  if (imgData.gameOverPathname) {
    console.log(imgData.GameOverPathname);
  }

  return imgData;
}
