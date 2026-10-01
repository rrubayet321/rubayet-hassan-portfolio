import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: { base: "#0D0F10", surface: "#17191A", accent: "#DCA77C" },
      maxWidth: { content: "1040px", reading: "680px" },
    },
  },
  plugins: [],
};
export default config;
