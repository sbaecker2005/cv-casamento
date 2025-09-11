/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: "#F6F3E7",
          graphite: "#2A2A2A",
          sage: {
            50: "#F1F5F2",
            100: "#E6EFEA",
            300: "#9FB3A7",
            500: "#6B8F71",
            600: "#5B7D61",
            700: "#4F6F57",
          },
          coffee: {
            300: "#B08974",
            500: "#6B4E3D",
            700: "#4E3629",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        serif: ["Playfair Display", "ui-serif", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
