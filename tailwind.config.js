
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // If testing, keep this: "./src/Pages/LoginPage.jsx",
  ],
  theme: {
    extend: {
      colors: {
        'custom-red': '#FF0000',
        'custom-blue': '#0000FF',
        'farmart-green': '#4CAF50',
      },
      backgroundImage: {
        'gradi-green-fade': 'linear-gradient(180deg, #89FB17 13.5%, #8BFB30 32.19%, #91FD80 92.5%)',
      },
    },
  },
  plugins: [],
}