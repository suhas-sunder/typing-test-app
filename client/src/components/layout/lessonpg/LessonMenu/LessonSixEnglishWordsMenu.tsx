import { useMemo } from "react";
import LessonsMenu from "../../../ui/lessonspg/LessonsMenu";
import LessonEnglishWordsData from "../../../../data/LessonEnglishWordsData";

export default function LessonSixEnglishWordsMenu() {
  const menuData = useMemo(() => LessonEnglishWordsData(), []);

  return <LessonsMenu menuData={menuData} lessonIndex={6} />;
}
