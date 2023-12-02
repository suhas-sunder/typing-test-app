import calculateBonusScore from "./CalculateBonusScore";

interface PropType {
  difficultyPoints: { [key: string]: { [key: string]: string } };
  difficultySettings: {
    [key: string]: { [key: string]: string[] | boolean };
  };
  targetDifficulty: string;
}

function CalculateDifficulty({
  difficultyPoints,
  difficultySettings,
  targetDifficulty,
}: PropType) {
  let difficultyScore = 0;
  let difficultyText = "";
  let iconTwoColour = "hidden";
  let iconColour = "text-red-900";

  const settings: string[] = difficultySettings[targetDifficulty]
    ?.settings as string[];

  difficultyScore =
    calculateBonusScore({
      currentDifficulty: targetDifficulty,
      createCustomSetting: false,
      difficultySettings,
      customSettingsChecked: [],
      difficultyPoints,
    }) + 10;

  if (settings.length === 0) difficultyScore = 30;

  switch (true) {
    case difficultyScore < 10:
      difficultyText = "Very Easy";
      iconColour = "text-sky-200";
      break;
    case difficultyScore < 20:
      difficultyText = " Easy";
      iconColour = "text-sky-400";
      break;
    case difficultyScore < 50:
      difficultyText = "Medium";
      iconColour = "text-sky-800";
      break;
    case difficultyScore < 90:
      difficultyText = "Hard";
      iconColour = "text-red-400";
      break;
    case difficultyScore < 190:
      difficultyText = "Very Hard";
      iconColour = "text-red-600";
      break;
    case difficultyScore < 250:
      difficultyText = "Extremely Hard";
      iconTwoColour = "opacity-10";
      break;
    case difficultyScore < 350:
      difficultyText = "Insanely Hard";
      iconTwoColour = "opacity-30";
      break;
    case difficultyScore < 1000:
      difficultyText = "Impossibly Hard";
      iconTwoColour = "opacity-60";
      break;
  }

  return { difficultyText, iconColour, iconTwoColour };
}

export default CalculateDifficulty;
