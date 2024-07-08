import React, { createContext, useEffect, useState } from "react";
import DeleteDifficultySettings from "../utils/requests/DeleteDifficultySettings";
import CreateDifficultySettings from "../utils/requests/CreateDifficultySettings";
import GetDifficultySettings from "../utils/requests/GetDifficultySettings";

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
  id: string;
  setDifficultySettings: (value: DifficultyType) => void;
  handleUpdateDatabase: (
    settings: DifficultyType,
    shouldDelete: boolean,
  ) => void;
  setAuth: (value: boolean) => void;
  setId: (value: string) => void;
  countDownTime: number;
  setCountDownTime: (value: number) => void;
  typingText: string;
  setTypingText: (value: string) => void;
}

export const MenuContext = createContext<ContextType>({
  difficultySettings: {},
  difficultyPoints: {},
  currentDifficulty: "Medium",
  id: "",
  countDownTime: 0,
  typingText: "",
  setTypingText: () => {},
  setDifficultySettings: () => {},
  setId: () => {},
  handleUpdateDatabase: () => {},
  setAuth: () => {},
  setCountDownTime: () => {},
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
  const [id, setId] = useState<string>(""); //User id
  const [currentDifficulty, setCurrentDifficulty] = useState<string>("medium");
  const [countDownTime, setCountDownTime] = useState<number>(60);
  const [typingText, setTypingText] = useState<string>(""); //Text used for main typing test & is handled in start menu

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

  useEffect(() => {
    console.log(countDownTime);
  }, [countDownTime]);

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
        countDownTime,
        setCountDownTime,
        typingText,
        setTypingText
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export default MenuProvider;
