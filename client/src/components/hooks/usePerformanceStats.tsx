import { useEffect } from "react";
import useAuth from "./useAuth";
import useStats from "./useStats";
import GetPerformanceStats from "../../utils/requests/GetPerformanceStats";

interface PropType {
  testNameList?: { testName: string }[];
}

//Fetch performance stats and store it in context
function usePerformanceStats({ testNameList }: PropType) {
  const { setPerformanceStats, performanceStats } = useStats();
  const { userId } = useAuth();

  useEffect(() => {
    const fetchPerformanceData = async ({ testName }) => {
      const performanceStats = await GetPerformanceStats({ testName, userId });

      if (performanceStats[testName].bestWPM !== 0)
        setPerformanceStats((prevState) => ({
          ...prevState,
          ...performanceStats,
        }));
    };

    testNameList !== undefined &&
      userId &&
      !performanceStats[testNameList[testNameList?.length - 1]?.testName] &&
      testNameList.forEach((test) => {
        //Save all default performance stat as 0 so that stars display as 0 by default which provides a better user exp
        setPerformanceStats((prevState) => ({
          ...prevState,
          [test.testName]: { bestWPM: 0, testTime: 0 },
        }));

        fetchPerformanceData({ testName: test.testName });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPerformanceStats, testNameList, userId]);
}

export default usePerformanceStats;
