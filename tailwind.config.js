/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fintechBlack: '#0a0f18',
        fintechNavy: '#0f172a',
        fintechGold: '#fbbf24',
        fintechSlate: '#334155',
        fintechText: '#e2e8f0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['"Roboto Mono"', 'monospace'],
      },
      animation: {
        'ticker': 'ticker 40s linear infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
        'data-flow': 'data-flow 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-30px) scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
