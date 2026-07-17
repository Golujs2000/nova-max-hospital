/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-accent-500',
    'bg-accent-600',
    'to-accent-500',
    { pattern: /bg-accent-(500|600)/, variants: ['hover'] },
    { pattern: /ring-primary-(400)/, variants: ['focus'] },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3',
          600: '#1976D2',
          700: '#1565C0',
          800: '#0D47A1',
          900: '#0a3880',
        },
        navy: {
          50:  '#e2e8f0',
          100: '#cbd5e1',
          200: '#94a3b8',
          300: '#64748b',
          400: '#475569',
          500: '#334155',
          600: '#1e293b',
          700: '#0f172a',
          800: '#020617',
          900: '#000000',
        },
        accent: {
          50:  '#e1f5fe',
          100: '#b3e5fc',
          200: '#81d4fa',
          300: '#4fc3f7',
          400: '#29b6f6',
          500: '#03a9f4',
          600: '#039BE5',
          700: '#0288d1',
          800: '#0277bd',
          900: '#01579b',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        gray: {
          50:  '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#757e8a', // Darker gray for 4.5:1 minimum contrast on white backgrounds
          500: '#5c6573', // Darker gray for subheaders and body texts
          600: '#47515c',
          700: '#343c47',
          800: '#1f242b',
          900: '#111317',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        hindi: ['"Tiro Devanagari Hindi"', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 24px rgba(25, 118, 210, 0.08)',
        'card-hover': '0 12px 40px rgba(25, 118, 210, 0.18)',
        'nav': '0 2px 20px rgba(25, 118, 210, 0.12)',
        'btn': '0 4px 16px rgba(25, 118, 210, 0.35)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0D47A1 0%, #1976D2 50%, #29B6F6 100%)',
        'card-gradient': 'linear-gradient(135deg, #1976D2 0%, #0D47A1 100%)',
        'section-gradient': 'linear-gradient(180deg, #e8f4fd 0%, #ffffff 100%)',
      },
      borderRadius: {
        '5': '5px',
        'card': '12px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
