import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "color-custom-yellow": "#DB8961",
        "color-orange": "#DB8961",
        "color-666": "#666666",
      },
      gridTemplateRows: {
        "calendar-5": "repeat(5, 1fr)",
        "calendar-6": "repeat(6, 1fr)",
      },
      gridTemplateColumns: {
        calendar: "repeat(7, 1fr)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      width: {
        "width-230": "230px",
        "width-160": "160px",
        "width-300": "300px",
        "width-200": "200px",
        "width-222": "222px",
        "width-1480": "1480px",
      },
      height: {
        "height-300": "300px",
        "height-690": "690px",
        "height-leftbar": "calc(100vh - 48px)",
      },
      backgroundColor: {
        "bg-c": "#141414",
        "bg-c-2": "#222222",
        "bg-c-3": "#2D2D2D",
        "bg-c-4": "#292929",
        "bg-c-5": "#363636",
        "bg-c-6": "#FFF1DB",
        "bg-c-7": "#F5F5EB",
        "bg-c-8": "#ECECEC",
        "bg-c-9": "#DADADA",
        "bg-c-10": "#DDDF72",
        "bg-c-11": "#27272a",
        "bg-c-12": "#666666",
        "bg-c-13": "#262626",
      },
      maxWidth: {
        "mw-1480": "1480px",
      },
      fill: {
        "fill-orange": "#DB8961",
        "fill-yellow": "#DDDF72",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
