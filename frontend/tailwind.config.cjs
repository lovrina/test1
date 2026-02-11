/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Instrument Sans"', 'sans-serif'],
        display: ['"Space Grotesk"', '"Instrument Sans"', 'sans-serif']
      },
      boxShadow: {
        glow: '0 20px 60px -40px rgba(15, 23, 42, 0.65)',
        card: '0 25px 80px -60px rgba(15, 23, 42, 0.8)'
      },
      colors: {
        midnight: '#0b1220',
        aurora: '#6ee7b7',
        sunrise: '#f9a8d4'
      }
    }
  },
  plugins: []
};
