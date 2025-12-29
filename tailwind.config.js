/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media", // system-based
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg))",
        card: "rgb(var(--card))",
        text: "rgb(var(--text))",
        muted: "rgb(var(--muted))",
        border: "rgb(var(--border))",
      },
    },
  },
  plugins: [],
};
