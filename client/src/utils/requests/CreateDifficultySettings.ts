import SettingsAPI from "../../api/settingsAPI";

interface PropType {
  id: number;
  name: string;
  settings: string[] | [];
  difficultyLevel: string;
  selected: boolean;
  isDefault: boolean;
  scoreBonus: number;
}

export default async function CreateDifficultySettings({
  id,
  name,
  settings,
  difficultyLevel,
  selected,
  isDefault,
  scoreBonus,
}: PropType) {
  //Quick test to see if request is called too many times
  // console.log("create difficulty settings runs");

  try {
    await SettingsAPI.post("/difficulty", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name,
        settings,
        difficultyLevel,
        selected,
        isDefault,
        userId: id,
        scoreBonus,
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.log(err));
  } catch (err) {
    let message: string;

    if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    console.error(message);
  }
}
