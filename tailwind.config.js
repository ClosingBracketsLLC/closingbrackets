/** @type {import('tailwindcss').Config} */
// "Void & Signal" design tokens. Colors resolve to CSS custom properties
// declared in globals.css so a light theme can be bolted on later by
// re-declaring the variables under [data-theme="light"].
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1200px",
      },
    },
    fontFamily: {
      sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        void: {
          0: "var(--bg-0)",
          1: "var(--bg-1)",
          2: "var(--bg-2)",
        },
        line: "var(--border)",
        ink: {
          hi: "var(--text-hi)",
          mid: "var(--text-mid)",
          low: "var(--text-low)",
        },
        violet: {
          DEFAULT: "var(--violet)",
          deep: "var(--violet-deep)",
        },
        signal: {
          DEFAULT: "var(--signal)",
          ink: "#14100A",
        },
      },
      boxShadow: {
        "glow-violet": "0 0 48px -12px rgba(139, 124, 255, 0.5)",
        "glow-signal": "0 0 40px -10px rgba(255, 183, 74, 0.55)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 12px 40px -20px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        aurora:
          "linear-gradient(115deg, #5B4DFF 0%, #8B7CFF 45%, #C9D4FF 100%)",
        "card-wash":
          "linear-gradient(160deg, rgba(139,124,255,0.06) 0%, rgba(91,77,255,0.02) 55%, rgba(139,124,255,0.05) 100%)",
      },
      letterSpacing: {
        display: "-0.02em",
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
};
