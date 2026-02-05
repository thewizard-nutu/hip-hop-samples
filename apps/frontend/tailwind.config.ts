import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#FF6B35',
          secondary: '#004E89',
          dark: '#1A1A1A',
          light: '#F5F5F5',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
export default config
