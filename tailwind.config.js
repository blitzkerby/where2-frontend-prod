/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Poppins']
      },
      colors: {
      "light-100": "#375761",
      "light-300": "#808A8D",
      "light-500": "#ADB6B9",
      "light-700": "#ECEEEF",
      "light-900": "#FBFBFB",
      primary: "#7CD1EB"
    }
    },
  },
  plugins: [],
}

