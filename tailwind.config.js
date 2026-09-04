/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/renderer/**/*.{html,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        ui: ["Source Sans 3", "system-ui", "sans-serif"],
        read: ["Source Serif 4", "Georgia", "serif"]
      },
      colors: {
        paper: {
          DEFAULT: "#f4efe6",
          muted: "#e8e0d2",
          ink: "#1c1916",
          fade: "#6b6358",
          line: "#d4cbb8"
        },
        night: {
          DEFAULT: "#161412",
          raised: "#211e1a",
          ink: "#ece6dc",
          fade: "#a89f90",
          line: "#3a342c"
        },
        moss: {
          DEFAULT: "#3d5a4c",
          soft: "#5d7a6a",
          bright: "#8fba9e"
        },
        clay: {
          DEFAULT: "#8a4b32",
          soft: "#c07a5c"
        }
      },
      maxWidth: {
        measure: "42rem",
        page: "72rem"
      }
    }
  },
  plugins: []
};
