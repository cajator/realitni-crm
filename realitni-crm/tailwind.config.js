/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          50: '#E7E9EF',
          100: '#C2C9D6',
          200: '#A3ADC2',
          300: '#7B89A8',
          400: '#576784',
          500: '#384766',
          600: '#283557',
          700: '#1B2447',
          800: '#111936',
          900: '#0B1129',
        }
      }
    },
  },
  plugins: [],
}