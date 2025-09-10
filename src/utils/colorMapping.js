// Comprehensive color mapping for all inspiration pages
import { calycoColorsData } from '../data/calycoColorsData';

export const COMPREHENSIVE_COLOR_MAP = {
  // Bedroom Colors
  "Sage Dust": "#8A9A5B",
  "Eucalyptus Breeze": "#A3B18A",
  "Classic Cream": "#F5F5DC",
  "Mint Soft": "#A7C4A0",
  "Vanilla Cream": "#F3E5AB",
  "Evening Linen": "#C9C0B9",
  "Indigo Night": "#2E3A87",
  "Graphite Grey": "#556080",
  "Ocean Mist": "#49707A",
  "Slate Stone": "#D1D3D4",
  "Chalk Cream": "#F2E8DF",
  "Royal Indigo": "#3B2E7A",
  "Golden Clay": "#D4AF37",
  "Serene Ivory": "#F8F4E3",
  "Blush Petal": "#D7A9A1",
  "Silk Taupe": "#A8988A",
  
  // Kitchen Colors
  "Banana Cream": "#FFFACD",
  "Charcoal Smoke": "#36454F",
  "Jet Black": "#0C0C0C",
  "Earthy Terracotta": "#E2725B",
  "Clay Beige": "#D2B48C",
  "Cocoa Brown": "#D2691E",
  "Terra Blush": "#E8B4B8",
  "Blossom Warmth": "#FFB6C1",
  "Mudstone Brown": "#8B4513",
  "Deep Ocean": "#1E3A8A",
  "Glacier Mist": "#E0F2FE",
  "Molten Ember": "#B22222",
  "Maroon Velvet": "#800020",
  "Vintage Rose": "#C08081",
  "Curry Yellow": "#DAA520",
  "Forest Olive": "#556B2F",
  "Mud Brown": "#8B4513",
  "Silver Mist": "#C0C0C0",
  "Olive Grove": "#6B8E23",
  "Teal Serenity": "#008080",
  "Greige Harmony": "#B8B8A3",
  "Ash Grey": "#696969",
  "Taupe Warmth": "#8B7355",
  "Coconut Brown": "#8B4513",
  "Pearl Blush": "#F4C2C2",
  "Plum Midnight": "#4B0082",
  
  // Living Room Colors
  "Sky Blue": "#87CEEB",
  "Celadon Green": "#ACE1AF",
  "Chalk Beige": "#F5F5DC",
  "Charcoal Grey": "#36454F",
  "Lilac Veil": "#E6E6FA",
  "Lotus Bloom": "#FFB6C1",
  "Sage Whisper": "#9CAF88",
  "Golden Harvest": "#DAA520",
  "Terra Blush": "#E8B4B8",
  "Clay Beige": "#D2B48C",
  "Mudstone Brown": "#8B4513",
  
  // Bathroom Colors
  "Chalk Beige": "#F5F5DC",
  "Celadon Green": "#ACE1AF",
  
  // Dining Room Colors
  "Chalk Beige": "#F5F5DC",
  
  // Hallway Colors
  "Chalk Beige": "#F5F5DC",
  
  // Additional Colors
  "Indigo Twilight": "#4B0082",
  "Jade Mist": "#98FB98",
  "Forest Olive": "#556B2F",
  "Mauve Shadow": "#E0B0FF"
};

// Function to find color with comprehensive mapping
export const findColorComprehensive = (name, roomFamily = "GENERAL") => {
  if (!name) return null;
  
  // Check new comprehensive color data first
  const colorData = calycoColorsData[name];
  if (colorData) {
    return {
      name: name,
      code: colorData.code,
      hex: colorData.hex,
      color_family: colorData.family,
      group: colorData.group,
      base: colorData.base,
      temperature: colorData.temperature,
      tonality: colorData.tonality,
      rooms: colorData.rooms,
      usage: colorData.usage
    };
  }
  
  // Check comprehensive color map as fallback
  if (COMPREHENSIVE_COLOR_MAP[name]) {
    return {
      name: name,
      code: "CP101",
      hex: COMPREHENSIVE_COLOR_MAP[name],
      color_family: roomFamily.toUpperCase()
    };
  }
  
  // Fallback to default grey if not found
  return {
    name: name,
    code: "CP101",
    hex: "#CCCCCC",
    color_family: roomFamily.toUpperCase()
  };
};
