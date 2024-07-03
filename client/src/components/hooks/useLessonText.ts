import { useEffect, useMemo, useState } from "react";
// import LessonData from "../../data/LessonData";
import { useNavigate } from "react-router-dom";
import LessonBeginnerData, {
  LessonDataType,
} from "../../data/LessonBeginnerData";
import LessonIntermediateData from "../../data/LessonIntermediateData";
import LessonAdvancedData from "../../data/LessonAdvancedData";
import LessonGraduationData from "../../data/LessonGraduationData";
import LessonQuotesData from "../../data/LessonQuotesData";
import LessonEnglishWordsData from "../../data/LessonEnglishWordsData";
import LessonAnimalFactsData from "../../data/LessonAnimalFactsData";
import LessonInsectFactsData from "../../data/LessonInsectFactsData";
import LessonBirdFactsData from "../../data/LessonBirdFactsData";
import LessonPrehistoricFactsData from "../../data/LessonPrehistoricFactsData";
import LessonReptileFactsData from "../../data/LessonReptileFactsData";
import LessonFantasyFactsData from "../../data/LessonFantasyFactsData";
import LessonSeaLifeData from "../../data/LessonSeaLifeData";
import LessonFlowersData from "../../data/LessonFlowersData";
import GetLessonText from "../../utils/requests/GetLessonText";
import LessonDogsData from "../../data/LessonDogsData";

//Generate and provide lesson text based on characters applicable to test or fetch from API as needed
function useLessonText() {
  const [lessonText, setLessonText] = useState<string>(
    "This lesson is still under development and will be implemented soon. Thanks for your patience! This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon. Thanks for your patience!This lesson is still under development and will be implemented soon.",
  );

  const navigate = useNavigate();
  const [animalLessonsData, setAnimalLessonsData] =
    useState<null | LessonDataType>(null);

  const [insectLessonsData, setInsectLessonsData] =
    useState<null | LessonDataType>(null);

  const [prehistoricLessonsData, setPrehistoricLessonsData] =
    useState<null | LessonDataType>(null);

  const [reptileLessonsData, setReptileLessonsData] =
    useState<null | LessonDataType>(null);

  const [birdLessonsData, setBirdLessonsData] = useState<null | LessonDataType>(
    null,
  );

  const [seaLifeLessonsData, setSeaLifeLessonsData] =
    useState<null | LessonDataType>(null);

  const [fantasyLessonsData, setFantasyLessonsData] =
    useState<null | LessonDataType>(null);

  const lessonBeginnerData = useMemo(() => LessonBeginnerData(), []);
  const lessonIntermediateData = useMemo(() => LessonIntermediateData(), []);
  const lessonAdvancedData = useMemo(() => LessonAdvancedData(), []);
  const lessonGraduationData = useMemo(() => LessonGraduationData(), []);
  const lessonQuotesData = useMemo(() => LessonQuotesData(), []);
  const lessonEnglishWordsData = useMemo(() => LessonEnglishWordsData(), []);

  const { animalNames, animalLevels } = useMemo(
    () => LessonAnimalFactsData(),
    [],
  );

  const { insectNames, insectLevels } = useMemo(
    () => LessonInsectFactsData(),
    [],
  );

  const { prehistoricNames, prehistoricLevels } = useMemo(
    () => LessonPrehistoricFactsData(),
    [],
  );

  const { reptileNames, reptileLevels } = useMemo(
    () => LessonReptileFactsData(),
    [],
  );

  const { fantasyNames, fantasyLevels } = useMemo(
    () => LessonFantasyFactsData(),
    [],
  );

  const { seaLifeNames, seaLifeLevels } = useMemo(
    () => LessonSeaLifeData(),
    [],
  );

  const { birdNames, birdLevels } = useMemo(() => LessonBirdFactsData(), []);
  const lessonDogsData = useMemo(() => LessonDogsData(), []);
  const lessonFlowersData = useMemo(() => LessonFlowersData(), []);

  const lessonData = [
    lessonBeginnerData,
    lessonIntermediateData,
    lessonAdvancedData,
    lessonGraduationData,
    lessonQuotesData,
    lessonEnglishWordsData,
    animalLessonsData,
    birdLessonsData,
    insectLessonsData,
    prehistoricLessonsData,
    reptileLessonsData,
    fantasyLessonsData,
    seaLifeLessonsData,
    lessonDogsData,
    lessonFlowersData,
  ];

  const lessonIndex: number = parseInt(location.pathname?.split("/")[3]) - 1;
  const sectionIndex: number =
    parseInt(location.pathname.split("/")[4]?.split("-")[1]) - 1;
  const levelIndex: number =
    parseInt(location.pathname.split("/")[5]?.split("-")[1]) - 1;
  const lessonName = lessonData[lessonIndex]?.title;
  const sectionName =
    lessonData[lessonIndex]?.lessonData[sectionIndex]?.sectionTitle;
  const levelName =
    lessonData[lessonIndex]?.lessonData[sectionIndex]?.sectionData[levelIndex]
      ?.levelTitle;

  useEffect(() => {
    if (location.pathname === "/lessons/lesson")
      navigate("/lessons/lesson/1/sec-1/lvl-1");
  }, [navigate]);

  useEffect(() => {
    const handleLessonData = (topicName, levelNames) => {
      const lessonData: {
        sectionTitle: string;
        sectionId: string;
        sectionData: { id: string; levelTitle: string }[];
      }[] = [];

      topicName.forEach((name) => {
        lessonData.push({
          sectionTitle: name,
          sectionId: `${name}-id`,
          sectionData: [
            ...levelNames.map((lvl) => {
              return {
                id: `${name}-${lvl}`,
                levelTitle: lvl.split("-").join(" & ").split("_").join(" "),
              };
            }),
          ],
        });
      });

      return lessonData;
    };

    setAnimalLessonsData({
      id: "animals-id",
      title: "Animals",
      lessonData: handleLessonData(animalNames, animalLevels),
    });

    setInsectLessonsData({
      id: "insects-id",
      title: "Insects",
      lessonData: handleLessonData(insectNames, insectLevels),
    });

    setBirdLessonsData({
      id: "birds-id",
      title: "Birds",
      lessonData: handleLessonData(birdNames, birdLevels),
    });

    setPrehistoricLessonsData({
      id: "prehistoric-id",
      title: "Prehistoric",
      lessonData: handleLessonData(prehistoricNames, prehistoricLevels),
    });

    setReptileLessonsData({
      id: "reptiles-id",
      title: "Reptiles",
      lessonData: handleLessonData(reptileNames, reptileLevels),
    });

    setFantasyLessonsData({
      id: "fantasy-id",
      title: "Fantasy",
      lessonData: handleLessonData(fantasyNames, fantasyLevels),
    });

    setSeaLifeLessonsData({
      id: "sea-life-id",
      title: "Sea Life",
      lessonData: handleLessonData(seaLifeNames, seaLifeLevels),
    });
  }, [
    animalLevels,
    animalNames,
    birdLevels,
    birdNames,
    fantasyLevels,
    fantasyNames,
    insectLevels,
    insectNames,
    levelName,
    prehistoricLevels,
    prehistoricNames,
    reptileLevels,
    reptileNames,
    seaLifeLevels,
    seaLifeNames,
    setAnimalLessonsData,
  ]);

  useEffect(() => {
    let url = "";

    const updateText = async () => {
      //Create a url that matches text url stored on cms based on lesson section and level index
      if (lessonIndex === 6) {
        //Handle Animal Facts
        url = `https://www.honeycombartist.com/animals-text%2F${animalLevels[levelIndex]}%2F${animalNames[sectionIndex]}.json`;
      } else if (lessonIndex === 7) {
        //Handle Bird Facts
        url = `https://www.honeycombartist.com/birds-text%2F${birdLevels[levelIndex]}%2F${birdNames[sectionIndex]}.json`;
      } else if (lessonIndex === 8) {
        //Handle Insect Facts
        url = `https://www.honeycombartist.com/insects-text%2F${insectLevels[levelIndex]}%2F${insectNames[sectionIndex]}.json`;
      } else if (lessonIndex === 9) {
        //Handle Prehistroic Facts
        url = `https://www.honeycombartist.com/prehistoric-text%2F${prehistoricLevels[levelIndex]}%2F${prehistoricNames[sectionIndex]}.json`;
      } else if (lessonIndex === 10) {
        //Handle Reptile Facts
        url = `https://www.honeycombartist.com/reptiles-text%2F${reptileLevels[levelIndex]}%2F${reptileNames[sectionIndex]}.json`;
      } else if (lessonIndex === 11) {
        //Handle Fantasy Facts
        url = `https://www.honeycombartist.com/fantasy-text%2F${fantasyLevels[levelIndex]}%2F${fantasyNames[sectionIndex]}.json`;
      } else if (lessonIndex === 12) {
        console.log("runs");
        //Handle Fantasy Facts
        url = `https://www.honeycombartist.com/sea-life-text%2F${seaLifeLevels[levelIndex]}%2F${seaLifeNames[sectionIndex]}.json`;
      } else {
        url = `https://www.honeycombartist.com/lesson-text%2Flesson_${
          lessonIndex + 1
        }_sec_${sectionIndex + 1}_lvl_${levelIndex + 1}.json`;
      }

      await GetLessonText({ url, setLessonText });
    };

    updateText();
  }, [
    lessonIndex,
    levelIndex,
    navigate,
    sectionIndex,
    levelName,
    animalNames,
    animalLevels,
    insectLevels,
    insectNames,
    birdLevels,
    birdNames,
    prehistoricLevels,
    prehistoricNames,
    reptileLevels,
    reptileNames,
    fantasyLevels,
    fantasyNames,
    seaLifeLevels,
    seaLifeNames,
  ]);

  return {
    sectionIndex,
    lessonIndex,
    levelIndex,
    lessonName,
    sectionName,
    levelName,
    animalLessonsData,
    insectLessonsData,
    birdLessonsData,
    prehistoricLessonsData,
    reptileLessonsData,
    animalNames,
    animalLevels,
    insectNames,
    insectLevels,
    prehistoricNames,
    prehistoricLevels,
    reptileNames,
    reptileLevels,
    birdNames,
    birdLevels,
    fantasyNames,
    fantasyLevels,
    fantasyLessonsData,
    seaLifeLessonsData,
    seaLifeNames,
    seaLifeLevels,
    lessonText,
  };
}

export default useLessonText;
