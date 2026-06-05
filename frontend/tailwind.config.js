/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#292661',
          dark: '#1e1c47',
          light: '#3c3882'
        }
      }
    },
  },
  plugins: [],
}
