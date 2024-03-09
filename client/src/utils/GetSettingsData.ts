

import SettingsAPI from "../api/settingsAPI";
import { DifficultyType } from "../providers/MenuProvider";

interface PropType {
  id: number;
  difficultySettings: DifficultyType;
  setDifficultySettings: (value: DifficultyType) => void;
}

//Get difficulty settings for menu provider
export default async function GetSettingsData({ id, difficultySettings, setDifficultySettings }: PropType) {
  try {
    const userId = id.toString();

    const response = await SettingsAPI.get("/difficulty", {
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
      const tempObj = {};

      parseRes.forEach(
        (value: {
          name: string;
          settings: string[];
          selected: boolean;
          isdefault: boolean;
          scorebonus: number;
          difficulty_level: string;
        }) => {
          tempObj[`${value.name}`] = {
            settings: value.settings,
            difficultyLevel: value.difficulty_level,
            selected: value.selected,
            default: value.isdefault,
            scoreBonus: value.scorebonus,
          };
        },
      );

      setDifficultySettings({
        ...difficultySettings,
        ...tempObj,
      });
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
}
