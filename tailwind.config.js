import flowbite from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "node_modules/flowbite-react/lib/esm/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Crang", "sans-serif"],
        body: ["Pixellari", "sans-serif"],
      },
      colors: {
        // Updated color scheme for better readability
        primary: "#121212", // Very dark background
        secondary: "#1E1E2E", // Dark background
        accent: "#3B82F6", // Blue accent color
        success: "#10B981", // Green for positive values
        danger: "#EF4444", // Red for negative values
        warning: "#F59E0B", // Amber for warnings
        info: "#3B82F6", // Blue for info
        gray: {
          750: "#2D3748", // Custom gray shade for better contrast
          850: "#1A202C", // Custom gray shade for better contrast
        },
      },
      backgroundColor: {
        card: "#1E1E2E", // Card background
        hover: "#2D3748", // Hover state
      },
      textColor: {
        primary: "#F9FAFB", // Primary text
        secondary: "#E5E7EB", // Secondary text
        muted: "#9CA3AF", // Muted text
      },
      borderColor: {
        default: "#374151", // Default border
        focus: "#3B82F6", // Focus border
      },
      keyframes: {
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        shine: "shine 2s infinite",
        spin: "spin 1s linear infinite",
      },
    },
  },
  plugins: [flowbite],
};
