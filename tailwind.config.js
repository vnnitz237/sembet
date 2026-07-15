/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        sb: {
          white: '#ffffff',
          background: '#f8fbfe',
          'baby-blue': '#c7e8ff',
          'light-blue': '#8fcfff',
          luminous: '#5aade8',
          action: '#318ac7',
          'action-dark': '#246a9e',
          heading: '#172b3a',
          body: '#607789',
          muted: '#9ab0be',
          border: '#e2eef5',
          'border-subtle': '#f0f6fb',
        },
      },
      screens: {
        xs: '375px',
        sm: '430px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
        '2xl': '1920px',
      },
      spacing: {
        'nav': '72px',
      },
      maxWidth: {
        container: '1280px',
      },
      boxShadow: {
        'sb-sm': '0 1px 3px rgba(23,43,58,0.06), 0 1px 2px rgba(23,43,58,0.04)',
        'sb-md': '0 4px 16px rgba(49,138,199,0.10), 0 1px 4px rgba(23,43,58,0.06)',
        'sb-action': '0 4px 20px rgba(49,138,199,0.22), 0 1px 4px rgba(49,138,199,0.12)',
      },
      borderRadius: {
        'sb': '12px',
        'sb-lg': '20px',
      },
      transitionTimingFunction: {
        'sb': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'sb-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        'micro': '220ms',
        'base': '600ms',
      },
    },
  },
  plugins: [],
}
