/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          purple: '#4B007D',             // Primary brand color
          gold: '#D4AF37',               // Primary accent
          ink: '#0F1221',                // Text color
          cream: '#F6F3EE',              // Page background
          warm: '#FBF9F6',               // Card background
        },
        // Keep existing colors for backward compatibility
        'calyco-purple': '#4B007D',
        'calyco-gold': '#D4AF37',
        ink: '#0F1221',
        cream: '#F6F3EE',
        warm: '#FBF9F6',
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
        '3xl': '1.5rem',          // 24px for cards
        'button': '0.75rem',      // 12px for buttons
        'full': '9999px',         // pills
      },
      boxShadow: {
        card: '0 8px 32px rgba(15, 18, 33, 0.08)',
        cardLg: '0 16px 48px rgba(15, 18, 33, 0.12)',
        subtle: '0 8px 32px rgba(15, 18, 33, 0.08)',
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

