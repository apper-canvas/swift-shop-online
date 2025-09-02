/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#0F172A',
        secondary: '#64748B',
        accent: '#3B82F6',
        surface: '#FFFFFF',
        background: '#F8FAFC'
      },
      animation: {
        'bounce-subtle': 'bounce 0.5s ease-in-out',
        'slide-in-right': 'slideInRight 300ms ease-out forwards',
        'slide-out-right': 'slideOutRight 300ms ease-out forwards'
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}