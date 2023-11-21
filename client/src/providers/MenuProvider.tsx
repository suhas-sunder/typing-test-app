import React, { createContext, useEffect, useState } from "react";
import ServerAPI from "../api/settingsAPI";

interface DataType {
  [key: string]: { [key: string]: string[] | boolean };
}

interface ContextType {
  difficultyPoints: { [key: string]: { [key: string]: string } };
  currentDifficulty: string;
  difficultySettings: DataType;
  setDifficultySettings: (value: DataType) => void;
  handleUpdateDatabase: (settings: DataType, shouldDelete: boolean) => void;
  setAuth: (value: boolean) => void;
}

export const MenuContext = createContext<ContextType>({
  difficultySettings: {},
  difficultyPoints: {},
  currentDifficulty: "Medium",
  setDifficultySettings: () => {},
  handleUpdateDatabase: () => {},
  setAuth: () => {},
});

interface PropType {
  children: React.ReactNode;
}

const difficultySettingsData: {
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
  const [difficultySettings, setDifficultySettings] = useState<DataType>(
    difficultySettingsData
  );
  const [difficultyPoints] = useState<{
    [key: string]: { [key: string]: string };
  }>(difficultyPointsData);
  const [auth, setAuth] = useState<boolean>(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<string>("medium");

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const tempObj = {};

        parseRes.forEach(
          (value: {
            name: string;
            settings: string[];
            selected: boolean;
            isdefault: boolean;
          }) => {
            tempObj[`${value.name}`] = {
              settings: value.settings,
              selected: value.selected,
              default: value.isdefault,
            };
          }
        );

        setDifficultySettings({
          ...difficultySettings,
          ...tempObj,
        });
      }
    } catch (err) {
      let message: string;

      if (err instanceof Error) {
        message = err.message;
      } else {
        message = String(err);
      }

      console.error(message);
    }
  };

  const deleteSettingsFromDB = async (name: string) => {
    try {
      await ServerAPI.delete("/difficulty", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name,
        },
      })
        .then((response) => {
          return response.data;
        })
        .catch((err) => console.log(err));
    } catch (err) {
      let message: string;

      if (err instanceof Error) {
        message = err.message;
      } else {
        message = String(err);
      }

      console.error(message);
    }
  };

  const createSettingsOnDB = async (
    name: string,
    settings: boolean | string[],
    selected: boolean | string[],
    isDefault: boolean | string[]
  ) => {
    try {
      await ServerAPI.post("/difficulty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name,
          settings,
          selected,
          isDefault,
        },
      })
        .then((response) => {
          return response.data;
        })
        .catch((err) => console.log(err));
    } catch (err) {
      let message: string;

      if (err instanceof Error) {
        message = err.message;
      } else {
        message = String(err);
      }

      console.error(message);
    }
  };

  const handleUpdateDatabase = (settings: DataType, shouldDelete: boolean) => {
    for (const [key, value] of Object.entries(settings)) {
      if (shouldDelete) {
        setCurrentDifficulty("medium");

        deleteSettingsFromDB(key);
      } else {
        createSettingsOnDB(key, value.settings, value.selected, value.default);
      }
    }
  };

  useEffect(() => {
    auth && getSettingsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    setCurrentDifficulty(
      Object.keys(difficultySettings).filter(
        (option) => difficultySettings[option].selected
      )[0]
    );
  }, [difficultySettings]);

  return (
    <MenuContext.Provider
      value={{
        difficultyPoints,
        difficultySettings,
        currentDifficulty,
        setDifficultySettings,
        handleUpdateDatabase,
        setAuth,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export default MenuProvider;
