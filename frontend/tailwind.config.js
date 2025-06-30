/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
 theme: {
  extend: {
    animation: {
      "float-1": "float 18s ease-in-out infinite",
      "float-2": "floatReverse 22s ease-in-out infinite",
      "float-3": "float 20s ease-in-out infinite",
      "float-4": "floatReverse 16s ease-in-out infinite",
    },
    keyframes: {
      float: {
        "0%, 100%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-40px)" },
      },
      floatReverse: {
        "0%, 100%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(40px)" },
      },
    },
  },
},

  plugins: [],
};

