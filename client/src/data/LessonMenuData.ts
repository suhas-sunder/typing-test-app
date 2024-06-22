
function LessonMenuData() {
  const menuData = [
    {
      id: "beginner-id",
      title: "Beginner",
      icon: "face",
      url: "/lessons/beginner",
    },
    {
      id: "intermediate-id",
      title: "Intermediate",
      icon: "face",
      url: "/lessons/intermediate",
    },
    {
      id: "advanced-id",
      title: "Advanced",
      icon: "face",
      url: "/lessons/advanced",
    },
    {
      id: "graduation-id",
      icon: "graduationHat",
      title: "Graduation",
      url: "/lessons/graduation",
    },
    {
      id: "quotes-id",
      icon: "quote",
      title: "Quotes",
      url: "/lessons/quotes",
    },
    {
      id: "common-words-id",
      icon: "azLetters",
      title: "Common Words",
      url: "/lessons/common-english-words",
    },
    {
      id: "animals-id",
      icon: "paw",
      title: "Animal Facts",
      url: "/lessons/animal-facts",
    },
  ];

  return menuData;
}

export default LessonMenuData;
