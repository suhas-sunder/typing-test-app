import React, { createContext, useState } from "react";
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
  setScore: (value: DataType) => void;
  handleUpdateDatabase: (
    stats: StatsDataType,
    testTime: number,
    testName: string,
    userId: string,
    difficultySettings: string[] | boolean,
    difficultyName: string,
    difficultyScore: number,
  ) => void;
}

export const StatsContext = createContext<ContextType>({
  score: {},
  setScore: () => {},
  handleUpdateDatabase: () => {},
});

interface PropType {
  children: React.ReactNode;
}

function ProfileStatsProvider({ children }: PropType) {
  const [score, setScore] = useState<DataType>({});
  // const [bestStats, setBestStats] = useState<DataType>({}); //Best score, performance, wpm, cpm (fetched based on test type)
  // const [profileStats, setProfileStats]
  // const [auth, setAuth] = useState<boolean>(false); //Don't think I'll need this. Can check auth state on pages I pull data from.

  const handleUpdateDatabase = async (
    stats,
    testTime,
    testName,
    userId,
    difficultySettings,
    difficultyName,
    difficultyScore,
  ) => {
    const user_id = userId;
    const test_name = testName;
    const total_chars = stats.correct + stats.mistakes;
    const correct_chars = stats.correct;
    const misspelled_chars = stats.mistakes;
    const performance_score = 5; //Needs to be calculated once I decide how
    const test_accuracy = stats.accuracy;
    const test_time_sec = testTime * 60;
    const screen_size_info = `screen height: ${window.screen.height}px + screen width: ${window.screen.width}px`;
    const wpm = stats.wpm;
    const cpm = stats.cpm;
    const difficulty_name = difficultyName;
    const difficulty_settings = difficultySettings;
    const test_score =
      difficultyScore * (1 + testTime / 10) *  (stats.accuracy / 100); //Base difficulty score times 1 min + test time/Max test time * test accuracy %.

    try {
      const response = await AccountAPI.post("/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          user_id,
          test_name,
          total_chars,
          correct_chars,
          misspelled_chars,
          test_accuracy,
          test_time_sec,
          screen_size_info,
          wpm,
          cpm,
          test_score,
          performance_score,
          difficulty_name,
          difficulty_settings,
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const getScoreData = async () => {
  //   try {
  //     const response = await AccountAPI.get("/score", {
  //       method: "GET",
  //       params: {
  //         userId: id,
  //       },
  //     })
  //       .then((response) => {
  //         return response.data;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });

  //     const parseRes = await response;

  //     if (parseRes) {
  //       console.log(parseRes);
  //       // const tempObj = {};

  //       // parseRes.forEach(
  //       //   (value: {
  //       //     name: string;
  //       //     settings: string[];
  //       //     selected: boolean;
  //       //     isdefault: boolean;
  //       //   }) => {
  //       //     tempObj[`${value.name}`] = {
  //       //       settings: value.settings,
  //       //       selected: value.selected,
  //       //       default: value.isdefault,
  //       //     };
  //       //   },
  //       // );
  //     }
  //   } catch (err) {
  //     let message: string;

  //     if (err instanceof Error) {
  //       message = err.message;
  //     } else {
  //       message = String(err);
  //     }

  //     console.error(message);
  //   }
  // };

  return (
    <StatsContext.Provider
      value={{
        score,
        handleUpdateDatabase,
        setScore,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export default ProfileStatsProvider;
