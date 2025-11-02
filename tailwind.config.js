/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          400: "#A7F3D0",
          500: "#34D399",
          600: "#4F46E5",
          700: "#4338CA",
          900: "#312E81",
        },
      },
    },
  },
  plugins: [],
};
