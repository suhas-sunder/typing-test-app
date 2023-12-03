const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */

export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,}"],
  theme: {
    extend: {
      // prettier-ignore
      fontFamily: {
        'nunito': ['"Nunito"', 'sans-serif'],
        'overlock': ['"Overlock"', 'sans-serif'],
        'roboto': ['"Roboto Serif"', 'serif'],
      },
      colors: {
        defaultblue: "#09427d",
        defaultgreen: "#79fac5",
        "default-light-sky-blue": "rgb(73, 160, 214)",
        "default-sky-blue": "#2b6ab3",
        "start-btn-green": "#4db538",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      const fonts = {
        "@font-face": [
          {
            fontFamily: "Nunito",
            fontWeight: 700,
            src: "url(./src/components/assets/fonts/Nunito-BoldItalic.ttf)",
          },
        ],
      };
      addBase(fonts);
    }),
  ],
};
