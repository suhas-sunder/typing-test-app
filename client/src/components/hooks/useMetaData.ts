import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useLessonText from "./useLessonText";

//Update metadata based on current url
export default function useMetaData() {
  const location = useLocation();
  const pathname = location.pathname;
  const { lessonName, sectionName, levelName } = useLessonText(); //gets lesson text and data obtained from pathname

  const defaultTitle =
    "✨🔥 Free Typing Education ⭐ Take a Speed Test to Learn Your WPM 🚀 Learn Touch Typing 🔥 Touch Typing Education 👀 FreeTypingCamp.com";

  const defaultDescription =
    "🧠🤓 Free Typing Education 💀 Learn to type and improve your skills with structured lessons 🤓, certificates 📜, and learning challenges 🎓! Test your typing speed and keep track of score and progress 🤩. Unlock achievements, themes, and images to fully customize your space. 😊 Sign up is free, start earning points. 🥹 Gain access to custom themes, images, and a variety of unlockables.";

  const [metaData, setMetaData] = useState<{ [key: string]: string }>({
    title: defaultTitle,
    description: defaultDescription,
  });

  useEffect(() => {
    if (pathname === "/") {
      setMetaData({
        title: defaultTitle,
        description: defaultDescription,
      });
    } else if (pathname === "/typing-test") {
      setMetaData({
        title:
          "✨💥 Typing Test - WPM Speed Typing Test 🏆 Touch Typing Education 🎓 FreeTypingCamp.com 💯",
        description:
          "🔥 Take a free wpm speed typing test to find out your typing speed! ⏱️ Find out your typing score for 1 minute, 2 min, 5 min, and 10 min tests. 💪 Improve your typing speed by practicing our typing lessons. 🎮 Hundreds of hours of unique gamified practice so you will never get bored! 🚀",
      });
    } else if (pathname === "/games") {
      setMetaData({
        title:
          "✨🎮 Free Typing Games (Fun, Addicting, & Educational) 🎉 Touch Typing Education 📚 FreeTypingCamp.com 🏅",
        description:
          "🎯 Gamify your learning and improve your touch typing skills. 🖱️ Learn how to type letters of the alphabet, words in the English language 🌍 (international languages coming soon), as well as symbols and numbers with a variety of fun and unique skill-based typing games. 🕹️ Get feedback through detailed statistics 📊, and earn points to unlock profile images, themes, and much more! 🎉",
      });
    } else if (
      pathname.includes("/lessons/") &&
      !pathname.includes("/lessons/lesson")
    ) {
      setMetaData({
        title: `✨📚 Typing Lessons for Adults, Kids, and All Ages in-Between 🎓 Beginner to Advanced 🥇 Touch Typing Education 🏆 FreeTypingCamp.com`,
        description: `📝 Typing Lessons for ${lessonName}! If you don't know how to type or are looking for a structured learning experience to improve your skills, you've come to the right place! 🚀 Level up your skills by completing typing lessons that teach English words (International languages coming soon) 🌍, symbols, numbers, and more. 🕐 Hundreds of hours of free content to keep you busy and constantly improving your skills. Start learning today! 🎉`,
      });
    } else if (pathname === "/login") {
      setMetaData({
        title:
          "✨🔑 Free Typing Education (Touch Typing) 🎓 Login 🔒 FreeTypingCamp.com 🏅",
        description:
          "💻 Login to an already existing account on freetypingcamp.com and enjoy the perks of having an account. 🥇 Customize the website to your needs, unlock English typing (international languages coming soon) achievements, view statistics, earn score points, unlock themes and profile images, and much more. Login now and start your free typing education today! 🚀",
      });
    } else if (pathname === "/register") {
      setMetaData({
        title:
          "✨📝 Free Typing Camp Register 🎮 Lessons, Games, Achievements, Statistics, Certificates 🏆 Touch Typing Education 🎓 FreeTypingCamp.com",
        description:
          "🎉 Register for a free account on freetypingcamp.com and enjoy the perks of having an account. 🛠️ Optimize your website experience with customizable features tailored to your needs. 🔓 Unlock English typing capabilities (international languages coming soon), achieve milestones, view detailed statistics, earn score points, and access exclusive themes and profile images. Enjoy these benefits and much more. Register now and start your free touch typing education today! 🚀",
      });
    } else if (pathname === "/profile") {
      setMetaData({
        title:
          "✨🐱 Typing Education 🎓 Manage Your Typing Profile 🐻 Touch Typing Education 🐯 FreeTypingCamp.com",
        description:
          "🐉 Manage your profile using our fun and interactive profile dashboard. 🎮 Sections include profile, profile images, statistics, achievements, themes, and account settings. 🔐 This page also allows users to logout when needed and can only be accessed by users that have created an account and are logged in. Creating an account is completely free! 🎉",
      });
    } else if (pathname === "/profile/summary") {
      setMetaData({
        title:
          "✨✨ Typing Education 📝 Summary 🎓 Learn Touch Typing 🏅 FreeTypingCamp.com",
        description:
          "💥 View your profile summary with a welcoming display of your username, a preview of your profile image, and shortcut links to the speed typing test, typing games, and lessons page! 🚀",
      });
    } else if (pathname === "/profile/img") {
      setMetaData({
        title:
          "✨📸 Typing Education 🖼️ Images (100+ Profile Images) 🎨 Bring Your Account to Life 🎉 FreeTypingCamp.com",
        description:
          "🎯 Manage your profile images by selecting the best profile pic to give a personal touch to your account. 🎨 Select one of hundreds of colorful images which can be unlocked by earning points. 🏅 Points are earned by completing lessons, taking a speed typing test, and playing games. Start playing and spice up your profile by unlocking the right profile image to meet your needs! 🎮",
      });
    } else if (pathname === "/profile/stats") {
      setMetaData({
        title:
          "✨📊 Typing Education 📈 Typing Statistics (WPM, CPM, Troubled Keys, Charts & Graphs) 🔥 Touch Typing Education 💪 FreeTypingCamp.com",
        description:
          "📊 View detailed typing lesson, game, and speed test statistics for English typing (international coming soon). 📈 Stats include words per minute (WPM), characters per minute (CPM), score, time spent, words, characters, troubled keys or tricky keys, certificates, and more. 📉 Detailed charts to help visualize your metrics will be available soon! 🚀",
      });
    } else if (pathname === "/profile/achievements") {
      setMetaData({
        title:
          "✨🏆 Typing Education 🏅 Achievements & Badges 🎖️ Touch Typing Education 🎯 FreeTypingCamp.com",
        description:
          "🏅 All of your English typing achievements (international coming soon) and badges, and select which ones to showcase or share when other users view your profile or certificates. 💪 Each badge or achievement represents hours of work to achieve improvements in your typing skills, vocabulary, English alphabet and word learning, and more! 🎉",
      });
    } else if (pathname === "/profile/account") {
      setMetaData({
        title:
          "✨🔐 Typing Education ⚙️ Account Settings 🛠️ Touch Typing Education 🔑 FreeTypingCamp.com",
        description:
          "🛠️ Manage your freetypingcamp.com account settings with options to change your username, email, and password as needed. 🖥️ A live preview of your account information will also be provided. Additionally, you can choose to delete your account if necessary. 🔒",
      });
    } else if (pathname === "/learn") {
      setMetaData({
        title:
          "✨📚 Free Typing Simple (But Effective) 📝 Structured Learning Experience 📖 FAQ 💡 Learn Tips, Tricks, Best Practices, and More! 🚀 Touch Typing Education 📊 FreeTypingCamp.com",
        description:
          "📚 Browse through plenty of articles covering topics that help improve your English (international languages coming soon) typing skills and knowledge. 📝 Learn about posture, finger positioning, typing without looking, and other relevant typing-related knowledge. 🎓 Make the best of your experience by learning all about the website and functionalities we offer! 🚀",
      });
    } else if (pathname === "/cookiespolicy") {
      setMetaData({
        title:
          "✨🍪 Free Touch Typing 🍭 Cookies Policy 🍬 Touch Typing Education 🍫 FreeTypingCamp.com",
        description:
          "🍪 This Cookie Policy explains how http://freetypingcamp.com ('Company,' 'we,' 'us,' and 'our') uses cookies and similar technologies to recognize you when you visit our website at https://freetypingcamp.com ('Website'). 🍫 It explains what these technologies are and why we use them, as well as your rights to control our use of them. 🍩 In some cases we may use cookies to collect personal information, or that becomes personal information if we combine it with other information. 🧁",
      });
    } else if (pathname === "/privacypolicy") {
      setMetaData({
        title:
          "✨🔒 Free Touch Typing 🔐 Privacy Policy 🛡️ Touch Typing Education 🧑‍💻 FreeTypingCamp.com",
        description:
          "🛡️ This privacy notice for https://freetypingcamp.com ('we,' 'us,' or 'our'), describes how and why we might collect, store, use, and/or share ('process') your information when you use our services ('Services'), such as when you Visit our website at http://freetypingcamp.com, or any website of ours that links to this privacy notice with us in other related ways, including any sales, marketing, or events. 🧑‍💻 Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. 🚀",
      });
    } else if (pathname === "/termsofservice") {
      setMetaData({
        title:
          "✨📜 Free Touch Typing 📄 Terms Of Service 📚 Touch Typing Education 🛡️ FreeTypingCamp.com",
        description:
          "📝 AGREEMENT TO OUR LEGAL TERMS 🛡️ We are https://freetypingcamp.com ('Company,' 'we,' 'us,' 'our'). We operate the website https://freetypingcamp.com (the 'Site'), as well as any other related products and services that refer or link to these legal terms (the 'Legal Terms') (collectively, the 'Services'). You can contact us by email at admin@freetypingcamp.com or by mail to http://freetypingcamp.com, Toronto, Ontario, Canada. 🇨🇦",
      });
    } else if (pathname.includes("lessons/lesson/")) {
      setMetaData({
        title: `🚀 ${lessonName} - ${sectionName} - ${levelName} - Free Typing Lessons 📚 Learn To Type Fast 💨 FreeTypingCamp.com`,
        description: `🎯 Learn how to type fast and fluently by practicing the following lesson: ${lessonName} 📝 ${sectionName} ✏️ ${levelName} 🌠. Keep practicing and improve your English typing skills (international languages coming soon) 🌍 as you move from one level to another. Each level is progressively harder 🎮 going from beginner to advanced and beyond! 🚀`,
      });
    } else if (pathname === "/games/calculator") {
      setMetaData({
        title:
          "✨🧮 Free Typing Game 🎯 Calculator (Math Game, Learn Fast Calculations) 🔢 FreeTypingCamp.com",
        description:
          "🧠 The typing calculator game helps users learn how to type all keys on the keypad available on a traditional keyboard. 🔢 Numbers and symbols are displayed and the user must match every character accurately to earn the highest score, accuracy, and WPM possible. Depending on the difficulty of the game, users will have one to six lives. A life is depleted when a mistake is made, and when all lives are over, the game ends. 🚀",
      });
    } else if (pathname === "/sitemap") {
      setMetaData({
        title:
          "✨📜 Educational Typing Games, Lessons, and Activities 📚 Glossary of All Resources 🗺️ FreeTypingCamp.com",
        description:
          "🗺️ Explore sitemap to find a glossary of all links and resources available on freetypingcamp.com. 🔍 Sign up free and start improving your keyboard touch typing skills today! 🎓 Easily navigate to any page or section without having to worry about missing anything. 🚀",
      });
    } else if (pathname.includes("/verify-email")) {
      setMetaData({
        title:
          "✨📧 Free Typing Camp - Verify Your Email and Start Typing 🖊️ FreeTypingCamp.com",
        description:
          "✅ Verify your email account on Free Typing Camp and gain access to your account. 🎓 Start tracking your progress, unlock achievements, and customize your profile! 🚀",
      });
    } else if (pathname.includes("/forgot-password")) {
      setMetaData({
        title:
          "✨🔐 Free Typing Camp - Reset Your Forgotten Password With Ease 🔄 FreeTypingCamp.com",
        description:
          "🔄 Reset your account password on Free Typing Camp and regain access to your account. 🔓 Start tracking your progress, unlock achievements, and customize your profile! 🚀",
      });
    } else {
      setMetaData({
        title: "✨ 404 Page Not Found 🥹",
        description:
          "Free Typing Education ❤️‍🩹 An error has been encountered and the page being requested could not be found. 🩹 Please try again later! 🥰",
      });
    }
  }, [lessonName, levelName, pathname, sectionName]);

  return { metaData };
}
