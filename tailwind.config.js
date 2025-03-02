/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neonBlue: "#00AEEF",
        cyberPurple: "#8E44AD",
        mintGreen: "#2ECC71",
        darkBg: "#121212",
        lightGray: "#E0E0E0",
        neonPink: "#FF007F",
      },
      fontFamily: {
        sans: ["Neue Machina", "sans-serif"],
        heading: ["Monument Extended", "sans-serif"],
        alt: ["Clash Display", "Orbitron", "sans-serif"],
      },
    },
  },
  plugins: [],
};

