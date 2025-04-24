module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  purge: [],
  darkMode: "class", // or 'media' or 'class'

  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
