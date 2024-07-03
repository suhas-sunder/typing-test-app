import LessonsMenu from "../../../ui/lessonspg/LessonsMenu";
import { LessonDataType } from "../../../../data/LessonBeginnerData";
import useLessonText from "../../../hooks/useLessonText";

export default function LessonElevenReptileFactsMenu() {
  const { reptileLessonsData } = useLessonText();

  return (
    <>
      {reptileLessonsData ? (
        <LessonsMenu
          menuData={reptileLessonsData as LessonDataType}
          lessonIndex={11}
        />
      ) : (
        <div>Loading lesson data...</div>
      )}
    </>
  );
}
