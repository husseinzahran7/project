export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(36, 100%, 95%)',
          100: 'hsl(36, 100%, 90%)',
          200: 'hsl(36, 100%, 80%)',
          300: 'hsl(36, 100%, 70%)',
          400: 'hsl(36, 100%, 60%)',
          500: 'hsl(36, 100%, 50%)', // Main orange/gold color
          600: 'hsl(36, 100%, 45%)',
          700: 'hsl(36, 100%, 40%)',
          800: 'hsl(36, 100%, 35%)',
          900: 'hsl(36, 100%, 30%)',
        },
        secondary: {
          50: 'hsl(220, 70%, 95%)',
          100: 'hsl(220, 70%, 90%)',
          200: 'hsl(220, 70%, 80%)',
          300: 'hsl(220, 70%, 70%)',
          400: 'hsl(220, 70%, 60%)',
          500: 'hsl(220, 70%, 50%)',
          600: 'hsl(220, 70%, 40%)',
          700: 'hsl(220, 70%, 30%)', // Main navy blue color
          800: 'hsl(220, 70%, 20%)',
          900: 'hsl(220, 70%, 10%)',
        },
        background: 'hsl(0, 0%, 25%)', // Dark gray background
        card: 'hsl(0, 0%, 20%)', // Slightly darker gray for cards
        text: {
          primary: 'hsl(0, 0%, 98%)', // Almost white for main text
          muted: 'hsl(0, 0%, 85%)', // Light gray for muted text
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}