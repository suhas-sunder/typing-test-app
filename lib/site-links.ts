export const siteUrl = "https://www.freetypingcamp.com";

export const utilityLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/sitemap", label: "Sitemap" },
];

export const creatorLinks = [
  {
    href: "https://www.suhassunder.com/",
    label: "Suhas Sunder",
    note: "Developer portfolio",
  },
  {
    href: "https://ca.linkedin.com/in/s-sunder",
    label: "LinkedIn",
    note: "Professional profile",
  },
  {
    href: "https://github.com/suhas-sunder",
    label: "GitHub",
    note: "Code and projects",
  },
];

export const similarProjectLinks = [
  { href: "https://morsewords.com", label: "MorseWords", note: "Translate, hear, and practise Morse code." },
  { href: "https://ilovewordsearch.com", label: "I Love Word Search", note: "Create printable and online word search puzzles." },
  { href: "https://ilovesvg.com", label: "iLoveSVG", note: "Convert images, logos, and artwork into editable SVGs." },
];

export const socialLinks = [...creatorLinks, ...similarProjectLinks];

export const sitemapLinks = [
  { href: "/", label: "Home", description: "Start typing practice and see the main practice path." },
  { href: "/typing-test", label: "Typing Test", description: "Run a focused typing test with accuracy and WPM feedback." },
  { href: "/lessons", label: "Lessons", description: "Browse structured typing lessons and levels." },
  { href: "/learn", label: "Learn", description: "Review typing basics, posture, accuracy, and next steps." },
  { href: "/games", label: "Games", description: "Open simple practice games that support typing skill." },
  { href: "/games/calculator", label: "Calculator Sprint", description: "Practice fast number entry with a focused calculator game." },
  { href: "/progress", label: "Progress", description: "View progress saved in this browser on this device." },
  { href: "/about", label: "About", description: "Learn what Free Typing Camp is for." },
  { href: "/contact", label: "Contact", description: "Send support, correction, and accessibility notes." },
  { href: "/socials", label: "Socials", description: "Find creator and project links." },
  { href: "/privacy", label: "Privacy", description: "Read how practice and browser data are handled." },
  { href: "/terms", label: "Terms", description: "Review the plain-language terms for using the site." },
  { href: "/cookies", label: "Cookies", description: "Learn about cookies, localStorage, and browser storage." },
];
