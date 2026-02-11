/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6", // Azul default de Tailwind (o tu color favorito: '#6366f1', '#8b5cf6', etc.)
          foreground: "#ffffff", // Color del texto cuando fondo es primary (blanco o negro según contraste)
        },
        secondary: {
          DEFAULT: "#6b7280",
          foreground: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
