// ✅ Luxury Exterior Emulsion — High Sheen only + Swatch Card + Sample Pot

const LUXURY_EXTERIOR_VARIANT_MAP = {
  "1L-High Sheen Finish": "gid://shopify/ProductVariant/42637669433462",
  "4L-High Sheen Finish": "gid://shopify/ProductVariant/42637669498998",
  "10L-High Sheen Finish": "gid://shopify/ProductVariant/42637669564534",
  "20L-High Sheen Finish": "gid://shopify/ProductVariant/42637669630070",
  "Swatch Card-High Sheen Finish": "gid://shopify/ProductVariant/42663730577526",
  "SamplePot 200ml-High Sheen Finish": "gid://shopify/ProductVariant/42663730610294"
};

const priceByFinish = {
  "High Sheen Finish": {
    "1L": 800,
    "4L": 2200,
    "10L": 5200,
    "20L": 9700,
    "Swatch Card": 99,
    "SamplePot 200ml": 199
  }
};

// Order: 1L, 4L, 10L, 20L, then samples
const sizes = [
  {
    size: "1L",
    priceByFinish: {
      "High Sheen Finish": priceByFinish["High Sheen Finish"]["1L"]
    },
    price: priceByFinish["High Sheen Finish"]["1L"],
    originalPrice: 900,
  },
  {
    size: "4L",
    priceByFinish: {
      "High Sheen Finish": priceByFinish["High Sheen Finish"]["4L"]
    },
    price: priceByFinish["High Sheen Finish"]["4L"],
    originalPrice: 3500,
  },
  {
    size: "10L",
    priceByFinish: {
      "High Sheen Finish": priceByFinish["High Sheen Finish"]["10L"]
    },
    price: priceByFinish["High Sheen Finish"]["10L"],
    originalPrice: 8400,
  },
  {
    size: "20L",
    priceByFinish: {
      "High Sheen Finish": priceByFinish["High Sheen Finish"]["20L"]
    },
    price: priceByFinish["High Sheen Finish"]["20L"],
    originalPrice: 16000,
  },
  {
    size: "Swatch Card",
    priceByFinish: {
      "High Sheen Finish": priceByFinish["High Sheen Finish"]["Swatch Card"]
    },
    price: priceByFinish["High Sheen Finish"]["Swatch Card"],
    originalPrice: 150,
    description: "Color swatch card for quick shade checks",
  },
  {
    size: "SamplePot 200ml",
    priceByFinish: {
      "High Sheen Finish": priceByFinish["High Sheen Finish"]["SamplePot 200ml"]
    },
    price: priceByFinish["High Sheen Finish"]["SamplePot 200ml"],
    originalPrice: 250,
    description: "Small sample size for color testing",
  }
];

export const exteriorLatexPaintDetail = {
  id: "Luxury-Exterior-Emulsion",
  slug: "Luxury-Exterior-Emulsion",
  name: "Calyco Luxury Exterior Emulsion",
  image: "/Assets/Product Images/Luxury Exterior Emulsion/1.webp",
  brand: "Calyco",
  category: "Exterior",
  rating: 4.7,
  reviewCount: 8,

  // Luxury, high-sheen positioning
  description:
    "Luxury exterior emulsion with a high sheen finish for premium façades. Advanced UV protection, weather-sealed durability, and algae resistance keep exteriors looking new longer.",
  details:
    "Formulated with UV-blocking pigments, hydrophobic binders, and anti-fungal additives, Luxury Exterior Emulsion delivers a rich, high-sheen façade with long-term color retention and easy-clean performance.",
  shortDescription:
    "High sheen, UV-shielded luxury exterior emulsion engineered for lasting brilliance and protection.",
  tagline:
    "Luxury high-sheen exterior emulsion — brilliant façades, weather after weather.",
  microCopy: "High Sheen  UV Shield  Weatherproof",

  keyBenefits: [
    "High sheen finish elevates façade brilliance",
    "UV shield resists fading and chalking",
    "Weatherproof film withstands rain and humidity",
    "Anti-fungal protection resists mildew and algae",
  ],

  features: [
    "High-sheen acrylic emulsion",
    "UV-blocking pigments",
    "Hydrophobic weather seal",
    "Anti-fungal & anti-algae system",
  ],

  // High Sheen only
  finishes: [
    {
      name: "High Sheen Finish",
      description: "Premium high sheen for luxury exteriors with superior durability and cleanability.",
      price: priceByFinish["High Sheen Finish"]["1L"],
    },
  ],
  defaultFinish: "High Sheen Finish",

  priceByFinish,
  price_by_finish: priceByFinish,
  shopify_variant_map: LUXURY_EXTERIOR_VARIANT_MAP,
  sizes,

  coveragePerLitre: 10,
  coatsOptions: [1, 2],
  defaultCoats: 2,
  efficiency: 0.9,

  application: ["Exterior wall painting", "stucco", "brick", "concrete", "fiber cement", "wood"],
  applicationInstructions:
    "Apply with brush, roller, or sprayer. Avoid application if rain is expected within 6 hours.",
  preparation:
    "Clean, dry, sound surface free from chalking, dust, grease, or mildew. Prime new/porous areas.",

  base_type: "Premium acrylic exterior emulsion",
  voc_content: "< 60 g/L (Low VOC)",
  coverage: "120–160 sq.ft./L/coat",
  coats_required: "2 coats",
  drying_time: "Touch dry: 45 minutes",
  recoat_time: "4–6 hours",
  temperature_range: "10°C–40°C",
  humidity_range: "Below 85% RH",
  cleanup: "Soap and water",

  storage_instructions: "Store between 5°C–40°C. Protect from freezing.",
  recommended_uses: ["Luxury façades, trims, architectural features needing high sheen and protection"],
  substrate: ["Stucco", "Concrete", "Brick", "Fiber cement", "Wood"],

  // Only one finish in selector
  finish_type_sheen: ["High Sheen Finish"],

  advantages: [
    "High sheen brilliance with premium dirt pick-up resistance",
    "Excellent color retention under harsh UV",
    "Weather and moisture barrier with breathable film",
    "Resists algae and black spotting in humid/rainy climates",
  ],

  technicalSpecs: {
    product_code: "CAL-00250",
    base: "Premium acrylic exterior emulsion",
    base_type: "Premium acrylic exterior emulsion",
    vehicle_type: "Water-based acrylic",
    dryingTime: "Touch dry: 45 minutes | Recoat: 4–6 hours | Full cure: 7 days",
    thinning: "Up to 5% clean water for brush/roller",
    recoatTime: "4–6 hours",
    volume_solids: "Approx. 42%",
    voc_content: "< 60 g/L (Low VOC)",
    pH: "8–9",
    weight_per_volume: "~1.30 kg/L",
    shelf_life: "48 months (sealed)",
    storage_temp: "5°C–40°C",
    application_instructions:
      "Use premium roller/brush/spray. Back-roll for uniform film. Avoid direct rain until surface is set.",
    preparation_instructions:
      "Pressure-wash where appropriate. Treat algae/mildew. Prime chalky or porous substrates.",
    temperature_range: "10°C–40°C",
    humidity_range: "Below 85% RH",
    cleanup: "Soap and water immediately after use",
    storage_instructions: "Store in cool, dry place. Do not freeze.",
  },

  safety_warnings: {
    signal_word: "Warning",
    hazard_statements: [
      "H315: Causes skin irritation",
      "H319: Causes serious eye irritation",
      "H335: May cause respiratory irritation",
    ],
    precautionary_statements: [
      "Use only outdoors or in well‑ventilated areas",
      "Wear protective gloves and eye protection",
      "Avoid breathing mist or spray",
      "Wash hands thoroughly after handling",
    ],
    first_aid: {
      eye_contact:
        "Rinse cautiously with water for several minutes. Remove contact lenses if present. Continue rinsing. Seek medical attention if irritation persists.",
      skin_contact:
        "Wash with soap and water. Remove contaminated clothing and launder before reuse.",
      inhalation:
        "Move to fresh air and rest comfortably. Seek medical advice if symptoms occur.",
      ingestion:
        "Rinse mouth. Do not induce vomiting. Seek medical attention immediately.",
    },
  },

  safety_precautions:
    "Wear gloves, goggles, and long sleeves. Mask adjacent surfaces. Maintain ventilation.",

  documents: {
    tds: "/Assets/docs/html-templates/luxury-exterior-emulsion-tds.html",
    sds: "/Assets/docs/html-templates/luxury-exterior-emulsion-sds.html",
    warranty: "/Assets/docs/luxury-exterior-emulsion-warranty.pdf",
  },

  warranty: "7 years",

  // Regular sizes first, then samples
  packaging: [
    "1L",
    "4L",
    "10L",
    "20L",
    "Swatch Card",
    "SamplePot 200ml"
  ],

  bucketImage: "/Assets/Product Images/Luxury Exterior Emulsion/1.webp",
  images: ["/Assets/Product Images/Luxury Exterior Emulsion/1.webp"],

  seo: {
    title: "Luxury Exterior Emulsion (High Sheen) | Calyco",
    description:
      "Calyco Luxury Exterior Emulsion with high sheen finish offers UV protection, weather resistance, and anti-fungal performance for brilliant, long‑lasting façades.",
    keywords:
      "luxury exterior emulsion, high sheen exterior paint, weather resistant paint, UV resistant paint, anti fungal exterior paint",
  },
};

export default exteriorLatexPaintDetail;
