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

      setPerformanceStats((prevState) => ({
        ...prevState,
        ...performanceStats,
      }));
    };

    testNameList !== undefined &&
      userId &&
      testNameList.forEach((test) => {
        if (!performanceStats[test.testName])
          fetchPerformanceData({ testName: test.testName });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPerformanceStats, testNameList, userId]);
}

export default usePerformanceStats;
