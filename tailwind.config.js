/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');


const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: { 'max': "980px" }, // Mobile-first approach for max-width
      lg: { 'min': "981px" }, // Desktop-first approach for min-width
    },
    extend: {
      spacing: {
        10: "10px",
        20: "20px",
        30: "30px",
        40: "40px",
        80: "80px",
        100: "100px",
        160: "160px",

        "section-top-margin": "3.9375rem",
        "image-container-top-margin": "5rem",
      },
      padding: {
        'sectional-top': '5rem',  // Custom padding value
        '14': '3.5rem',  // Another custom padding value
      },
      maxWidth: {
        container: "886px",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        h1: "2.75rem",
        h1p: "2.375rem",
        h2: "2rem",
        h3: "1.75rem",
        h4: "1.4375rem",
        h4p: "1.3125rem",
        h5: "1.25rem",
        h6: "1.125rem",
        p: "1rem",
        pp: "0.75rem",
      },
      screens: {
        'sm': {'max': '980px'},
        'rd' : {'min' : '981px', 'max' : '1003px' },
        'lg': { 'min' : '1004px' },
        'custom-blue' : 'rbg(0, 122, 255)'
      },
      screens: {
        'sm': {'max': '980px'},
        'lg': { 'min' : '1004px' },
        'custom-blue' : 'rbg(0, 122, 255)'
      },
      colors: {
        "light-100": "#375761",
        "light-300": "#808A8D",
        "light-500": "#ADB6B9",
        "light-700": "#ECEEEF",
        "light-900": "#FBFBFB",
        primary: "#7CD1EB",
      },
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.05em",
        tight: "-.03em",
        normal: "0",
        wide: ".025em",
        wider: ".05em",
        widest: ".1em",
      },
      backgroundImage: {
        "gray-primary":
          "linear-gradient(180deg, #E3E3E3 0%, #EEEEEE 19%, #FFFFFF 82%, #F6F6F6 100%)",
      },
      clipPath: {
        'border-box': 'border-box',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.clip-border-box': {
          'clip-path': 'border-box',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};

