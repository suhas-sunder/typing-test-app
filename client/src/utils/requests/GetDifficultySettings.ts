import SettingsAPI from "../../api/settingsAPI";
import { DifficultyType } from "../../providers/MenuProvider";

interface PropType {
  id: string;
  difficultySettings: DifficultyType;
  setDifficultySettings: (value: DifficultyType) => void;
}

//Get difficulty settings for menu provider
export default async function GetDifficultySettings({
  id,
  difficultySettings,
  setDifficultySettings,
}: PropType) {
  //Quick test to see if request is called too many times
  // console.log("get difficulty settings runs");

  try {
    const response = await SettingsAPI.get("/difficulty", {
      method: "GET",
      params: {
        userId: id,
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

      console.log(difficultySettings);

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
