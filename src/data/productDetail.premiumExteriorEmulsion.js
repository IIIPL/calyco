// 🏗️ UPDATED: Premium Exterior Emulsion with Matte Finish Only + Sample Variants
const PREMIUM_EXTERIOR_VARIANT_MAP = {
  "1L-Matte Finish": "gid://shopify/ProductVariant/42663725006966",
  "4L-Matte Finish": "gid://shopify/ProductVariant/42663725072502",
  "10L-Matte Finish": "gid://shopify/ProductVariant/42663725138038",
  "20L-Matte Finish": "gid://shopify/ProductVariant/42663725203574",
  "Swatch Card-Matte Finish": "gid://shopify/ProductVariant/42663725596790",
  "SamplePot 200ml-Matte Finish": "gid://shopify/ProductVariant/42663725629558"
};

const priceByFinish = {
  "Matte Finish": {
    "1L": 600,
    "4L": 1700,
    "10L": 4100,
    "20L": 8000,
    "Swatch Card": 99,
    "SamplePot 200ml": 199
  }
};

// 🏗️ UPDATED: Reordered sizes - Sample options AFTER regular sizes
const sizes = [
  {
    size: "1L",
    priceByFinish: {
      "Matte Finish": priceByFinish["Matte Finish"]["1L"]
    },
    price: priceByFinish["Matte Finish"]["1L"],
    originalPrice: 700,
  },
  {
    size: "4L",
    priceByFinish: {
      "Matte Finish": priceByFinish["Matte Finish"]["4L"]
    },
    price: priceByFinish["Matte Finish"]["4L"],
    originalPrice: 2700,
  },
  {
    size: "10L",
    priceByFinish: {
      "Matte Finish": priceByFinish["Matte Finish"]["10L"]
    },
    price: priceByFinish["Matte Finish"]["10L"],
    originalPrice: 6500,
  },
  {
    size: "20L",
    priceByFinish: {
      "Matte Finish": priceByFinish["Matte Finish"]["20L"]
    },
    price: priceByFinish["Matte Finish"]["20L"],
    originalPrice: 12800,
  },
  {
    size: "Swatch Card",
    priceByFinish: {
      "Matte Finish": priceByFinish["Matte Finish"]["Swatch Card"]
    },
    price: priceByFinish["Matte Finish"]["Swatch Card"],
    originalPrice: 150,
    description: "Color swatch card for quick shade checks",
  },
  {
    size: "SamplePot 200ml",
    priceByFinish: {
      "Matte Finish": priceByFinish["Matte Finish"]["SamplePot 200ml"]
    },
    price: priceByFinish["Matte Finish"]["SamplePot 200ml"],
    originalPrice: 250,
    description: "Small sample size for color testing",
  }
];

export const premiumExteriorEmulsionDetail = {
  id: "Premium-Exterior-Emulsion",
  slug: "Premium-Exterior-Emulsion",
  name: "Calyco Premium Exterior Emulsion",
  image: "/Assets/Product Images/Premium Exterior Emulsion/1.png",
  brand: "Calyco",
  category: "Exterior",
  rating: 4.7,
  reviewCount: 8,
  description:
    "Premium exterior emulsion with sophisticated matte finish, engineered to withstand intense sun, heavy rain, and humidity while maintaining vibrant color depth.",
  details:
    "Calyco Premium Exterior Emulsion fortifies exterior walls with advanced UV blockers, breathable polymers, and mildew guards for long-lasting matte elegance.",
  shortDescription:
    "Premium matte finish exterior emulsion. UV-resistant, weather-proof barrier for enduring protection.",
  tagline: "Premium exterior emulsion with sophisticated matte finish - engineered for superior weather resistance and lasting beauty.",
  microCopy: "UV Shield  Weather-Resistant  Premium Matte",
  keyBenefits: [
    "Premium Matte Finish provides sophisticated, non-reflective elegance",
    "Advanced UV Protection prevents color fading and chalking",
    "Weather-Resistant Barrier withstands rain, humidity, and temperature extremes",
    "Anti-Fungal Technology prevents mildew and algae growth"
  ],
  features: [
    "Premium matte finish technology",
    "Advanced UV-blocking pigments",
    "Hydrophobic weather seal",
    "Anti-fungal and anti-algae formula"
  ],
  finishes: [
    {
      name: "Matte Finish",
      description:
        "Premium weather-resistant matte finish that provides sophisticated elegance with superior hiding power and durability.",
      price: priceByFinish["Matte Finish"]["1L"],
    },
  ],
  defaultFinish: "Matte Finish",
  priceByFinish,
  price_by_finish: priceByFinish,
  shopify_variant_map: PREMIUM_EXTERIOR_VARIANT_MAP,
  sizes,
  coveragePerLitre: 10,
  coatsOptions: [1, 2],
  defaultCoats: 2,
  efficiency: 0.9,
  application: [
    "Premium exterior wall painting",
    "stucco",
    "brick",
    "concrete",
    "fiber cement",
    "wood"
  ],
  applicationInstructions:
    "Apply with premium brush, roller, or sprayer. Do not apply when rain is expected within 6 hours for optimal matte finish.",
  preparation:
    "Surface must be clean, dry, and free from loose paint, dirt, mildew. Prime new surfaces for best matte finish results.",
  base_type: "Premium acrylic exterior emulsion",
  voc_content: "< 60 g/L (Low VOC)",
  coverage: "120-160 sq.ft./L/coat",
  coats_required: "2 coats",
  drying_time: "Touch dry: 45 minutes",
  recoat_time: "4-6 hours",
  temperature_range: "10°C–40°C",
  humidity_range: "Below 85% RH",
  cleanup: "Soap and Water",
  storage_instructions: "Store in cool dry place, avoid freezing. Store between 5°C – 40°C.",
  application_instructions: "Apply with premium brush, roller, or sprayer. Do not apply when rain is expected within 6 hours.",
  preparation_instructions: "Surface must be clean, dry, and free from loose paint, dirt, mildew. Prime new surfaces for premium finish.",
  recommended_uses: ["Premium exterior façades, architectural features, and masonry requiring sophisticated matte elegance"],
  substrate: ["Stucco", "Concrete", "Brick", "Fiber cement", "Wood"],
  
  // 🏗️ UPDATED: Only Matte Finish available
  finish_type_sheen: ["Matte Finish"],
  
  advantages: [
    "Premium Matte Finish delivers sophisticated, non-reflective elegance that hides surface imperfections",
    "Advanced UV Protection technology prevents color fading, chalking, and degradation from sunlight",
    "Superior Weather Resistance withstands rain, snow, humidity, and temperature fluctuations",
    "Anti-Fungal Technology prevents mildew, algae, and black spot formation for lasting cleanliness"
  ],
  technicalSpecs: {
    product_code: "CAL-00241",
    base: "Premium acrylic exterior emulsion",
    base_type: "Premium acrylic exterior emulsion",
    vehicle_type: "Water-based acrylic emulsion",
    dryingTime: "Touch dry: 45 minutes | Recoat: 4-6 hours | Full cure: 7 days",
    thinning: "Up to 5% water for brush/roller application",
    recoatTime: "4-6 hours",
    volume_solids: "Approx. 44%",
    voc_content: "< 60 g/L (Low VOC)",
    pH: "8-9",
    weight_per_volume: "~1.32 kg/L",
    shelf_life: "48 months in sealed containers",
    storage_temp: "5°C – 40°C",
    application_instructions: "Apply with premium brush, roller, or sprayer. Do not apply when rain is expected within 6 hours.",
    preparation_instructions: "Surface must be clean, dry, and free from loose paint, dirt, mildew. Prime new surfaces for premium results.",
    temperature_range: "10°C–40°C",
    humidity_range: "Below 85% RH",
    cleanup: "Soap and Water immediately after use",
    storage_instructions: "Store in cool dry place, avoid freezing",
  },
  safety_warnings: {
    signal_word: "Warning",
    hazard_statements: [
      "H315: Causes skin irritation",
      "H319: Causes serious eye irritation",
      "H335: May cause respiratory irritation"
    ],
    precautionary_statements: [
      "P261: Avoid breathing mist or spray. Use only with adequate ventilation",
      "P264: Wash hands, face, and exposed skin thoroughly after handling",
      "P271: Use only outdoors or in well-ventilated area",
      "P280: Wear protective gloves, safety goggles, and suitable protective clothing",
      "P312: Call a POISON CENTER or doctor/physician if you feel unwell"
    ],
    first_aid: {
      eye_contact: "Rinse cautiously with water for several minutes. Remove contact lenses if present. Continue rinsing. Seek medical attention if irritation persists.",
      skin_contact: "Wash with soap and water. Remove contaminated clothing and launder before reuse. Seek medical attention if irritation develops.",
      inhalation: "Move person to fresh air. Keep at rest in position comfortable for breathing. Seek medical advice if symptoms occur.",
      ingestion: "Rinse mouth. Do NOT induce vomiting. Seek medical attention immediately."
    }
  },
  safety_precautions: "Wear premium protective gloves, goggles, and long sleeves during application. Work in well-ventilated areas.",
  documents: {
    tds: "/Assets/docs/premium-exterior-emulsion-tds.pdf",
    sds: "/Assets/docs/premium-exterior-emulsion-sds.pdf",
    warranty: "/Assets/docs/premium-exterior-emulsion-warranty.pdf",
  },
  warranty: "7 years",
  
  // 🏗️ UPDATED: Added sample variants in correct order
  packaging: [
    "1L",
    "4L",
    "10L",
    "20L",
    "Swatch Card",
    "SamplePot 200ml"
  ],
  
  bucketImage: "/Assets/Product Images/Premium Exterior Emulsion/1.png",
  images: [
    "/Assets/Product Images/Premium Exterior Emulsion/1.png"
  ],
  seo: {
    title: "Premium Exterior Emulsion | Matte Finish Exterior Paint | Calyco",
    description:
      "Calyco Premium Exterior Emulsion delivers sophisticated matte finish with superior UV protection, weather resistance, and anti-fungal technology for lasting exterior beauty.",
    keywords:
      "premium exterior paint, matte finish emulsion, weather resistant paint, uv resistant paint, anti-fungal exterior paint, premium matte emulsion",
  },
};

export default premiumExteriorEmulsionDetail;
