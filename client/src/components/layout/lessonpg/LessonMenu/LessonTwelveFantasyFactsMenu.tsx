import LessonsMenu from "../../../ui/lessonspg/LessonsMenu";
import { LessonDataType } from "../../../../data/LessonBeginnerData";
import useLessonText from "../../../hooks/useLessonText";

export default function LessonTwelveFantasyFactsMenu() {
  const { fantasyLessonsData } = useLessonText();

  return (
    <>
      {fantasyLessonsData ? (
        <LessonsMenu
          menuData={fantasyLessonsData as LessonDataType}
          lessonIndex={12}
        />
      ) : (
        <div>Loading lesson data...</div>
      )}
    </>
  );
}
