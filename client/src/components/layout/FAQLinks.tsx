import { Link } from "react-router-dom";

export default function FAQLinks() {
  const faqData = [
    {
      id: "common-questions",
      sectionTitle: "Common Questions",
      questionLinks: [
        {
          id: "reset-my-password",
          question: "How do I reset my password?",
          url: "",
        },
        {
          id: "is-it-all-free",
          question: "Is it all free?",
          url: "",
        },
        {
          id: "mobile-and-tablet",
          question: "Do you support mobile and tablet?",
          url: "",
        },
        {
          id: "browser-support",
          question: "What browsers do you support?",
          url: "",
        },
        {
          id: "delete-my-account",
          question: "How can I delete my account?",
          url: "",
        },
        {
          id: "report-an-issue",
          question: "I'm having an issue with the website, what should I do?",
          url: "",
        },
      ],
    },
    {
      id: "settings",
      sectionTitle: "Settings",
      questionLinks: [],
    },
    {
      id: "statistics",
      sectionTitle: "Statistics",
      questionLinks: [],
    },
    {
      id: "achievements-&-unlockables",
      sectionTitle: "Achievements & Unlockables",
      questionLinks: [],
    },
    {
      id: "speed-test",
      sectionTitle: "Speed Test",
      questionLinks: [],
    },
    {
      id: "lessons",
      sectionTitle: "Lessons",
      questionLinks: [],
    },
    {
      id: "games",
      sectionTitle: "Games",
      questionLinks: [],
    },
    {
      id: "certificates",
      sectionTitle: "Certificates",
      questionLinks: [],
    },
    {
      id: "tips-and-tricks",
      sectionTitle: "Tips and Tricks",
      questionLinks: [],
    },
    {
      id: "about-ftc",
      sectionTitle: "About FreeTypingCamp",
      questionLinks: [
        { id: "why-ads", question: "Why are there ads?", url: "" },
        {
          id: "why-make-this",
          question: "Why did you make this website?",
          url: "",
        },
        {
          id: "how-website-was-made",
          question: "How did you make this website?",
          url: "",
        },
      ],
    },
    {
      id: "technical-stuff",
      sectionTitle: "Technical Stuff",
      questionLinks: [
        {
          id: "how-is-wpm-calc",
          question: "How is wpm calculated",
          url: "",
        },
        {
          id: "how-is-cpm-calc",
          question: "How is cpm calculated",
          url: "",
        },
        {
          id: "how-trouble-keys",
          question: "How are trouble keys tracked?",
          url: "",
        },
      ],
    },
  ];
  return (
    <>
      <h2 className="flex w-full justify-center font-nunito text-3xl text-defaultblue">
        Frequently Asked Questions & User Guide
      </h2>
      {faqData.map((data) => (
        <div
          key={data.id}
          className="flex w-full flex-col gap-6 text-slate-800"
        >
          <h2 className="font-lora text-2xl">{data?.sectionTitle}</h2>
          <ul className="flex list-disc flex-col gap-4 pl-10 font-lato text-xl">
            {data?.questionLinks?.map((linkData) => (
              <li
                key={linkData.id}
                className=" mr-auto cursor-pointer py-2 hover:text-sky-600"
              >
                <Link to={linkData?.url}>{linkData?.question}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
