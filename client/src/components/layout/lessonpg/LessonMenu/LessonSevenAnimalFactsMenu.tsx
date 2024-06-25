import { useMemo } from "react";
import LessonsMenu from "../../../ui/lessonspg/LessonsMenu";
import LessonAnimalFactsData from "../../../../data/LessonAnimalFactsData";

export default function LessonSevenAnimalFactsMenu() {
  const { data: menuData } = useMemo(() => LessonAnimalFactsData(), []);

  return <LessonsMenu menuData={menuData} lessonIndex={7} />;
}
