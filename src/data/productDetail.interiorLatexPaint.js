// 🎨 UPDATED: Luxury Interior Emulsion with Pearl Finish Only + Sample Variants
const LUXURY_INTERIOR_VARIANT_MAP = {
  "1L-Pearl": "gid://shopify/ProductVariant/42619088339062",
  "4L-Pearl": "gid://shopify/ProductVariant/42619088404598",
  "10L-Pearl": "gid://shopify/ProductVariant/42619088470134",
  "20L-Pearl": "gid://shopify/ProductVariant/42619088535670",
  "Swatch Card-Pearl": "gid://shopify/ProductVariant/42663703085174",
  "SamplePot 200ml-Pearl": "gid://shopify/ProductVariant/42663703117942"
};

const priceByFinish = {
  "Pearl": {
    "1L": 800,
    "4L": 2200,
    "10L": 5200,
    "20L": 9700,
    "Swatch Card": 99,
    "SamplePot 200ml": 199
  }
};

// 🎨 UPDATED: Reordered sizes - Sample options AFTER regular sizes
const sizes = [
  {
    size: "1L",
    priceByFinish: {
      "Pearl": priceByFinish["Pearl"]["1L"]
    },
    price: priceByFinish["Pearl"]["1L"],
    originalPrice: 900,
  },
  {
    size: "4L",
    priceByFinish: {
      "Pearl": priceByFinish["Pearl"]["4L"]
    },
    price: priceByFinish["Pearl"]["4L"],
    originalPrice: 3500,
  },
  {
    size: "10L",
    priceByFinish: {
      "Pearl": priceByFinish["Pearl"]["10L"]
    },
    price: priceByFinish["Pearl"]["10L"],
    originalPrice: 8400,
  },
  {
    size: "20L",
    priceByFinish: {
      "Pearl": priceByFinish["Pearl"]["20L"]
    },
    price: priceByFinish["Pearl"]["20L"],
    originalPrice: 16000,
  },
  {
    size: "Swatch Card",
    priceByFinish: {
      "Pearl": priceByFinish["Pearl"]["Swatch Card"]
    },
    price: priceByFinish["Pearl"]["Swatch Card"],
    originalPrice: 150,
    description: "Color swatch card for quick shade checks",
  },
  {
    size: "SamplePot 200ml",
    priceByFinish: {
      "Pearl": priceByFinish["Pearl"]["SamplePot 200ml"]
    },
    price: priceByFinish["Pearl"]["SamplePot 200ml"],
    originalPrice: 250,
    description: "Small sample size for color testing",
  }
];

export const interiorLatexPaintDetail = {
  id: "Interior-Latex-Paint",
  slug: "Interior-Latex-Paint",
  name: "Calyco Luxury Interior Emulsion", // 🎨 RENAMED
  image: "/Assets/Product Images/Luxury Interior Emulsion/1.webp",
  brand: "Calyco",
  category: "Interior",
  rating: 4.9,
  reviewCount: 12,
  description:
    "Exquisite luxury interior emulsion with stunning pearl finish, engineered for discerning homeowners who demand unparalleled elegance and lasting beauty.",
  details:
    "Trusted by discerning designers and homeowners alike, Calyco Luxury Interior Emulsion delivers breathtaking pearl finish with unmatched luxury and sophistication.",
  shortDescription:
    "Premium pearl finish emulsion. Ultra-low VOC. Water-based luxury for sophisticated living.",
  tagline: "Luxury interior emulsion with pearl finish - where elegance meets excellence for extraordinary interiors.",
  microCopy: "Low VOC  Pearl Finish  Luxury Grade",
  keyBenefits: [
    "Stunning Pearl Finish for luxurious, sophisticated interiors",
    "Superior Coverage with premium hiding power",
    "Ultra-Washable finish withstands frequent cleaning",
    "Ultra-low VOC for healthier luxury living"
  ],
  features: [
    "Elegant pearl finish",
    "Ultra-low VOC luxury formula",
    "Superior stain resistance",
    "Premium washability"
  ],
  finishes: [
    {
      name: "Pearl",
      description:
        "Stunning pearl finish that adds sophisticated luster and depth to create luxurious interior spaces.",
      price: priceByFinish["Pearl"]["1L"],
    },
  ],
  defaultFinish: "Pearl",
  priceByFinish,
  price_by_finish: priceByFinish,
  shopify_variant_map: LUXURY_INTERIOR_VARIANT_MAP,
  sizes,
  coveragePerLitre: 11,
  coatsOptions: [1, 2],
  defaultCoats: 2,
  efficiency: 0.9,
  application: [
    "Luxury interior wall painting",
    "plaster",
    "drywall",
    "wood",
    "masonry",
    "metal"
  ],
  applicationInstructions:
    "Apply with premium brush, roller, or sprayer. Ensure surface is clean, dry, and properly primed for best luxury finish.",
  preparation:
    "Clean dry surface, primed if needed. Remove dust, grease, and loose paint for optimal pearl finish.",
  base_type: "Premium water-based acrylic emulsion",
  voc_content: "< 35 g/L (Ultra-low VOC)",
  coverage: "140-180 sq.ft./L/coat",
  coats_required: "2 coats",
  drying_time: "Touch dry: 1 hour",
  recoat_time: "2-4 hours",
  temperature_range: "10°C–35°C",
  humidity_range: "Under 80% RH",
  cleanup: "Soap and Water",
  storage_instructions: "Store in cool dry place, avoid freezing. Store between 5°C – 40°C.",
  application_instructions: "Apply with premium brush, roller, or sprayer. Stir thoroughly before use.",
  preparation_instructions: "Clean dry surface, primed if needed. Remove dust, grease, and loose paint.",
  recommended_uses: ["Luxury Walls & Ceilings: Ideal for premium plaster, POP, and drywall surfaces"],
  substrate: ["Drywall", "Plaster", "Wood", "Masonry", "Metal"],
  finish_type_sheen: ["Pearl"], // 🎨 UPDATED: Only Pearl finish
  advantages: [
    "Stunning Pearl Finish creates luxurious, sophisticated interiors",
    "Superior Coverage reduces application time and material costs",
    "Ultra-Washable finish withstands daily wear and frequent cleaning",
    "Ultra-low VOC content ensures healthier luxury living environments"
  ],
  technicalSpecs: {
    product_code: "CAL-00136",
    base: "Premium Acrylic Dispersion",
    base_type: "Premium water-based acrylic emulsion",
    vehicle_type: "Premium water-based acrylic emulsion",
    dryingTime: "Touch dry: 1 hour | Recoat: 2-4 hours | Full cure: 24 hours",
    thinning: "Not recommended; use as-is for best luxury results",
    recoatTime: "2-4 hours",
    volume_solids: "Approx. 38%",
    voc_content: "< 35 g/L (Ultra-low VOC)",
    pH: "7-8.5",
    weight_per_volume: "~1.28 kg/L",
    shelf_life: "48 months in sealed containers",
    storage_temp: "5°C – 40°C",
    application_instructions: "Apply with premium brush, roller, or sprayer. Ensure surface is clean, dry, and properly primed.",
    preparation_instructions: "Surface must be clean, dry, and free from dust, grease, loose paint. Prime new surfaces for luxury finish.",
    temperature_range: "10°C–35°C",
    humidity_range: "Under 80% RH",
    cleanup: "Soap and Water immediately after use",
    storage_instructions: "Store in cool dry place, avoid freezing",
  },
  safety_warnings: {
    signal_word: "Warning",
    hazard_statements: [
      "H319: Causes serious eye irritation",
      "H332: Harmful if inhaled",
      "H351: Suspected of causing cancer"
    ],
    precautionary_statements: [
      "P261: Avoid breathing dust/fume/gas/mist/vapours/spray",
      "P264: Wash exposed skin thoroughly after handling",
      "P271: Use only outdoors or in a well-ventilated area",
      "P280: Wear protective gloves/eye protection/face protection",
      "P305+P351+P338: IF IN EYES: Rinse cautiously with water for several minutes. Remove contact lenses if present and easy to do. Continue rinsing",
      "P312: Call a POISON CENTER or doctor if you feel unwell"
    ],
    first_aid: {
      eye_contact: "Rinse immediately with plenty of water for at least 15 minutes. Seek medical attention if irritation persists.",
      skin_contact: "Wash with soap and water. If irritation develops, seek medical attention.",
      inhalation: "Move to fresh air. If symptoms persist, seek medical attention.",
      ingestion: "Do NOT induce vomiting. Rinse mouth with water. Seek medical attention immediately."
    }
  },
  safety_precautions: "Premium gloves recommended, well-ventilated area. Wear protective gloves and eye protection during application.",
  documents: {
    tds: "/Assets/docs/luxury-interior-emulsion-tds.pdf",
    sds: "/Assets/docs/luxury-interior-emulsion-sds.pdf", 
    warranty: "/Assets/docs/luxury-interior-emulsion-warranty.pdf",
  },
  warranty: "5 years",
  
  // 🎨 UPDATED: Added sample variants in correct order
  packaging: [
    "1L",
    "4L",
    "10L",
    "20L",
    "Swatch Card",
    "SamplePot 200ml"
  ],
  
  bucketImage: "/Assets/Product Images/Luxury Interior Emulsion/1.webp",
  images: [
    "/Assets/Product Images/Luxury Interior Emulsion/1.webp"
  ],
  seo: {
    title: "Luxury Interior Emulsion | Pearl Finish Wall Paint | Calyco",
    description:
      "Calyco Luxury Interior Emulsion delivers stunning pearl finish with superior coverage. Ultra-low VOC, ultra-washable, luxury-grade finish for sophisticated homes.",
    keywords:
      "luxury interior paint, pearl finish emulsion, luxury wall paint, premium interior paint, luxury emulsion paint",
  },
};

export default interiorLatexPaintDetail;
