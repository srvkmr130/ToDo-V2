const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/**/*.{html,ts}",
    "./src/**/*.{html,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
    "./public/*.{js,jsx,ts,tsx}",
    "./public/*.{js,jsx,ts,tsx,html}",
    "./public/**/*.{html,js}",
    "./public/*.{html,js}",
    ".*",
  ],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here
        "custom-violet": "#6b77b7",
      },
    },
  },
  plugins: [],
};
// #6b77b7
