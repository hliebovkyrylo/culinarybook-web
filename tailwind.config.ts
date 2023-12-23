import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        "width-230": "230px",
        "width-160": "160px",
        "width-300": "300px",
        "width-200": "200px",
      },
      height: {
        "height-300"    : "300px",
        "height-690"    : "690px",
        "height-leftbar": "calc(100vh - 48px)"
      },
      backgroundColor: {
        "bg-c"  : "#141414",
        "bg-c-2": "#222222",
        "bg-c-3": "#2D2D2D",
      },
      colors: {
        "color-custom-yellow": "#DDDF72",
      },
      maxWidth: {
        "mw-1480": "1480px",
      }
    },
  },
  plugins: [],
}
export default config
