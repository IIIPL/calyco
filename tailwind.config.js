/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Calyco Brand Colors
        'calyco-purple': '#532E8A',
        'calyco-gold': '#C8A951',
        
        // Neutrals
        'grey-mist': '#EDEDED',
        'grey-thunder': '#4A5568',
        'linen-white': '#FAFAF7',
        'charcoal-black': '#1A1A1A',
        
        // Supporting Natural Tones
        'sage-green': '#68D391',
        'barn-red': '#C53030',
        'lavender': '#B794F4',
        'lilac': '#D6BCFA',
      },
    },
  },
  plugins: [],
}

