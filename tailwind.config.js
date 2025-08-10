
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210 40% 96%)',
        text: 'hsl(210 50% 10%)',
        muted: 'hsl(210 40% 60%)',
        accent: 'hsl(30 100% 50%)',
        primary: 'hsl(210 100% 50%)',
        surface: 'hsl(210 40% 99%)',
      },
      borderRadius: {
        'lg': '12px',
        'md': '8px',
        'sm': '4px',
        'xl': '16px',
      },
      spacing: {
        'lg': '16px',
        'md': '8px',
        'sm': '4px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(210, 50%, 10%, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
