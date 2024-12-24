/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: "#3f51b5",
          default: "#36489e",
          stroke: "#CED5DC",
        },
        green: {
          500: "#008000",
          600: "#006400",
        },
        blue: {
          500: "#36489E",
          600: "#283573",
          primary: "var(--primary-blue)",
        },
        red: {
          500: "#F37877",
          600: "#3E1716",
          700: "#F24E43",
        },
        light: {
          200: "#E8E9E9",
          gray: "#f5f5f5",
        },
        dark: {
          200: "#0D0F10",
          300: "#131619",
          400: "#1A1D21",
          500: "#363A3D",
          600: "#76828D",
          700: "#ABB8C4",
        },
        border: {
          color: "#CED5DC",
        },
        error: {
          orange: "#ff9800",
        },
      },
      fontFamily: {
        sans: ["Noto Sans JP", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      fontSize: {
        xs: "0.625rem", // 10px
        sm: "0.75rem", // 12px
        md: "1rem", // 16px (default)
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.875rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
        "6xl": "3.75rem", // 60px
        "7xl": "4.5rem", // 72px
        "8xl": "6rem", // 96px
        "9xl": "8rem", // 128px
      },
      screens: {
        xs: {
          max: "600px",
        },
        sm: "600px",
        md: "960px",
        lg: "1280px",
        xl: "1440px",
        xxl: "1660px",
      },
    },
  },
  plugins: [],
};
