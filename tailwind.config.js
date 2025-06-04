module.exports = {
  theme: {
    extend: {
      boxShadow: {
        "primary-glow":
          "0 0 8px var(--shadow-glow-primary), 0 0 20px var(--shadow-glow-primary)",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "50.01%, 100%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s steps(2, start) infinite",
      },
    },
  },
  plugins: [],
};
