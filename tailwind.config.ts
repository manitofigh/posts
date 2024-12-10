import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background-rgb))",
        foreground: "rgb(var(--foreground-rgb))",
      },
      boxShadow: {
        'lg': '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),  // Add this if you haven't already
  ],
} satisfies Config;
