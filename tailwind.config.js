/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Instrument Serif'", "serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      colors: {
        bg: "hsl(var(--bg))",
        surface: "hsl(var(--surface))",
        surfaceSoft: "hsl(var(--surface-soft))",
        text: "hsl(var(--text-primary))",
        muted: "hsl(var(--text-muted))",
        stroke: "hsl(var(--stroke))",
        accent: "hsl(var(--accent))",
      },
    },
  },
  plugins: [],
}
