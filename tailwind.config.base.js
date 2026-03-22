/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF7955',
          light: '#FF9B80',
          dark: '#E65E3B',
          50: '#FFF1ED',
          100: '#FFE0D6',
          200: '#FFC1AD',
          300: '#FFA285',
          400: '#FF9B80',
          500: '#FF7955',
          600: '#E65E3B',
          700: '#CC4422',
          800: '#993316',
          900: '#66220F',
        },
        dark: {
          DEFAULT: '#0A0A0A',
          secondary: '#111111',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
