/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0078E7',
        danger: '#D83131',
        twitter: '#1D9BF0',
        gray70: '#707070',
        white: '#ffffff',
        black: '#000000',
        success: '#00C27C',
        warning: '#FFA800',
      },
    },
  },
  plugins: [],
  important: true,
}

