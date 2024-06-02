
import SettingsAPI from "../api/settingsAPI";

interface PropType {
  id: number;
  name: string;
}

export default async function DeleteDifficultySettings({ id, name }: PropType) {
  try {
    await SettingsAPI.delete("/difficulty", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name,
        userId: id,
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
