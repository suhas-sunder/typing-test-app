import { v4 as uuidv4 } from "uuid";
import { useLayoutEffect, useMemo } from "react";
import { DifficultyType } from "../../../providers/MenuProvider";
import loadable from "@loadable/component";
import styles from "./styles/DropDownMenu.module.css";
import calculateDifficulty from "../../../utils/calculations/CalculateDifficulty";
import useMenu from "../../hooks/useMenu";

const Icon = loadable(() => import("../../../utils/other/Icon"));

interface PropType {
  difficulty: string;
  difficultyPoints: { [key: string]: { [key: string]: string } };
  difficultySettings: DifficultyType;
}

const HandleDisplayDifficulty = ({
  difficulty,
  difficultySettings,
  difficultyPoints,
}: PropType) => {
  const difficultyCalculations = useMemo(
    () =>
      calculateDifficulty({
        difficultySettings,
        difficultyPoints,
        targetDifficulty: difficulty,
      }),
    [difficulty, difficultyPoints, difficultySettings],
  );

  return (
    <div
      className="flex cursor-pointer items-center justify-center gap-2"
      title={`Difficulty: ${difficultyCalculations.difficultyText}`}
    >
      <div className="relative flex items-center justify-center">
        <Icon
          icon="boxingGlove"
          customStyle={`flex ${difficultyCalculations.iconColour} z-[1]`}
        />
        <Icon
          icon="flame"
          customStyle={`${difficultyCalculations.iconTwoColour} flex absolute scale-[1.7] scale-x-[1.8] -translate-y-[0.3em] z-[0] text-red-600`}
        />
      </div>
      <span className="capitalize">{difficulty}</span>
    </div>
  );
};

//Used by DropDownMenu.tsx component
export default function DropDownList() {
  const {
    difficultyPoints,
    difficultySettings,
    currentDifficulty,
    setDifficultySettings,
  } = useMenu();

  const handleMenuSelect = (difficulty: string) => {
    setDifficultySettings({
      ...difficultySettings,
      [currentDifficulty]: {
        ...difficultySettings[currentDifficulty],
        selected: false,
      },
      [difficulty]: {
        ...difficultySettings[difficulty],
        selected: true,
      },
    });
  };

  //Preload/load all components on component mount
  useLayoutEffect(() => {
    Icon.load();
  }, []);

  return (
    <ul
      role="listbox"
      id="drop-down-list"
      aria-label="custom select menu drop-down list"
      className={`${styles["difficulty-menu"]} absolute top-10 z-10 max-h-[25em] min-w-[12.4em] flex-col overflow-auto rounded-md border-2 bg-white text-base`}
    >
      {Object.keys(difficultySettings).map((difficulty) => (
        <li
          role="option"
          aria-label="custom select menu drop-down option"
          key={uuidv4()}
          onClick={() => handleMenuSelect(difficulty)}
          className="z-[1000] flex gap-2 px-3 py-[0.85em] text-sky-700 hover:bg-default-sky-blue hover:text-white"
        >
          <HandleDisplayDifficulty
            difficulty={difficulty}
            difficultyPoints={difficultyPoints}
            difficultySettings={difficultySettings}
          />
        </li>
      ))}
    </ul>
  );
}
