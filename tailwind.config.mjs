import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src**/*.{ts,tsx}"],
  daisyui: {
    themes: ['dim']
  },
  plugins: [daisyui],
}

