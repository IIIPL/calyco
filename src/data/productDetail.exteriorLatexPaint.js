const EXTERIOR_LATEX_VARIANT_MAP = {
  "1L-Matte Finish": "gid://shopify/ProductVariant/42637669400694",
  "4L-Matte Finish": "gid://shopify/ProductVariant/42637669466230",
  "10L-Matte Finish": "gid://shopify/ProductVariant/42637669531766",
  "20L-Matte Finish": "gid://shopify/ProductVariant/42637669597302",
  "1L-High Sheen Finish": "gid://shopify/ProductVariant/42637669433462",
  "4L-High Sheen Finish": "gid://shopify/ProductVariant/42637669498998",
  "10L-High Sheen Finish": "gid://shopify/ProductVariant/42637669564534",
  "20L-High Sheen Finish": "gid://shopify/ProductVariant/42637669630070"
};

const priceByFinish = {
  "Matte Finish": {
    "1L": 700,
    "4L": 2700,
    "10L": 6500,
    "20L": 12800,
  },
  "High Sheen Finish": {
    "1L": 800,
    "4L": 3500,
    "10L": 8400,
    "20L": 16000,
  },
};

const sizes = [
  {
    size: "1L",
    priceByFinish: {
      "Matte Finish": priceByFinish["Matte Finish"]["1L"],
      "High Sheen Finish": priceByFinish["High Sheen Finish"]["1L"],
    },
    price: priceByFinish["Matte Finish"]["1L"],
    originalPrice: 850,
  },
  {
    size: "4L",
    priceByFinish: {
      "Matte Finish": priceByFinish["Matte Finish"]["4L"],
      "High Sheen Finish": priceByFinish["High Sheen Finish"]["4L"],
    },
    price: priceByFinish["Matte Finish"]["4L"],
    originalPrice: 3200,
  },
  {
    size: "10L",
    priceByFinish: {
      "Matte Finish": priceByFinish["Matte Finish"]["10L"],
      "High Sheen Finish": priceByFinish["High Sheen Finish"]["10L"],
    },
    price: priceByFinish["Matte Finish"]["10L"],
    originalPrice: 7800,
  },
  {
    size: "20L",
    priceByFinish: {
      "Matte Finish": priceByFinish["Matte Finish"]["20L"],
      "High Sheen Finish": priceByFinish["High Sheen Finish"]["20L"],
    },
    price: priceByFinish["Matte Finish"]["20L"],
    originalPrice: 15600,
  },
];

export const exteriorLatexPaintDetail = {
  id: "Calyco Exterior Latex Paint",
  slug: "Calyco Exterior Latex Paint",
  name: "Calyco Exterior Latex Paint",
  image: "/Assets/Nova/1-main.png",
  brand: "Calyco",
  category: "Exterior",
  rating: 4.7,
  reviewCount: 8,
  description:
    "High-performance exterior latex engineered to weather intense sun, rain, and humidity while keeping façades vivid.",
  details:
    "Calyco Exterior Latex Paint fortifies exterior walls with advanced UV blockers, breathable polymers, and mildew guards for long-lasting beauty.",
  shortDescription:
    "UV-shielding, hydrophobic exterior latex for enduring curb appeal.",
  tagline: "High-performance exterior latex engineered to weather intense sun, rain, and humidity while keeping façades vivid.",
  microCopy: "UV shield  Weatherproof barrier  Mildew resistant",
  keyBenefits: [
    "UV shield protects colors from fading",
    "Weatherproof barrier withstands rain and humidity",
    "Mildew resistant formula prevents fungal growth",
    "Breathable film technology allows moisture escape"
  ],
  features: [
    "UV-blocking pigments",
    "Hydrophobic weather seal",
    "Breathable film technology",
    "Anti-mildew additive"
  ],
  finishes: [
    {
      name: "Matte Finish",
      description:
        "Weather-resistant matte finish for exteriors with a modern, sophisticated look.",
      price: priceByFinish["Matte Finish"]["1L"],
    },
    {
      name: "High Sheen Finish",
      description:
        "Premium high-sheen finish for luxury exteriors with enhanced durability.",
      price: priceByFinish["High Sheen Finish"]["1L"],
    },
  ],
  defaultFinish: "Matte Finish",
  priceByFinish,
  price_by_finish: priceByFinish,
  shopify_variant_map: EXTERIOR_LATEX_VARIANT_MAP,
  sizes,
  coveragePerLitre: 10,
  coatsOptions: [1, 2],
  defaultCoats: 2,
  efficiency: 0.9,
  application: [
    "Exterior wall painting",
    "stucco",
    "brick",
    "concrete",
    "fiber cement",
    "wood"
  ],
  applicationInstructions:
    "Apply with brush, roller, or sprayer. Do not apply when rain is expected within 4 hours.",
  preparation:
    "Surface must be clean, dry, and free from loose paint, dirt, mildew. Prime new surfaces.",
  base_type: "Advanced acrylic exterior latex",
  voc_content: "< 60 g/L (Low VOC)",
  coverage: "120-160 sq.ft./L/coat",
  coats_required: "2 coats",
  drying_time: "Touch dry: 45 minutes",
  recoat_time: "4-6 hours",
  temperature_range: "10°C–40°C",
  humidity_range: "Below 85% RH",
  cleanup: "Soap and Water",
  storage_instructions: "Store in cool dry place, avoid freezing. Store between 5°C – 40°C.",
  application_instructions: "Apply with brush, roller, or sprayer. Do not apply when rain is expected within 4 hours.",
  preparation_instructions: "Surface must be clean, dry, and free from loose paint, dirt, mildew. Prime new surfaces.",
  recommended_uses: ["Exterior façades, trims, and masonry requiring long-term protection"],
  substrate: ["Stucco", "Concrete", "Brick", "Fiber cement", "Wood"],
  finish_type_sheen: ["Matte Finish", "High Sheen Finish"],
  advantages: [
    "UV shield protects against color fading from sunlight",
    "Weatherproof barrier withstands rain, snow, and humidity",
    "Mildew resistant formula prevents fungal and algal growth",
    "Breathable film technology prevents moisture trapping"
  ],
  technicalSpecs: {
    product_code: "CAL-00240",
    base: "Advanced acrylic exterior latex",
    base_type: "Advanced acrylic exterior latex",
    vehicle_type: "Water-based acrylic emulsion",
    dryingTime: "Touch dry: 45 minutes | Recoat: 4-6 hours | Full cure: 7 days",
    thinning: "Up to 5% water for brush/roller application",
    recoatTime: "4-6 hours",
    volume_solids: "Approx. 42%",
    voc_content: "< 60 g/L (Low VOC)",
    pH: "8-9",
    weight_per_volume: "~1.30 kg/L",
    shelf_life: "48 months in sealed containers",
    storage_temp: "5°C – 40°C",
    application_instructions: "Apply with brush, roller, or sprayer. Do not apply when rain is expected within 4 hours.",
    preparation_instructions: "Surface must be clean, dry, and free from loose paint, dirt, mildew. Prime new surfaces.",
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
  safety_precautions: "Wear protective gloves, goggles, and long sleeves during application. Work in well-ventilated areas.",
  documents: {
    tds: "/Assets/docs/exterior-latex-paint-tds.pdf",
    sds: "/Assets/docs/exterior-latex-paint-sds.pdf",
    warranty: "/Assets/docs/exterior-latex-paint-warranty.pdf",
  },
  warranty: "7 years",
  packaging: ["1L", "4L", "10L", "20L"],
  bucketImage: "/Assets/Nova/1-main.png",
  images: [
    "/Assets/Nova/1-main.png",
    "/Assets/Nova/1.png",
    "/Assets/Nova/2.png",
    "/Assets/Nova/3.png",
    "/Assets/Nova/4.png",
    "/Assets/Nova/5.png",
    "/Assets/Nova/6.png",
    "/Assets/Nova/7.png"
  ],
  seo: {
    title: "Exterior Latex Paint | Weather-Resistant Exterior Paint | Calyco",
    description:
      "Calyco Exterior Latex Paint delivers long-lasting protection with UV shield, weatherproof barrier, and mildew resistance. Perfect for facades and outdoor surfaces.",
    keywords:
      "exterior paint, latex paint, weather resistant paint, uv resistant paint, mildew resistant paint",
  },
};

export default exteriorLatexPaintDetail;
