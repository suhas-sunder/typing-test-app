/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["Nunito", "sans-serif"],
        overlock: ["Overlock", "sans-serif"],
      },
      colors: {
        "defaultblue": "#24548C",
      },
    },
  },
  plugins: [],
};
