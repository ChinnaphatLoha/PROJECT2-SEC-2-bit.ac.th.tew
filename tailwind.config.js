/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'tan-hide': {
          50: '#fef6ee',
          100: '#feebd6',
          200: '#fbd3ad',
          300: '#f8b379',
          400: '#f6995c',
          500: '#f1691e',
          600: '#e34f13',
          700: '#bc3b12',
          800: '#952f17',
          900: '#782a16',
          950: '#411209'
        }
      }
    }
  },
  plugins: [require('daisyui')]
}
