import LessonsMenu from "../../../ui/lessonspg/LessonsMenu";
import { LessonDataType } from "../../../../data/LessonBeginnerData";
import useLessonText from "../../../hooks/useLessonText";

export default function LessonTenPrehistoricFactsMenu() {
  const { prehistoricLessonsData } = useLessonText();

  return (
    <>
      {prehistoricLessonsData ? (
        <LessonsMenu
          menuData={prehistoricLessonsData as LessonDataType}
          lessonIndex={10}
        />
      ) : (
        <div>Loading lesson data...</div>
      )}
    </>
  );
}
