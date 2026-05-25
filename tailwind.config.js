export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    colors: {
  primary: "#6C63FF",
  dark: "var(--color-bg)",
  surface: "var(--color-surface)",
  muted: "var(--color-muted)",
  // add this — "foreground" is your adaptive white/dark text color
  foreground: "var(--color-text)",
},
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
}