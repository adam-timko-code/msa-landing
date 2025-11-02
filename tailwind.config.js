/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
 theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      boxShadow: {
        subtle: '0 2px 4px rgba(0,0,0,0.08)',
        focus: '0 4px 10px rgba(79,70,229,0.25)',
      },
      backgroundImage: {
        'btn-primary': 'linear-gradient(to right, #4f46e5, #6366f1)',
        'btn-secondary': 'linear-gradient(to right, #3f3f46, #52525b)',
      },
    },
  },
  plugins: [],
}
