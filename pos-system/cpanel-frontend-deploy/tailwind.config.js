/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'theme-default': {
          primary: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        'theme-blue': {
          primary: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        'theme-green': {
          primary: '#059669',
          600: '#047857',
          700: '#065f46',
        },
        secondary: {
          DEFAULT: '#64748b',
          400: '#9ca3af',
          600: '#374151',
        },
        background: {
          DEFAULT: '#f8fafc',
          secondary: '#ffffff',
          surface: '#f1f5f9',
        },
        text: {
          DEFAULT: '#0f172a',
          secondary: '#64748b',
        },
        sidebar: {
          bg: '#1e293b',
          hover: '#334155',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
        theme: 'background-color, color, border-color',
      },
      fontFamily: {
        sans: ['Nuntio', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
