/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  prefix: "cre-",
  theme: {
    colors: {
      // primary: {
      //   100: "#ebdcf8",
      //   200: "#d8b8f1",
      //   300: "#c495eb",
      //   400: "#b171e4",
      //   500: "#9d4edd",
      //   600: "#7e3eb1",
      //   700: "#5e2f85",
      //   800: "#3f1f58",
      //   900: "#1f102c",
      // },
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
