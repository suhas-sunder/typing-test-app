import React, { createContext } from "react";

interface ContextType {
  checkboxOptions: {
    [key: string]: { [key: string]: string[] | boolean };
  };
  difficultyPoints: { [key: string]: { [key: string]: string } };
  currentDifficulty: string;
}

export const MenuContext = createContext<ContextType>({
  checkboxOptions: {},
  difficultyPoints: {},
  currentDifficulty: "Medium",
});

interface PropType {
  children: React.ReactNode;
}

const checkboxOptions: {
  [key: string]: { [key: string]: string[] | boolean };
} = {
  "very Easy": {
    settings: ["all lower case", "no punctuation"],
    selected: false,
  },
  easy: { settings: ["all lower case", "Digits 0 - 9"], selected: false },
  medium: { settings: [], selected: true },
  hard: { settings: ["PascalCase", "MiXeDcAsE"], selected: false },
  "Very Hard": {
    settings: ["PascalCase", "camelCase", "complex words", "MiXeDcAsE"],
    selected: false,
  },
};

const difficultyPoints: { [key: string]: { [key: string]: string } } = {
  "all lower case": {
    point: "-10",
    level: "Very Easy",
  },
  "no punctuation": {
    point: "-10",
    level: "Very Easy",
  },
  "ALL UPPER CASE": {
    point: "-10",
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

const currentDifficulty: string = Object.keys(checkboxOptions).filter(
  (option) => checkboxOptions[option].selected
)[0];

function MenuProvider({ children }: PropType) {
  return (
    <MenuContext.Provider
      value={{ difficultyPoints, checkboxOptions, currentDifficulty }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export default MenuProvider;
