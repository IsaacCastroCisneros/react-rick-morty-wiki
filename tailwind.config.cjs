/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        background:'#232840',
        border:'rgba(255, 255, 255, 0.1)',
        secondary:'rgb(51 51 51)',
        text:'#9ac6c9',
        link:'#f649a7',
        hover:'#59df7f',
        gradientTop:'#594ab0',
        gradientBottom:'#51b1da',
        card:'#163158'
      }
    },
  },
  plugins: [],
}