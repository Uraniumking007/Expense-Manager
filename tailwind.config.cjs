/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './*.{html,js}'],
  theme: {
    extend: {
      colors: {
        space: '#EEEEEE',
        teal: '#00ADB5',
        grey: '#D3D3D3',
        black: '#222831',
      },
    },
  },
  plugins: [],
};
