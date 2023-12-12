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
  id: string;
  setScore: (value: DataType) => void;
  handleUpdateDatabase: (
    stats: StatsDataType,
    testTime: number,
    testName: string,
  ) => void;
  setId: (value: string) => void;
  setCurrentDifficulty: (value: string) => void;
}

export const StatsContext = createContext<ContextType>({
  score: {},
  id: "",
  setScore: () => {},
  setId: () => {},
  handleUpdateDatabase: () => {},
  setCurrentDifficulty: () => {},
});

interface PropType {
  children: React.ReactNode;
}

function ProfileStatsProvider({ children }: PropType) {
  const [score, setScore] = useState<DataType>({});
  // const [bestStats, setBestStats] = useState<DataType>({}); //Best score, performance, wpm, cpm (fetched based on test type)
  // const [profileStats, setProfileStats]
  const [id, setId] = useState<string>(""); //User id
  // const [auth, setAuth] = useState<boolean>(false); //Don't think I'll need this. Can check auth state on pages I pull data from.
  const [currentDifficulty, setCurrentDifficulty] = useState<string>("Medium");

  const handleUpdateDatabase = async (stats, testTime, testName) => {
    console.log(stats, testTime);

    const user_id = id;
    const test_name = testName;
    const total_chars = stats.correct + stats.mistakes;
    const correct_chars = stats.correct;
    const misspelled_chars = stats.mistakes;
    const performance_score = 5; //Needs to be calculated once I decide how
    const test_score = 5000; //Update this based on score calculation when I decide how
    const test_accuracy = stats.accurancy;
    const test_time_sec = testTime * 60;
    const difficulty = currentDifficulty; //Update on difficulty page.
    const screen_size_info = `screen height: ${window.screen.height}px + screen width: ${window.screen.width}px`;
    const wpm = stats.wpm;
    const cpm = stats.cpm;

    console.log(
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
      difficulty,
      test_score,
      performance_score,
    );

    try {
      const response = await AccountAPI.post("/score", {
        method: "POST",
        params: {
          user_id: id,
          test_name,
          total_chars,
          correct_chars,
          misspelled_chars,
          test_accuracy,
          test_time_sec,
          screen_size_info,
          wpm,
          cpm,
          difficulty,
          test_score,
          performance_score,
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
        setCurrentDifficulty,
        handleUpdateDatabase,
        setScore,
        id,
        setId,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export default ProfileStatsProvider;
