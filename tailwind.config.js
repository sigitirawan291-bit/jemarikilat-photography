/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background": "#FAF8F5",
        "on-background": "#1A1A1A",
        "surface": "#FFFFFF",
        "surface-dim": "#F4F1EA",
        "surface-bright": "#FFFFFF",
        "surface-container-lowest": "#FFFFFF",
        "surface-container-low": "#FAF8F5",
        "surface-container": "#F5F2EB",
        "surface-container-high": "#EDE9E1",
        "surface-container-highest": "#E4DFD5",
        "on-surface": "#1A1A1A",
        "on-surface-variant": "#666158",
        "inverse-surface": "#1A1A1A",
        "inverse-on-surface": "#FAF8F5",
        "outline": "#DCD5C9",
        "outline-variant": "#E5E0D8",
        "sand": {
          DEFAULT: "#E5E0D8",
          light: "#F5F2EB",
          dark: "#CFC8BC"
        },
        "primary": "#1A1A1A",
        "on-primary": "#FFFFFF",
        "primary-container": "#FAF8F5",
        "on-primary-container": "#C5A880",
        "secondary": "#666158",
        "on-secondary": "#FFFFFF",
        "gold": {
          DEFAULT: "#C5A880",
          light: "#D8C09D",
          dark: "#9E825B",
          muted: "#A88F6C"
        },
        "champagne": "#C5A880"
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
