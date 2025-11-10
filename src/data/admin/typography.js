/**
 * CALYCO Typography System
 * Centralized typography configuration for the entire website
 * Edit these values to update typography across all pages
 */

export const typography = {
  // ============================================
  // HEADINGS
  // ============================================

  h1: {
    // Main page headings (Hero titles, page titles)
    mobile: "text-4xl",
    tablet: "sm:text-4xl md:text-5xl",
    desktop: "lg:text-5xl",
    weight: "font-semibold",
    lineHeight: "leading-[1.2]",
    spacing: "tracking-normal",
    marginBottom: "mb-3 sm:mb-4 md:mb-5"
  },

  h2: {
    // Section headings
    mobile: "text-3xl",
    tablet: "sm:text-3xl md:text-4xl",
    desktop: "lg:text-4xl",
    weight: "font-semibold",
    lineHeight: "leading-[1.25]",
    spacing: "tracking-normal",
    marginBottom: "mb-3 sm:mb-4"
  },

  h3: {
    // Subsection headings
    mobile: "text-2xl",
    tablet: "sm:text-2xl md:text-3xl",
    desktop: "lg:text-3xl",
    weight: "font-semibold",
    lineHeight: "leading-[1.3]",
    spacing: "tracking-normal",
    marginBottom: "mb-2 sm:mb-3"
  },

  h4: {
    // Card titles, smaller headings
    mobile: "text-xl",
    tablet: "sm:text-xl md:text-2xl",
    desktop: "lg:text-2xl",
    weight: "font-semibold",
    lineHeight: "leading-[1.35]",
    spacing: "tracking-normal",
    marginBottom: "mb-2"
  },

  h5: {
    // Small headings, labels
    mobile: "text-lg",
    tablet: "sm:text-lg md:text-xl",
    desktop: "lg:text-xl",
    weight: "font-semibold",
    lineHeight: "leading-[1.4]",
    spacing: "tracking-normal",
    marginBottom: "mb-2"
  },

  h6: {
    // Tiny headings
    mobile: "text-base",
    tablet: "sm:text-base md:text-lg",
    desktop: "lg:text-lg",
    weight: "font-semibold",
    lineHeight: "leading-[1.4]",
    spacing: "tracking-normal",
    marginBottom: "mb-1"
  },

  // ============================================
  // BODY TEXT
  // ============================================

  body: {
    // Regular paragraph text
    mobile: "text-base",
    tablet: "sm:text-base md:text-lg",
    desktop: "lg:text-lg",
    weight: "font-normal",
    lineHeight: "leading-[1.7]",
    spacing: "tracking-normal",
    marginBottom: "mb-4"
  },

  bodyLarge: {
    // Larger body text (hero subtitles, intros)
    mobile: "text-lg",
    tablet: "sm:text-lg md:text-xl",
    desktop: "lg:text-xl",
    weight: "font-normal",
    lineHeight: "leading-[1.7] sm:leading-[1.7] md:leading-[1.75]",
    spacing: "tracking-normal",
    marginBottom: "mb-4 sm:mb-5 md:mb-6"
  },

  bodySmall: {
    // Smaller body text
    mobile: "text-sm",
    tablet: "sm:text-sm md:text-base",
    desktop: "lg:text-base",
    weight: "font-normal",
    lineHeight: "leading-[1.6]",
    spacing: "tracking-normal",
    marginBottom: "mb-3"
  },

  // ============================================
  // SPECIAL TEXT ELEMENTS
  // ============================================

  caption: {
    // Small captions, labels
    mobile: "text-xs",
    tablet: "sm:text-xs md:text-sm",
    desktop: "lg:text-sm",
    weight: "font-normal",
    lineHeight: "leading-[1.5]",
    spacing: "tracking-normal",
    marginBottom: "mb-1"
  },

  badge: {
    // Badges, tags (like "PREMIUM PAINTS")
    mobile: "text-xs",
    tablet: "sm:text-xs",
    desktop: "lg:text-xs",
    weight: "font-semibold",
    lineHeight: "leading-normal",
    spacing: "tracking-wider",
    uppercase: "uppercase"
  },

  // ============================================
  // BUTTONS
  // ============================================

  button: {
    primary: {
      // Primary CTA buttons (Hero - White background)
      padding: "px-8 py-4 sm:px-8 sm:py-4",
      fontSize: "text-base sm:text-base",
      weight: "font-semibold",
      rounded: "rounded-lg",
      base: "inline-flex items-center justify-center",
      colors: "bg-white text-[#0F1221]",
      hover: "hover:bg-white/90",
      effects: "transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
    },
    secondary: {
      // Secondary buttons (Hero - Transparent with border)
      padding: "px-8 py-4 sm:px-8 sm:py-4",
      fontSize: "text-base sm:text-base",
      weight: "font-semibold",
      rounded: "rounded-lg",
      base: "inline-flex items-center justify-center",
      colors: "bg-transparent text-white border-2 border-white/50",
      hover: "hover:bg-white/10 hover:border-white",
      effects: "transition-all duration-300"
    },
    accent: {
      // Accent buttons (Other sections - Gold/Brown background)
      padding: "px-8 py-4 sm:px-8 sm:py-4",
      fontSize: "text-base sm:text-base",
      weight: "font-semibold",
      rounded: "rounded-lg",
      base: "inline-flex items-center justify-center",
      colors: "bg-[#B8935F] text-white",
      hover: "hover:bg-[#A17F4E]",
      effects: "transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
    },
    outline: {
      // Outline buttons (Other sections - Border with no background)
      padding: "px-8 py-4 sm:px-8 sm:py-4",
      fontSize: "text-base sm:text-base",
      weight: "font-semibold",
      rounded: "rounded-lg",
      base: "inline-flex items-center justify-center",
      colors: "bg-white border-2 border-[#0F1221]/20 text-[#0F1221]",
      hover: "hover:bg-[#F8F4EC] hover:border-[#0F1221]/30",
      effects: "transition-all duration-300 transform hover:-translate-y-0.5"
    },
    small: {
      // Small buttons (if needed)
      padding: "px-6 py-3 sm:px-6 sm:py-3",
      fontSize: "text-sm sm:text-sm",
      weight: "font-semibold",
      rounded: "rounded-lg",
      base: "inline-flex items-center justify-center",
      colors: "bg-[#B8935F] text-white",
      hover: "hover:bg-[#A17F4E]",
      effects: "transition-all duration-300"
    }
  },

  // ============================================
  // LINKS
  // ============================================

  link: {
    // Regular text links
    fontSize: "text-base",
    weight: "font-medium",
    decoration: "underline"
  }
};

/**
 * Helper function to get combined typography classes
 * Usage: getTypographyClasses('h1') or getTypographyClasses('body')
 */
export const getTypographyClasses = (variant, customClasses = '') => {
  const styles = typography[variant];

  if (!styles) {
    console.warn(`Typography variant "${variant}" not found`);
    return customClasses;
  }

  // For buttons, return the specific button style
  if (variant.startsWith('button.')) {
    const buttonType = variant.split('.')[1];
    const buttonStyles = typography.button[buttonType];
    return `${buttonStyles.padding} ${buttonStyles.fontSize} ${buttonStyles.weight} ${buttonStyles.rounded} ${customClasses}`.trim();
  }

  // For regular text elements
  const classes = [
    styles.mobile,
    styles.tablet,
    styles.desktop,
    styles.weight,
    styles.lineHeight,
    styles.spacing,
    styles.marginBottom,
    styles.uppercase,
    customClasses
  ].filter(Boolean).join(' ');

  return classes;
};

/**
 * Get only size classes (without margins, weights, etc.)
 * Useful when you need just the font size
 */
export const getTypographySize = (variant) => {
  const styles = typography[variant];
  if (!styles) return '';

  return [
    styles.mobile,
    styles.tablet,
    styles.desktop
  ].filter(Boolean).join(' ');
};

/**
 * Get button classes
 * Usage: getButtonClasses('primary')
 */
export const getButtonClasses = (type = 'primary', customClasses = '') => {
  const buttonStyles = typography.button[type];

  if (!buttonStyles) {
    console.warn(`Button type "${type}" not found`);
    return customClasses;
  }

  // Combine all button properties
  const classes = [
    buttonStyles.base,
    buttonStyles.padding,
    buttonStyles.fontSize,
    buttonStyles.weight,
    buttonStyles.rounded,
    buttonStyles.colors,
    buttonStyles.hover,
    buttonStyles.effects,
    customClasses
  ].filter(Boolean).join(' ');

  return classes;
};

export default typography;
