/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF7955',
        'primary-light': '#FF9B80',
        'primary-dark': '#E65E3B',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}