/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
  '[animation-delay:-0.3s]',
  '[animation-delay:-0.15s]'
],
  theme: {
    extend: {},
  },
  plugins: [],
}