import React, { createContext, useEffect, useState } from "react";
import AccountAPI from "../api/accountAPI";

interface DataType {
  [key: string]: { [key: string]: string[] | boolean };
}

interface StatsDataType {
  correct: number;
  mistakes: number;
  wpm: number;
  cpm: number;
  accuracy: number;
  minutesLeft: number;
  secondsLeft: number;
}

interface ContextType {
  score: DataType;
  id: string;
  setScore: (value: DataType) => void;
  handleUpdateDatabase: (stats: StatsDataType, testTime: number) => void;
  setAuth: (value: boolean) => void;
  setId: (value: string) => void;
}

export const StatsContext = createContext<ContextType>({
  score: {},
  id: "",
  setScore: () => {},
  setId: () => {},
  handleUpdateDatabase: () => {},
  setAuth: () => {},
});

interface PropType {
  children: React.ReactNode;
}

function ProfileStatsProvider({ children }: PropType) {
  const [score, setScore] = useState<DataType>({});
  const [id, setId] = useState<string>(""); //User id
  const [auth, setAuth] = useState<boolean>(false);

  const handleUpdateDatabase = () => {
    
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getStatsData = async () => {
    try {
      const response = await AccountAPI.get("/score", {
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
        console.log(parseRes);
        // const tempObj = {};

        // parseRes.forEach(
        //   (value: {
        //     name: string;
        //     settings: string[];
        //     selected: boolean;
        //     isdefault: boolean;
        //   }) => {
        //     tempObj[`${value.name}`] = {
        //       settings: value.settings,
        //       selected: value.selected,
        //       default: value.isdefault,
        //     };
        //   },
        // );
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

  useEffect(() => {
    auth && getStatsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <StatsContext.Provider
      value={{
        score,
        handleUpdateDatabase,
        setScore,
        setAuth,
        id,
        setId,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export default ProfileStatsProvider;
