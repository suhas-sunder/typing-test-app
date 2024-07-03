import LessonsMenu from "../../../ui/lessonspg/LessonsMenu";
import { LessonDataType } from "../../../../data/LessonBeginnerData";
import useLessonText from "../../../hooks/useLessonText";

export default function LessonThirteenSeaLifeMenu() {
  const { seaLifeLessonsData } = useLessonText();

  return (
    <>
      {seaLifeLessonsData ? (
        <LessonsMenu
          menuData={seaLifeLessonsData as LessonDataType}
          lessonIndex={13}
        />
      ) : (
        <div>Loading lesson data...</div>
      )}
    </>
  );
}
