import { useMemo } from "react";
import LessonsMenu from "../../../ui/lessonspg/LessonsMenu";
import LessonDogsData from "../../../../data/LessonDogsData";

export default function LessonFourteenDogFactsMenu() {
  const menuData = useMemo(() => LessonDogsData(), []);

  return <LessonsMenu menuData={menuData} lessonIndex={14} />;
}
