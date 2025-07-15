export const products = {
  // Ultra-Premium Products (5 products - $60+ equivalent)
  "regal": {
    id: "regal",
    name: "Calyco Regal",
    category: "Interior",
    tier: "Ultra-Premium",
    price: 899,
    description: "Ultra-premium interior paint with Color Lock™ technology for exceptional hide and washability. Inspired by Benjamin Moore Regal Select.",
    shortDescription: "Ultra-premium interior paint with Color Lock™ technology",
    image: "/Assets/novaa.png",
    sizes: ["1L", "5L", "10L"],
    sheens: ["Matte", "Eggshell", "Satin", "Semi-Gloss"],
    features: [
      "Color Lock™ Technology",
      "One-Coat Coverage Guarantee",
      "Advanced Stain Resistance",
      "2-Year Warranty",
      "Zero-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "140-160 sq. ft. per liter",
      dryTime: "30 minutes to touch, 2 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 5 g/L",
      base: "Water-based"
    },
    applications: ["Living rooms", "Bedrooms", "Dining areas", "High-traffic areas"],
    warranty: "2 years"
  },
  
  "emerald-exterior": {
    id: "emerald-exterior",
    name: "Calyco Emerald Exterior",
    category: "Exterior",
    tier: "Ultra-Premium",
    price: 1299,
    description: "Ultra-premium exterior paint with Climate Guard™ technology for maximum weather protection and fade resistance.",
    shortDescription: "Ultra-premium exterior with Climate Guard™ protection",
    image: "/Assets/emerald-exterior.png",
    sizes: ["5L", "10L", "20L"],
    sheens: ["Flat", "Low-Lustre", "Satin"],
    features: [
      "Climate Guard™ Technology",
      "UV Fade Resistance",
      "Mold & Mildew Resistance",
      "2-Year Warranty",
      "All-Weather Protection"
    ],
    technicalSpecs: {
      coverage: "120-140 sq. ft. per liter",
      dryTime: "1 hour to touch, 4 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Exterior walls", "Siding", "Trim", "High-exposure areas"],
    warranty: "2 years"
  },

  "advance": {
    id: "advance",
    name: "Calyco Advance",
    category: "Interior",
    tier: "Ultra-Premium",
    price: 999,
    description: "Alkyd-like interior paint with PermaLast™ technology for superior durability and smooth application.",
    shortDescription: "Alkyd-like interior with PermaLast™ durability",
    image: "/Assets/lumen.png",
    sizes: ["1L", "5L", "10L"],
    sheens: ["Satin", "Semi-Gloss", "Gloss"],
    features: [
      "PermaLast™ Technology",
      "Alkyd-Like Performance",
      "Superior Adhesion",
      "20-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "130-150 sq. ft. per liter",
      dryTime: "45 minutes to touch, 3 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 25 g/L",
      base: "Water-based"
    },
    applications: ["Kitchens", "Bathrooms", "Trim", "Cabinets"],
    warranty: "20 years"
  },

  "natura": {
    id: "natura",
    name: "Calyco Natura",
    category: "Interior",
    tier: "Ultra-Premium",
    price: 799,
    description: "Zero-VOC interior paint with Micro-Seal™ technology for health-conscious environments.",
    shortDescription: "Zero-VOC interior with Micro-Seal™ protection",
    image: "/Assets/natura.png",
    sizes: ["1L", "5L", "10L"],
    sheens: ["Matte", "Eggshell", "Satin"],
    features: [
      "Zero-VOC Formula",
      "Micro-Seal™ Technology",
      "GREENGUARD Certified",
      "15-Year Warranty",
      "Health-Conscious"
    ],
    technicalSpecs: {
      coverage: "120-140 sq. ft. per liter",
      dryTime: "30 minutes to touch, 2 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "0 g/L",
      base: "Water-based"
    },
    applications: ["Nurseries", "Hospitals", "Schools", "Sensitive environments"],
    warranty: "15 years"
  },

  "arborcoat": {
    id: "arborcoat",
    name: "Calywood® Arborcoat",
    category: "Wood Finishes",
    tier: "Ultra-Premium",
    price: 1499,
    description: "Premium wood stain and sealer with advanced UV protection and water repellency.",
    shortDescription: "Premium wood stain with UV protection",
    image: "/Assets/arborcoat.png",
    sizes: ["1L", "5L"],
    sheens: ["Semi-Transparent", "Solid Color"],
    features: [
      "UV Protection",
      "Water Repellency",
      "Mold Resistance",
      "20-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "80-100 sq. ft. per liter",
      dryTime: "2 hours to touch, 6 hours to recoat",
      cleanup: "Mineral spirits",
      vocLevel: "< 100 g/L",
      base: "Oil-based"
    },
    applications: ["Decking", "Fencing", "Outdoor furniture", "Siding"],
    warranty: "20 years"
  },

  // Premium Products (8 products - $40-60 equivalent)
  "nova": {
    id: "nova",
    name: "Calyco Nova",
    category: "Interior",
    tier: "Premium",
    price: 499,
    description: "Premium interior latex paint engineered for effortless one-coat application and long-lasting color.",
    shortDescription: "Premium interior latex with one-coat coverage",
    image: "/Assets/novaa.png",
    sizes: ["1L", "5L", "10L"],
    sheens: ["Matte", "Eggshell", "Satin", "Semi-Gloss"],
    features: [
      "One-Coat Coverage",
      "Fade-Resistant Colors",
      "Washable & Scrub-Resistant",
      "10-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "120-140 sq. ft. per liter",
      dryTime: "30 minutes to touch, 2 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Living rooms", "Bedrooms", "Hallways", "General interior"],
    warranty: "10 years"
  },

  "lumen": {
    id: "lumen",
    name: "Calyco Lumen",
    category: "Interior",
    tier: "Premium",
    price: 399,
    description: "Mid-range interior emulsion with excellent coverage and smooth finish.",
    shortDescription: "Mid-range interior emulsion with excellent coverage",
    image: "/Assets/lumen.png",
    sizes: ["5L", "10L", "15L"],
    sheens: ["Matte", "Eggshell", "Satin"],
    features: [
      "Excellent Coverage",
      "Smooth Application",
      "Washable Finish",
      "8-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "110-130 sq. ft. per liter",
      dryTime: "45 minutes to touch, 3 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Bedrooms", "Living areas", "Offices", "General interior"],
    warranty: "8 years"
  },

  "duration": {
    id: "duration",
    name: "Calyco Duration",
    category: "Exterior",
    tier: "Premium",
    price: 899,
    description: "Premium exterior paint with advanced weather protection and extended durability.",
    shortDescription: "Premium exterior with advanced weather protection",
    image: "/Assets/duration.png",
    sizes: ["5L", "10L", "20L"],
    sheens: ["Flat", "Low-Lustre", "Satin"],
    features: [
      "Advanced Weather Protection",
      "Extended Durability",
      "Mold Resistance",
      "15-Year Warranty",
      "Fade-Resistant"
    ],
    technicalSpecs: {
      coverage: "100-120 sq. ft. per liter",
      dryTime: "1 hour to touch, 4 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Exterior walls", "Siding", "Trim", "Outdoor structures"],
    warranty: "15 years"
  },

  "infinity": {
    id: "infinity",
    name: "Calyco Infinity",
    category: "Interior",
    tier: "Premium",
    price: 449,
    description: "Designer-inspired interior paint with rich colors and smooth application.",
    shortDescription: "Designer-inspired interior with rich colors",
    image: "/Assets/velvettouch.png",
    sizes: ["1L", "5L", "10L"],
    sheens: ["Matte", "Eggshell", "Satin"],
    features: [
      "Designer Colors",
      "Smooth Application",
      "Excellent Coverage",
      "8-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "115-135 sq. ft. per liter",
      dryTime: "30 minutes to touch, 2 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Living rooms", "Dining areas", "Bedrooms", "Designer spaces"],
    warranty: "8 years"
  },

  "marquee": {
    id: "marquee",
    name: "Calyco Marquee",
    category: "Interior",
    tier: "Premium",
    price: 549,
    description: "One-coat guarantee interior paint with Stain Shield™ technology.",
    shortDescription: "One-coat guarantee with Stain Shield™ technology",
    image: "/Assets/weathra.png",
    sizes: ["1L", "5L", "10L"],
    sheens: ["Matte", "Eggshell", "Satin"],
    features: [
      "One-Coat Guarantee",
      "Stain Shield™ Technology",
      "Advanced Coverage",
      "10-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "140-160 sq. ft. per liter",
      dryTime: "30 minutes to touch, 2 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["High-traffic areas", "Kitchens", "Bathrooms", "Living rooms"],
    warranty: "10 years"
  },

  "signature": {
    id: "signature",
    name: "Calyco Signature",
    category: "Interior",
    tier: "Premium",
    price: 399,
    description: "Designer paint line with curated color palette and premium finish.",
    shortDescription: "Designer paint line with curated colors",
    image: "/Assets/weathra.png",
    sizes: ["1L", "5L"],
    sheens: ["Matte", "Eggshell", "Satin"],
    features: [
      "Curated Color Palette",
      "Premium Finish",
      "Designer Approved",
      "8-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "110-130 sq. ft. per liter",
      dryTime: "30 minutes to touch, 2 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Designer spaces", "Living rooms", "Bedrooms", "Accent walls"],
    warranty: "8 years"
  },

  "velvet-touch": {
    id: "velvet-touch",
    name: "Calyco Velvet Touch",
    category: "Interior",
    tier: "Premium",
    price: 349,
    description: "Soft luxury interior finish with silky smooth application.",
    shortDescription: "Soft luxury interior with silky finish",
    image: "/Assets/velvettouch.png",
    sizes: ["1L", "5L"],
    sheens: ["Silky Matte", "Soft Sheen"],
    features: [
      "Silky Smooth Finish",
      "Luxury Feel",
      "Easy Application",
      "8-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "100-120 sq. ft. per liter",
      dryTime: "30 minutes to touch, 2 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Bedrooms", "Living rooms", "Luxury spaces", "Accent walls"],
    warranty: "8 years"
  },

  "climaguard": {
    id: "climaguard",
    name: "Calyco ClimaGuard",
    category: "Exterior",
    tier: "Premium",
    price: 799,
    description: "UV and waterproof exterior emulsion with Climate Guard™ technology.",
    shortDescription: "UV and waterproof exterior with Climate Guard™",
    image: "/Assets/climaguard.png",
    sizes: ["10L", "20L"],
    sheens: ["Flat", "Low-Lustre"],
    features: [
      "Climate Guard™ Technology",
      "UV Protection",
      "Waterproof",
      "12-Year Warranty",
      "Mold Resistant"
    ],
    technicalSpecs: {
      coverage: "90-110 sq. ft. per liter",
      dryTime: "1 hour to touch, 4 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Exterior walls", "Siding", "Outdoor structures"],
    warranty: "12 years"
  },

  // Standard Products (10 products - $25-40 equivalent)
  "silka": {
    id: "silka",
    name: "Calyco Silka",
    category: "Interior",
    tier: "Standard",
    price: 299,
    description: "Economy matte finish interior paint with good coverage.",
    shortDescription: "Economy matte finish with good coverage",
    image: "/Assets/silka.png",
    sizes: ["1L", "10L"],
    sheens: ["Matte"],
    features: [
      "Good Coverage",
      "Economy Price",
      "Easy Application",
      "5-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "100-120 sq. ft. per liter",
      dryTime: "45 minutes to touch, 3 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["General interior", "Rental properties", "Budget projects"],
    warranty: "5 years"
  },

  "surfa": {
    id: "surfa",
    name: "Calyco Surfa",
    category: "Exterior",
    tier: "Standard",
    price: 599,
    description: "Standard exterior paint with durable finish and weather resistance.",
    shortDescription: "Standard exterior with durable finish",
    image: "/Assets/surfa.png",
    sizes: ["10L", "20L"],
    sheens: ["Flat", "Low-Lustre"],
    features: [
      "Durable Finish",
      "Weather Resistant",
      "Good Coverage",
      "8-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "80-100 sq. ft. per liter",
      dryTime: "1 hour to touch, 4 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Exterior walls", "Siding", "Outdoor structures"],
    warranty: "8 years"
  },

  "weathra": {
    id: "weathra",
    name: "Calyco Weathra",
    category: "Exterior",
    tier: "Standard",
    price: 499,
    description: "Mid-range outdoor finish with rough and tough durability.",
    shortDescription: "Mid-range outdoor with rough and tough durability",
    image: "/Assets/weathra.png",
    sizes: ["10L", "20L"],
    sheens: ["Flat", "Low-Lustre"],
    features: [
      "Rough & Tough",
      "Weather Resistant",
      "Good Coverage",
      "6-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "70-90 sq. ft. per liter",
      dryTime: "1 hour to touch, 4 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Outdoor structures", "Fencing", "Utility buildings"],
    warranty: "6 years"
  },

  "calywood": {
    id: "calywood",
    name: "Calywood® Natural",
    category: "Wood Finishes",
    tier: "Standard",
    price: 799,
    description: "Translucent wood stain and sealer with natural finish.",
    shortDescription: "Translucent wood stain with natural finish",
    image: "/Assets/calywood.png",
    sizes: ["1L", "5L"],
    sheens: ["Dead Flat", "Semi-Transparent"],
    features: [
      "Natural Finish",
      "Wood Protection",
      "Easy Application",
      "8-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "60-80 sq. ft. per liter",
      dryTime: "2 hours to touch, 6 hours to recoat",
      cleanup: "Mineral spirits",
      vocLevel: "< 100 g/L",
      base: "Oil-based"
    },
    applications: ["Decking", "Fencing", "Outdoor furniture"],
    warranty: "8 years"
  },

  "pu-enamel": {
    id: "pu-enamel",
    name: "Calyco PU Enamel",
    category: "Enamel & Wood Finishes",
    tier: "Standard",
    price: 449,
    description: "Gloss enamel for wood and metal with high durability.",
    shortDescription: "Gloss enamel for wood and metal",
    image: "/Assets/pu-enamel.png",
    sizes: ["1L"],
    sheens: ["High Gloss"],
    features: [
      "High Gloss Finish",
      "Wood & Metal",
      "Durable Coating",
      "8-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "80-100 sq. ft. per liter",
      dryTime: "2 hours to touch, 6 hours to recoat",
      cleanup: "Mineral spirits",
      vocLevel: "< 100 g/L",
      base: "Oil-based"
    },
    applications: ["Doors", "Windows", "Metal surfaces", "Cabinets"],
    warranty: "8 years"
  },

  "fastdry-enamel": {
    id: "fastdry-enamel",
    name: "Calyco FastDry Enamel",
    category: "Enamel & Wood Finishes",
    tier: "Standard",
    price: 399,
    description: "Quick dry enamel with tough gloss finish.",
    shortDescription: "Quick dry enamel with tough gloss",
    image: "/Assets/fastdry.png",
    sizes: ["500ml", "1L"],
    sheens: ["Tough Gloss"],
    features: [
      "Quick Drying",
      "Tough Gloss",
      "Fast Application",
      "6-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "70-90 sq. ft. per liter",
      dryTime: "1 hour to touch, 3 hours to recoat",
      cleanup: "Mineral spirits",
      vocLevel: "< 100 g/L",
      base: "Oil-based"
    },
    applications: ["Trim", "Doors", "Metal surfaces", "Quick projects"],
    warranty: "6 years"
  },

  "ultra-premium": {
    id: "ultra-premium",
    name: "Calyco Ultra Premium",
    category: "Exterior",
    tier: "Standard",
    price: 699,
    description: "All-weather protection exterior paint with advanced durability.",
    shortDescription: "All-weather protection exterior paint",
    image: "/Assets/ultra-premium.png",
    sizes: ["5L", "10L", "20L"],
    sheens: ["Flat", "Low-Lustre", "Satin"],
    features: [
      "All-Weather Protection",
      "Advanced Durability",
      "Mold Resistant",
      "10-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "90-110 sq. ft. per liter",
      dryTime: "1 hour to touch, 4 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Exterior walls", "Siding", "Outdoor structures"],
    warranty: "10 years"
  },

  "deckover": {
    id: "deckover",
    name: "Calywood® DeckOver",
    category: "Wood Finishes",
    tier: "Standard",
    price: 899,
    description: "Deck restoration coating with textured finish and slip resistance.",
    shortDescription: "Deck restoration with textured finish",
    image: "/Assets/deckover.png",
    sizes: ["1L", "5L"],
    sheens: ["Textured"],
    features: [
      "Deck Restoration",
      "Textured Finish",
      "Slip Resistant",
      "10-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "40-60 sq. ft. per liter",
      dryTime: "4 hours to touch, 24 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Deck restoration", "Outdoor surfaces", "High-traffic areas"],
    warranty: "10 years"
  },

  "steelseal": {
    id: "steelseal",
    name: "Calyco SteelSeal™",
    category: "Industrial Coatings",
    tier: "Standard",
    price: 799,
    description: "Metal anti-corrosive enamel with industrial-grade protection.",
    shortDescription: "Metal anti-corrosive enamel",
    image: "/Assets/steelseal.png",
    sizes: ["10L", "20L"],
    sheens: ["Industrial Shield"],
    features: [
      "Anti-Corrosive",
      "Industrial Grade",
      "Metal Protection",
      "15-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "60-80 sq. ft. per liter",
      dryTime: "2 hours to touch, 6 hours to recoat",
      cleanup: "Mineral spirits",
      vocLevel: "< 100 g/L",
      base: "Oil-based"
    },
    applications: ["Industrial equipment", "Metal structures", "Machinery"],
    warranty: "15 years"
  },

  "fortify": {
    id: "fortify",
    name: "Calyco Fortify™",
    category: "Industrial Coatings",
    tier: "Standard",
    price: 699,
    description: "Concrete and asphalt protector with heavy-duty durability.",
    shortDescription: "Concrete and asphalt protector",
    image: "/Assets/fortity.png",
    sizes: ["5L", "15L"],
    sheens: ["Flat Heavy Duty"],
    features: [
      "Concrete Protection",
      "Heavy Duty",
      "Asphalt Compatible",
      "12-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "50-70 sq. ft. per liter",
      dryTime: "3 hours to touch, 8 hours to recoat",
      cleanup: "Mineral spirits",
      vocLevel: "< 100 g/L",
      base: "Oil-based"
    },
    applications: ["Concrete floors", "Asphalt surfaces", "Industrial floors"],
    warranty: "12 years"
  },

  // Value Products (4 products - under $25 equivalent)
  "value-interior": {
    id: "value-interior",
    name: "Calyco Value Interior",
    category: "Interior",
    tier: "Value",
    price: 199,
    description: "Budget-friendly interior paint with basic coverage and finish.",
    shortDescription: "Budget-friendly interior paint",
    image: "/Assets/value-interior.png",
    sizes: ["1L", "5L", "10L"],
    sheens: ["Matte"],
    features: [
      "Budget Friendly",
      "Basic Coverage",
      "Easy Application",
      "3-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "80-100 sq. ft. per liter",
      dryTime: "1 hour to touch, 4 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Rental properties", "Budget projects", "Utility spaces"],
    warranty: "3 years"
  },

  "value-exterior": {
    id: "value-exterior",
    name: "Calyco Value Exterior",
    category: "Exterior",
    tier: "Value",
    price: 299,
    description: "Budget-friendly exterior paint with basic weather protection.",
    shortDescription: "Budget-friendly exterior paint",
    image: "/Assets/value-exterior.png",
    sizes: ["5L", "10L"],
    sheens: ["Flat"],
    features: [
      "Budget Friendly",
      "Basic Weather Protection",
      "Good Coverage",
      "5-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "60-80 sq. ft. per liter",
      dryTime: "1 hour to touch, 4 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Utility buildings", "Budget projects", "Temporary structures"],
    warranty: "5 years"
  },

  "basic-enamel": {
    id: "basic-enamel",
    name: "Calyco Basic Enamel",
    category: "Enamel & Wood Finishes",
    tier: "Value",
    price: 249,
    description: "Basic enamel for simple wood and metal projects.",
    shortDescription: "Basic enamel for simple projects",
    image: "/Assets/basic-enamel.png",
    sizes: ["500ml", "1L"],
    sheens: ["Gloss"],
    features: [
      "Basic Protection",
      "Simple Application",
      "Good Coverage",
      "3-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "60-80 sq. ft. per liter",
      dryTime: "2 hours to touch, 6 hours to recoat",
      cleanup: "Mineral spirits",
      vocLevel: "< 100 g/L",
      base: "Oil-based"
    },
    applications: ["Simple projects", "Utility surfaces", "Budget applications"],
    warranty: "3 years"
  },

  "utility-coating": {
    id: "utility-coating",
    name: "Calyco Utility Coating",
    category: "Industrial Coatings",
    tier: "Value",
    price: 399,
    description: "Basic industrial coating for utility applications.",
    shortDescription: "Basic industrial coating",
    image: "/Assets/utility-coating.png",
    sizes: ["5L", "10L"],
    sheens: ["Flat"],
    features: [
      "Utility Grade",
      "Basic Protection",
      "Cost Effective",
      "5-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "40-60 sq. ft. per liter",
      dryTime: "2 hours to touch, 6 hours to recoat",
      cleanup: "Mineral spirits",
      vocLevel: "< 100 g/L",
      base: "Oil-based"
    },
    applications: ["Utility equipment", "Basic protection", "Cost-sensitive projects"],
    warranty: "5 years"
  },

  // Specialty Products (3 products)
  "fire-retardant": {
    id: "fire-retardant",
    name: "Calyco Fire Retardant",
    category: "Specialty",
    tier: "Specialty",
    price: 1299,
    description: "Fire retardant coating for commercial and industrial applications.",
    shortDescription: "Fire retardant coating for commercial use",
    image: "/Assets/fire-retardant.png",
    sizes: ["5L", "10L"],
    sheens: ["Flat"],
    features: [
      "Fire Retardant",
      "Commercial Grade",
      "Safety Certified",
      "10-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "50-70 sq. ft. per liter",
      dryTime: "2 hours to touch, 6 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Commercial buildings", "Industrial facilities", "Safety applications"],
    warranty: "10 years"
  },

  "anti-bacterial": {
    id: "anti-bacterial",
    name: "Calyco Anti-Bacterial",
    category: "Specialty",
    tier: "Specialty",
    price: 899,
    description: "Anti-bacterial coating for healthcare and food service environments.",
    shortDescription: "Anti-bacterial coating for healthcare",
    image: "/Assets/anti-bacterial.png",
    sizes: ["1L", "5L"],
    sheens: ["Matte", "Satin"],
    features: [
      "Anti-Bacterial",
      "Healthcare Grade",
      "Food Safe",
      "8-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "100-120 sq. ft. per liter",
      dryTime: "30 minutes to touch, 2 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Hospitals", "Food service", "Healthcare facilities"],
    warranty: "8 years"
  },

  "sound-absorbing": {
    id: "sound-absorbing",
    name: "Calyco Sound Absorbing",
    category: "Specialty",
    tier: "Specialty",
    price: 999,
    description: "Sound absorbing coating for acoustic applications.",
    shortDescription: "Sound absorbing coating for acoustics",
    image: "/Assets/sound-absorbing.png",
    sizes: ["1L", "5L"],
    sheens: ["Textured"],
    features: [
      "Sound Absorbing",
      "Acoustic Properties",
      "Textured Finish",
      "8-Year Warranty",
      "Low-VOC Formula"
    ],
    technicalSpecs: {
      coverage: "60-80 sq. ft. per liter",
      dryTime: "1 hour to touch, 4 hours to recoat",
      cleanup: "Soap and water",
      vocLevel: "< 50 g/L",
      base: "Water-based"
    },
    applications: ["Recording studios", "Auditoriums", "Acoustic spaces"],
    warranty: "8 years"
  }
};

// Helper functions
export const getProductById = (id) => {
  return products[id] || null;
};

export const getProductsByCategory = (category) => {
  return Object.values(products).filter(product => product.category === category);
};

export const getProductsByTier = (tier) => {
  return Object.values(products).filter(product => product.tier === tier);
};

export const getAllProducts = () => {
  return Object.values(products);
};

export const getProductCategories = () => {
  const categories = [...new Set(Object.values(products).map(product => product.category))];
  return categories;
};

export const getProductTiers = () => {
  const tiers = [...new Set(Object.values(products).map(product => product.tier))];
  return tiers;
}; 