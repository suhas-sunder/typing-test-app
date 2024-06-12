import { useEffect, useMemo } from "react";
// import LessonData from "../../data/LessonData";
import { useNavigate } from "react-router-dom";
import LessonBeginnerData from "../../data/LessonBeginnerData";
import LessonIntermediateData from "../../data/LessonIntermediateData";
import LessonAdvancedData from "../../data/LessonAdvancedData";
import LessonGraduationData from "../../data/LessonGraduationData";
import LessonAnimalFactsData from "../../data/LessonAnimalFactsData";
import LessonQuotesData from "../../data/LessonQuotesData";

//Generate and provide lesson text based on characters applicable to test or fetch from API as needed
function useLessonText() {
  const navigate = useNavigate();

  const lessonBeginnerData = useMemo(() => LessonBeginnerData(), []);
  const lessonIntermediateData = useMemo(() => LessonIntermediateData(), []);
  const lessonAdvancedData = useMemo(() => LessonAdvancedData(), []);
  const lessonGraduationData = useMemo(() => LessonGraduationData(), []);
  const lessonQuotesData = useMemo(() => LessonQuotesData(), []);
  const lessonAnimalFactsData = useMemo(() => LessonAnimalFactsData(), []);

  const lessonData = [
    lessonBeginnerData,
    lessonIntermediateData,
    lessonAdvancedData,
    lessonGraduationData,
    lessonQuotesData,
    lessonAnimalFactsData,
  ];

  const lessonIndex: number = parseInt(location.pathname?.split("/")[3]) - 1;
  const sectionIndex: number =
    parseInt(location.pathname.split("/")[4]?.split("-")[1]) - 1;
  const levelIndex: number =
    parseInt(location.pathname.split("/")[5]?.split("-")[1]) - 1;
  const lessonName = lessonData[lessonIndex]?.title;
  const sectionName =
    lessonData[lessonIndex]?.lessonData[sectionIndex].sectionTitle;
  const levelName =
    lessonData[lessonIndex]?.lessonData[sectionIndex].sectionData[levelIndex]
      .levelTitle;

  const lessonText =
    lessonData[lessonIndex]?.lessonData[sectionIndex]?.sectionData[levelIndex]
      ?.text ||
    "This lesson is still under development and will be implemented soon. Thanks for your patience! This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon.";

  useEffect(() => {
    if (location.pathname === "/lessons/lesson")
      navigate("/lessons/lesson/1/sec-1/lvl-1");
  }, [navigate]);

  return {
    lessonText,
    sectionIndex,
    lessonIndex,
    levelIndex,
    lessonName,
    sectionName,
    levelName,
  };
}

export default useLessonText;
