/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf3f1',
          100: '#fbe7e2',
          200: '#f7cfc4',
          300: '#f3b7a6',
          400: '#ef9f88',
          500: '#eb876a',
          600: '#eb5e28', // Our main primary color
          700: '#d54516',
          800: '#b03712',
          900: '#8c2c0e',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};