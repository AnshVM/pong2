/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.html",

  ],
  theme: {
    extend: {
      colors: {
        'main-bg': '#01052b'
      },
      fontFamily:{
        'arcade':['Press Start 2P']
      }
    },
  },
  plugins: [],
}
