export default function SitemapData() {
  const pageData = [
    {
      id: "pages-home-id",
      title: "Home",
      url: "/",
      links: [
        {
          id: "typing-test-id",
          name: "Speed Typing Test",
          url: "/",
        },
      ],
    },
    {
      id: "pages-games-id",
      title: "Games",
      url: "/games",
      links: [
        {
          id: "calculator-game-id",
          name: "Calculator Game",
          url: "/games/calculator",
        },
      ],
    },
    {
      id: "pages-learn-id",
      title: "Learn",
      url: "/learn",
      links: [],
    },
    {
      id: "pages-tos-privacy-id",
      title: "TOS & Privacy",
      url: "/termsofservice",
      links: [
        {
          id: "terms-of-service-link-id",
          name: "Terms Of Service",
          url: "/termsofservice",
        },
        {
          id: "cookies-policy-link-id",
          name: "Cookie Policy",
          url: "/cookiespolicy",
        },
        {
          id: "privacy-policy-link-id",
          name: "Privacy Policy",
          url: "/privacypolicy",
        },
      ],
    },
  ];
  return pageData;
}
