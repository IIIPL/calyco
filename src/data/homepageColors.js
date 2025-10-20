/**
 * Homepage Curated Color Collections
 * Selected from the main Calyco color database
 *
 * This file provides curated color selections for the homepage:
 * - Popular Colors: 10 most loved colors across categories
 * - Bold Colors: 16 vibrant, statement-making colors
 * - Soothing Neutrals: 16 calming, versatile neutral tones
 */

import { getAllColors } from './calycoColors.js';

// Get all colors from database
const allColors = getAllColors();

/**
 * Popular Colors - 10 most loved colors across different families
 * Selected for their versatility and popularity
 */
export const POPULAR_COLOR_NAMES = [
  'Pure White',        // RAL 9010 - Classic white
  'Linen',            // RAL 1015 - Warm neutral bestseller
  'Sage Green',       // RAL 6021 - Trendy green
  'Peacock Blue',     // RAL 5024 - Elegant blue
  'Terracotta',       // RAL 8004 - Warm earthy tone
  'Lavender',         // Close match in purples
  'Dove Gray',        // RAL 7001 - Soft gray
  'Monsoon Sky',      // RAL 5023 - Deep blue
  'Marigold',         // RAL 1033 - Vibrant yellow
  'Forest Green'      // RAL 6028 - Rich green
];

/**
 * Bold Colors - 16 vibrant, statement-making colors
 * Selected for high saturation and visual impact
 */
export const BOLD_COLOR_NAMES = [
  'Traffic Purple',    // RAL 4006 - Bold purple
  'Ruby Red',         // RAL 3003 - Deep red
  'Flame Red',        // RAL 3000 - Bright red
  'Turmeric Gold',    // RAL 1034 - Golden yellow
  'Ocean Blue',       // RAL 5020 - Strong blue
  'Midnight Blue',    // RAL 5013 - Deep navy
  'Teal Blue',        // RAL 5021 - Vibrant teal
  'Deep Navy',        // RAL 5011 - Dark blue
  'Burnt Orange',     // RAL 8023 - Orange-brown
  'Vermillion',       // RAL 2002 - Orange-red
  'Signal Violet',    // RAL 4008 - Purple
  'Saffron Yellow',   // RAL 1007 - Yellow
  'Marine Blue',      // RAL 5009 - Intense blue
  'Claret Violet',    // RAL 4004 - Deep purple
  'Traffic Orange',   // RAL 2009 - Bright orange
  'Forest Green'      // RAL 6028 - Deep green
];

/**
 * Soothing Neutrals - 16 calming, versatile neutral tones
 * Selected for their calming effect and versatility
 */
export const SOOTHING_NEUTRAL_NAMES = [
  'Beige',            // RAL 1001 - Classic beige
  'Pearl Gray',       // RAL 7040 - Light gray
  'Sand Gray',        // RAL 7032 - Warm gray
  'Cream White',      // RAL 9001 - Soft white
  'Pearl Beige',      // RAL 1035 - Warm beige
  'Desert Sand',      // RAL 1002 - Sandy beige
  'Silk Gray',        // RAL 7044 - Soft gray
  'Soft Gray',        // RAL 7047 - Gentle gray
  'Warm White',       // RAL 9002 - Cozy white
  'Light Gray',       // RAL 7035 - Neutral gray
  'Linen',            // RAL 1015 - Warm neutral
  'Stone Gray',       // RAL 7030 - Medium gray
  'Ivory',            // RAL 1014 - Off-white
  'Cloud Gray',       // RAL 7035 variant - Light gray
  'Grey Beige',       // RAL 1019 - Gray-beige mix
  'Silver Gray'       // RAL 7001 variant - Cool gray
];

/**
 * Get popular colors from database
 * @returns {Array} Array of 10 popular color objects
 */
export const getPopularColors = () => {
  const colors = allColors.filter(color =>
    POPULAR_COLOR_NAMES.includes(color.name)
  );

  // Sort by the order in POPULAR_COLOR_NAMES
  return POPULAR_COLOR_NAMES
    .map(name => colors.find(c => c.name === name))
    .filter(Boolean) // Remove any undefined entries
    .slice(0, 10);
};

/**
 * Get bold colors from database
 * @returns {Array} Array of 16 bold color objects
 */
export const getBoldColors = () => {
  const colors = allColors.filter(color =>
    BOLD_COLOR_NAMES.includes(color.name)
  );

  // Sort by the order in BOLD_COLOR_NAMES
  return BOLD_COLOR_NAMES
    .map(name => colors.find(c => c.name === name))
    .filter(Boolean)
    .slice(0, 16);
};

/**
 * Get soothing neutral colors from database
 * @returns {Array} Array of 16 neutral color objects
 */
export const getSoothingNeutralColors = () => {
  const colors = allColors.filter(color =>
    SOOTHING_NEUTRAL_NAMES.includes(color.name)
  );

  // Sort by the order in SOOTHING_NEUTRAL_NAMES
  return SOOTHING_NEUTRAL_NAMES
    .map(name => colors.find(c => c.name === name))
    .filter(Boolean)
    .slice(0, 16);
};
