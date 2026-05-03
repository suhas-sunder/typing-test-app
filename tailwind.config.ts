import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        camp: {
          cream: "rgb(var(--color-cream) / <alpha-value>)",
          paper: "rgb(var(--color-paper) / <alpha-value>)",
          surface: "rgb(var(--color-surface) / <alpha-value>)",
          ink: "rgb(var(--color-ink) / <alpha-value>)",
          navy: "rgb(var(--color-navy) / <alpha-value>)",
          muted: "rgb(var(--color-muted) / <alpha-value>)",
          orange: "rgb(var(--color-orange) / <alpha-value>)",
          coral: "rgb(var(--color-coral) / <alpha-value>)",
          sage: "rgb(var(--color-sage) / <alpha-value>)",
          tan: "rgb(var(--color-tan) / <alpha-value>)",
          peach: "rgb(var(--color-peach) / <alpha-value>)",
        },
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        lift: "var(--shadow-lift)",
      },
      borderRadius: {
        camp: "var(--radius-card)",
        pill: "999px",
      },
    },
  },
  plugins: [],
};

export default config;
