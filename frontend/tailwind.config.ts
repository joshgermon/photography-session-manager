import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        "primary-muted": "hsl(var(--primary-muted))",
        "on-primary": "hsl(var(--on-primary))",
        "primary-hover": "hsl(var(--primary-hover))",
        "primary-active": "hsl(var(--primary-active))",
        "primary-disabled": "hsl(var(--primary-disabled))",

        background: "hsl(var(--background))",
        "background-alt": "hsl(var(--background-alt))",
        "background-muted": "hsl(var(--background-muted))",

        surface: "hsl(var(--surface))",

        base: "hsl(var(--base))",
        "base-100": "hsl(var(--base-100))",
        "base-200": "hsl(var(--base-200))",
        "base-300": "hsl(var(--base-300))",
        "base-400": "hsl(var(--base-400))",
        "base-500": "hsl(var(--base-500))",
        "base-600": "hsl(var(--base-600))",
        "base-700": "hsl(var(--base-700))",
        "base-800": "hsl(var(--base-800))",
        "base-900": "hsl(var(--base-900))",

        success: "hsl(var(--success))",
        "on-success": "hsl(var(--on-success))",
        "success-hover": "hsl(var(--success-hover))",
        "success-active": "hsl(var(--success-active))",
        "success-disabled": "hsl(var(--success-disabled))",

        warning: "hsl(var(--warning))",
        "on-warning": "hsl(var(--on-success))",
        "warning-hover": "hsl(var(--warning-hover))",
        "warning-active": "hsl(var(--warning-active))",
        "warning-disabled": "hsl(var(--warning-disabled))",

        danger: "hsl(var(--danger))",
        "on-danger": "hsl(var(--on-danger))",
        "danger-hover": "hsl(var(--danger-hover))",
        "danger-active": "hsl(var(--danger-active))",
        "danger-disabled": "hsl(var(--danger-disabled))",
      },
    },
  },
  plugins: [
    require("tailwindcss-react-aria-components"),
    require("tailwindcss-animate"),
  ],
  darkMode: "class",
};
export default config;
