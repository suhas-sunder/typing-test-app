import LessonsMenu from "../../../ui/lessonspg/LessonsMenu";
import { LessonDataType } from "../../../../data/LessonBeginnerData";
import useLessonText from "../../../hooks/useLessonText";

export default function LessonEightBirdFactsMenu() {
  const { birdLessonsData } = useLessonText();

  return (
    <>
      {birdLessonsData ? (
        <LessonsMenu
          menuData={birdLessonsData as LessonDataType}
          lessonIndex={8}
        />
      ) : (
        <div>Loading lesson data...</div>
      )}
    </>
  );
}
