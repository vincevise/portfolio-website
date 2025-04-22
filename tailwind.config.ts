import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: "var(--main)",
        secondary: "var(--secondary)",
        button: "var(--button)",
      },
      borderRadius:{
        main:'0.75rem',
        secondary:'0.5rem'
      }
    },
  },
  plugins: [],
} satisfies Config;
