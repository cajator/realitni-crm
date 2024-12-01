/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#1a1e2e', // tmavé pozadí
          700: '#2a2f44', // světlejší karty
          600: '#3a3f54', // aktivní položky v menu
          500: '#4a4f64', // hover stavy
          400: '#6a6f84', // méně důležitý text
        }
      }
    },
  },
  plugins: [],
}