/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mac-red': '#ff5f57',
        'mac-yellow': '#ffbd2e',
        'mac-green': '#28ca42',
        'mac-red-hover': '#ff3b30',
        'mac-yellow-hover': '#ff9f0a',
        'mac-green-hover': '#00c639'
      },
      backdropBlur: {
        'glass': '20px'
      },
      animation: {
        'move-background': 'moveBackground 60s linear infinite',
        'logo-spin': 'logo-spin 20s linear infinite',
      },
      keyframes: {
        moveBackground: {
          'from': { backgroundPosition: '0% 0%' },
          'to': { backgroundPosition: '0% -1000%' }
        },
        'logo-spin': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' }
        }
      },
      transitionTimingFunction: {
        'mac-window': 'cubic-bezier(0.175, 0.885, 0.32, 2.2)',
      },
      fontFamily: {
        'mono': ['Monaco', 'Menlo', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}