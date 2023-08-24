/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '400px',
      md: '768px',
    },
    extend: {
      spacing: {
        '78px': '78px',
        '478px': '478px',
        '1439px': '1439px',
        '137px': '137px',
        '200px': '200px',
        '87px': '87px',
      },
      colors: {
        '#036B52': '#036B52',
        '#F0F2F5': '#F0F2F5',
        '#2FC18C': '#2FC18C',
        '#003BE5': '#003BE5',
      },
    },
  },
  plugins: [],
};
