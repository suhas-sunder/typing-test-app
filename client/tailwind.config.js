/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        overlock: ["Overlock", "sans-serif"],
        roboto: ["Roboto Serif", "serif"],
      },
      colors: {
        defaultblue: "#24548C",
        defaultgreen: "#79fac5",
        "start-btn-green": "#4db538",
      },
    },
  },
  plugins: [],
};
