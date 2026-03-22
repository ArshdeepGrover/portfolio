const baseConfig = require('../../tailwind.config.base');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: [
    "./projects/studio/src/**/*.{html,ts}",
  ],
}
