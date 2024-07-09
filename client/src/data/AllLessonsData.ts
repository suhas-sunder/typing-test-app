import LessonBeginnerData from "./LessonBeginnerData";
import LessonIntermediateData from "./LessonIntermediateData";
import LessonAdvancedData from "./LessonAdvancedData";
import LessonGraduationData from "./LessonGraduationData";
import LessonQuotesData from "./LessonQuotesData";
import LessonEnglishWordsData from "./LessonEnglishWordsData";
import LessonAnimalFactsData from "./LessonAnimalFactsData";
import LessonBirdFactsData from "./LessonBirdFactsData";
import LessonInsectFactsData from "./LessonInsectFactsData";
import LessonPrehistoricFactsData from "./LessonPrehistoricFactsData";
import LessonReptileFactsData from "./LessonReptileFactsData";
import LessonFantasyFactsData from "./LessonFantasyFactsData";
import LessonSeaLifeData from "./LessonSeaLifeData";
import LessonDogsData from "./LessonDogsData";
import LessonFlowersData from "./LessonFlowersData";

//Putting all the lessons data together
export default function AllLessonsData() {
  const data = [
    LessonBeginnerData(),
    LessonIntermediateData(),
    LessonAdvancedData(),
    LessonGraduationData(),
    LessonQuotesData(),
    LessonEnglishWordsData(),
    LessonAnimalFactsData(),
    LessonBirdFactsData(),
    LessonInsectFactsData(),
    LessonPrehistoricFactsData(),
    LessonReptileFactsData(),
    LessonFantasyFactsData(),
    LessonSeaLifeData(),
    LessonDogsData(),
    LessonFlowersData(),
  ];

  return data;
}
