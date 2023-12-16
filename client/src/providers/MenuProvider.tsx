import React, { createContext, useEffect, useState } from "react";
import SettingsAPI from "../api/settingsAPI";

interface DataType {
  [key: string]: {
    settings: string[];
    selected: boolean;
    default: boolean;
    scoreBonus: number;
  };
}

interface ContextType {
  difficultyPoints: { [key: string]: { [key: string]: string } };
  currentDifficulty: string;
  difficultySettings: DataType;
  id: string;
  setDifficultySettings: (value: DataType) => void;
  handleUpdateDatabase: (settings: DataType, shouldDelete: boolean) => void;
  setAuth: (value: boolean) => void;
  setId: (value: string) => void;
}

export const MenuContext = createContext<ContextType>({
  difficultySettings: {},
  difficultyPoints: {},
  currentDifficulty: "Medium",
  id: "",
  setDifficultySettings: () => {},
  setId: () => {},
  handleUpdateDatabase: () => {},
  setAuth: () => {},
});

interface PropType {
  children: React.ReactNode;
}

const difficultySettingsData: DataType = {
  "very easy": {
    settings: ["all lower case", "no punctuation"],
    selected: false,
    default: true,
    scoreBonus: 700,
  },
  easy: {
    settings: ["Digits 0 - 9"],
    selected: false,
    default: true,
    scoreBonus: 1500,
  },
  medium: { settings: [], selected: true, default: true, scoreBonus: 1500 },
  hard: {
    settings: ["PascalCase", "MiXeDcAsE"],
    selected: false,
    default: true,
    scoreBonus: 2500,
  },
  "very hard": {
    settings: ["PascalCase", "camelCase", "complex words", "MiXeDcAsE"],
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
  const [difficultySettings, setDifficultySettings] = useState<DataType>(
    difficultySettingsData,
  );
  const [difficultyPoints] = useState<{
    [key: string]: { [key: string]: string };
  }>(difficultyPointsData);
  const [auth, setAuth] = useState<boolean>(false);
  const [id, setId] = useState<string>(""); //User id
  const [currentDifficulty, setCurrentDifficulty] = useState<string>("medium");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSettingsData = async () => {
    try {
      const response = await SettingsAPI.get("/difficulty", {
        method: "GET",
        params: {
          userId: id,
        },
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
            scorebonus: number;
          }) => {
            tempObj[`${value.name}`] = {
              settings: value.settings,
              selected: value.selected,
              default: value.isdefault,
              scoreBonus: value.scorebonus,
            };
          },
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
      await SettingsAPI.delete("/difficulty", {
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
    isDefault: boolean | string[],
    scoreBonus: number,
  ) => {
    try {
      await SettingsAPI.post("/difficulty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name,
          settings,
          selected,
          isDefault,
          userId: id,
          scoreBonus,
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
        createSettingsOnDB(
          key,
          value.settings,
          value.selected,
          value.default,
          value.scoreBonus,
        );
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
