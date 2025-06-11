// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b57d0',
        secondary: '#039be5',
        customGray: '#dde3ea',
        customBlack: '#1f1f1f',
        white: '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Noto Sans KR"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
