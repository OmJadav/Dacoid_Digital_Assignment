/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@shadcn/ui/dist/**/*.{js,ts}",],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A", // Navy Blue
        "primary-dark": "#162A6A",
        background: "#FFFFFF", // Light background
        "background-dark": "#111827", // Dark background
        text: "#1F2937", // Light text
        "text-dark": "#D1D5DB", // Dark text
      },
    },
  },
  plugins: [],
}

