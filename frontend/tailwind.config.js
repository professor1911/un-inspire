/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        ink: "#1A1A18",
        paper: "#F0EDE3",
        paperDim: "#E7E2D4",
        bay: "#17394D",
        bayDeep: "#0E2532",
        terrace: "#5C7A5E",
        terraceDeep: "#3F5942",
        ochre: "#C98A2B",
        vermillion: "#BF4E3A",
      },
      fontFamily: {
        display: ["Fraunces", "Noto Serif JP", "serif"],
        body: ["IBM Plex Sans", "Noto Sans JP", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
        displayJp: ["Noto Serif JP", "Fraunces", "serif"],
        bodyJp: ["Noto Sans JP", "IBM Plex Sans", "sans-serif"],
      },
      backgroundImage: {
        contours: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cg fill='none' stroke='%2317394D' stroke-opacity='0.06' stroke-width='1'%3E%3Ccircle cx='60' cy='340' r='60'/%3E%3Ccircle cx='60' cy='340' r='110'/%3E%3Ccircle cx='60' cy='340' r='170'/%3E%3Ccircle cx='60' cy='340' r='240'/%3E%3C/g%3E%3C/svg%3E\")",
        seigaiha:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='30' viewBox='0 0 60 30'%3E%3Cg fill='none' stroke='%23F0EDE3' stroke-opacity='0.35' stroke-width='1'%3E%3Cpath d='M0 30 A15 15 0 0 1 30 30 A15 15 0 0 1 60 30'/%3E%3Cpath d='M0 30 A10 10 0 0 1 20 30 A10 10 0 0 1 40 30 A10 10 0 0 1 60 30' transform='translate(-10,6)'/%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
