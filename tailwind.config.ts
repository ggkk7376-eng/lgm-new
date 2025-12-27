import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "var(--font-roboto)",
        varela: "var(--font-varela)",
      },
      colors: {
        primary: {
          400: "var(--color-primary-400)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
        },
        tuna: {
          700: "#474e5d",
          900: "#31353d",
        },
        outerspace: {
          900: "#313b3d",
        },
        wildsand: {
          50: "#f6f6f6",
          200: "#dcdcdc",
          300: "#bdbdbd",
        },
        raven: {
          300: "#a9aeb7",
          400: "#747b8a",
        },
      },
      spacing: {
        page: "1rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
