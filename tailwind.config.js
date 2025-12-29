/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media", // system theme
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        DEFAULT: "rgb(var(--text))", // all text inherits body
        muted: "rgb(var(--muted))",
      },
      backgroundColor: {
        DEFAULT: "rgb(var(--bg))",
        card: "rgb(var(--card))",
      },
      borderColor: {
        DEFAULT: "rgb(var(--border))",
      },
    },
  },
  plugins: [],
};
