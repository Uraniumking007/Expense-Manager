/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './*.{html,js}'],
  theme: {
    extend: {
      colors: {
        space: '#051923',
        teal: '#0582CA',
        grey: '#00A6FB',
        black: '#222831',
        'dark-blue': '#006494',
        'grey-dark': '#003554',
      },
    },
  },
  plugins: [],
};
