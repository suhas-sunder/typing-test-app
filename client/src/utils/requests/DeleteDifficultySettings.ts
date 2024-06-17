import SettingsAPI from "../../api/settingsAPI";

interface PropType {
  id: string;
  name: string;
}

export default async function DeleteDifficultySettings({ id, name }: PropType) {
  try {
    const response = await SettingsAPI.delete("/difficulty", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name,
        userId: id,
      },
    });

    const parseRes = await response;

    if (parseRes) {
      return parseRes.data;
    } else {
      console.log("Error deleting difficulty settings");
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
