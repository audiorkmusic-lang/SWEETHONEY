/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF7',
          100: '#FFF9EC',
          200: '#FDF3DC',
          300: '#F8E8C4',
        },
        honey: {
          50: '#FFF8E6',
          100: '#FFEEB8',
          200: '#FFE08A',
          300: '#FFD05C',
          400: '#F7B733',
          500: '#E8A317',
          600: '#C8850E',
          700: '#A66A09',
        },
        brown: {
          700: '#5C3A1E',
          800: '#4A2F18',
          900: '#3B2512',
        },
        beige: {
          100: '#F5EDDA',
          200: '#EFE4CC',
          300: '#E7D8B8',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(-8deg)' },
        },
        floatFast: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(247,183,51,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(247,183,51,0)' },
        },
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-medium': 'floatMedium 5s ease-in-out infinite',
        'float-fast': 'floatFast 4s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'pulse-gold': 'pulseGold 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
