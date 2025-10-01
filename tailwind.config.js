/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          purple: 'rgb(26 28 36)',      // Your specified RGB color (primary surface / text on light)
          purpleDark: '#1A1C24',         // Deep sections / hero overlays (from homepage)
          gold: '#F0C85A',               // Accent, CTAs, highlights (from homepage)
          silver: '#D9D9D9',             // Subtle borders, dividers on dark
          bronze: '#E6B84A',             // Secondary accent (hover state from homepage)
        },
        ink: {
          900: '#0B0B0E',
          700: '#1E1E26',
          500: '#424252',
          300: '#A2A2B3',
          100: '#E8E8EF',
        },
        paper: {
          0: '#FFFFFF',
          50: '#FAFAFD',
          100: '#F5F6FA',
        },
        // Keep existing colors for backward compatibility
        'calyco-purple': '#532E8A',
        'calyco-gold': '#C8A951',
        'grey-mist': '#EDEDED',
        'grey-thunder': '#4A5568',
        'linen-white': '#FAFAF7',
        'charcoal-black': '#1A1A1A',
        'sage-green': '#68D391',
        'barn-red': '#C53030',
        'lavender': '#B794F4',
        'lilac': '#D6BCFA',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,.08)',
        cardLg: '0 16px 48px rgba(0,0,0,.12)',
        glowGold: '0 10px 30px rgba(240,200,90,.35)',
      },
      spacing: {
        // section rhythm
        secY: '5.5rem',       // desktop section vertical
        secYsm: '3rem',       // mobile section vertical
        contX: '1.25rem',     // page padding mobile
        contXlg: '2rem',      // page padding desktop
      },
      transitionDuration: { 
        250: '250ms', 
        400: '400ms' 
      },
      transitionTimingFunction: { 
        smooth: 'cubic-bezier(.2,.8,.2,1)' 
      },
      maxWidth: { 
        content: '1200px' 
      },
      backdropBlur: { 
        6: '6px', 
        10: '10px' 
      },
    },
  },
  plugins: [],
}

