import React, { createContext, useEffect, useState } from "react";
import DeleteDifficultySettings from "../utils/DeleteDifficultySettings";
import CreateDifficultySettings from "../utils/CreateDifficultySettings";
import GetDifficultySettings from "../utils/GetDifficultySettings";

export type DifficultyType = {
  [key: string]: {
    settings: string[] | [];
    difficultyLevel: string;
    selected: boolean;
    default: boolean;
    scoreBonus: number;
  };
};

interface ContextType {
  difficultyPoints: { [key: string]: { [key: string]: string } };
  currentDifficulty: string;
  difficultySettings: DifficultyType;
  id: number;
  setDifficultySettings: (value: DifficultyType) => void;
  handleUpdateDatabase: (
    settings: DifficultyType,
    shouldDelete: boolean,
  ) => void;
  setAuth: (value: boolean) => void;
  setId: (value: number) => void;
}

export const MenuContext = createContext<ContextType>({
  difficultySettings: {},
  difficultyPoints: {},
  currentDifficulty: "Medium",
  id: 0,
  setDifficultySettings: () => {},
  setId: () => {},
  handleUpdateDatabase: () => {},
  setAuth: () => {},
});

interface PropType {
  children: React.ReactNode;
}

const difficultySettingsData: DifficultyType = {
  "very easy": {
    settings: ["all lower case", "no punctuation"],
    difficultyLevel: "very easy",
    selected: false,
    default: true,
    scoreBonus: 700,
  },
  easy: {
    settings: ["Digits 0 - 9"],
    difficultyLevel: "easy",
    selected: false,
    default: true,
    scoreBonus: 1500,
  },
  medium: {
    settings: [],
    difficultyLevel: "medium",
    selected: true,
    default: true,
    scoreBonus: 1500,
  },
  hard: {
    settings: ["PascalCase", "MiXeDcAsE"],
    difficultyLevel: "hard",
    selected: false,
    default: true,
    scoreBonus: 2500,
  },
  "very hard": {
    settings: ["PascalCase", "camelCase", "complex words", "MiXeDcAsE"],
    difficultyLevel: "very hard",
    selected: false,
    default: true,
    scoreBonus: 3500,
  },
};

const difficultyPointsData: { [key: string]: { [key: string]: string } } = {
  "all lower case": {
    point: "-20",
    level: "Very Easy",
  },
  "no punctuation": {
    point: "-20",
    level: "Very Easy",
  },
  "ALL UPPER CASE": {
    point: "-20",
    level: "Very Easy",
  },
  PascalCase: {
    point: "10",
    level: "Medium",
  },
  camelCase: {
    point: "10",
    level: "Medium",
  },
  MiXeDcAsE: {
    point: "40",
    level: "Hard",
  },
  snake_case: {
    point: "10",
    level: "Medium",
  },
  "Digits 0 - 9": {
    point: "0",
    level: "Easy",
  },
  "complex words": {
    point: "40",
    level: "Hard",
  },
  "P.u?n!c't+u*a~t>e^d": {
    point: "120",
    level: "Very Hard",
  },
  N3u4m5b6e7r1e3d: {
    point: "120",
    level: "Very Hard",
  },
  "no whitespace": {
    point: "120",
    level: "Very Hard",
  },
};

function MenuProvider({ children }: PropType) {
  const [difficultySettings, setDifficultySettings] = useState<DifficultyType>(
    difficultySettingsData,
  );
  const [difficultyPoints] = useState<{
    [key: string]: { [key: string]: string };
  }>(difficultyPointsData);
  const [auth, setAuth] = useState<boolean>(false);
  const [id, setId] = useState<number>(0); //User id
  const [currentDifficulty, setCurrentDifficulty] = useState<string>("medium");

  const handleUpdateDatabase = (
    settings: DifficultyType,
    shouldDelete: boolean,
  ) => {
    for (const [key, value] of Object.entries(settings)) {
      if (shouldDelete) {
        setCurrentDifficulty("medium");

        DeleteDifficultySettings({ id, name: key });
      } else {
        CreateDifficultySettings({
          id,
          name: key,
          settings: value.settings,
          difficultyLevel: value.difficultyLevel,
          selected: value.selected,
          isDefault: value.default,
          scoreBonus: value.scoreBonus,
        });
      }
    }
  };

  useEffect(() => {
    auth &&
      id &&
      GetDifficultySettings({ id, difficultySettings, setDifficultySettings });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, id]);

  useEffect(() => {
    setCurrentDifficulty(
      Object.keys(difficultySettings).filter(
        (option) => difficultySettings[option].selected,
      )[0],
    );
  }, [difficultySettings, id]);

  return (
    <MenuContext.Provider
      value={{
        difficultyPoints,
        difficultySettings,
        currentDifficulty,
        setDifficultySettings,
        handleUpdateDatabase,
        setAuth,
        id,
        setId,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export default MenuProvider;
