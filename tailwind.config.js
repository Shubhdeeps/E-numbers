/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    data: {
      click: 'ui~="click"',
    },
    extend: {
      colors: {
        bg: "#152023",
        fg: "#1F2B30",
        fg_secondary: "#212E33",
        secondaru: "#393128",
        highlight: "#6A553D",
        yellow: {
          dark: "#393128",
          light: "#393128",
        },
        red: {
          dark: "#393128",
          light: "#393128",
        },
        green: {
          dark: "#393128",
          light: "#393128",
        },
        textGray: "#A4A4A4",
      },
    },
  },
  plugins: [],
};
