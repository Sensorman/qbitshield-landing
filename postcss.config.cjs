// postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ Correct for Tailwind v4+
    autoprefixer: {},
  },
}