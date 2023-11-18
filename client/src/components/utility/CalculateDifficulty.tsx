import Icon from "./Icon";
import { useEffect } from "react";

interface PropType {
  difficultyPoints: { [key: string]: { [key: string]: string } };
  displayLabel: boolean;
  displayDifficulty: boolean;
  checkboxOptions: {
    [key: string]: { [key: string]: string[] | boolean };
  };
}

function CalculateDifficulty({
  difficultyPoints,
  checkboxOptions,
  displayLabel,
  displayDifficulty,
}: PropType) {
  let difficultyScore = 0;
  let difficultyText = "";
  let iconTwoColour = "hidden";
  let iconColour = "text-red-900";

  useEffect(() => {
    const currentDifficulty = Object.keys(checkboxOptions).filter(
      (option) => checkboxOptions[option].selected
    )[0];
    console.log(
      checkboxOptions[currentDifficulty],
      checkboxOptions,
      difficultyPoints
    );
  }, []);

  const currentDifficulty: string = Object.keys(checkboxOptions).filter(
    (option) => checkboxOptions[option].selected
  )[0];

  const settings: string[] = checkboxOptions[currentDifficulty]
    .settings as string[];

  settings.forEach(
    (option) =>
      (difficultyScore += parseInt(difficultyPoints[option].point) + 10)
  );

  if (settings.length === 0) difficultyScore = 30;

  switch (true) {
    case difficultyScore === 0:
      difficultyText = "Very Easy";
      iconColour = "text-green-200";
      break;
    case difficultyScore < 20:
      difficultyText = " Easy";
      iconColour = "text-green-400";
      break;
    case difficultyScore < 50:
      difficultyText = "Medium";
      iconColour = "text-green-600";
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
    case difficultyScore > 350:
      difficultyText = "Impossibly Hard";
      iconTwoColour = "opacity-60";
      break;
  }

  return (
    <div
      className="flex justify-center items-center gap-2 cursor-pointer"
      title="Custom difficulty setting is calculated based on the combined difficulty of all options selected above."
    >
      <div className="flex justify-center items-center relative">
        <Icon icon="boxingGlove" customStyle={`flex ${iconColour} z-[1]`} />
        <Icon
          icon="flame"
          customStyle={`${iconTwoColour} flex absolute scale-[1.7] scale-x-[1.8] -translate-y-2 z-[0] text-red-600`}
        />
      </div>
      {displayLabel && <span>Difficulty:</span>}
      {displayDifficulty && <span>{difficultyText}</span>}
    </div>
  );
}

export default CalculateDifficulty;
