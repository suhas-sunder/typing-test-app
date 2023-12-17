import AccountAPI from "../api/accountAPI";

interface PropType {
  userId: string;
}

export default async function GetTotalScore({ userId }: PropType) {

  console.log("runs", userId)
  try {
    const response = await AccountAPI.get("/totalscore", {
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

    if (parseRes) {
      return parseRes.totalscore;
    } else {
      console.log("Error fetching total score for nav from db");
    }
  } catch (err) {
    let message: string;

    if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    console.error(message);
  }

  return 0;
}
