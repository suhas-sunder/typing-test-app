import ImageAPI from "../api/imageAPI";

interface PropType {
  userId: string;
}

export default async function GetSavedImages({ userId }: PropType) {
  try {
    const response = await ImageAPI.get("/defaults", {
      method: "GET",
      params: {
        userId,
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });

    const parseRes = await response;

    if (parseRes || parseRes.length === 0) {
      return parseRes;
    } else {
      console.log("Error fetching saved data for image defaults");
    }
  } catch (e) {
    console.log(e);
  }

  return {};
}
