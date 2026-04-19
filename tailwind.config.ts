import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        base: "var(--bg-base)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",
        border: "var(--bg-border)",
        accent: "var(--accent)",
        /** Inline highlights / tags — use with bg-tag-* / text-tag-*-fg */
        tag: {
          purple: "var(--mark-purple-bg)",
          "purple-fg": "var(--mark-purple-fg)",
          blue: "var(--mark-blue-bg)",
          "blue-fg": "var(--mark-blue-fg)",
          green: "var(--mark-green-bg)",
          "green-fg": "var(--mark-green-fg)",
          maroon: "var(--mark-maroon-bg)",
          "maroon-fg": "var(--mark-maroon-fg)",
          orange: "var(--mark-orange-bg)",
          "orange-fg": "var(--mark-orange-fg)",
        },
      },
      maxWidth: {
        content: "640px",
        reading: "600px",
      },
    },
  },
  plugins: [],
};

export default config;
