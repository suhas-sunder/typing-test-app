interface PropType {
  currentDifficulty: string;
  createCustomSetting: boolean;
  difficultySettings: {
    [key: string]: { [key: string]: string[] | boolean };
  };
  customSettingsChecked: string[];
  difficultyPoints: { [key: string]: { [key: string]: string } };
}

function CalculateBonusScore({
  currentDifficulty,
  createCustomSetting,
  difficultySettings,
  customSettingsChecked,
  difficultyPoints,
}: PropType) {
  let score = 0;

  createCustomSetting
    ? customSettingsChecked.forEach(
        (option) => (score += parseInt(difficultyPoints[option].point))
      )
    : (difficultySettings[currentDifficulty].settings as string[]).forEach(
        (option) => (score += parseInt(difficultyPoints[option].point))
      );

  return score;
}

export default CalculateBonusScore;
