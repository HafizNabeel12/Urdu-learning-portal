/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        urdu: {
          primary: '#2D5F4C',
          secondary: '#8B6E4E',
          accent: '#D4AF37',
          light: '#F5F1E8',
          dark: '#1A1A1A',
        },
      },
      fontFamily: {
        urdu: ['Noto Nastaliq Urdu', 'serif'],
        display: ['Cinzel', 'serif'],
        body: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}
