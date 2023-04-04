/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        app: {
          dark1: '#17181F',
          dark2: '#20212C',
          white: '#F6FFFF',
          accent1: '#F777A0',
          accent2: '#6DC3BF',
          accent3: '#AB67E4',
        },
      },
    },
  },
  plugins: [],
};
