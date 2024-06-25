import { useMemo } from "react";
import LessonsMenu from "../../../ui/lessonspg/LessonsMenu";
import LessonQuotesData from "../../../../data/LessonQuotesData";

function LessonFiveQuotes() {
  const menuData = useMemo(() => LessonQuotesData(), []);

  return <LessonsMenu menuData={menuData} lessonIndex={5} />;
}

export default LessonFiveQuotes;
