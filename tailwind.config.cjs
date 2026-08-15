/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17242b',
        muted: '#64747d',
        paper: '#fbfcfd',
        canvas: '#eef2f5',
        moss: '#1e4842',
        fern: '#7ad9bc',
        citrus: '#f4b36b',
        terracotta: '#e98272',
        lavender: '#a7b6f5',
        peach: '#f2c5a4',
      },
      fontFamily: {
        sans: ['"Segoe UI"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['"Arial Rounded MT Bold"', '"Trebuchet MS"', 'ui-rounded', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(23, 36, 43, 0.07)',
        lift: '0 18px 50px rgba(23, 36, 43, 0.14)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'signal-in': {
          '0%': { opacity: '0', clipPath: 'inset(0 100% 0 0)' },
          '100%': { opacity: '1', clipPath: 'inset(0 0 0 0)' },
        },
        'soft-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.92' },
          '50%': { transform: 'scale(1.03)', opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 320ms ease-out both',
        'signal-in': 'signal-in 420ms cubic-bezier(.22,.8,.24,1) both',
        'soft-pulse': 'soft-pulse 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
