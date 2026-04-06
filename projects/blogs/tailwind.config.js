const baseConfig = require('../../tailwind.config.base');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    "./projects/blogs/src/**/*.{html,ts}",
  ],
}
