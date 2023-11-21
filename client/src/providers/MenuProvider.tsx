import React, { createContext, useEffect, useState } from "react";
import ServerAPI from "../api/settingsAPI";

interface DataType {
  [key: string]: { [key: string]: string[] | boolean };
}
interface ContextType {
  difficultyPoints: { [key: string]: { [key: string]: string } };
  currentDifficulty: string;
  checkboxOptions: DataType;
  setCheckboxOptions: (value: DataType) => void;
  setAuth: (value: boolean) => void;
}

export const MenuContext = createContext<ContextType>({
  checkboxOptions: {},
  difficultyPoints: {},
  currentDifficulty: "Medium",
  setCheckboxOptions: () => {},
  setAuth: () => {},
});

interface PropType {
  children: React.ReactNode;
}

const checkboxOptionsData: {
  [key: string]: { [key: string]: string[] | boolean };
} = {
  "very Easy": {
    settings: ["all lower case", "no punctuation"],
    selected: false,
    default: true,
  },
  easy: {
    settings: ["all lower case", "Digits 0 - 9"],
    selected: false,
    default: true,
  },
  medium: { settings: [], selected: true, default: true },
  hard: {
    settings: ["PascalCase", "MiXeDcAsE"],
    selected: false,
    default: true,
  },
  "Very Hard": {
    settings: ["PascalCase", "camelCase", "complex words", "MiXeDcAsE"],
    selected: false,
    default: true,
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
  const [checkboxOptions, setCheckboxOptions] = useState(checkboxOptionsData);
  const [difficultyPoints] = useState(difficultyPointsData);
  const [auth, setAuth] = useState(false);

  const getSettingsData = async () => {
    try {
      const response = await ServerAPI.get("/difficulty", {
        method: "GET",
      })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
        });

      const parseRes = await response;

      if (parseRes) {
        parseRes.forEach(value => console.log(value))
      }
    } catch (err) {
      let message;

      if (err instanceof Error) {
        message = err.message;
      } else {
        message = String(err);
      }

      console.error(message);
    }
  };

  useEffect(() => {
    auth && getSettingsData();
  }, [auth]);

  const currentDifficulty: string = Object.keys(checkboxOptions).filter(
    (option) => checkboxOptions[option].selected
  )[0];
  return (
    <MenuContext.Provider
      value={{
        difficultyPoints,
        checkboxOptions,
        currentDifficulty,
        setCheckboxOptions,
        setAuth,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export default MenuProvider;
