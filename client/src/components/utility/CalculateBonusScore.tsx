interface PropType {
  currentDifficulty: string;
  createCustomSetting: boolean;
  checkboxOptions: {
    [key: string]: { [key: string]: string[] | boolean };
  };
  customSettingsChecked: string[];
  difficultyPoints: { [key: string]: { [key: string]: string } };
}

function CalculateBonusScore({
  currentDifficulty,
  createCustomSetting,
  checkboxOptions,
  customSettingsChecked,
  difficultyPoints,
}: PropType) {
  let score = 0;

  createCustomSetting
    ? customSettingsChecked.forEach(
        (option) => (score += parseInt(difficultyPoints[option].point))
      )
    : (checkboxOptions[currentDifficulty].settings as string[]).forEach(
        (option) => (score += parseInt(difficultyPoints[option].point))
      );

  return score;
}

export default CalculateBonusScore;
