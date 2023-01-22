/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors:{
        customColor: {
          100:'#49e659',
          200:'#49e700'
        }
      },
      fontSize: {
        base: '18px',
        xs: '5px'
      },
      screens:{
        us: '200px',
        xxs: '280px',
        xs: '486px'
      }
    },
  },
  plugins: [],
}