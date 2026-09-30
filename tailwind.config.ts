import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#003730",
          container: "#184e46",
          dark: "#113832",
          fixed: "#b8ede2",
          "fixed-dim": "#9cd1c6",
          "on-container": "#8abeb3",
          light: "#eaf4f2",
        },
        secondary: {
          DEFAULT: "#8d6414",
          container: "#fec971",
          fixed: "#ffdead",
          "fixed-dim": "#f2be67",
          "on-container": "#785200",
          soft: "#fdf7ec",
          border: "#e8d5ac",
        },
        tertiary: {
          DEFAULT: "#1b6b50",
          container: "#005039",
          fixed: "#a6f2d0",
          "fixed-dim": "#8ad6b5",
          "on-container": "#77c2a2",
          soft: "#eaf3ef",
          border: "#c2dfd4",
        },
        surface: {
          DEFAULT: "#fbf9f5",
          bright: "#fbf9f5",
          dim: "#d4dbe3",
          "container-lowest": "#ffffff",
          "container-low": "#f5f2eb",
          container: "#efece4",
          "container-high": "#e8e4db",
          "container-highest": "#ded9cc",
          variant: "#dce3eb",
        },
        "on-surface": {
          DEFAULT: "#1e252b",
          variant: "#54606a",
        },
        ink: {
          DEFAULT: "#1e252b",
          light: "#2b343d",
          muted: "#54606a",
        },
        muted: "#54606a",
        paper: {
          DEFAULT: "#fbf9f5",
          subtle: "#f5f2eb",
          darker: "#efece4",
        },
        cream: "#ffffff",
        line: {
          DEFAULT: "#e2ded6",
          subtle: "#ede9e0",
          strong: "#d8d3c9",
        },
        outline: {
          DEFAULT: "#d8d3c9",
          variant: "#e2ded6",
          strong: "#707976",
        },
        accent: {
          DEFAULT: "#184e46",
          hover: "#113832",
          dark: "#003730",
          soft: "#eaf4f2",
          border: "#b8ede2",
        },
        verified: {
          DEFAULT: "#1b6b50",
          bg: "#eaf3ef",
          border: "#c2dfd4",
          text: "#003726",
        },
        warn: {
          DEFAULT: "#8d6414",
          bg: "#fdf7ec",
          border: "#e8d5ac",
          text: "#604100",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Newsreader", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(30, 37, 43, 0.04), 0 4px 16px -2px rgba(30, 37, 43, 0.05)",
        lift: "0 4px 12px -2px rgba(30, 37, 43, 0.08), 0 16px 32px -4px rgba(30, 37, 43, 0.08)",
        dropdown: "0 10px 30px -4px rgba(30, 37, 43, 0.12), 0 4px 12px -2px rgba(30, 37, 43, 0.06)",
        badge: "inset 0 1px 0 rgba(255, 255, 255, 0.7)",
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.25rem",
        card: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
