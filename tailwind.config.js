/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#124C3B',
          2: '#9FE2B3',
        },
        bg: '#FFFFFF',
        text: '#333333',
        muted: '#777777',
        card: '#F8FBF9',
        'dark-bg': '#101C17',
        'dark-card': '#182820',
        'dark-text': '#E9E9E9',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
      },
      boxShadow: {
        sm: '0 4px 12px rgba(0, 0, 0, 0.12)',
      },
      transitionDuration: {
        fast: '0.18s',
        default: '0.28s',
        long: '0.6s',
      },
    },
  },
  plugins: [],
};
