import LessonsMenu from "../../../ui/lessonspg/LessonsMenu";
import { LessonDataType } from "../../../../data/LessonBeginnerData";
import useLessonText from "../../../hooks/useLessonText";

export default function LessonNineInsectFactsMenu() {
  const { insectLessonsData } = useLessonText();

  return (
    <>
      {insectLessonsData ? (
        <LessonsMenu
          menuData={insectLessonsData as LessonDataType}
          lessonIndex={9}
        />
      ) : (
        <div>Loading lesson data...</div>
      )}
    </>
  );
}
