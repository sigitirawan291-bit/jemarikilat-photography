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
        "on-background": "#f5f5f7",
        "surface": "#16161a",
        "surface-dim": "#111114",
        "surface-bright": "#1f1f26",
        "surface-container-lowest": "#0a0a0c",
        "surface-container-low": "#141418",
        "surface-container": "#1a1a20",
        "surface-container-high": "#22222a",
        "surface-container-highest": "#2b2b35",
        "on-surface": "#f5f5f7",
        "on-surface-variant": "#a1a1aa",
        "inverse-surface": "#f5f5f7",
        "inverse-on-surface": "#0d0d0e",
        "outline": "#3a3a44",
        "outline-variant": "#282832",
        "primary": "#f5f5f7",
        "on-primary": "#0d0d0e",
        "primary-container": "#202026",
        "on-primary-container": "#d4af37",
        "secondary": "#a1a1aa",
        "on-secondary": "#0d0d0e",
        "gold": {
          DEFAULT: "#d4af37",
          light: "#e5c384",
          dark: "#997a22",
          muted: "#8c7329"
        },
        "champagne": "#c5a880"
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
        display: ["Cormorant Garamond", "Playfair Display", "serif"],
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
