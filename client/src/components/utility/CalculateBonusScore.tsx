import Icon from "./Icon";

interface PropType {
  currentDifficulty: string;
  createCustomSetting: boolean;
  checkboxOptions: { [key: string]: string[] };
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
    : checkboxOptions[currentDifficulty.split(" ").join("-")].forEach(
        (option) => (score += parseInt(difficultyPoints[option].point))
      );

  return (
    <div
      className="flex justify-center items-center gap-2 cursor-default"
      title="Bonus score is calculated based on the combined difficulty of all options selected above."
    >
      <span>Score Bonus:</span>
      <span className="flex justify-center items-center text-yellow-600 gap-1">
        +{1500 + score * 20} <Icon icon={"trophy"} customStyle="" />
      </span>
    </div>
  );
}

export default CalculateBonusScore;
