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
        '425px': '425px',
        '87px': '87px',
      },
      colors: {
        verde: '#036B52',
        '#F0F2F5': '#F0F2F5',
        '#2FC18C': '#2FC18C',
        azul: '#003BE5',
        vermelho: '#C91515',
      },
    },
  },
  plugins: [],
  safelist: ['bg-verde', 'bg-azul'],
};
