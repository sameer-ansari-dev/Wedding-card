/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          900: '#2A0D16',
          800: '#3D1421',
          700: '#4E1B2B',
          DEFAULT: '#5B2033',
          light: '#7A2C45',
        },
        gold: {
          light: '#F8E8A6',
          DEFAULT: '#D4AF37',
          dark: '#AA771C',
          amber: '#FFD700',
          rose: '#E6C687',
        },
        cream: {
          50: '#FFFEFA',
          DEFAULT: '#F9F4EC',
          dark: '#EDE2D0',
        },
        midnight: '#13080E',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        cinzel: ['Cinzel Decorative', 'Cinzel', 'serif'],
        arabic: ['Amiri', 'Scheherazade New', 'serif'],
        cursive: ['Great Vibes', 'Alex Brush', 'cursive'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)',
        'maroon-gradient': 'linear-gradient(180deg, #3D1421 0%, #5B2033 50%, #2A0D16 100%)',
        'radial-night': 'radial-gradient(circle at center, #3D1421 0%, #13080E 100%)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)' },
          '50%': { opacity: '1', boxShadow: '0 0 30px rgba(212, 175, 55, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      }
    },
  },
  plugins: [],
}
