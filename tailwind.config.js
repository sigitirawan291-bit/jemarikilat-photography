/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#0d0d0e",
        "on-background": "#ffffff",
        "surface": "#141417",
        "surface-dim": "#0d0d0e",
        "surface-bright": "#1a1a1e",
        "surface-container-lowest": "#0d0d0e",
        "surface-container-low": "#0d0d0e",
        "surface-container": "#141417",
        "surface-container-high": "#1a1a1e",
        "surface-container-highest": "#222226",
        "on-surface": "#ffffff",
        "on-surface-variant": "#a1a1aa",
        "inverse-surface": "#ffffff",
        "inverse-on-surface": "#0d0d0e",
        "outline": "#27272a",
        "outline-variant": "#1e1e22",
        "primary": "#ffffff",
        "on-primary": "#0d0d0e",
        "primary-container": "#0d0d0e",
        "on-primary-container": "#d4af37",
        "secondary": "#a1a1aa",
        "on-secondary": "#ffffff",
        "gold": {
          DEFAULT: "#d4af37",
          light: "#f3e5ab",
          dark: "#aa8c2c",
          muted: "#b89738"
        },
        "champagne": "#d4af37"
      },
      fontFamily: {
        serif: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"],
        label: ["Inter", "sans-serif"],
      },
      spacing: {
        "gutter": "24px",
        "page-margin-desktop": "80px",
        "page-margin-mobile": "24px",
        "section-gap": "160px",
        "element-gap": "32px",
      },
      borderRadius: {
        DEFAULT: "0px",
        none: "0px",
        sm: "2px",
        md: "4px",
        lg: "6px",
        xl: "8px",
        "2xl": "12px",
        "3xl": "16px",
        full: "9999px",
      }
    },
  },
  plugins: [],
}
