/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#050505',
        accent: {
          DEFAULT: '#38BDF8',
          hover: '#0EA5E9',
          light: '#BAE6FD',
        },
        coral: {
          DEFAULT: '#38BDF8',
          hover: '#0EA5E9',
        },
        surface: {
          card: '#0D0D0D',
          hover: '#161616',
          border: '#262626',
        },
        editorial: {
          text: '#F8FAFC',
          muted: '#CBD5E1',
          subtle: '#94A3B8',
        }
      },
      fontFamily: {
        display: ['"Jersey 10"', 'sans-serif'],
        jersey: ['"Jersey 10"', 'sans-serif'],
        sans: ['"Geom"', 'system-ui', '-apple-system', 'sans-serif'],
        geom: ['"Geom"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'tighter': '-0.04em',
      },
      lineHeight: {
        'hero': '0.88',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
