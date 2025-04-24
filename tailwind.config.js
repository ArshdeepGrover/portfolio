/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables dark mode class-based toggle
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      white: {
        0: "#ffffff",
        100: "#fffaf8",
        200: "#fff4f1",
        300: "#ffefeb",
        400: "#ffe9e4",
        500: "#ffe4dd",
        600: "#ccb6b1",
        700: "#998985",
        800: "#665b58",
        900: "#332e2c",
      },
      primary: {
        100: "#ffe4dd",
        200: "#ffc9bb",
        300: "#ffaf9a",
        400: "#ff9478",
        500: "#ff7956",
        600: "#cc6145",
        700: "#994934",
        800: "#663022",
        900: "#331811",
      },
      gray: {
        100: "#e1e3e6",
        200: "#c4c7cc",
        300: "#a6aab3",
        400: "#898e99",
        500: "#6b7280",
        600: "#565b66",
        700: "#40444d",
        800: "#2b2e33",
        900: "#15171a",
      },

      Grape: "#6633CC",
      Byzantine: "#BF2CBA",
      PersianBlue: "#312CBF",
      Gray: "#A8A9AD",
    },
    extend: {
      height: {
        navbar: "3.5rem",
      },
    },
  },
  plugins: [],
};
