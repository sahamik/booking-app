/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        sage: {
          50: '#f4f7f4', 100: '#e6ede6', 200: '#ccdccc',
          300: '#a5c1a5', 400: '#76a076', 500: '#527d52',
          600: '#3d6340', 700: '#2e4d30', 800: '#263f28',
          900: '#1e3320',
        },
        warm: {
          50: '#fdfbf7', 100: '#faf5ed', 200: '#f4e9d4',
          300: '#ead4aa', 400: '#ddb97a', 500: '#c99a52',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'fade-in': 'fadeIn 0.3s ease forwards',
        'scale-in': 'scaleIn 0.25s ease forwards',
        'slide-right': 'slideRight 0.3s ease forwards',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.96)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        slideRight: { '0%': { opacity: '0', transform: 'translateX(-12px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
}
