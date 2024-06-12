import { useMemo } from "react";
import LessonsMenu from "../../ui/lessonspg/LessonsMenu";
import LessonAnimalFactsData from "../../../data/LessonAnimalFactsData";

function LessonSixAnimalFacts() {
  const menuData = useMemo(() => LessonAnimalFactsData(), []);

  return <LessonsMenu menuData={menuData} lessonIndex={6} />;
}

export default LessonSixAnimalFacts;
