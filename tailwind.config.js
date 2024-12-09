/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        body: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      // Font Sizes
      fontSize: {
        // Display Headings
        "display-large": ["52px", "56px"],
        "display-small": ["44px", "48px"],

        // Standard Headings
        h1: ["40px", "48px"],
        h2: ["36px", "44px"],
        h3: ["32px", "40px"],
        h4: ["28px", "36px"],
        h5: ["24px", "32px"],
        h6: ["20px", "28px"],

        // Paragraphs
        "p-large": ["18px", "28px"],
        "p-medium": ["16px", "24px"],
        "p-small": ["14px", "20px"],
        "p-xsmall": ["12px", "20px"],

        // Overlines
        "overline-large": [
          "14px",
          {
            letterSpacing: "1px",
            fontWeight: "600",
          },
        ],
        "overline-small": [
          "12px",
          {
            letterSpacing: "1px",
            fontWeight: "600",
          },
        ],

        // Labels
        "label-large": ["16px", "18px"],
        "label-medium": ["14px", "18px"],
        "label-small": ["12px", "16px"],
        "label-xsmall": ["10px", "14px"],
      },

      // Spacing
      spacing: {
        "xx-sm": "4px",
        "x-sm": "8px",
        sm: "12px",
        md: "16px",
        big: "20px",
        "x-big": "24px",
        "xx-big": "28px",
        "xxx-big": "32px",
        lg: "40px",
        "x-lg": "48px",
        "xx-lg": "64px",
        "xxx-lg": "80px",
        huge: "96px",
        "x-huge": "128px",
        "xx-huge": "160px",
        "xxx-huge": "192px",
      },

      // Colors
      colors: {
        primary: {
          DEFAULT: "#42159e",
          50: "#efe8fc",
          100: "#cfbbf6",
          200: "#af8ef0",
          300: "#8f61ea",
          400: "#6e34e4",
          500: "#551bcb",
          600: "#42159e",
          700: "#2f0f71",
          800: "#1c0944",
          900: "#090317",
        },

        success: {
          DEFAULT: "#22C55E",
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
        },

        warning: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },

        destructive: {
          DEFAULT: "#ee46bc",
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },

        neutral: {
          DEFAULT: "#71717A",
          50: "#D1D5DB",
          100: "#F4F4F5",
          200: "#E4E4E7",
          300: "#D4D4D8",
          400: "#A1A1AA",
          500: "#71717A",
          600: "#52525B",
          700: "#3F3F46",
          800: "#27272A",
          900: "#18181B",
        },

        generic: {
          DEFAULT: "#FFFFFF", // White
          50: "#E4E4E7", // Mostly white
          100: "#000000", // Black
        },
      },

      // Shadows
      boxShadow: {
        xsm: "0px 1px 2px 0px rgba(16, 24, 40, 0.04), 0px 1px 2px 0px rgba(16, 24, 40, 0.04)",
        sm: "0px 2px 6px 0px rgba(16, 24, 40, 0.06)",
        md: "0px 6px 15px -2px rgba(16, 24, 40, 0.08), 0px 6px 15px -2px rgba(16, 24, 40, 0.08)",
        lg: "0px 8px 24px -3px rgba(16, 24, 40, 0.10), 0px 8px 24px -3px rgba(16, 24, 40, 0.05)",
        xl: "0px 20px 40px -8px rgba(16, 24, 40, 0.10), 0px 20px 40px -8px rgba(16, 24, 40, 0.05)",
        xxl: "0px 25px 60px -15px rgba(16, 24, 40, 0.20), 0px 25px 60px -15px rgba(16, 24, 40, 0.12)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
