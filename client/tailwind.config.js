/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#DC2626',
          crimson: '#E11D48',
          darkRed: '#991B1B',
          navy: '#0F172A',
          dark: '#1E293B',
          blue: '#2563EB',
          emerald: '#10B981',
          purple: '#8B5CF6',
          orange: '#F97316',
          cyan: '#06B6D4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.06), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'elevated': '0 20px 30px -10px rgba(0, 0, 0, 0.12), 0 10px 15px -5px rgba(0, 0, 0, 0.05)',
        'hero-card': '0 12px 36px 0 rgba(15, 23, 42, 0.15)',
      }
    },
  },
  plugins: [],
}
