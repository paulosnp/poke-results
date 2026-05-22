/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pokemon: {
          red: '#ff5350',
          blue: '#2aacdf',
          yellow: '#ffcb05',
          darkBlue: '#1d2c5e',
        }
      }
    },
  },
  plugins: [],
}
