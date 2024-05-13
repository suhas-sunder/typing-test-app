import AccountAPI from "../api/accountAPI";
interface PropType {
  userId: string;
  startDate: string;
  endDate: string;
}

export default async function GetHeaderStats({ userId, startDate, endDate }: PropType) {
  let statsData = {}

  try {
    const response = await AccountAPI.get("/weekly-stats", {
      method: "GET",
      params: {
        userId,
        startDate,
        endDate
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
      statsData = parseRes;
      return parseRes;
    } else {
      console.log("Error fetching header stats");
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


  return statsData
}
