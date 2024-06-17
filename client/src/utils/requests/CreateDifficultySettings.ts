import SettingsAPI from "../../api/settingsAPI";

interface PropType {
  id: string;
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
  try {
    // Call SettingsAPI.post and store the response
    const response = await SettingsAPI.post("/difficulty", {
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
    });

    const parseRes = await response;

    if (parseRes) {
      return parseRes.data;
    } else {
      console.log("Error fetching difficulty settings");
    }
  } catch (err) {
    let message: string;

    if (err instanceof Error) {
      message = err.message;
    } else {
      message = String(err);
    }

    console.error(message);

    return null;
  }
}
