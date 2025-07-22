/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D4AF37', // Gold
          50: '#FDF8E7',
          100: '#FAF0C4',
          200: '#F5E085',
          300: '#F0D046',
          400: '#E8C547',
          500: '#D4AF37',
          600: '#B8941F',
          700: '#9C7A19',
          800: '#806013',
          900: '#64460D',
        },
        secondary: {
          DEFAULT: '#1A1A1A', // Rich Black
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#1A1A1A',
        },
        accent: {
          DEFAULT: '#FFFFFF', // Pure White
          cream: '#FEFCF7',
          pearl: '#F8F6F0',
        },
        luxury: {
          gold: '#FFD700',
          champagne: '#F7E7CE',
          platinum: '#E5E4E2',
          obsidian: '#0F0F0F',
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'luxury': ['Cormorant Garamond', 'serif'],
      },
      boxShadow: {
        'luxury': '0 10px 40px rgba(212, 175, 55, 0.1)',
        'gold': '0 4px 20px rgba(212, 175, 55, 0.3)',
        'elegant': '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1A1A1A 0%, #333333 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 50%, #D4AF37 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
