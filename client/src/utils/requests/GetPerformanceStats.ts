import AccountAPI from "../../api/accountAPI";
interface PropType {
  userId: string;
  testName: string;
}
export default async function GetPerformanceStats({
  userId,
  testName,
}: PropType) {
  let statsData = {};

  try {
    const response = await AccountAPI.get("/performance-stats", {
      method: "GET",
      params: {
        userId,
        testName,
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
      return statsData;
    } else {
      console.log("Error fetching performance stats");
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

  return statsData;
}
