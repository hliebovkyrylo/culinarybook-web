import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      width: {
        "width-230" : "230px",
        "width-160" : "160px",
        "width-300" : "300px",
        "width-200" : "200px",
        "width-222" : "222px",
        "width-1480": "1480px"
      },
      height: {
        "height-300"    : "300px",
        "height-690"    : "690px",
        "height-leftbar": "calc(100vh - 48px)"
      },
      backgroundColor: {
        "bg-c"   : "#141414",
        "bg-c-2" : "#222222",
        "bg-c-3" : "#2D2D2D",
        "bg-c-4" : "#292929",
        "bg-c-5" : "#363636",
        "bg-c-6" : "#FFF1DB",
        "bg-c-7" : "#F5F5EB",
        "bg-c-8" : "#ECECEC",
        "bg-c-9" : "#DADADA",
        "bg-c-10": "#DDDF72",
        "bg-c-11": "#27272a",
        "bg-c-12": "#666666",
        "bg-c-13": "#262626",
      },
      colors: {
        "color-custom-yellow": "#DDDF72",
        "color-orange"       : "#C77D0A",
        "color-666"          : "#666666"
      },
      maxWidth: {
        "mw-1480": "1480px",
      },
      fill: {
        "fill-orange": "#C77D0A",
        "fill-yellow": "#DDDF72"
      }
    },
  },
  plugins: [],
}
export default config