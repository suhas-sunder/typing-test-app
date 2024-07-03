import { useMemo } from "react";
import LessonsMenu from "../../../ui/lessonspg/LessonsMenu";
import LessonFlowersData from "../../../../data/LessonFlowersData";

export default function LessonFifteenFlowersMenu() {
  const menuData = useMemo(() => LessonFlowersData(), []);

  return <LessonsMenu menuData={menuData} lessonIndex={15} />;
}
