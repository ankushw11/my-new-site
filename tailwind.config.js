/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brutalist color palette
        primary: {
          DEFAULT: "#000000",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#FF0000",
          light: "#FF3B3B",
          dark: "#CC0000",
        },
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#0A0A0A",
          muted: "#F5F5F5",
        },
        foreground: {
          DEFAULT: "#000000",
          muted: "#666666",
          light: "#FFFFFF",
        },
        grid: {
          DEFAULT: "rgba(0, 0, 0, 0.1)",
          light: "rgba(255, 255, 255, 0.1)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
        display: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Brutalist typography scale
        "display-xl": ["clamp(4rem, 15vw, 12rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(3rem, 10vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2rem, 6vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.5rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "body-xl": ["1.5rem", { lineHeight: "1.5" }],
        "body-lg": ["1.25rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "caption": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.05em" }],
      },
      spacing: {
        "section": "100vh",
        "gutter": "clamp(1rem, 4vw, 4rem)",
        "grid": "1px",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "grid-pulse": "gridPulse 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gridPulse: {
          "0%, 100%": { opacity: "0.1" },
          "50%": { opacity: "0.2" },
        },
      },
      transitionTimingFunction: {
        "brutalist": "cubic-bezier(0.16, 1, 0.3, 1)",
        "smooth": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1000": "1000ms",
      },
      zIndex: {
        "cursor": "9999",
        "modal": "1000",
        "overlay": "900",
        "header": "800",
        "grid": "1",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
