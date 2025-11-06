// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#1c97a6",
          "secondary": "#fac32a",
          "accent": "#8e8e8e",
          "neutral": "#333333",
          "base-100": "#f5f7fa",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
      "light", "dark"
    ],
  },
  plugins: [require("daisyui")],
}
